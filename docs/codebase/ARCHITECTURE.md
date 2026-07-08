# Architecture

## Core Sections (Required)

### 1) Architectural Style

- **Primary style:** Layered architecture with feature clusters. The mobile app follows a clear layer separation: UI (screens/components) → State (Redux + React Query) → Services (Axios API layer) → Backend (separate repo). Within screens, feature-based clustering groups related screens (auth, article, podcast, profile).
- **Why this classification:** File tree shows distinct layers: `src/screens/` (UI), `src/components/` (reusable UI), `src/store/` (state), `src/hooks/` (API bindings), `src/helper/` (utilities/connectivity). Backend lives in a separate repository (`SB2318/ultimatehealth-backend`), consistent with a service-oriented split.
- **Primary constraints:**
  - All API calls go through Axios instances in `src/helper/` (not directly in components)
  - State management split: Redux for global app state (network, user, alerts, data), React Query for server-cached API responses
  - Push notifications via Firebase Cloud Messaging with background message handler at module scope

### 2) System Flow

```text
User Action (tap/input)
  -> Screen component (src/screens/)
    -> React Query hook (src/hooks/use*)
      -> Axios API client (src/helper/authAxios.ts or APIUtils.ts)
        -> External REST API (uhsocial.in - Node.js backend)
          -> Backend controllers -> Mongoose -> MongoDB
        <- JSON response
      <- Hook returns data/cache/status
    <- Screen renders using data + Redux state
  <- UI updates
```

Description using file-backed evidence:
1. **User interacts** with a screen (e.g., `HomeScreen.tsx`) which renders via React Navigation stack (`StackNavigation.tsx`, `TabNavigation.tsx`).
2. **Screen component** uses a React Query hook (e.g., `useGetPaginatedArticles.ts`) to fetch data.
3. **The hook** calls an Axios-based API utility (`src/helper/authAxios.ts` or `src/helper/APIUtils.ts`). A global interceptor (`src/helper/setupAxiosInterceptor.ts`) handles auth token injection and 401 refresh logic.
4. **The API call** reaches the external Node.js backend at `uhsocial.in` (separate repository).
5. **Response flows back** through React Query cache, and the screen re-renders.
6. **Push notifications** arrive via Firebase (`src/helper/firebase.ts`, `src/hooks/useNotificationListener.ts`) — handled at the app root via background message handler in `index.js`.
7. **Real-time updates** (e.g., social features) use Socket.IO via `src/contexts/SocketContext.tsx`.

### 3) Layer/Module Responsibilities

| Layer or module | Owns | Must not own | Evidence |
|-----------------|------|--------------|----------|
| `screens/` | Full-page UI, screen-level layout, navigation params | Direct API calls, business logic, Redux dispatch | `frontend/src/screens/HomeScreen.tsx` |
| `components/` | Reusable presentational components | Navigation, data fetching | `frontend/src/components/ArticleCard.tsx` |
| `store/` (Redux) | Global app state: network status, user auth, data state (articles/filters/podcasts), alert state | Server data (delegated to React Query) | `frontend/src/store/ReduxStore.ts`, slices |
| `hooks/` (React Query) | API data fetching, caching, mutation per endpoint | UI rendering, routing | `frontend/src/hooks/useGetPaginatedArticles.ts` |
| `helper/` | HTTP clients, auth tokens, storage, deep links, audio playback, notifications | UI rendering | `frontend/src/helper/authAxios.ts` |
| `contexts/` | Socket.IO connection lifecycle, user preferences, Firebase config | Business logic | `frontend/src/contexts/SocketContext.tsx` |
| `navigations/` | Route definitions, stack/tab configuration | Screen content | `frontend/src/navigations/StackNavigation.tsx` |

### 4) Reused Patterns

| Pattern | Where found | Why it exists |
|---------|-------------|---------------|
| React Query hooks per endpoint | `src/hooks/useGet*`, `use*` (~90 hooks) | Standardized data fetching with caching, loading, error states — one hook per API endpoint |
| Redux slices | `src/store/` (4 slices) | Global state for network, user, data, and alerts — follows Redux Toolkit pattern |
| Axios instance + interceptors | `src/helper/authAxios.ts`, `src/helper/setupAxiosInterceptor.ts` | Centralized HTTP config with automatic JWT refresh, timeout handling |
| Context providers wrapping | `src/components/AppContent.tsx` wraps Socket, Preferences, Firebase contexts | Dependency injection for ambient services (Socket.IO, notification, preferences) |
| Expo native module pattern | `modules/audio-module/` (custom Expo module) | Custom native functionality packaged as an Expo module with Android + iOS implementations |
| Co-located test directories | `__tests__/` within components/, store/, helper/, screens/ | Tests live alongside the code they test |

### 5) Known Architectural Risks

- **State management split:** Redux + React Query + Context providers + MMKV + SecureStore creates a complex state landscape. New contributors may find it hard to determine where to put new state. [Evidence: `frontend/src/store/` (Redux), `frontend/src/contexts/` (Context), `frontend/src/hooks/` (React Query), `frontend/src/helper/MMKVUtils.ts` (local storage), `frontend/src/helper/SecureStorageUtils.ts` (secure storage)]
- **No formal DI container or service locator:** Dependencies are imported directly, making test seam identification harder. Evidence: components import helpers directly (e.g., `import { ... } from '@/helper/Utils'`).
- **Backend coupling via URLs in app.config.js:** API URLs (`PROD_URL`, `SOCKET_PROD`, `CONTENT_CHECKER_PROD`) are embedded at build time via environment variables. No service discovery or runtime configuration endpoint is used.
- **Growing hook count (~90 hooks):** Each endpoint has a dedicated hook, which leads to many files and potential duplication. A more consolidated service layer could reduce boilerplate.
- **`@ts-nocheck` in AppContent.tsx:** The central app hub has TypeScript checking disabled, reducing type safety in a critical file.

### 6) Evidence

- `frontend/src/components/AppContent.tsx` — app hub, initializes services, renders navigation
- `frontend/src/store/ReduxStore.ts` — Redux store config
- `frontend/src/helper/authAxios.ts` — Axios instance with auth
- `frontend/src/helper/setupAxiosInterceptor.ts` — interceptor setup
- `frontend/src/hooks/` — all React Query hooks
- `frontend/index.js` — entry point with provider nesting
