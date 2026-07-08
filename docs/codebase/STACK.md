# Technology Stack

## Core Sections (Required)

### 1) Runtime Summary

| Area | Value | Evidence |
|------|-------|----------|
| Primary language | TypeScript (frontend), Python (CI scripts) | `frontend/package.json`, `.github/scripts/ai_issue_triage.py` |
| Runtime + version | Node.js >= 18.x (from .nvmrc: consistent), React Native 0.85.3, Expo SDK 56 | `frontend/package.json`, `.nvmrc` |
| Package manager | Yarn >= 1.22.x (with pnpm as secondary for quality scripts) | `frontend/README.md`, `frontend/package.json` workspaces config |
| Module/build system | Metro bundler (Expo), EAS Build for production, TypeScript ~6.0.3 with bundler module resolution | `frontend/metro.config.js`, `frontend/tsconfig.json`, `frontend/eas.json` |

### 2) Production Frameworks and Dependencies

| Dependency | Version | Role in system | Evidence |
|------------|---------|----------------|----------|
| React Native | 0.85.3 | Core mobile framework (Android + iOS) | `frontend/package.json` |
| Expo | ~56.0.14 | Managed runtime / dev toolchain | `frontend/package.json` |
| React | 19.2.3 | UI component library | `frontend/package.json` |
| React Navigation | 7.x | Screen routing and navigation (Stack + Bottom Tabs) | `frontend/package.json` |
| Redux Toolkit | ^2.9.2 | Global state management (4 slices) | `frontend/package.json`, `frontend/src/store/ReduxStore.ts` |
| Tamagui | ^1.135.6 | UI component framework with themes and animations | `frontend/package.json`, `frontend/tamagui.config.ts` |
| TanStack React Query | ^5.90.5 | Server state / data fetching management | `frontend/package.json`, `frontend/App.tsx` |
| Axios | ^1.12.2 | HTTP client for API calls | `frontend/package.json` |
| React Native Paper | ^5.14.5 | Material Design UI components | `frontend/package.json` |
| React Hook Form | ^7.78.0 | Form state management and validation | `frontend/package.json` |
| Zod | ^4.4.3 | Schema validation | `frontend/package.json`, `frontend/src/schemas/profileSchemas.ts` |
| React Native Firebase | ^23.4.1 | Push notifications (Firebase Cloud Messaging) | `frontend/package.json` |
| Sentry React Native | ^8.13.0 | Error monitoring and crash reporting | `frontend/package.json`, `frontend/.sentryclirc` |
| Socket.io Client | ^4.8.1 | Real-time communication | `frontend/package.json`, `frontend/src/contexts/SocketContext.tsx` |
| Lottie React Native | ^7.3.4 | Animation rendering | `frontend/package.json` |
| React Native Reanimated | 4.3.1 | Performant UI animations | `frontend/package.json` |
| React Native Gesture Handler | ~2.31.1 | Touch/gesture handling | `frontend/package.json` |
| React Native MMKV | ^4.3.1 | Local key-value storage | `frontend/package.json` |
| React Native Web | ~0.21.0 | Web target support | `frontend/package.json` |
| React Native WebView | 13.16.1 | In-app web content rendering | `frontend/package.json` |
| FlashList | ^2.3.2 | Performant list rendering | `frontend/package.json` |
| Gorhom Bottom Sheet | ^5.2.6 | Modal/bottom sheet UI | `frontend/package.json` |
| React Native Gifted Chat | ^3.3.3 | Chat UI components | `frontend/package.json` |

### 3) Development Toolchain

| Tool | Purpose | Evidence |
|------|---------|----------|
| ESLint 9.x | Linting (extends @react-native) | `frontend/.eslintrc.js` |
| Prettier | Code formatting (singleQuote, trailingComma) | `frontend/.prettierrc.js` |
| Jest 29.x | Unit test runner | `frontend/jest.config.js` |
| React Native Testing Library 13.x | Component test utilities | `frontend/package.json` (devDependencies) |
| Knip ^6.14.2 | Dead-code analysis | `frontend/knip.json` |
| TypeScript ~6.0.3 | Type checking (strict mode) | `frontend/tsconfig.json` |
| Expo Lint | Lint runner for Expo projects | `frontend/package.json` scripts |
| Patch Package | Patching third-party dependencies | `frontend/package.json` postinstall |
| Sentry CLI (via `sentryclirc`) | Source map upload and release tracking | `frontend/.sentryclirc` |
| Babel Plugin Transform Remove Console | Strips console logs in production | `frontend/package.json` devDependencies |

### 4) Key Commands

```bash
# Install dependencies
yarn install

# Start development (Expo Go)
npx expo start

# Android build
npx expo run:android

# iOS build (macOS only)
npx expo run:ios

# Run tests
yarn test

# Type check
yarn type-check

# Full quality check (type-check + lint + dead-code)
yarn quality

# Dead-code analysis
yarn knip

# Production builds (EAS)
eas build --platform android --profile production
eas build --platform ios --profile production
```

### 5) Environment and Config

- **Config sources:** `frontend/.env.example`, `frontend/app.config.js` (dynamic runtime config via `process.env`), `frontend/app.json` (static Expo config), root `.env.example`
- **Required env vars (from app.config.js):** `PROD_URL`, `SOCKET_PROD`, `CONTENT_CHECKER_PROD`, `FIREBASE_API_KEY_ANDROID`, `FIREBASE_API_KEY_IOS`, `FIREBASE_APP_ID_ANDROID`, `FIREBASE_APP_ID_IOS`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_PROJECT_ID`, `FIREBASE_STORAGE_BUCKET`, `FIREBASE_SENDER_ID`, `FIREBASE_MEASUREMENT_ID`, `FIREBASE_DATABASE_URL`
- **Android specific:** `google-services.json` (Firebase config, not committed)
- **iOS specific:** `GoogleService-Info.plist` (Firebase config, not committed)
- **Deployment constraints:** Android min SDK 26; EAS Build for production; Sentry DSN configured via org/project in `.sentryclirc`

### 6) Evidence

- `frontend/package.json` — all dependencies
- `frontend/tsconfig.json` — TypeScript config
- `frontend/metro.config.js` — bundler config
- `frontend/eas.json` — EAS build profiles
- `frontend/app.config.js` — runtime config w/ env vars
- `frontend/.env.example` — frontend env template
- `.env.example` — root env template
