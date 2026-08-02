# 💎 Mangata & Gallo — AI Luxury Commerce SaaS Platform

[![v3.0.0 GitHub Release](https://img.shields.io/badge/Release-v3.0.0_Ready-gold.svg?style=for-the-badge&logo=github)](https://github.com/NohaCode-lab/Jewelry-Store-website/releases)
[![TypeScript Strict](https://img.shields.io/badge/TypeScript-5.5_Strict-3178c6.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js Express](https://img.shields.io/badge/Express-4.19_Backend-000000.svg?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Prisma PostgreSQL](https://img.shields.io/badge/Prisma-5.16_PostgreSQL-2d3748.svg?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Vitest](https://img.shields.io/badge/Vitest-1.6_100%25_Passing-6e9f18.svg?style=for-the-badge&logo=vitest)](https://vitest.dev/)

An enterprise-grade, full-stack AI-powered luxury commerce platform engineered with a high-performance React 18 / TypeScript frontend, Zustand persistent state stores, express REST API backend, Prisma ORM database models, and serverless Edge Functions for AI concierge gift recommendations.

---

## 1. Executive Overview & Problem Statement

### Business Problem
High luxury commerce requires an immersive digital experience: zero-latency dynamic pricing based on precious metal (18K Gold, 950 Platinum) and carat selections, instant fuzzy catalog search, personalized AI gift recommendations, and persistent shopping cart drawers.

### Technical Solution
A modular, type-safe full-stack application built with strict separation of concerns:
- **Frontend Layer**: React 18 + TypeScript + Vite, Tailwind CSS luxury dark glassmorphism design system, Zustand state management, and Framer Motion animations.
- **Backend API Layer**: Node.js + Express REST API, Zod schema validation, Bcrypt password hashing, JWT Bearer authorization, Helmet security headers, and environment-based CORS policies.
- **Database Layer**: Prisma ORM backed by PostgreSQL featuring `User`, `Product`, `Cart`, `CartItem`, `Order`, `Role`, and `OrderStatus` models.

---

## 2. Technology Stack

### Frontend
- **Framework**: React 18.3 & TypeScript 5.5 (Strict Mode)
- **Build Engine**: Vite 5.2 with Rollup chunk splitting
- **Styling**: Tailwind CSS 3.4, Framer Motion 11, Lucide Icons, Glassmorphism CSS design system
- **State Management**: Zustand 4.5 (`cartStore`, `wishlistStore`, `uiStore`)
- **Data Fetching & Search**: TanStack React Query 5.51 & Fuse.js fuzzy search engine

### Backend
- **Runtime**: Node.js v20 LTS
- **Framework**: Express 4.19 REST API
- **ORM & Database**: Prisma 5.16 ORM & PostgreSQL
- **Security & Validation**: JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, `helmet`, `cors`, `zod`
- **Testing**: Vitest 1.6 & Supertest 7.0

---

## 3. Architecture Diagram

```mermaid
graph TD
    UserClient[Browser Client — React 18 + TS App] --> Router[React Router v6 Navigation /#section & /routes]
    
    subgraph Frontend Architecture
        Router --> UI[Dark Luxury Glassmorphic UI Components]
        UI --> Stores[Zustand Persistent Stores: Cart / Wishlist / UI]
        UI --> FuseSearch[Fuse.js Fuzzy Search Engine]
        UI --> AuthCtx[AuthProvider Context]
    end

    AuthCtx --> APIClient[Axios / Fetch API Client]
    
    subgraph Express Backend Layer (http://localhost:5000/api)
        APIClient --> ExpressServer[Express.js Server + Helmet Middleware]
        ExpressServer --> AuthRouter[/api/auth Router — JWT + Bcrypt]
        ExpressServer --> ProductRouter[/api/products Router — Catalog & Filters]
        ExpressServer --> CartRouter[/api/cart Router — Authenticated Cart]
    end

    subgraph Data Access Layer
        AuthRouter --> PrismaORM[Prisma ORM Client]
        ProductRouter --> PrismaORM
        CartRouter --> PrismaORM
        PrismaORM --> PostgresDB[(PostgreSQL Database)]
    end
```

---

## 4. Key SaaS Platform Features

1. **Dual Navigation Strategy**: Seamless single-page smooth scrolling (`/#about`, `/#designer`, `/#collections`, `/#contact`) on the Home page paired with full React Router routes (`/about`, `/designer`, `/collections`, `/contact`).
2. **Dynamic Product Customizer**: Instant price calculations based on selected metal type (18K Gold, 950 Platinum) and carat size.
3. **AI Luxury Gift Concierge**: Interactive assistant requesting occasion, recipient, style preferences, and budget with automated fallback recommendations.
4. **Persistent Shopping Cart & Wishlist**: Slide-out drawers backed by Zustand local persistence.
5. **Secure Authentication & RBAC**: Hashed password storage with Bcrypt, 7-day JWT expiration, and Admin role guards (`ADMIN`, `VIP`, `CUSTOMER`).

---

## 5. Local Setup & Installation Guide

### Prerequisites
- **Node.js**: `v20.11.0` or higher
- **npm**: `v10.4.0` or higher

### 1. Clone & Install
```bash
git clone https://github.com/NohaCode-lab/Jewelry-Store-website.git
cd Jewelry-Store-website

# Install Frontend Dependencies
npm install

# Install Backend Dependencies
cd backend
npm install
cd ..
```

### 2. Environment Configuration
Create `.env` inside `backend/`:
```env
PORT=5000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mangatagallo?schema=public"
JWT_SECRET="mangatagallo_super_secret_jwt_key_2026_luxury_commerce"
NODE_ENV="development"
```

### 3. Run Database Migrations & Seed
```bash
cd backend
npx prisma generate
npx prisma db push
npx prisma db seed
cd ..
```

### 4. Start Development Servers
```bash
# Terminal 1: Backend Server
cd backend
npm run dev

# Terminal 2: Frontend App
npm run dev
```
Access Frontend: `http://localhost:5173` | Backend API: `http://localhost:5000/api`

---

## 6. Automated Testing Commands

Execute complete quality gate verification pipelines:

```bash
# Frontend Testing Pipeline
npm run type-check   # TypeScript check (0 errors)
npm run lint         # ESLint audit (0 warnings/errors)
npm test             # Vitest unit test suite (14 passing)
npm run build        # Vite production bundle build

# Backend Testing Pipeline
cd backend
npm run type-check   # TypeScript check (0 errors)
npm run lint         # ESLint audit (0 warnings/errors)
npm test             # Vitest integration test suite (10 passing)
```

---

## 7. Production Deployment Instructions

- **Frontend**: Deploy `dist/` directory output to Vercel, Netlify, or Cloudflare Pages.
- **Backend**: Deploy `backend/` Node.js server to Render, AWS ECS, or DigitalOcean App Platform with `DATABASE_URL` and `JWT_SECRET` production environment variables set.

---

## 8. v3.0.0 Release Notes

- **Version**: `v3.0.0`
- **Release Title**: Mangata & Gallo — Full-Stack Luxury Commerce Platform
- **Highlights**:
  - 100% TypeScript conversion across all frontend components and backend services.
  - Resolved all navigation defects, scroll locking issues, and route fallbacks.
  - Eliminated auth bypass vulnerabilities and hardened Bcrypt password hashing.
  - Complete REST API documentation in [docs/API.md](file:///C:/Users/noham/.gemini/antigravity/scratch/Jewelry-Store-website/docs/API.md).
  - 100% automated test pass rate across Vitest unit and integration suites.