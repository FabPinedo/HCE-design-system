# ─────────────────────────────────────────────────────────────
# Stage 1 — Build Storybook static files
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source and build storybook
COPY . .
RUN npm run build-storybook

# ─────────────────────────────────────────────────────────────
# Stage 2 — Serve with nginx
# ─────────────────────────────────────────────────────────────
FROM nginx:alpine

COPY --from=builder /app/storybook-static /usr/share/nginx/html
COPY docker/storybook/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
