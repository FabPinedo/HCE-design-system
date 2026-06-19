#!/bin/sh
set -e

REGISTRY="${VERDACCIO_URL:-http://verdaccio:4873}"
REGISTRY_HOST=$(echo "$REGISTRY" | sed 's|https\?://||')
MAX_RETRIES=30
PUB_USER="hce-publisher"
PUB_PASS="hce-publisher"
PUB_EMAIL="ci@hce.local"

# ── 1. Esperar a que Verdaccio esté listo ───────────────────────────────────
echo ">>> Waiting for Verdaccio at $REGISTRY ..."
for i in $(seq 1 $MAX_RETRIES); do
  if wget -q -O /dev/null "$REGISTRY/-/ping" 2>/dev/null; then
    echo "    Verdaccio ready."
    break
  fi
  if [ "$i" = "$MAX_RETRIES" ]; then
    echo "    ERROR: Verdaccio did not respond after $MAX_RETRIES attempts."
    exit 1
  fi
  echo "    Attempt $i/$MAX_RETRIES — retrying in 2s..."
  sleep 2
done

# ── 2/3. Crear usuario + configurar auth, con reintentos ────────────────────
# `/-/ping` solo confirma que el servidor HTTP de Verdaccio está arriba, no
# que el plugin htpasswd ya inicializó su storage. En máquinas más lentas o
# con un volumen recién creado, el PUT de creación de usuario puede llegar
# antes de que el plugin esté listo y perderse sin dejar rastro en los logs
# de Verdaccio (se confirmó este síntoma exacto en un entorno real). Por eso
# se verifica con `npm whoami` y, si falla, se reintenta el ciclo completo.
AUTH=$(echo -n "$PUB_USER:$PUB_PASS" | base64 | tr -d '\n')
MAX_AUTH_RETRIES=5
i=1
while true; do
  echo ">>> Creating user (attempt $i/$MAX_AUTH_RETRIES, skipped if already exists) ..."
  wget -q -O /dev/null \
    --method=PUT \
    --header="Content-Type: application/json" \
    --body-data="{\"name\":\"$PUB_USER\",\"password\":\"$PUB_PASS\",\"email\":\"$PUB_EMAIL\",\"type\":\"user\"}" \
    "$REGISTRY/-/user/org.couchdb.user:$PUB_USER" 2>/dev/null || true

  : > /root/.npmrc
  {
    echo "registry=$REGISTRY"
    echo "//${REGISTRY_HOST}/:_auth=${AUTH}"
    echo "//${REGISTRY_HOST}/:always-auth=true"
    echo "//${REGISTRY_HOST}/:email=${PUB_EMAIL}"
  } >> /root/.npmrc

  if npm whoami --registry "$REGISTRY" >/tmp/whoami.log 2>&1; then
    echo "    Auth configured (logged in as $(cat /tmp/whoami.log))."
    break
  fi

  if [ "$i" = "$MAX_AUTH_RETRIES" ]; then
    echo "    ERROR: Authentication with Verdaccio failed after $MAX_AUTH_RETRIES attempts:"
    cat /tmp/whoami.log
    exit 1
  fi
  echo "    Auth attempt $i/$MAX_AUTH_RETRIES failed, retrying in 3s..."
  i=$((i + 1))
  sleep 3
done

# ── 4. Build de la librería ─────────────────────────────────────────────────
echo ">>> Building @hce/design-system ..."
npm run build

# ── 5. Verificar si la versión ya fue publicada ─────────────────────────────
PACKAGE_NAME=$(node -p "require('./package.json').name")
PACKAGE_VERSION=$(node -p "require('./package.json').version")

if wget -q -O /dev/null "$REGISTRY/$PACKAGE_NAME/$PACKAGE_VERSION" 2>/dev/null; then
  echo ">>> Version $PACKAGE_NAME@$PACKAGE_VERSION already published — skipping."
  exit 0
fi

# ── 6. Publicar ─────────────────────────────────────────────────────────────
echo ">>> Publishing $PACKAGE_NAME@$PACKAGE_VERSION to $REGISTRY ..."
npm publish --registry "$REGISTRY" --access public --ignore-scripts

echo ">>> Done. $PACKAGE_NAME@$PACKAGE_VERSION published successfully."
