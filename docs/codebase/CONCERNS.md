# Codebase Concerns

## Core Sections (Required)

### 1) Top Risks (Prioritized)

| Severity | Concern | Evidence | Impact | Suggested action |
|----------|---------|----------|--------|------------------|
| High | Minimal test coverage — 30+ screens, only 1 has tests; ~90 hooks, minimal testing; no E2E tests | `frontend/src/screens/` (35 entries, 0-1 test), `frontend/src/hooks/` (90 files, no tests), `frontend/jest.config.js` (no coverage threshold) | Regressions slip through; refactoring is high-risk; no confidence in production changes | Add test targets for each layer — prioritize screens and hooks |
| High | Monolithic hook layer (~90 React Query hooks) with per-endpoint files and potential duplication | `frontend/src/hooks/` scan — 90 files, each wrapping one API call | High file count, maintenance overhead, inconsistent patterns, unclear what exists already | Audit hooks for consolidation opportunities; consider auto-generation from API spec |
| Medium | `AppContent.tsx` has TypeScript disabled (`@ts-nocheck`) | `frontend/src/components/AppContent.tsx` line 1 | Critical hub has no type safety; type errors in app initialization go undetected | Remove `@ts-nocheck` and fix type issues |
| Medium | Mixed state management landscape (Redux + React Query + Context + MMKV + SecureStore) | `frontend/src/store/` (4 slices), `frontend/src/contexts/` (3 providers), `frontend/src/hooks/` (90 hooks) | Confusing for new contributors; hard to determine where to add new state; risk of inconsistent patterns | Document state ownership boundaries clearly; consider consolidation |
| Medium | No offline mutation support | No offline queue detected; NetworkSlice tracks connectivity but no request queuing | Actions fail silently when offline; data loss possible | Implement offline queue with background sync |

### 2) Technical Debt

| Debt item | Why it exists | Where | Risk if ignored | Suggested fix |
|-----------|---------------|-------|-----------------|---------------|
| `@ts-nocheck` in AppContent.tsx | Likely accumulated type errors during rapid development | `frontend/src/components/AppContent.tsx` | Hides real type bugs in app initialization flow | Remove and fix underlying type errors |
| Duplicate asset directories | Assets exist at both `frontend/assets/` and `frontend/src/assets/` | `frontend/assets/` vs `frontend/src/assets/` | Confusion, wasted bundle size, stale references | Consolidate to one location |
| Both `eslintrc.js` and `eslint.config.js` | Migration from ESLint 8 to 9 | `frontend/.eslintrc.js` and `frontend/eslint.config.js` | Conflicting or redundant config | Remove duplicate |
| ~90 individual React Query hooks | One-file-per-endpoint pattern | `frontend/src/hooks/` | Maintenance overhead, discovery difficulty | Consolidate into domain services |
| Redundant `module: "esnext"` in tsconfig | Duplicate key in tsconfig | `frontend/tsconfig.json` line 6 | Confusing — second value overrides first | Remove duplicate |
| Potential Firebase key exposure | API keys passed through `app.config.js` `extra` section | `frontend/app.config.js` | Keys could leak if bundled metadata is inspected | Evaluate Firebase security rules and key restrictions |

### 3) Security Concerns

| Risk | OWASP category (if applicable) | Evidence | Current mitigation | Gap |
|------|--------------------------------|----------|--------------------|-----|
| Firebase API keys in client-side config | N/A (intended for client SDK) | `frontend/app.config.js` lists 10+ Firebase config vars | Firebase Security Rules are the intended access control | Config vars visible in bundle |
| JWT token storage | A02: Cryptographic Failures | `frontend/src/helper/SecureStorageUtils.ts` uses Expo SecureStore | SecureStore provides hardware-backed encryption | [TODO] — verify token expiration and refresh handling |
| No input sanitization on WebView content | A03: Injection | `frontend/src/helper/authAxios.ts` — API responses rendered in WebViews | [TODO] — no sanitization code observed | Review WebView content rendering for XSS vectors |

### 4) Performance and Scaling Concerns

| Concern | Evidence | Current symptom | Scaling risk | Suggested improvement |
|---------|----------|-----------------|-------------|-----------------------|
| High hook count (90) with potential duplicate requests | `frontend/src/hooks/` scan | Unclear — no instrumentation | As features grow, request volume per screen compounds | Implement request deduplication or consolidate hooks |
| Large image assets bundling | `frontend/assets/images/` — multiple JPGs and PNGs up to 743KB | No current performance issue observed | APK/IPA size grows with image count | Compress images, use CDN for dynamic content |
| No lazy loading for screens | All screens imported in navigation config | [TODO] — verify current navigation import pattern | Slower initial load as app grows | Implement screen-level code splitting |

### 5) Fragile/High-Churn Areas

| Area | Why fragile | Churn signal | Safe change strategy |
|------|-------------|-------------|----------------------|
| `frontend/src/screens/article/ArticleScreen.tsx` | High modification rate — most-changed file in last 90 days after lockfiles/config | 48 commits in 90 days | Add tests first; avoid wide refactors without coverage |
| `frontend/src/screens/HomeScreen.tsx` | Second highest churn among source files | 33 commits in 90 days | Same — test before touching |
| `frontend/src/components/AppContent.tsx` | Central hub with `@ts-nocheck`; 31 commits | 31 commits in 90 days | Remove `@ts-nocheck` gradually; add integration tests for initialization flow |
| `frontend/src/screens/auth/LoginScreen.tsx` | Auth flows are security-sensitive; 30 commits | 30 commits in 90 days | Unit tests for auth state transitions |
| `frontend/src/helper/APIUtils.ts` | Shared API utility; 20 commits | 20 commits in 90 days | Add tests before modifying shared API layer |

### 6) `[ASK USER]` Questions

1. [ASK USER] What is the intended long-term state management strategy? The project currently uses Redux Toolkit (4 slices) + React Query (~90 hooks) + Context (3 providers) + MMKV + SecureStore. Should this be consolidated (e.g., migrate more to React Query and reduce Redux), or is the current split intentional?
2. [ASK USER] Are there plans to add E2E testing? Currently there are zero E2E tests. The `TEST_GUIDELINES.md` exists but mentions no E2E tooling.
3. [ASK USER] What is the coverage expectation for new contributions? `jest.config.js` has no `coverageThreshold`. Should one be added?
4. [ASK USER] The `eslint.config.js` (ESLint 9 flat config) exists alongside `.eslintrc.js` (legacy config) — which one is active? Should the legacy file be removed?
5. [ASK USER] Is the PocketBase integration actively used in production? Which features depend on it vs. the main Node.js API?
6. [ASK USER] What is the current production deployment architecture for the backend? The `bACKEND_SETUP.md` only covers local development. Are there Docker/Kubernetes configs in the backend repository?
7. [ASK USER] What is the auth model for the Content Intelligence API (VeriWise) at `uhsocial.in/content-intel`? Is it behind the same JWT, uses API keys, or is it internal-only?

### 7) Evidence

- Scan output: high-churn files, code metrics
- `frontend/src/hooks/` directory — 90 hooks, minimal tests
- `frontend/jest.config.js` — no coverage threshold
- `frontend/src/components/AppContent.tsx` — `@ts-nocheck`
- Git log — recent commit patterns and churn
- `frontend/src/screens/` — screen test coverage gap
- `frontend/.eslintrc.js` + `frontend/eslint.config.js` — dual configs
- `frontend/assets/` vs `frontend/src/assets/` — duplicate asset dirs
