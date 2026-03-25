# ─────────────────────────────────────────────────────────────
# Publisher — builds @hce/design-system and publishes to
#             a Verdaccio instance defined by VERDACCIO_URL
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine

RUN apk add --no-cache curl

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source
COPY . .

# Copy entrypoint
COPY docker/publisher/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
