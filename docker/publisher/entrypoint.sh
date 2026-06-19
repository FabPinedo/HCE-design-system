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

# ── 2. Crear usuario (ignorar error si ya existe) ───────────────────────────
echo ">>> Creating user (skipped if already exists) ..."
wget -q -O /dev/null \
  --method=PUT \
  --header="Content-Type: application/json" \
  --body-data="{\"name\":\"$PUB_USER\",\"password\":\"$PUB_PASS\",\"email\":\"$PUB_EMAIL\",\"type\":\"user\"}" \
  "$REGISTRY/-/user/org.couchdb.user:$PUB_USER" 2>/dev/null || true

# ── 3. Configurar Basic Auth en .npmrc ──────────────────────────────────────
echo ">>> Configuring auth ..."
AUTH=$(echo -n "$PUB_USER:$PUB_PASS" | base64 | tr -d '\n')
{
  echo "registry=$REGISTRY"
  echo "//${REGISTRY_HOST}/:_auth=${AUTH}"
  echo "//${REGISTRY_HOST}/:always-auth=true"
  echo "//${REGISTRY_HOST}/:email=${PUB_EMAIL}"
} >> /root/.npmrc

if ! npm whoami --registry "$REGISTRY" >/tmp/whoami.log 2>&1; then
  echo "    ERROR: Authentication with Verdaccio failed:"
  cat /tmp/whoami.log
  echo "    The '$PUB_USER' account in Verdaccio's storage volume doesn't match"
  echo "    the credentials this script uses. This usually means a stale/partial"
  echo "    Verdaccio volume from an earlier failed run. Fix with:"
  echo "      docker compose down"
  echo "      docker volume rm \$(docker volume ls -q | grep verdaccio-storage)"
  echo "      docker compose --profile publish run --build publisher"
  exit 1
fi
echo "    Auth configured (logged in as $(npm whoami --registry "$REGISTRY"))."

# ── 4. Build de la librería ─────────────────────────────────────────────────
echo ">>> Building @hce/design-system ..."
npm run build

# Si `npm publish` falla con E401 mas adelante a pesar de que `npm whoami`
# arriba funcionó: no es un problema del script. La causa típica es una
# VPN/proxy/antivirus corporativo interceptando el PUT (que es mas grande
# que el GET de whoami) y descartando el header Authorization. Pedir
# desactivar VPN/proxy temporalmente y reintentar.

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
