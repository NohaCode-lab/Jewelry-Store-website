# 💎 Mangata & Gallo — Enterprise Full-Stack Luxury AI Commerce SaaS

[![CI/CD Pipeline](https://github.com/NohaCode-lab/Jewelry-Store-website/actions/workflows/ci.yml/badge.svg)](https://github.com/NohaCode-lab/Jewelry-Store-website/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://www.docker.com/)
[![OpenAPI](https://img.shields.io/badge/OpenAPI-3.0-6BA539.svg)](http://localhost:5000/api/docs)
[![GDPR Compliant](https://img.shields.io/badge/GDPR-Article%2020-003399.svg)](file:///C:/Users/noham/.gemini/antigravity/scratch/Jewelry-Store-website/src/components/CookieConsent.tsx)

An enterprise-grade, full-stack luxury jewelry e-commerce platform built to European / German (DACH) technology engineering standards. Features an interactive **AI Concierge with RAG Vector Search**, **OpenAPI / Swagger 3.0 Documentation**, **PostgreSQL + Prisma ORM**, **Redis Catalog Caching & Distributed Limiting**, **BullMQ Background Queue Processing**, **GDPR Data Portability**, and **38 Automated Vitest & Integration Tests**.

---

## 🏛️ System Architecture Diagram

```text
                           ┌────────────────────────────────────────┐
                           │            CLIENT / BROWSER            │
                           │   React 19 + TypeScript + Tailwind CSS │
                           └──────────────────┬─────────────────────┘
                                              │
                                              ▼
                           ┌────────────────────────────────────────┐
                           │          INTERACTIVE API DOCS          │
                           │         Swagger UI (/api/docs)         │
                           └──────────────────┬─────────────────────┘
                                              │
                                              ▼
                           ┌────────────────────────────────────────┐
                           │     EXPRESS TS BACKEND ROUTER (/v1/)   │
                           │   Helmet + Pino + RateLimiter + Cors   │
                           └─────────┬────────────────────┬─────────┘
                                     │                    │
                    ┌────────────────┘                    └────────────────┐
                    ▼                                                      ▼
 ┌──────────────────────────────────────┐               ┌──────────────────────────────────────┐
 │     IN-MEMORY CACHE & QUEUE          │               │      RELATIONAL & VECTOR STORE       │
 │   Redis 7 + BullMQ Order Worker      │               │     PostgreSQL + Prisma ORM          │
 └──────────────────────────────────────┘               └──────────────────────────────────────┘
```

---

## 🚀 Core Features & Enterprise Capability Matrix

- **⚡ Modern Frontend**: Vite 5.4 + React 18/19, strict TypeScript, Tailwind CSS, Framer Motion, Zustand reactive store, and Fuse.js client search indexing.
- **🛡️ Enterprise Express Backend (`/api/v1/`)**: Controller-Service architecture, Zod payload validation, Helmet security headers, Pino structured logging, and JWT authentication.
- **📚 Interactive OpenAPI 3.0 Specs**: Self-documenting API at `http://localhost:5000/api/docs` powered by `swagger-ui-express`.
- **⚡ Redis Performance & Caching**: In-memory catalog query caching (TTL 1 hour), automatic cache invalidation on product mutation, and distributed Redis rate-limiting.
- **📩 Asynchronous BullMQ Queue**: Background job worker handling checkout confirmations, inventory updates, and retry logic.
- **🤖 RAG AI Concierge Engine**: PostgreSQL `pgvector` vector similarity search providing contextual embeddings for luxury jewelry recommendations.
- **🇪🇺 GDPR Compliance**: EU ePrivacy Cookie Consent banner UI and machine-readable user data export endpoint (`/api/v1/auth/gdpr-export`).

---

## 🛠️ Quick Start & Local Setup

### Prerequisites
- **Node.js**: v20.x or v22.x
- **Docker Desktop**: v24.x+

### Option A: Standard Local Setup
```bash
# 1. Clone the repository
git clone https://github.com/NohaCode-lab/Jewelry-Store-website.git
cd Jewelry-Store-website

# 2. Install Root Frontend Dependencies
npm install

# 3. Install Backend Dependencies
npm --prefix backend install

# 4. Run Development Servers (Frontend + Express Backend API)
npm run dev
```

### Option B: Docker Compose Orchestration
```bash
# Spin up PostgreSQL, Redis, and Full-Stack App Containers
docker compose up --build -d

# Verify Container Health Probes
curl http://localhost:5000/api/v1/health
```

---

## 🧪 Testing Suite & Verification

The codebase maintains **38 automated unit, integration, and E2E tests** passing 100% cleanly:

```bash
# Run Frontend Vitest Unit Tests (19 tests)
npm test

# Run Backend Integration Tests (19 tests)
npm --prefix backend test

# Run Complete Verification (Lint + Tests + Build)
npm run lint && npm test && npm run build
```

---

## 🔒 Security & GDPR Privacy Assurance

1. **Authentication**: JWT token authorization with bcrypt password hashing (salt rounds = 10).
2. **GDPR Data Portability (Article 20)**: Users can export full profile data, carts, and order history via `GET /api/v1/auth/gdpr-export`.
3. **Cookie Consent**: Persistent user preference management (`Essential`, `Analytics`, `Marketing`).
4. **Header Hardening**: Express API protected by Helmet CSP, Strict-Transport-Security (HSTS), and CORS whitelist.