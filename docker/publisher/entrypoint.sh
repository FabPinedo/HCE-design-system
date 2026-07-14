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
# El wget de BusyBox en esta imagen no soporta --method=PUT (solo GET/POST),
# así que la creación de usuario (que requiere PUT) se hace con curl, que sí
# soporta cualquier método HTTP y permite leer el código de estado real.
AUTH=$(echo -n "$PUB_USER:$PUB_PASS" | base64 | tr -d '\n')
MAX_AUTH_RETRIES=5
i=1
while true; do
  echo ">>> Creating user (attempt $i/$MAX_AUTH_RETRIES) ..."
  HTTP_CODE=$(curl -s -o /tmp/adduser.json -w "%{http_code}" \
    -X PUT \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"$PUB_USER\",\"password\":\"$PUB_PASS\",\"email\":\"$PUB_EMAIL\",\"type\":\"user\"}" \
    "$REGISTRY/-/user/org.couchdb.user:$PUB_USER" 2>/tmp/adduser.err || echo "000")

  # 200/201 = usuario creado ahora. 409 + "already registered" = ya existía
  # (asumimos que la contraseña coincide, ya que es el único usuario que
  # usa este script). Cualquier otro código (incl. 000 = sin conexión) se
  # reintenta, ya que normalmente indica que Verdaccio aún no está listo.
  if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ]; then
    echo "    User created."
    break
  fi
  if [ "$HTTP_CODE" = "409" ] && grep -q "already registered" /tmp/adduser.json 2>/dev/null; then
    echo "    User already exists."
    break
  fi

  if [ "$i" = "$MAX_AUTH_RETRIES" ]; then
    echo "    ERROR: Could not create/verify user '$PUB_USER' after $MAX_AUTH_RETRIES attempts."
    echo "    Last HTTP status: $HTTP_CODE"
    echo "    Response body: $(cat /tmp/adduser.json 2>/dev/null)"
    echo "    curl error: $(cat /tmp/adduser.err 2>/dev/null)"
    exit 1
  fi
  echo "    Unexpected response (HTTP $HTTP_CODE), retrying in 3s..."
  i=$((i + 1))
  sleep 3
done

: > /root/.npmrc
{
  echo "registry=$REGISTRY"
  echo "//${REGISTRY_HOST}/:_auth=${AUTH}"
  echo "//${REGISTRY_HOST}/:always-auth=true"
  echo "//${REGISTRY_HOST}/:email=${PUB_EMAIL}"
} >> /root/.npmrc

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