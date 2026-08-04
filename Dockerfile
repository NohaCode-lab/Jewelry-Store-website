# -------------------------------------------------------------
# Stage 1: Build Frontend Bundle & Compile Backend TypeScript
# -------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root dependency manifests
COPY package*.json ./
RUN npm ci

# Copy backend dependency manifests
COPY backend/package*.json ./backend/
RUN npm --prefix backend ci

# Copy source files
COPY . .

# Build production Vite bundle & compile backend TypeScript
RUN npm run build
RUN npm --prefix backend run build

# -------------------------------------------------------------
# Stage 2: Production Execution Runtime (Non-Root User Hardened)
# -------------------------------------------------------------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Copy root and backend package definitions
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install production dependencies only
RUN npm --prefix backend ci --omit=dev

# Copy compiled backend output & static frontend assets
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/dist ./public

# Set non-root permissions for secure container execution
RUN chown -R node:node /app

# Enforce Non-Root User Execution
USER node

EXPOSE 5000

# Container Health check probe
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

CMD ["node", "backend/dist/server.js"]
