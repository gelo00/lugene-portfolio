# Stage 1: Build environment (React 19 + TypeScript + GSAP + R3F + Tailwind)
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package dependency definitions
COPY package*.json ./

# Install dependencies using --legacy-peer-deps to resolve React 19 peer conflicts
RUN if [ -f package-lock.json ]; then npm ci --legacy-peer-deps; else npm install --legacy-peer-deps; fi

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