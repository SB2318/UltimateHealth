# Codebase Structure

## Core Sections (Required)

### 1) Top-Level Map

| Path | Purpose | Evidence |
|------|---------|----------|
| `frontend/` | React Native (Expo) mobile app — main codebase for Android + iOS | `frontend/package.json`, `frontend/App.tsx` |
| `frontend/src/` | All application source code (components, screens, store, hooks, services, utils) | `frontend/src/` directory scan |
| `.github/workflows/` | GitHub Actions CI/CD and bot workflows (18 workflows) | `.github/workflows/` directory scan |
| `.github/scripts/` | Python scripts for AI-powered issue triage and PR review automation | `.github/scripts/ai_issue_triage.py`, `.github/scripts/ai_reviewer.py` |
| `docs/` | Project documentation, architecture docs, codebase docs | `docs/ARCHITECTURE.md` |
| `ieee-submodules/` | IEEE IGDTUW open source week contributions (git submodules) | `.gitmodules` |
| `frontend/modules/` | Custom Expo native modules (audio module) | `frontend/modules/audio-module/` |

### 2) Entry Points

- **Main runtime entry:** `frontend/index.js` — registers the root component via `registerRootComponent(AppWrapper)`. Wraps the app in `GestureHandlerRootView` > `BottomSheetModalProvider` > `Redux Provider`, registers Firebase background message handler.
- **App component:** `frontend/App.tsx` — sets up React Query client, configures audio mode, wraps app in `QueryClientProvider` > `AppContent`. Exported via `Sentry.wrap()`.
- **Secondary entry:** `frontend/App.tsx` → `frontend/src/components/AppContent.tsx` — the hub: initializes monitoring, sets up axios interceptors, deep linking, Firebase, Redux state restoration, navigation, and renders `StackNavigation`.
- **Web target:** `frontend/index.js` → Expo web (via `react-native-web`)

### 3) Module Boundaries

| Boundary | What belongs here | What must not be here |
|----------|-------------------|------------------------|
| `src/screens/` | Full screen/page components — each maps to a route | Business logic, direct API calls, Redux mutations (use hooks instead) |
| `src/components/` | Reusable UI components | Screen-specific layouts, navigation logic |
| `src/store/` | Redux slices + store config | Async data fetching (use React Query hooks) |
| `src/services/` | API abstraction layer (Axios client), monitoring services | UI logic, component rendering |
| `src/hooks/` | React Query wrapper hooks — one per API endpoint | Direct HTTP calls, Redux dispatch |
| `src/helper/` | Utility functions (auth, storage, audio, deep links, notifications) | UI rendering |
| `src/contexts/` | React Context providers (Socket, Preferences, Firebase) | Business logic |
| `src/navigations/` | React Navigation config (Stack, Tab, TabBar) | Screen content |
| `src/types/` | Ambient type declarations (modules, Tamagui) | Runtime logic |
| `src/schemas/` | Zod validation schemas | Data fetching |
| `src/constants/` | Static constants (languages, glossary, playback settings) | Business logic |

### 4) Naming and Organization Rules

- **File naming pattern:** PascalCase for component/screen files (e.g., `HomeScreen.tsx`, `ArticleCard.tsx`, `LoginScreen.tsx`). camelCase for utility/service files (e.g., `apiClient.ts`, `Utils.ts`, `firebase.ts`).
- **Directory organization pattern:** Layer-based at top level (screens, components, hooks, store, services) with feature sub-directories within screens for complex domains (e.g., `screens/auth/`, `screens/profile/`, `screens/article/`, `screens/overview/`).
- **Test file pattern:** `__tests__/` directories co-located with source (e.g., `components/__tests__/`, `store/__tests__/`, `helper/__tests__/`, `screens/__tests__/`). Test files use `.test.ts` or `.test.tsx` suffix.
- **Import aliasing:** `@/*` maps to `frontend/*` (from `tsconfig.json` paths). Used in imports like `import { ... } from '@/hooks/FirebaseContext'`. Some imports use relative paths (e.g., `../../helper/Utils`).
- **Module workspaces:** `modules/*` defined as Yarn workspaces in `frontend/package.json`.

### 5) Evidence

- `frontend/src/` — complete source tree
- `frontend/index.js` — entry point
- `frontend/App.tsx` — app bootstrap
- `frontend/tsconfig.json` — path aliases (`@/*`)
- `frontend/package.json` — workspaces config
