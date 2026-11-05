# Release Notes — UltimateHealth v3.3.0

> **Release Version:** `v3.3.0`
> **Release Date:** November 2026
> **Release Focus:** HIPAA Security & Privacy Compliance, AI Chatbot Reliability & Offline-First Chat

---

## 🌟 What's New in v3.3.0

### 1. 🛡️ HIPAA Compliance & Federal Patient Safeguards (45 CFR Parts 160 & 164)
- **Safe Harbor De-Identification Engine (§ 164.514):** Automated pattern-matching engine that scrubs all 18 Protected Health Information (PHI) identifiers — including patient names, SSNs, Medical Record Numbers (MRN), phone numbers, email addresses, precise dates of birth, and network IP addresses — before conversational prompts reach AI models (Gemini / Perplexity).
- **Technical Safeguards & Cryptography (§ 164.312):** Enforces in-transit TLS 1.3 cryptographic protocols and AES-256 database volume encryption for all wellness telemetry and patient interactions.
- **Clinical Non-Diagnostic Mandate:** Prominent disclaimers reinforcing that AI companions provide educational lifestyle guidance and are not substitutes for clinical diagnosis, with direct 911 emergency and 988 Suicide & Crisis Lifeline escalation banners.

### 2. 🤖 Mobile Chatbot HIPAA Tasks & Privacy Controls
- **HIPAA Header Shield Pill:** Instant visual indicator in the chat header providing one-tap access to full patient privacy rights and technical safeguard disclosures.
- **Export Chat Transcript (HIPAA Right of Access — 45 CFR § 164.524):** Patients can export their full conversational transcripts formatted with clinical notices, timestamps, and role-separated dialogues via native device sharing.
- **Clear Conversation (HIPAA Right to Amend & Clear — 45 CFR § 164.526):** One-tap action with confirmation dialog permanently purging conversational records from the server and resetting local message history.
- **Sub-Header Advisory Banner:** Persistent Safe Harbor notice reminding users that health queries are de-identified before processing and emergency medical situations require immediate 911 contact.

### 3. 🌿 Wellness Dashboard ePHI Privacy & Data Rights
- **ePHI Protected Status Indicator:** Pinned header badge and banner confirming active encryption for biometric and lifestyle metrics (steps, sleep, hydration, breathing, active minutes).
- **HIPAA Privacy & Data Rights Card:** Dedicated dashboard module empowering patients with complete ownership over their health telemetry:
  - **Export Complete Health Records (45 CFR § 164.524):** Machine-readable export of wellness logs, personalized AI plans, care team assignments, and clinical interactions.
  - **Accounting of Disclosures (45 CFR § 164.528):** Full audit history of access events, timestamps, actor IDs, and disclosure purposes.
  - **Review Patient Rights:** One-tap access to the comprehensive HIPAA modal detailing all administrative, physical, and technical safeguards.

### 4. 👥 Care Persona Lobby HIPAA Certification
- **Lobby Compliance Banner:** Pinned *"HIPAA Safe Harbor Protected • Patient Rights"* banner beneath the lobby header.
- **Persona Cards:** Every care persona now features an official `HIPAA` certification badge alongside the daily quota tracker to reinforce educational and clinical boundaries.

### 5. ⚙️ Settings & Legal Privacy Integration
- **Settings Hub Entry:** Dedicated row under **LEGAL & PRIVACY** for *"HIPAA Compliance & Health Privacy"* — direct access to patient rights, technical safeguards, and data export from anywhere in the app.
- **Privacy Policy Expansion:** Added **Section 10: HIPAA Compliance & Protected Health Information (ePHI)** formalizing federal compliance standards, Safe Harbor de-identification rules, and patient legal recourse.

### 6. 🧩 Reusable Compliance Components
- **`HipaaComplianceModal.tsx`:** Accessible bottom-sheet modal detailing Safe Harbor (§ 164.514), Technical Safeguards (§ 164.312), Federal Patient Rights (§ 164.524, § 164.526, § 164.528), and emergency medical disclaimers.
- **`HipaaBadge.tsx`:** Reusable shield badge with compact, standard, and pill variants for use across all screens.

---

## 💬 AI Chat Reliability & Offline-First Persistence

### 7. Offline-First Chat Message Persistence
- **Instant Chat Restore:** AI conversations now load immediately from local device storage (`AsyncStorage`) on every screen open — no more blank chat on network delays or offline scenarios.
- **Per-Character Message Cache:** Each AI persona's conversation is stored independently so switching between Dr. Fit, Nutritionist AI, and others retains each history separately.
- **Background Server Sync:** Server-fetched conversation history is merged and re-cached locally whenever a fresh network response arrives.
- **Persistent User Bubbles:** Sent messages are saved to local storage immediately — not just after the AI responds — so your side of the conversation is never lost.

### 8. Accurate Daily Quota Counting
- **Count on Receive, Not on Send:** The daily message usage counter (`5 messages/character/day`) now increments only when the AI successfully responds — failed requests no longer consume your daily quota.
- **Quota Exceeded Banner:** A friendly quota-exceeded card is appended to the chat and input is locked until midnight reset.

### 9. Clear Chat Now Fully Resets
- **Full Local + Server Wipe:** Tapping *"Delete Permanently"* now wipes both the server records (`DELETE /api/gemini/messages`) and the local `AsyncStorage` cache simultaneously. No more ghost messages reappearing on next open.

### 10. Chat History Stale-Cache & Auth Fix
- **Always-Fresh Query:** React Query no longer serves a stale empty-array response cached from a failed or unauthenticated fetch (`staleTime: 0`, `gcTime: 0`, `refetchOnMount: true`).
- **Authenticated Requests:** Chat history now loads using the authenticated `authAxios` client (Bearer token) with a plain `axios` fallback.
- **Wellness Plan Timeout Extended to 60s:** AI wellness plan generation no longer times out prematurely on slower connections.
- **Duplicate Request Guard:** Prevents double-sending if the user taps Send multiple times quickly.

---

## 🐛 Bug Fixes

| # | Area | Fix |
|---|------|-----|
| 1 | AI Chat | Messages disappearing on screen re-open / tab switch |
| 2 | AI Chat | Quota counter decrementing on message *send* instead of *receive* |
| 3 | AI Chat | Cleared chat reappearing from stale AsyncStorage on next open |
| 4 | AI Chat | Server history not loading due to missing Bearer auth token |
| 5 | AI Chat | React Query serving stale empty array after failed first fetch |
| 6 | AI Chat | Chat history 400 error due to wrong HTTP method (`POST` → `GET`) |
| 7 | Wellness | Plan generation timing out at 30s on slow networks |
| 8 | AI Chat | Duplicate messages sent on rapid Send taps |
| 9 | AI Chat | Snackbar quota message showing malformed text |

---

## 📱 Google Play Store Release Details

**Release Name:** `UltimateHealth v3.3.0 — HIPAA Compliance & AI Chat`

**Short Description (80 chars):**
> HIPAA-compliant health AI chat with offline support & patient privacy rights.

**Full What's New (500 chars):**
```
🛡️ HIPAA Compliance & AI Chat Update

• HIPAA Safe Harbor: your health data is de-identified before reaching AI
• Export your chat & health records anytime (45 CFR § 164.524)
• Clear conversation permanently from server & device (45 CFR § 164.526)
• AI chat now loads instantly — works offline too!
• Daily quota counts only on successful AI replies (not on send)
• Cleared chats no longer reappear after re-opening
• Wellness plan generation improved for slow connections
```

---

# Release Notes — UltimateHealth v3.2.1

> **Release Version:** `v3.2.1`
> **Release Date:** November 2026
> **Release Focus:** Web-Style Audio Player, Notification Modernization, AI Usage Guards & UI Stabilization

---

## 🌟 What's New & Polished in v3.2.1

### 1. 🎧 Web-Style Article Listen Progress Card
- **Modern Audio Experience:** Completely removed legacy Lottie talking robot overlay in favor of a sleek, web-style audio reader card directly inside article details.
- **Interactive Controls:** Integrated prominent Play/Pause toggle, speed selector pill (`0.5x` to `2.0x`), and quick stop/close button.
- **Accurate Timeline & Progress Track:** Real-time elapsed time (`mm:ss`), center percentage badge, and total estimated reading duration accompanied by smooth horizontal progress fill.
- **Synchronized Hero Cover Indicator:** Subtle audio progress track placed along the bottom edge of the article hero image.
- **Speech Audio Softening:** Enhanced text-to-speech preprocessing to filter jarring symbols, raw URLs, and all-caps shouting, combined with a warmer, soothing speech pitch (`0.92`).

### 2. 🔔 Notification Screen Modernization
- **Edge-to-Edge Custom Navigation Header:** Replaced the legacy stack header with a clean, branded in-screen header with accessible circular back button and dark/light mode alignment.
- **Dynamic Unread Count Badge:** Visual badge indicating the count of active notifications.
- **Notification Preferences Shortcut:** Direct header action to manage content cluster notification categories.
- **Typography & Card Polish:** Eliminated non-standard decorative fonts from notification items in favor of crisp system typography, dark theme support, and subtle unread status dots.

### 3. 📊 Activity Insights Selection Alignment
- **High-Contrast Filter Selection:** Updated Monthly and Yearly dropdown filters to render high-contrast white text and icons when selected over blue indicator backgrounds.

### 4. 🤖 AI Chatbot Daily Quota & Roll-Over Engine
- **Client-Side Daily Usage Tracking:** Restricts AI interactions to 5 messages per persona per day.
- **Automatic Day Rollover:** Automatically clears yesterday's conversation logs on initial app open each morning.
- **Proactive Warning Banners & Fallbacks:** Informative quota-exceeded alerts and offline fallbacks across ChatbotScreen and PersonaLobbyScreen.

### 5. 🛠️ Navigation & Dashboard Glitch Fixes
- **Tab Bar Active Square Fixed:** Removed awkward background box on active tab bar navigation icons.
- **Wellness Plan Refresh Cooldown:** Resolved runtime reference error on `lastPlanRefreshedTimestamp` with persistent cooldown tracking.

---

# Release Notes — UltimateHealth v3.2.0

> **Release Version:** `v3.2.0`
> **Target Platforms:** Android (VersionCode `21`), iOS, Web
> **Release Date:** November 2026
> **Lead Focus:** Personalized AI Wellness Engine & Seamless Authoring Flow

---

## 🌟 Spotlight: Personalized AI Wellness Plan

The cornerstone of **UltimateHealth v3.2.0** is the brand-new, end-to-end **AI Wellness Plan Engine**. Powered by cutting-edge biometric synthesis and clinical wellness algorithms, this system transforms fragmented health metrics into a cohesive, adaptive 7-day health blueprint.

### 1. Adaptive 7-Day Health Blueprints
- **On-Demand Generation:** Generate an adaptive plan tailored to recent biometric logs directly from the Wellness Dashboard.
- **Data-Driven Personalization:** Tailored targets adapt to physical activity, sleep cycles, and hydration history.

### 2. Six-Pillar Health Goals
Every generated plan establishes concrete, balanced daily targets across six core wellness pillars:
- 🚶 **Daily Steps** · ⏱️ **Active Minutes** · 🔥 **Calories Burned**
- 😴 **Sleep Duration** · 💧 **Hydration Intake** · 🧘 **Mindfulness & Breathing**

### 3. Actionable Daily Tasks & Focus Areas
- Break down broad health goals into digestible daily tasks.
- Highlight key focus areas (Cardiovascular Endurance, Deep Sleep Optimization, Hydration Consistency) with real-time progress indicators.

### 4. Diagnostic Insights & Precautionary Warnings
- **AI Health Insights:** Comprehensive summaries highlighting improvements, streaks, and metabolic trends.
- **Safety Flags:** Preventive clinical warnings alerting users to chronic sleep debt, inadequate fluid intake, or overexertion risks.

### 5. Interactive Mindful Breathing Tool
- Built-in, animated 4-4-4-4 box breathing guide integrated directly into the dashboard.
- Live haptic and visual cues to guide inhalation, retention, and exhalation.

### 6. Multi-Metric Manual Logging & Wearable Sync
- Fast, validated logging with Zod schema verification.
- Wearable integration card designed for easy health device connectivity.
- History view with paginated archives to track multi-week progress.

---

## ✍️ Reimagined Article Creation Flow (Editor First)

1. **Write First:** Tap "+ Write" or the home screen FAB to jump straight into the Rich Text Editor. Support for headings, lists, quick snippets (Clinical Note, Takeaway, 2x2 Tables), and raw HTML mode.
2. **Auto-Extracted Details Form:** Automatically detects headings and opening paragraphs to suggest titles and summaries.
3. **Review & Publish:** Attach cover images and up to 5 specialty tags before submitting for community review.

---

## 🌐 Full 13-Language Pan-India Localization

| Language | Native Name | Code | Language | Native Name | Code |
|:---|:---|:---:|:---|:---|:---:|
| **Assamese** | অসমীয়া | `as` | **Marathi** | मराठी | `mr` |
| **Bengali** | বাংলা | `bn` | **Odia** | ଓଡ଼ିଆ | `or` |
| **English** | English | `en` | **Punjabi** | ਪੰਜਾਬੀ | `pa` |
| **Gujarati** | ગુજરાતી | `gu` | **Tamil** | தமிழ் | `ta` |
| **Hindi** | हिन्दी | `hi` | **Telugu** | తెలుగు | `te` |
| **Kannada** | ಕನ್ನಡ | `kn` | **Urdu** | اردو | `ur` |
| **Malayalam** | മലയാളം | `ml` | | | |

---

## 🛠️ Performance, Build & Infrastructure Enhancements

- **EAS Build & Yarn Classic Alignment:** Aligned package management to Yarn Classic (`1.22.22`), removed legacy Berry configuration conflicts.
- **Enhanced Test Suite Stability:** 100% test pass rate across 155 test suites.
- **Smooth Guest Mode & Auth Flow:** Redesigned `SignInScreen` with animated role selection and improved Google Sign-In handling.

---

# 👥 Contributors Overview

UltimateHealth is built by an active community of software engineers, healthcare advocates, UI/UX designers, and open-source contributors.

### Core Maintainers & Leadership
- **S. B. | Software Developer (`@SB2318`)** — Project Lead, Architecture, Core Systems & Mobile Release Lead
- **Susmita N. M. Bhattacharya** — Core Mobile Architecture, Navigation, State Management & Feature Delivery

### Community Contributors by Domain

#### 🌿 Wellness Engine, AI & Biometrics
`@anushkasrvstv` • `@pisum-sativum` • `@Naman-Singh` • `@Sree-Vidya` • `@Harshit-Maurya838` • `@Saurabh-Kumar-Bajpai` • `@Krishna-Kumar` • `@Yuvraj-Sarathe`

#### ✍️ Content Authoring & Editor Workflow
`@Tomeshwari-02` • `@Suhani-Singh-Paliwal` • `@Arunima-Dutta` • `@Ankita-Sahu` • `@Kadali-Swarna` • `@Revanth` • `@Sujal-Mahapatra` • `@Sumit-Kumar`

#### 🌐 Localization, Accessibility & UI Design
`@Aditi` • `@Anijesh` • `@aeriellaaa` • `@Anshul-Jain` • `@Deepesh-Kafaltiya` • `@Maheshwari-Love` • `@Namraa-Patel` • `@Omkar-Salunkhe` • `@Thilak-Raj-P` • `@prakash-meena` • `@vedant7007`

#### 🧪 Quality Assurance, Security & Bug Fixes
`@Hasini2706` • `@Karan-Singh` • `@Suyash2527` • `@rashmii` • `@Jana` • `@Krishna-Veernala` • `@N-Sri-Venkatesh` • `@SarthakKharche` • `@dinesh9997` • `@dokkuprashanth7` • `@dependabot[bot]`

---

```
   Over 100+ Total Contributors  │  500+ Commits Merged  │  13 Languages Supported
```

Whether you submitted a feature pull request, resolved an issue, translated phrases, or tested pre-release builds — **thank you for shaping the future of digital healthcare with UltimateHealth!**

---

### Contributing to UltimateHealth
Interested in joining the community? Check out our [Contribution Guidelines](CONTRIBUTING.md) or submit an issue on [GitHub](https://github.com/SB2318/UltimateHealth).
