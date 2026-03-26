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

COPY --from=builder /app/storybook-static /usr/share/nginx/html
COPY docker/storybook/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
