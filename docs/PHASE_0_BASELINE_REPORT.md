# PHASE 0 — BASELINE PROTECTION REPORT
**Project:** Mangata & Gallo Luxury Jewelry Platform  
**Branch:** `upgrade/production-v2`  
**Timestamp:** 2026-08-02  

---

## 1. Current Architecture Overview
The baseline system is a React 18 single-page application (SPA) created with Vite and styled using Tailwind CSS, Framer Motion, and Swiper.js.

```text
Jewelry-Store-website/
├── public/
├── src/
│   ├── assets/              # Static image assets (uncompressed, ~24MB total)
│   ├── components/          # Unstructured UI components (About, Contacts, Products, etc.)
│   ├── pages/               # Home.jsx (Monolithic section aggregator)
│   ├── App.jsx              # BrowserRouter wrapper
│   ├── index.css            # Tailwind directives
│   └── main.jsx             # React entrypoint
├── package.json
└── vite.config.js
```

---

## 2. Current Dependencies & Tooling
- **React**: `^18.3.1` / `react-dom: ^18.3.1`
- **Build Tool**: Vite `^5.2.0`
- **Styling**: Tailwind CSS `^3.4.3`, Autoprefixer `^10.4.19`, PostCSS `^8.4.38`
- **Animations**: Framer Motion `^11.0.0`, Swiper `^11.1.4`, React Intersection Observer `^9.8.1`
- **Icons**: Lucide React `^0.378.0`
- **Routing**: React Router DOM `^6.23.1` (unused routes)
- **Linter**: ESLint `^9.39.4` (conflicts with `eslint-plugin-react-hooks@4.6.2`)

---

## 3. Baseline Build & Quality Status
- **Production Build Status**: `npm run build` succeeds (output length: ~384 KB JS chunk), but `npm install` fails due to peer dependency mismatches with ESLint 9 unless `--legacy-peer-deps` is used.
- **Linting Status**: ESLint 9 configuration mismatch prevents standard execution.
- **Automated Tests**: **0% Coverage**. No Vitest, Jest, or Playwright setup.

---

## 4. Current Performance Issues
- **Asset Weight Vulnerability**:
  - `src/assets/collection/img-3.jpg`: **13.3 MB**
  - `src/assets/earrings/earrings-1.jpg`: **9.5 MB**
  - **Total Initial Download**: **> 23.5 MB**
- **Core Web Vitals Impact**: Mobile LCP estimate exceeds **22 seconds** on 3G network connections.
- **Render Thrashing**: Entire page renders sequentially without code splitting or image lazy-loading strategies.

---

## 5. Known Technical Debt
1. **Hardcoded Monolithic Data**: Product lists, pricing, and client testimonials are hardcoded inside UI JSX files.
2. **Synchronous UX Blockers**: Contact form and Newsletter subscription execute `window.alert()`, locking the UI thread.
3. **Missing State Architecture**: No global state management (Zustand) for Cart, Wishlist, or UI state.
4. **JavaScript (JSX) Type Fragility**: Lack of TypeScript strict typing leads to runtime prop mismatch risks.

---

## 6. Migration Risks & Safeguards

| Migration Risk | Risk Level | Mitigation Strategy |
| :--- | :---: | :--- |
| **Breaking Existing Aesthetics** | High | Preserve Tailwind theme, Playfair Display typography, gold color tokens (`#F59E0B`), and glassmorphism. |
| **Peer Dependency Failures** | Medium | Audit and pin exact working versions of `@eslint/js` and `eslint-plugin-react-hooks` in Phase 2. |
| **Type Errors During Gradual TS Migration** | Low | Enable strict `tsconfig.json` for new `.ts` and `.tsx` modules, keeping legacy components isolated until refactored. |
