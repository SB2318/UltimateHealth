# External Integrations

## Core Sections (Required)

### 1) Integration Inventory

| System | Type | Purpose | Auth model | Criticality | Evidence |
|--------|------|---------|------------|-------------|----------|
| Node.js REST API (uhsocial.in) | REST API | All backend CRUD (articles, podcasts, users, auth, reviews) | JWT (3-token system: access 15min + refresh 7d + verification 1hr) | High | `frontend/app.config.js` (PROD_URL), `frontend/src/helper/authAxios.ts` |
| Firebase Cloud Messaging | Push notification service | Push notifications for article updates, reviews, social interactions | Firebase API keys via google-services.json / GoogleService-Info.plist | Medium | `frontend/index.js`, `frontend/app.json`, `frontend/src/helper/notificationHandler.ts` |
| Content Intelligence API (uhsocial.in/content-intel) | REST API | Plagiarism detection, grammar analysis, originality scoring | [TODO: auth method] | Medium | `frontend/app.config.js` (CONTENT_CHECKER_PROD) |
| Socket.IO Server (uhsocial.in) | WebSocket | Real-time features (chat, social interactions) | [TODO: likely JWT-based] | Medium | `frontend/app.config.js` (SOCKET_PROD), `frontend/src/contexts/SocketContext.tsx` |
| Sentry | Error monitoring | Crash reporting, error tracking, performance monitoring | DSN via sentryclirc org/project config | Low | `frontend/.sentryclirc`, `frontend/App.tsx` |
| Vultr Object Storage | S3-compatible object storage | Media files (article images, podcast audio) | Access/secret key (backend-managed) | Medium | `docs/ARCHITECTURE.md` (referenced) |
| PocketBase | BaaS (back-end-as-a-service) | Article image upload, improvements storage | Likely API key | Low | `frontend/src/hooks/useUploadArticlePocketbase.ts`, `useUploadImprovementToPocketbase.ts` |

### 2) Data Stores

| Store | Role | Access layer | Key risk | Evidence |
|-------|------|--------------|----------|----------|
| MongoDB (backend-managed) | Primary data store for articles, users, podcasts, reviews, comments | Via Node.js REST API only (no direct client-side access) | No offline support for write operations | `bACKEND_SETUP.md`, `docs/ARCHITECTURE.md` |
| MMKV | Local key-value storage (fast, synchronous) | `src/helper/MMKVUtils.ts` | No encryption — sensitive data goes to SecureStore | `frontend/package.json`, `frontend/src/helper/MMKVUtils.ts` |
| Expo SecureStore | Encrypted storage for auth tokens | `src/helper/SecureStorageUtils.ts` | Small capacity limit | `frontend/package.json`, `frontend/src/helper/SecureStorageUtils.ts` |
| PocketBase | File/image hosting for articles | `src/hooks/useUploadArticlePocketbase.ts` | Dependency on third-party BaaS | `frontend/src/hooks/` |

### 3) Secrets and Credentials Handling

- **Credential sources:** Firebase config files (`google-services.json` for Android, `GoogleService-Info.plist` for iOS — not committed), Sentry DSN (via `.sentryclirc`), Firebase API keys (injected via environment variables in `app.config.js`), JWT tokens (stored in Expo SecureStore via `src/helper/SecureStorageUtils.ts`).
- **Hardcoding checks:** No hardcoded secrets found in scanned source code. Firebase config files and `.env` files are gitignored.
- **Rotation or lifecycle notes:** JWT refresh token mechanism exists (7-day expiry). No other rotation patterns detected.

### 4) Reliability and Failure Behavior

- **Retry/backoff behavior:** React Query configured globally with `retry: 2` and `staleTime: 60000ms` (1 minute) in `frontend/App.tsx`. No custom backoff function observed.
- **Timeout policy:** Axios timeout configured via `src/helper/ApiTimeout.ts`. [TODO: verify exact timeout value]
- **Circuit-breaker or fallback behavior:** No circuit-breaker pattern detected. Network state is tracked via Redux (`NetworkSlice.ts`) using `@react-native-community/netinfo` — `frontend/src/components/NetworkBanner.tsx` shows a banner when offline. No request queuing for offline mode observed.

### 5) Observability for Integrations

- **Logging around external calls:** Conditional dev logging via custom logger (`src/services/monitoring/logger.ts`). Logs not inspected around every external call — primarily error-focused.
- **Metrics/tracing coverage:** Sentry captures exceptions (explicit `captureException()` calls). No structured HTTP metrics or distributed tracing detected.
- **Missing visibility gaps:**
  - No structured logging across all API calls
  - No HTTP-level metrics collection (request timing, error rates)
  - No health check or connectivity probes for external services
  - Network status detected via NetInfo but not used to queue failed requests

### 6) Evidence

- `frontend/app.config.js` — external service URLs and Firebase config keys
- `frontend/index.js` — Firebase background handler
- `frontend/src/helper/authAxios.ts` — Axios HTTP client w/ auth
- `frontend/src/helper/setupAxiosInterceptor.ts` — interceptor
- `frontend/src/helper/firebase.ts` — Firebase initialization
- `frontend/src/contexts/SocketContext.tsx` — Socket.IO context
- `frontend/src/services/monitoring/sentry.ts` — Sentry setup
- `frontend/src/store/NetworkSlice.ts` — network state
- `frontend/src/helper/MMKVUtils.ts` — local storage
- `frontend/src/helper/SecureStorageUtils.ts` — secure storage
