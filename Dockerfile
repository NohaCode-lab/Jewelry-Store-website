# =============================================================
# Multi-Stage Production Dockerfile for Mangata & Gallo
# =============================================================

# -------------------------------------------------------------
# Stage 1: Build & Compilation (Node.js 22 Alpine)
# -------------------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Install build tools if native compilation is required
RUN apk add --no-base python3 make g++

# Copy root dependency manifests & install deterministically
COPY package*.json ./
RUN npm ci

# Copy backend dependency manifests & install deterministically
COPY backend/package*.json ./backend/
RUN npm --prefix backend ci

# Copy full application codebase
COPY . .

# Generate Prisma Client for backend database layer
RUN npm --prefix backend run prisma:generate

# Build production Vite bundle for frontend & compile backend TypeScript
RUN npm run build
RUN npm --prefix backend run build

# -------------------------------------------------------------
# Stage 2: Hardened Non-Root Production Runtime
# -------------------------------------------------------------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Install minimal runtime dependencies (wget for healthcheck)
RUN apk add --no-cache wget

# Copy root and backend package definitions
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install production-only dependencies
RUN npm --prefix backend ci --omit=dev

# Copy generated Prisma client from builder stage
COPY --from=builder /app/backend/node_modules/@prisma ./backend/node_modules/@prisma
COPY --from=builder /app/backend/node_modules/.prisma ./backend/node_modules/.prisma

# Copy compiled backend dist & static frontend assets
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/dist ./public

# Set strict non-root ownership permissions
RUN chown -R node:node /app

# Enforce Non-Root User Execution (PoLP)
USER node

EXPOSE 5000

# Production Health Check Probe
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/v1/health || exit 1

CMD ["node", "backend/dist/server.js"]
