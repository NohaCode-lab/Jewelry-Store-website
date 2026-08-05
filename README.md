# 💎 Mangata & Gallo — Full-Stack Production E-Commerce Platform

[![CI/CD Pipeline](https://github.com/NohaCode-lab/Jewelry-Store-website/actions/workflows/ci.yml/badge.svg)](https://github.com/NohaCode-lab/Jewelry-Store-website/actions)
[![Node.js Version](https://img.shields.io/badge/Node.js-22.x-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2-purple.svg)](https://vitejs.dev/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://www.docker.com/)
[![Security Scan](https://img.shields.io/badge/Trivy-Vulnerability%20Scan-brightgreen.svg)](https://github.com/aquasecurity/trivy)
[![Code Quality](https://img.shields.io/badge/SonarCloud-Clean%20Architecture-orange.svg)](https://sonarcloud.io/)

A production-ready, full-stack luxury jewelry e-commerce platform built with modern frontend, backend microservices, database ORM, distributed queue processing, automated testing, containerization, and a hardened CI/CD pipeline.

---

## 🌟 1. Project Overview & Capabilities

**Mangata & Gallo** is designed to demonstrate modern software engineering practices, security hardening, and infrastructure automation. The application separates concerns cleanly between a client-side single-page application (SPA) and an Express backend API service.

### Highlights
- **Full-Stack Architecture:** Decoupled React frontend and Node.js backend microservice architecture.
- **Secure API Design:** Controller-Service pattern, Zod runtime schema validation, JWT authentication, and Helmet HTTP security header hardening.
- **Automated Testing:** 40 passing Vitest unit and API integration tests enforcing 100% test pass gates in CI.
- **Docker Containerization:** Hardened multi-stage Docker build utilizing non-root execution and health probes.
- **Production CI/CD Pipeline:** Uncompromised GitHub Actions pipeline featuring decoupled job isolation, PostgreSQL/Redis service containers, Trivy vulnerability scanning, and SonarCloud static analysis.

---

## 🚀 2. Project Highlights & Core Features

### 🎨 Frontend Application
- **Vite 5 + React 18:** Fast HMR development and optimized production bundling.
- **TypeScript:** Strict type checking (`npx tsc --noEmit`) across UI components and state stores.
- **Responsive Luxury Styling:** Custom CSS design system with glassmorphic cards, micro-animations, and mobile responsiveness.
- **Reactive State Management:** Zustand store for cart synchronization, local storage persistence, and authentication state.

### ⚙️ Backend Services
- **Node.js & Express RESTful API:** Modular `/api/v1/` routes for product catalog, shopping cart, authentication, and telemetry.
- **OpenAPI / Swagger 3.0 Documentation:** Interactive API documentation rendered live at `http://localhost:5000/api/docs`.
- **Validation & Exception Handling:** Strict Zod schema parsing on incoming payloads with centralized error middleware.

### 🗄️ Database & Persistence Layer
- **PostgreSQL 16:** Relational database management system with ACID guarantees.
- **Prisma ORM 5:** Schema migration management, type-safe query building, and seed data execution.

### ⚡ Async Background Processing
- **Redis 7:** High-speed in-memory data store for query caching and distributed rate limiting.
- **BullMQ Integration:** Asynchronous job queues for processing order checkouts and background notifications.

---

## 🛠️ 3. Technology Stack

| Category | Technologies | Description |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite 5, TypeScript 5, Tailwind CSS | Single Page Application UI with modular components |
| **Backend** | Node.js 22, Express 4, Zod, Pino | Enterprise RESTful API microservice |
| **Database** | PostgreSQL 16, Prisma ORM 5 | Relational data persistence & schema management |
| **Caching & Queues** | Redis 7, BullMQ 6 | Query result caching & background job processing |
| **Testing** | Vitest 1.6, Supertest 7 | Automated unit & database-backed integration tests |
| **Containerization** | Docker, Docker Compose | Multi-stage image build & multi-service orchestration |
| **CI/CD** | GitHub Actions | Decoupled 5-job pipeline architecture |
| **Security & Quality** | Trivy 0.28, SonarCloud, Actionlint | Vulnerability scanning, SARIF reporting & code quality |

---

## 🏛️ 4. Application Architecture

```text
┌─────────────────────────────────────────────────────────┐
│                    CLIENT BROWSER                       │
│        React 18 + TypeScript + Zustand Store           │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼  RESTful HTTP APIs
┌─────────────────────────────────────────────────────────┐
│               EXPRESS BACKEND ROUTER (/v1/)             │
│    Helmet Security + Pino Logger + Zod Validation       │
└──────────────┬─────────────────────────────┬────────────┘
               │                             │
               ▼                             ▼
┌────────────────────────────┐  ┌─────────────────────────┐
│     POSTGRESQL 16 (DB)     │  │    REDIS 7 & BULLMQ     │
│   Prisma ORM Persistence   │  │   Catalog Query Cache   │
│   & Migrations             │  │   & Order Job Queue     │
└────────────────────────────┘  └─────────────────────────┘
```

- **Frontend & Backend Decoupling:** Client communicates with the backend solely via versioned REST APIs (`/api/v1/*`).
- **ORM Persistence:** Database access is abstracted through Prisma Client, preventing raw SQL injection vulnerabilities.
- **Asynchronous Processing:** Non-blocking operations (e.g., checkout notifications) are delegated to BullMQ queues powered by Redis.
- **Container Isolation:** Runtime services (Postgres, Redis, App) run isolated in Docker containers.

---

## 🔄 5. Production CI/CD Pipeline

The repository enforces an uncompromised 5-Job Production Pipeline in `.github/workflows/ci.yml`.

### Pipeline Execution Flow

```text
                         [ Git Push / Pull Request ]
                                      │
                                      ▼
             ┌─────────────────────────────────────────────────┐
             │       Job 1: Lint, Type-Check & Unit Tests      │
             │   ESLint + TypeScript + Vitest + Vite Build    │
             └────────────────────────┬────────────────────────┘
                                      │
                                      ▼
             ┌─────────────────────────────────────────────────┐
             │    Job 2: Backend Integration & Service Tests   │
             │   Postgres 16 + Redis 7 + Prisma Seed + Vitest  │
             └──────────┬───────────────────────────┬──────────┘
                        │                           │
                        ▼                           ▼
┌──────────────────────────────────────┐  ┌─────────────────────────────────────┐
│ Job 3: SonarCloud Code Quality Scan  │  │ Job 4: Docker Build & Trivy Scan    │
│ Static Security & Vulnerability Analysis│ │ BuildKit Cache + SARIF Upload       │
└───────────────────┬──────────────────┘  └──────────────────┬──────────────────┘
                    │                                        │
                    └───────────────────┬────────────────────┘
                                        │
                                        ▼
             ┌─────────────────────────────────────────────────┐
             │       Job 5: Production Deployment Gate        │
             │     Environment Protection Gate (main branch)   │
             └─────────────────────────────────────────────────┘
```

### Engineering Features
- **Runtime Standard:** Enforces Node.js 22 LTS across all job runners.
- **Monorepo Dependency Isolation:** Backend and frontend dependencies are installed in separate job steps with `NODE_ENV=development` and `--include=dev` flags to preserve workspace autonomy.
- **Automated Service Provisioning:** Real PostgreSQL 16 and Redis 7 service containers are spun up automatically for API integration testing.
- **Automated Database Setup:** Runs `npx prisma db push` and `npm run prisma:seed` dynamically inside Job 2 before triggering backend integration tests.
- **Fail-Fast Gates:** Zero usage of `continue-on-error` anti-patterns on primary compilation and test steps.

---

## 🧪 6. Testing Strategy

Automated test suites are integrated into every pull request and push.

```text
Frontend Unit Tests:  19 passed (100%)
Backend API Tests:    21 passed (100%)
Total Test Coverage:  40 passing tests
```

### Frontend Testing (`Vitest`)
- Validates React UI components, Zustand cart state mutations, client-side search logic, and utility functions.
- Run locally:
  ```bash
  npm test
  ```

### Backend Testing (`Vitest` + `Supertest` + `PostgreSQL` + `Redis`)
- Performs real HTTP API integration tests against a live PostgreSQL database and Redis queue instance.
- Tests authentication flows (`POST /api/v1/auth/login`, `POST /api/v1/auth/refresh`), cart operations, product catalog endpoints, and Prometheus metrics telemetry.
- Enforces sequential test file execution (`--fileParallelism=false`) to eliminate database transaction collisions.
- Run locally:
  ```bash
  npm --prefix backend test
  ```

---

## 🐳 7. Docker & Production Readiness

The application uses a multi-stage `Dockerfile` based on `node:22-alpine` to minimize image size and harden production runtime security.

```dockerfile
# Stage 1: Build & Compile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY backend/package*.json ./backend/
RUN npm --prefix backend ci
COPY . .
RUN npm --prefix backend run prisma:generate
RUN npm run build
RUN npm --prefix backend run build

# Stage 2: Hardened Runtime
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/dist ./public
USER node
EXPOSE 5000
HEALTHCHECK --interval=30s --timeout=5s CMD wget --spider http://localhost:5000/api/v1/health || exit 1
CMD ["node", "backend/dist/server.js"]
```

### Container Features
- **Least Privilege Execution:** Runs under non-root user `USER node`.
- **Minimal Image Footprint:** Stage 2 discards build tools, TypeScript compilers, and devDependencies.
- **Health Monitoring:** Built-in Docker `HEALTHCHECK` probe querying the `/api/v1/health` endpoint every 30 seconds.

---

## 🛡️ 8. Security & Code Quality Practices

1. **Trivy Vulnerability Scanning:** Automated scanning of container images for `HIGH` and `CRITICAL` CVEs via `aquasecurity/trivy-action@0.28.0`.
2. **SARIF Code Scanning:** Results uploaded directly to GitHub Security tab via `github/codeql-action/upload-sarif@v3`.
3. **SonarCloud Static Analysis:** Rules configured in `sonar-project.properties` for code smells, security hotspots, and duplication analysis.
4. **Least Privilege CI Permissions:**
   ```yaml
   permissions:
     contents: read
     security-events: write
     packages: write
   ```
5. **Secret Handling:** Confidential API keys and database credentials are stored strictly in environment variables and GitHub Action Secrets.

---

## 💻 9. Local Development Setup

### Prerequisites
- **Node.js**: `v22.x` or higher
- **npm**: `v10.x` or higher
- **PostgreSQL**: `v16.x` (or via Docker)
- **Redis**: `v7.x` (or via Docker)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NohaCode-lab/Jewelry-Store-website.git
   cd Jewelry-Store-website
   ```

2. **Install dependencies:**
   ```bash
   # Install root / frontend dependencies
   npm ci

   # Install backend dependencies
   npm --prefix backend ci
   ```

3. **Configure Environment Variables:**
   Create `.env` inside `backend/`:
   ```env
   PORT=5000
   NODE_ENV=development
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mangatagallo_dev?schema=public
   REDIS_URL=redis://127.0.0.1:6379
   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379
   JWT_SECRET=mangatagallo_super_secret_jwt_key_2026
   REFRESH_TOKEN_SECRET=mangatagallo_super_secret_refresh_key_2026
   ```

4. **Initialize Database:**
   ```bash
   # Generate Prisma Client
   npm run prisma:generate

   # Push schema to local PostgreSQL
   npx --prefix backend prisma db push

   # Seed database with initial luxury catalog & VIP test accounts
   npm run prisma:seed
   ```

5. **Start Development Servers:**
   ```bash
   npm run dev
   ```
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`
   - Interactive OpenAPI Specs: `http://localhost:5000/api/docs`

---

## 🔑 10. Environment Variables

| Variable | Required | Default / Example | Purpose |
| :--- | :--- | :--- | :--- |
| `PORT` | Optional | `5000` | Express server listener port |
| `NODE_ENV` | Yes | `development` / `test` / `production` | Runtime environment toggle |
| `DATABASE_URL` | Yes | `postgresql://user:pass@host:5432/db` | PostgreSQL connection string |
| `REDIS_URL` | Optional | `redis://127.0.0.1:6379` | Redis cache & BullMQ queue connection |
| `REDIS_HOST` | Optional | `127.0.0.1` | Redis host address |
| `REDIS_PORT` | Optional | `6379` | Redis port |
| `JWT_SECRET` | Yes | `[cryptographically-random-string]` | Access token signing secret |
| `REFRESH_TOKEN_SECRET`| Yes | `[cryptographically-random-string]` | Refresh token signing secret |

---

## 📁 11. Project Structure

```text
Jewelry-Store-website/
├── .github/
│   └── workflows/
│       └── ci.yml                   # 5-Job Production CI/CD Pipeline
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma            # PostgreSQL Prisma models & enums
│   │   └── seed.ts                  # Seed script for users & catalog
│   ├── src/
│   │   ├── config/                  # Environment & Redis clients
│   │   ├── controllers/             # Express API controllers
│   │   ├── middleware/              # Auth, CORS, & rate limiters
│   │   ├── queues/                  # BullMQ background job queues
│   │   ├── repositories/            # Data access layer
│   │   ├── routes/                  # Versioned API routes (/v1/)
│   │   ├── services/                # Business logic & RAG vector search
│   │   └── server.ts                # Express application entry point
│   ├── tests/                       # API integration test suite
│   ├── package.json                 # Backend dependencies & scripts
│   └── tsconfig.json                # Backend TypeScript configuration
├── src/                             # React Frontend application
│   ├── components/                  # UI components
│   ├── context/                     # Auth & state contexts
│   ├── pages/                       # Page view containers
│   └── store/                       # Zustand store management
├── Dockerfile                       # Multi-stage production Docker build
├── docker-compose.yml               # Multi-service container orchestration
├── sonar-project.properties         # SonarCloud static analysis config
├── package.json                     # Root dependencies & convenience scripts
├── tsconfig.json                    # Frontend TypeScript configuration
└── vite.config.ts                   # Vite bundler configuration
```

---

## 💡 12. Engineering Decisions & Architecture Trade-Offs

### 1. Independent Subfolder Dependencies vs Root Monorepo Hoisting
- **Decision:** Backend maintains its own `package.json` and `node_modules/`.
- **Rationale:** Ensures the backend microservice can be built, containerized, and deployed independently without inheriting client-side frontend dependencies (e.g., React, Vite, Framer Motion).

### 2. Standard `npm test` Script Invocation in CI
- **Decision:** CI jobs execute `npm test` inside `working-directory: ./backend` rather than overriding with `npx vitest run`.
- **Rationale:** Enforces 100% parity between local developer workflows and CI runner environments.

### 3. Sequential Vitest Test Suite Execution (`--fileParallelism=false`)
- **Decision:** Integration tests run sequentially when executed against the database.
- **Rationale:** Parallel test file execution causes concurrent database transaction collisions when modifying shared user records and seed data. Sequential execution ensures deterministic, zero-flakiness test runs.

### 4. Fail-Fast Pipeline Policy (No `continue-on-error`)
- **Decision:** Primary compile, lint, and test steps are strict gates.
- **Rationale:** Prevents broken builds, failing unit tests, or security vulnerabilities from quietly reaching production environments.

---

## 🔮 13. Future Roadmap

- [ ] **Automated CD Deployment:** Implement automated deployment triggers to AWS ECS / Render staging environments upon `main` merge.
- [ ] **E2E Playwright Integration:** Add browser-based end-to-end user checkout flow validation.
- [ ] **Telemetry Dashboard:** Integrate Grafana dashboards to visualize Prometheus metrics collected at `/api/v1/metrics`.
- [ ] **Extended Vector Database:** Upgrade in-memory RAG search to native `pgvector` extension bindings on PostgreSQL.

---

## 📜 14. License & Contact

Distributed under the MIT License. See `LICENSE` for more information.

**Project Maintainer:** NohaCode-lab  
**Repository:** [https://github.com/NohaCode-lab/Jewelry-Store-website](https://github.com/NohaCode-lab/Jewelry-Store-website)