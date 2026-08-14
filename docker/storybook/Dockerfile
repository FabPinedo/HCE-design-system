# ─────────────────────────────────────────────────────────────
# Stage 1 — Build Storybook static files
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source
COPY . .

# Compilar la librería primero — genera dist/index.d.ts que necesita vite-plugin-dts al buildear Storybook
RUN npm run build

# Buildear Storybook (CI=true evita prompts interactivos)
RUN CI=true npm run build-storybook

# ─────────────────────────────────────────────────────────────
# Stage 2 — Serve with nginx
# ─────────────────────────────────────────────────────────────
FROM nginx:alpine

# openssl CLI: nginx:alpine trae las librerias pero no el binario --
# hace falta para que nginx-entrypoint.sh pueda convertir un .pfx/.p12
# montado (CERT_PATH) a PEM en runtime.
RUN apk add --no-cache openssl

COPY --from=builder /app/storybook-static /usr/share/nginx/html
COPY docker/storybook/nginx-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80 443

ENTRYPOINT ["/docker-entrypoint.sh"]
