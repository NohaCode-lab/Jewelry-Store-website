# DEPENDENCY AUDIT REPORT — BEFORE UPGRADE

**Project:** Mangata & Gallo — AI Luxury Commerce Platform  
**Branch:** `upgrade/production-v2`  
**Timestamp:** 2026-08-02  

---

## 1. Initial Tooling & Configuration State

### Package Configuration (`package.json`)
```json
{
  "name": "jewelry-store-platform",
  "version": "2.0.0",
  "type": "module",
  "dependencies": {
    "@tanstack/react-query": "^5.51.1",
    "canvas-confetti": "^1.9.2",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.378.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.52.1",
    "react-intersection-observer": "^9.8.1",
    "react-router-dom": "^6.23.1",
    "sonner": "^1.5.0",
    "swiper": "^11.1.4",
    "zod": "^3.23.8",
    "zustand": "^4.5.4"
  }
}
```

---

## 2. Identified Infrastructure Gaps

1. **Backend Layer Data Fetching SDK**: Lacks official `@supabase/supabase-js` database & auth client.
2. **Design System Component Utilities**: Lacks `class-variance-authority` (CVA), `clsx`, and `tailwind-merge` for variant-based UI primitive components (`Button`, `Input`, `Card`, `Modal`).
3. **Fuzzy Search & Typo Tolerance**: Basic array `includes()` string search lacks fuzzy search, scoring, and field weighting provided by `fuse.js`.
4. **Date & Time Formatting**: Lacks standard immutable date library (`date-fns`) for order history timestamps and estimated luxury delivery windows.
5. **E2E & User Event Testing Tooling**: Lacks `@testing-library/user-event` and `@playwright/test` for automated headless browser workflow validation.
6. **Code Formatting Governance**: Lacks `prettier` and `eslint-config-prettier` for automated code formatting.

---

## 3. Dependency Upgrade Plan

| Package | Version | Purpose |
| :--- | :--- | :--- |
| `@supabase/supabase-js` | `^2.44.0` | PostgreSQL DB, Supabase Auth, Storage, and Edge Functions. |
| `class-variance-authority` | `^0.7.0` | Variant-based UI design system primitive management. |
| `clsx` | `^2.1.1` | Conditional className string construction. |
| `tailwind-merge` | `^2.3.0` | Conflict-free Tailwind CSS class merging. |
| `fuse.js` | `^7.0.0` | Client-side fuzzy search engine with typo tolerance. |
| `date-fns` | `^3.6.0` | Immutable date formatting & delivery window calculation. |
| `@testing-library/user-event` | `^14.5.2` | User interaction simulation for Vitest component tests. |
| `@playwright/test` | `^1.45.0` | End-to-end browser user workflow testing. |
| `prettier` | `^3.3.2` | Automated code formatting engine. |
| `eslint-config-prettier` | `^9.1.0` | Prevents conflicts between ESLint & Prettier formatting rules. |
