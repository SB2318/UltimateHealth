# UltimateHealth — Complete Full-Stack & Backend Study Plan
## (Mapped Across Web, Backend & Mobile Codebases)

> **The 3-Phase Mastery Methodology**:  
> $$\mathbf{1.\ Fundamental\ Depth} \quad \longrightarrow \quad \mathbf{2.\ Code\ Comprehension} \quad \longrightarrow \quad \mathbf{3.\ Scaling\ \&\ System\ Design}$$

---

## Master Architecture Map of Associated Codebase Files

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   ULTIMATEHEALTH PLATFORM                              │
├─────────────────────────┬──────────────────────────────┬───────────────────────────────┤
│    WEB TIER (web/)      │    BACKEND TIER (Core API)   │    MOBILE TIER (frontend/)    │
│                         │                              │                               │
│ • Next.js 16 App Router │ • Express.js v4 REST Engine  │ • React Native & Expo 51+     │
│ • Server Components     │ • Mongoose & MongoDB Models  │ • Redux Toolkit Slices        │
│ • Edge Proxy (proxy.ts) │ • JWT 3-Token Auth Pipeline  │ • Offline Persistence Layer   │
│ • Byte-Range Streaming  │ • Bcrypt & OTP Controllers   │ • Network Connectivity Hooks  │
│ • Standalone Docker     │ • VeriWise Microservice      │ • Zod Schema Validation       │
└─────────────────────────┴──────────────────────────────┴───────────────────────────────┘
```

---

## Detailed Curriculum by Module

---

### MODULE 1: JavaScript Runtime, Memory Mechanics & Garbage Collection

#### 1. Fundamental Depth
- The Physical Execution Model: CPU registers, virtual memory pages, and L1/L2 caches.
- Single-threaded execution: The V8 Call Stack (LIFO stack frames, Stack Pointer `RSP`, Smis).
- Dynamic allocation: The V8 Heap (New Space / Nursery, Old Pointer Space, Old Data Space, Large Object Space).
- Garbage Collection mechanics:
  - *Minor GC (Scavenger)*: Cheney's copying algorithm between From-Space and To-Space.
  - *Major GC*: Mark-Sweep-Compact with concurrent Tri-Color marking (White, Grey, Black).
- Closures under the hood: Lexical scoping, `[[Scopes]]` internal pointers, and accidental memory leaks.

#### 2. Code Comprehension (Exact Associated Files)
- **Web**:
  - [`web/src/lib/auth/auth-storage.ts`](file:///c:/UltimateHealth/web/src/lib/auth/auth-storage.ts): In-memory vs. browser storage token management and closure state.
  - [`web/src/lib/auth/auth-service.ts`](file:///c:/UltimateHealth/web/src/lib/auth/auth-service.ts): Tracing memory allocation during `getStoredToken()` and request instantiation.
- **Backend**:
  - [`controllers/v2/usersController.js`](file:///c:/UltimateHealth/controllers/v2/usersController.js): How local variables (`salt`, `user`, `isOtpValid`) are pushed to the stack and how Mongoose documents reside in V8 Old Space.
- **Mobile**:
  - `frontend/src/store/UserSlice.ts`: Redux immutable state updates and avoiding heap retain cycles.
  - `frontend/src/hooks/common/useScrollControls.ts`: Cleaning up event listener closures to prevent React Native memory leaks.

#### 3. Scaling & System Design
- Diagnosing production memory leaks using Chrome DevTools heap snapshots and Node.js `--inspect`.
- Why `NODE_OPTIONS="--max-old-space-size=2048"` exists in `web/Dockerfile` and what causes Out-Of-Memory (`OOMKilled` Exit 137).

---

### MODULE 2: Node.js Architecture, Event Loop & Libuv Concurrency

#### 1. Fundamental Depth
- Why Node.js is non-blocking: Kernel asynchronous primitives (`epoll` on Linux, `kqueue` on macOS, `IOCP` on Windows).
- The Event Loop: Deep dive into all 6 phases:
  1. *Timers* (`setTimeout`, `setInterval`)
  2. *Pending Callbacks* (System-level I/O errors)
  3. *Idle / Prepare* (Libuv internal housekeeping)
  4. *Poll* (Polling for new I/O events, sockets)
  5. *Check* (`setImmediate`)
  6. *Close Callbacks* (`socket.on('close')`)
- Microtasks vs. Macrotasks priority: `process.nextTick` > `Promise.then` > Macrotasks.
- The Libuv Worker Thread Pool: Default 4 threads, tasks offloaded to threads (`fs`, `crypto`, `zlib`, `dns.lookup`).

#### 2. Code Comprehension (Exact Associated Files)
- **Web**:
  - [`web/src/lib/safe-fetch.ts`](file:///c:/UltimateHealth/web/src/lib/safe-fetch.ts): Non-blocking fetch wrappers with AbortController timeouts.
  - [`web/src/app/landing-performance.test.mjs`](file:///c:/UltimateHealth/web/src/app/landing-performance.test.mjs): Testing asynchronous event loop delays during component rendering.
- **Backend**:
  - [`controllers/v2/usersController.js`](file:///c:/UltimateHealth/controllers/v2/usersController.js): How `bcrypt.genSalt(10)` and `bcrypt.hash()` execute on the libuv thread pool.
- **Mobile**:
  - `frontend/src/store/NetworkSlice.ts`: Event-driven network status observation.
  - `frontend/src/hooks/auth/useUserLogin.ts`: React Native async dispatch queue.

#### 3. Scaling & System Design
- **Thread Pool Starvation**: What happens when 10 users hit `bcrypt.hash` concurrently? How to tune `UV_THREADPOOL_SIZE`.
- Handling event loop blocking: Offloading CPU-heavy tasks to Worker Threads or external microservices.

---

### MODULE 3: Next.js 16 & Modern Full-Stack Web Architecture (SSR, RSC, BFF)

#### 1. Fundamental Depth
- Rendering Paradigms: CSR vs. SSR vs. SSG vs. Incremental Static Regeneration (ISR).
- React Server Components (RSC) vs. Client Components (`'use client'`): Zero-bundle-size server execution.
- Streaming SSR with Suspense: Transferring HTML in chunks via HTTP chunked transfer encoding.
- The Backend-For-Frontend (BFF) Pattern: Why the frontend communicates through Next.js route handlers rather than exposing direct backend database calls.

#### 2. Code Comprehension (Exact Associated Files)
- **Web**:
  - [`web/src/proxy.ts`](file:///c:/UltimateHealth/web/src/proxy.ts): Edge middleware running before routes; dynamic cryptographic CSP nonce generation, URL segment sanitization, and 308 redirects.
  - [`web/src/app/api/contact/route.ts`](file:///c:/UltimateHealth/web/src/app/api/contact/route.ts): BFF Route Handler; input trimming, email regex sanitization, and forwarding to Express backend.
  - [`web/src/app/api/proxy-audio/route.ts`](file:///c:/UltimateHealth/web/src/app/api/proxy-audio/route.ts): Streaming reverse proxy with HTTP 206 Partial Content and Range headers.
  - [`web/src/app/[locale]/layout.tsx`](file:///c:/UltimateHealth/web/src/app/[locale]/): Server layout with `next-intl` internationalization.
- **Backend**:
  - [`bACKEND_SETUP.md`](file:///c:/UltimateHealth/bACKEND_SETUP.md): Backend API contract mapping to Next.js BFF endpoints.
- **Mobile**:
  - `frontend/src/screens/web/WebDemoShell.tsx`: Embedding web experiences inside the mobile app.

#### 3. Scaling & System Design
- Designing an Edge caching layer with Nginx reverse proxy (`.nginx/manifest.conf`).
- Next.js production build optimization: Standalone output mode in multi-stage Docker builds.

---

### MODULE 4: ORM & ODM Mechanics: Mongoose & Prisma Internals

#### 1. Fundamental Depth
- The Object-Document / Object-Relational Impedance Mismatch: Why ORMs exist.
- Mongoose Architecture:
  - Schema compilation into Model constructors.
  - Document Hydration: Internal change tracking (`isModified`), getters, setters, virtuals, and validation overhead.
  - Why `Model.find().lean()` is **3x–5x faster** on read-heavy workloads (bypasses hydration).
- Prisma Architecture:
  - Rust-based Query Engine.
  - Pragmatic type-safety, connection pooling, and automated schema migrations.
- The N+1 Query Problem: Why nested database calls in loops destroy database performance and how to batch queries.

#### 2. Code Comprehension (Exact Associated Files)
- **Backend**:
  - [`controllers/v2/usersController.js`](file:///c:/UltimateHealth/controllers/v2/usersController.js):
    - `User.findOne({ email })`: Document retrieval and hydration.
    - `user.save()`: Mongoose change-tracking and transactional save.
  - [`docs/proposals/trending-articles-proposal.md`](file:///c:/UltimateHealth/docs/proposals/trending-articles-proposal.md): Auditing article aggregation queries for memory efficiency.
- **Web**:
  - [`web/src/lib/article-data.ts`](file:///c:/UltimateHealth/web/src/lib/article-data.ts): Data transformation and contract mapping between API payloads and UI types.
- **Mobile**:
  - `frontend/src/schemas/zod/profileSchemas.ts`: Client-side schema validation mirroring Mongoose backend models.
  - `frontend/src/schemas/zod/wellnessSchemas.ts`: Data structure typing.

#### 3. Scaling & System Design
- Mongoose Connection Pool management: Tuning `maxPoolSize`, `minPoolSize`, and socket timeouts.
- Implementing database transactions (`session.withTransaction`) across multi-document updates.

---

### MODULE 5: Database Theory: MongoDB, B-Trees & Transactional Safety

#### 1. Fundamental Depth
- SQL vs. NoSQL: Normalization vs. Denormalization trade-offs.
- Physical storage: BSON wire format (length-prefixed fields, binary types) vs. plain JSON.
- WiredTiger Storage Engine: B-Tree data structures, leaf nodes, and $O(\log N)$ search complexity.
- Indexing Strategy:
  - Single-field vs. Compound indexes.
  - **The ESR Rule** (Equality, Sort, Range) for compound index ordering.
  - Index coverage (`PROJ_COVER`) vs. Collection Scan (`COLLSCAN`).
- ACID in MongoDB: WiredTiger write-ahead log (journaling), replica set consensus, and read/write concerns (`w: "majority"`, `j: true`).

#### 2. Code Comprehension (Exact Associated Files)
- **Backend**:
  - [`controllers/v2/usersController.js`](file:///c:/UltimateHealth/controllers/v2/usersController.js): Analyzing index lookups on `{ email: 1 }` during password resets.
  - [`docs/ARCHITECTURE.md`](file:///c:/UltimateHealth/docs/ARCHITECTURE.md): Database collections (`User`, `Article`, `Podcast`, `Report`).
  - [`prototypes/semantic-search/semantic_search.py`](file:///c:/UltimateHealth/prototypes/semantic-search/semantic_search.py): Vector search vs. traditional B-Tree text indexes.
- **Web**:
  - [`web/src/app/sitemap.ts`](file:///c:/UltimateHealth/web/src/app/sitemap.ts): High-volume indexed database reads during sitemap generation.
- **Mobile**:
  - `frontend/src/store/offlineSlice.ts`: Client-side SQLite/AsyncStorage persistence mimicking document collections.

#### 3. Scaling & System Design
- Diagnosing slow queries: Reading `explain('executionStats')` reports (`totalDocsExamined` vs. `nReturned`).
- Replica Sets & High Availability: Primary election (Raft-like consensus), secondary reads, and oplog replication.

---

### MODULE 6: Express.js Request Lifecycle & API Engineering

#### 1. Fundamental Depth
- The HTTP Request Pipeline: Socket read $\rightarrow$ Header parsing $\rightarrow$ Body stream buffering $\rightarrow$ Middleware chain.
- Middleware architecture: How Express calls `next()` sequentially; function composition and early termination.
- Error Handling: Why Express requires a **4-argument error middleware** (`(err, req, res, next)`) and unhandled promise rejection crashes.
- Authentication Architecture:
  - Stateless Bearer Tokens (JWT).
  - The **Three-Token System** (Access Token 15m, Refresh Token 7d, Verification Token 1h).

#### 2. Code Comprehension (Exact Associated Files)
- **Backend**:
  - [`controllers/v2/usersController.js`](file:///c:/UltimateHealth/controllers/v2/usersController.js): Input validation, status codes (400, 404, 200, 500), and controller-service separation.
  - [`docs/proposals/Simplified-Auth-flow.md`](file:///c:/UltimateHealth/docs/proposals/Simplified-Auth-flow.md): Refresh token rotation, cookie sessions vs. bearer headers.
  - [`docs/WELLNESS_API_ALIGNMENT.md`](file:///c:/UltimateHealth/docs/WELLNESS_API_ALIGNMENT.md): RESTful schema conventions, response envelope formatting.
- **Web**:
  - [`web/src/lib/auth/auth-helpers.js`](file:///c:/UltimateHealth/web/src/lib/auth/auth-helpers.js): Parsing backend envelopes, unwrapping token aliases, status code evaluation.
- **Mobile**:
  - `frontend/src/hooks/auth/useUserLogin.ts`: Axios interceptors attaching JWT headers and handling 401 token refresh.

#### 3. Scaling & System Design
- Idempotency in API design: Ensuring repeated requests do not duplicate records.
- Rate-limiting algorithms: Token Bucket vs. Sliding Window counter.

---

### MODULE 7: Computer Networking, Edge Proxies & Web Security

#### 1. Fundamental Depth
- Transport Layer: The TCP 3-way handshake (SYN, SYN-ACK, ACK), connection termination (FIN/RST), and keep-alive sockets.
- Application Layer: HTTP/1.1 pipelining vs. HTTP/2 binary framing and multiplexing.
- Web Security Defense:
  - Content Security Policy (CSP): Strict nonces, preventing Cross-Site Scripting (XSS).
  - Cross-Origin Resource Sharing (CORS): Preflight `OPTIONS` requests, `Access-Control-Allow-Origin`.
  - Server-Side Request Forgery (SSRF): How open image/audio proxies are exploited to steal cloud metadata.

#### 2. Code Comprehension (Exact Associated Files)
- **Web**:
  - [`web/src/proxy.ts`](file:///c:/UltimateHealth/web/src/proxy.ts): Comprehensive security header engine (CSP, HSTS 2-year preload, X-Frame-Options DENY, COOP, CORP).
  - [`web/src/app/api/proxy-audio/route.ts`](file:///c:/UltimateHealth/web/src/app/api/proxy-audio/route.ts): Domain whitelisting against SSRF and HTTP 206 audio streaming.
  - [`web/src/app/api/proxy-image/route.ts`](file:///c:/UltimateHealth/web/src/app/api/proxy-image/route.ts): Identifying missing hostname validation (SSRF attack vector).
  - [`.nginx/manifest.conf`](file:///c:/UltimateHealth/.nginx/manifest.conf): Nginx reverse proxy configuration, PWA manifest caching headers, and CORS rules.
- **Backend**:
  - [`docs/ARCHITECTURE.md`](file:///c:/UltimateHealth/docs/ARCHITECTURE.md): Vultr Object Storage (S3-compatible) media delivery.
- **Mobile**:
  - `frontend/src/screens/podcast/PodcastPlayer.tsx`: Audio stream buffering across mobile networks.

#### 3. Scaling & System Design
- Audio and Video streaming architecture: Byte-range chunking (`Range: bytes=0-1048575`) to stream 50MB podcasts without loading them into server RAM.

---

### MODULE 8: Concurrency Bugs, System Scaling & Production Resilience

#### 1. Fundamental Depth
- Race Conditions: The Read-Modify-Write problem in concurrent distributed systems.
- Distributed Caching: In-memory LRU vs. Distributed Redis (Cache-aside, Write-through, Cache Stampede, TTL expiration).
- Operating System & Container Resilience:
  - Linux process signals (`SIGTERM`, `SIGKILL`).
  - Kernel Out-Of-Memory Killer (OOM Exit 137).
  - Graceful shutdown: Draining in-flight HTTP connections before closing database pools.

#### 2. Code Comprehension (Exact Associated Files)
- **Web**:
  - [`web/Dockerfile`](file:///c:/UltimateHealth/web/Dockerfile): Multi-stage containerization, `node:22-alpine`, non-root runners, and standalone Next.js deployment.
  - [`docker-compose.yml`](file:///c:/UltimateHealth/docker-compose.yml): Service networking and port binding.
- **Backend**:
  - [`controllers/v2/usersController.js`](file:///c:/UltimateHealth/controllers/v2/usersController.js):
    - *The OTP Race Condition*: Fixing concurrent password resets.
    - *The View Counter Bug*: Converting `article.views += 1` to atomic `$inc`.
- **Mobile**:
  - `frontend/src/store/offlineSlice.ts`: Conflict resolution when syncing offline mobile edits back to the backend.

#### 3. Scaling & System Design
- System Design Interview Blueprint: Designing UltimateHealth to handle 100,000 daily active users, 5,000 concurrent readers, and seamless audio streaming with 99.99% availability.
