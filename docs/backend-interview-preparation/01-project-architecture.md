# UltimateHealth — End-to-End System Architecture Deep Dive

> **Architectural Blueprint & Reality Check**: This document formalizes the actual architecture of the UltimateHealth platform, mapping out the multi-repository topology, network boundaries, data pipelines, and infrastructure layers.

---

## 1. High-Level Multi-Repository Topology

UltimateHealth is partitioned into specialized services across repositories and branches to decouple mobile, web, backend API, and content auditing concerns:

```mermaid
flowchart TB
    subgraph Clients["Client Tier"]
        Mobile["UltimateHealth Mobile App\n(React Native / Expo 51+)\nBranch: main"]
        WebBrowser["UltimateHealth Web Client\n(Next.js 16 / React 19 SSR)\nBranch: web"]
        AdminDashboard["UltimateHealth Admin Panel\n(Next.js / Vite)\nRepo: ultimatehealth-admin"]
    end

    subgraph EdgeTier["Edge & Gateway Tier"]
        NginxGateway["Nginx Reverse Proxy\n(.nginx/manifest.conf)\nSSL/TLS, Static Assets, PWA Caching"]
        NextProxy["Next.js Edge Proxy / BFF\n(web/src/proxy.ts)\nCSP Nonces, HSTS, Route Normalization"]
    end

    subgraph BackendTier["Core Backend & Microservices Tier"]
        BackendAPI["Node.js + Express REST API\n(Repo: ultimatehealth-backend)\nControllers, Services, Auth"]
        VeriWise["VeriWise Content Checker\n(Microservice)\nPlagiarism, Grammar, Originality"]
        SemanticSearch["Semantic Search Engine\n(prototypes/semantic-search)\nTF-IDF & Cosine Similarity"]
    end

    subgraph StorageTier["Persistence & Infrastructure Tier"]
        MongoDB[("MongoDB Database\n(Replica Set / Atlas)\nUsers, Articles, Podcasts, Reports")]
        VultrStorage[("Vultr Object Storage\n(S3-Compatible)\nAudio Tracks, Article Covers, Medical Media")]
        FCM["Firebase Cloud Messaging (FCM)\nPush Notification Delivery"]
    end

    WebBrowser --> NginxGateway
    NginxGateway --> NextProxy
    NextProxy --> BackendAPI
    Mobile --> BackendAPI
    AdminDashboard --> BackendAPI

    BackendAPI --> MongoDB
    BackendAPI --> VultrStorage
    BackendAPI --> FCM
    BackendAPI <--> VeriWise
    BackendAPI -.-> SemanticSearch
```

---

## 2. Component Breakdown & Actual Implementations

### A. Web Application & Backend-For-Frontend (BFF)
- **Location**: `web/` (Branch: `web`)
- **Technology**: Next.js 16.2.6, React 19.2.4, TypeScript 5, Tailwind CSS v4.
- **Role**: Server-Side Rendered (SSR) web portal and API proxy.
- **Key Files**:
  - `web/src/proxy.ts`: Custom Next.js edge middleware. Enforces strict Content Security Policy (CSP) with dynamic per-request nonces, prevents open redirects, normalizes localized URL paths (`/web/en/...`), and attaches security headers (HSTS, COOP, CORP, Permissions-Policy).
  - `web/src/app/api/proxy-audio/route.ts`: Streaming audio reverse proxy with HTTP 206 Partial Content and Range headers to stream podcasts without CORS/CORP issues.
  - `web/src/app/api/proxy-image/route.ts`: Media proxy with fallback mechanisms.
  - `web/src/lib/auth/auth-service.ts`: Centralized web authentication bridge. Passes `x-client-type: web` to inform backend auth routing.
  - `web/Dockerfile`: Production multi-stage Docker build utilizing `node:22-alpine`, building Next.js in `standalone` output mode to reduce container image size.

### B. Core REST Backend API
- **Location**: Repository `SB2318/ultimatehealth-backend` (with reference implementations in `main:controllers/v2/usersController.js` and `main:bACKEND_SETUP.md`).
- **Technology**: Node.js, Express.js (v4.x), Mongoose ODM, MongoDB.
- **Role**: Authoritative data management, business logic, role-based access control, content workflow state machine.
- **Key Architectures**:
  - **Three-Token JWT Authentication**:
    - *Access Token* (15-minute lifespan): Short-lived bearer token for stateless API requests.
    - *Refresh Token* (7-day lifespan): Stored securely to rotate access tokens without forcing re-login.
    - *Verification Token* (1-hour lifespan): Cryptographically signed token for email activation and password resets.
  - **Password Security**: Salted Bcrypt hashing (`bcrypt.genSalt(10)`).
  - **OTP Security**: Time-based one-time password verification bound to user email before granting password mutation rights.

### C. Mobile Client
- **Location**: `frontend/` (Branch: `main`)
- **Technology**: React Native, Expo, Tamagui (Universal Design System), Redux Toolkit, Sentry error telemetry.
- **Role**: Cross-platform Android and iOS application for articles, podcast playback, and offline health wellness tracking.
- **Key Implementations**:
  - Offline sync slice (`frontend/src/store/offlineSlice.ts`).
  - Network state observation (`frontend/src/store/NetworkSlice.ts`).
  - Native release signing (`frontend/android/app/@uth-user-2025__UltimateHealth.jks`).

### D. Infrastructure & Web Server
- **Location**: `.nginx/`, root `docker-compose.yml`, root `Dockerfile`.
- **Technology**: Nginx, Docker, Linux (Alpine/Debian).
- **Configurations**:
  - `.nginx/manifest.conf`: Reverse proxy rules for PWA manifest caching (`Cache-Control: public, max-age=604800, immutable`), strict MIME-types (`application/manifest+json`), CORS headers for cross-origin PWA requests.
  - `docker-compose.yml`: Container orchestration exposing service port 5000 with environment propagation.

---

## 3. Critical Data Flows

### A. Authentication & Password Reset Flow
```mermaid
sequenceDiagram
    autonumber
    actor User as Client (Web/Mobile)
    participant Proxy as Next.js BFF / Route Handler
    participant Backend as Express Backend API
    participant DB as MongoDB

    User->>Proxy: POST /api/user/forgot-password { email }
    Proxy->>Backend: Forward request with x-client-type header
    Backend->>DB: Check User exists & generate 6-digit OTP
    Backend-->>User: OTP dispatched via Email (200 OK)
    
    User->>Proxy: POST /api/user/verify-otp-forgot-password { email, otp, newPassword }
    Proxy->>Backend: Forward validation request
    Backend->>Backend: verifyOtp(email, otp)
    alt OTP Invalid or Expired
        Backend-->>User: 400 Bad Request ("Invalid or expired OTP")
    else OTP Valid
        Backend->>Backend: bcrypt.genSalt(10) -> bcrypt.hash(newPassword)
        Backend->>DB: User.findOne({ email })
        Backend->>DB: user.password = hash; clear OTP fields; user.save()
        Backend-->>User: 200 OK ("Password reset successfully")
    end
```

### B. Audio Streaming Pipeline (Range Requests)
```mermaid
sequenceDiagram
    autonumber
    actor Browser as Web Audio Player
    participant Proxy as Next.js Audio Proxy (/api/proxy-audio)
    participant Storage as Vultr S3 Object Storage

    Browser->>Proxy: GET /api/proxy-audio?url=... (Range: bytes=0-1048575)
    Proxy->>Proxy: Validate hostname (whitelist: ultimatehealth.blog, uhsocial.in)
    Proxy->>Storage: GET /podcast.mp3 (Range: bytes=0-1048575)
    Storage-->>Proxy: 206 Partial Content (Content-Range: bytes 0-1048575/52428800)
    Proxy-->>Browser: 206 Partial Content (Streams raw byte chunks via ReadableStream)
```

---

## 4. Key Engineering Trade-offs & Current Technical Debt

1. **Proxy SSRF Surface in `/api/proxy-image`**:
   - *Current State*: `web/src/app/api/proxy-image/route.ts` takes an arbitrary `url` query parameter and executes a `fetch(url)` without hostname whitelist validation (unlike `proxy-audio`).
   - *Risk*: Server-Side Request Forgery (SSRF) allowing attackers to probe internal cloud metadata endpoints (e.g. `169.254.169.254`) or intranet services.
   - *Resolution*: Apply strict domain whitelisting and IP address validation.

2. **Decoupled Backend Repositories vs Monorepo**:
   - *Current State*: Mobile and Web frontend live in branches of `UltimateHealth`, while the Express backend lives in `ultimatehealth-backend`.
   - *Trade-off*: Simplifies individual project size and contributor access during open-source hackathons (GSSoC), but risks API contract drift between frontend clients and backend models.

3. **In-Memory vs Distributed Caching**:
   - *Current State*: HTTP headers and edge proxy headers manage caching. No shared Redis instance is currently connected in local development.
   - *Implication*: Rate limiting and session storage cannot easily be shared horizontally across multiple Node.js server instances without Redis.
