# Stage 1: Build environment (React + TypeScript + GSAP + Tailwind CSS)
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package dependency definitions
COPY package*.json ./

# Install dependencies (uses npm ci if package-lock.json exists, otherwise falls back to npm install)
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy application source files
COPY . .

# Build production SPA static bundle via Vite and TypeScript compiler
RUN npm run build

# Stage 2: Production web server (Nginx SPA serving)
FROM nginx:alpine AS runner

# Copy custom Nginx configuration with SPA fallback routing and compression
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
