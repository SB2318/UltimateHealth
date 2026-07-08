# Coding Conventions

## Core Sections (Required)

### 1) Naming Rules

| Item | Rule | Example | Evidence |
|------|------|---------|----------|
| Files (components/screens) | PascalCase | `HomeScreen.tsx`, `ArticleCard.tsx`, `LoginScreen.tsx` | `frontend/src/screens/`, `frontend/src/components/` |
| Files (utilities/helpers) | camelCase | `apiClient.ts`, `firebase.ts`, `authAxios.ts` | `frontend/src/helper/` |
| Files (hooks) | camelCase with `use` prefix | `useGetPaginatedArticles.ts`, `useUserLogin.ts` | `frontend/src/hooks/` |
| Files (Redux slices) | camelCase with `Slice` suffix | `dataSlice.ts`, `UserSlice.ts`, `alertSlice.ts` | `frontend/src/store/` |
| Functions/methods | camelCase | `handlePresentModalPress`, `setConnected`, `firebaseInit` | `frontend/src/` multiple files |
| Types/interfaces | PascalCase (types), PascalCase (interfaces) | `ArticleData`, `UserDetail`, `RootStackParamList`, `PodcastData` | `frontend/src/type.ts` |
| Constants/env vars | UPPER_SNAKE_CASE | `PROD_URL`, `SOCKET_PROD`, `FIREBASE_API_KEY_ANDROID` | `frontend/app.config.js` |
| React Query hooks | camelCase with `use` prefix + domain | `useGetPaginatedArticles`, `useUserLogin`, `useLikeArticle` | `frontend/src/hooks/` |
| Redux action/state keys | camelCase | `filteredArticles`, `selectedTags`, `isGuest` | `frontend/src/store/dataSlice.ts`, `UserSlice.ts` |

### 2) Formatting and Linting

- **Formatter:** Prettier (config: `frontend/.prettierrc.js`) — settings: single quotes, trailing commas, avoid parens around single arrow params, bracket spacing false
- **Linter:** ESLint 9.x (config: `frontend/.eslintrc.js`) — extends `@react-native`, with some rules disabled (prettier/prettier: 0, react-compiler: off)
- **Most relevant enforced rules:** react/react-in-jsx-scope (off), react/display-name (off), react-compiler/react-compiler (off)
- **Run commands:**
  - `yarn lint` — runs ESLint via Expo's linter
  - `yarn type-check` — runs `tsc --noEmit`
  - `yarn quality` — runs type-check + lint + knip (dead-code analysis)
  - `yarn knip` — runs Knip dead-code analysis only

### 3) Import and Module Conventions

- **Import grouping/order:** No enforced import ordering rule (no eslint-plugin-import configured). Imports typically follow: React/external packages first (separated by line), then local aliased imports, then relative imports.
- **Alias vs relative import policy:** Both used. Path alias `@/*` (maps to `frontend/*`) used for imports like `@/hooks/FirebaseContext`, `@/store/UserSlice`. Relative imports used in some files (e.g., `../../helper/Utils`). Consistency is mixed — both patterns appear in the codebase.
- **Public exports/barrel policy:** No barrel (`index.ts`) export files detected in components directories. Components import directly from file paths.

### 4) Error and Logging Conventions

- **Error strategy by layer:**
  - **API layer:** Async error handling in React Query hooks (each hook catches and may re-throw). Axios interceptors (`setupAxiosInterceptor.ts`) handle 401 responses for token refresh.
  - **Components:** Error boundaries not observed. Many components use `try/catch` locally or rely on React Query's `error` state.
  - **Sentry:** Global error capture via `@sentry/react-native`. `Sentry.captureException()` called explicitly in key locations (e.g., audio config failure in `App.tsx`).
- **Logging style:** Custom logger at `src/services/monitoring/logger.ts`. Conditional: `if (__DEV__) { logger.error(...) }` pattern used to avoid production leaks.
- **Sensitive-data redaction rules:** `index.js` comment explicitly states "Only log notification payloads in development to avoid leaking user data or FCM tokens in production log aggregators."

### 5) Testing Conventions

- **Test file naming/location rule:** Test files are co-located in `__tests__/` directories adjacent to source. Suffix: `.test.ts` or `.test.tsx`.
- **Mocking strategy norm:** Jest manual mocks setup in `frontend/jest.setup.ts`. Key mocks: `react-native-reanimated`, `react-native-gesture-handler`, `react-native-worklets`, `@react-native-async-storage/async-storage`, `react-native-fs`, `expo-font`, `expo-constants`, `expo-secure-store`, `@sentry/react-native`, `tamagui`, `react-native-tts`.
- **Coverage expectation:** No coverage threshold configured in `jest.config.js`. Currently unknown.

### 6) Evidence

- `frontend/.eslintrc.js` — ESLint config
- `frontend/.prettierrc.js` — Prettier config
- `frontend/tsconfig.json` — TypeScript config with strict mode
- `frontend/jest.setup.ts` — mock setup
- `frontend/src/type.ts` — type naming patterns
- `frontend/src/helper/` — utility naming patterns
