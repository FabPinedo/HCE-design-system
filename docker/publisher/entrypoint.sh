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
  if curl -sf "$REGISTRY/-/ping" > /dev/null 2>&1; then
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
curl -sf -X PUT "$REGISTRY/-/user/org.couchdb.user:$PUB_USER" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"$PUB_USER\",\"password\":\"$PUB_PASS\",\"email\":\"$PUB_EMAIL\",\"type\":\"user\"}" \
  > /dev/null 2>&1 || true

# ── 3. Configurar Basic Auth en .npmrc ──────────────────────────────────────
echo ">>> Configuring auth ..."
AUTH=$(echo -n "$PUB_USER:$PUB_PASS" | base64 | tr -d '\n')
{
  echo "registry=$REGISTRY"
  echo "//${REGISTRY_HOST}/:_auth=${AUTH}"
  echo "//${REGISTRY_HOST}/:always-auth=true"
  echo "//${REGISTRY_HOST}/:email=${PUB_EMAIL}"
} >> /root/.npmrc
echo "    Auth configured."

# ── 4. Build de la librería ─────────────────────────────────────────────────
echo ">>> Building @hce/design-system ..."
npm run build

# ── 5. Verificar si la versión ya fue publicada ─────────────────────────────
PACKAGE_NAME=$(node -p "require('./package.json').name")
PACKAGE_VERSION=$(node -p "require('./package.json').version")

if curl -sf "$REGISTRY/$PACKAGE_NAME/$PACKAGE_VERSION" > /dev/null 2>&1; then
  echo ">>> Version $PACKAGE_NAME@$PACKAGE_VERSION already published — skipping."
  exit 0
fi

# ── 6. Publicar ─────────────────────────────────────────────────────────────
echo ">>> Publishing $PACKAGE_NAME@$PACKAGE_VERSION to $REGISTRY ..."
npm publish --registry "$REGISTRY" --access public --ignore-scripts

echo ">>> Done. $PACKAGE_NAME@$PACKAGE_VERSION published successfully."
