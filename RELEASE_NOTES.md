# Release Notes — UltimateHealth v3.3.0

> **Release Version:** `v3.3.0`  
> **Release Date:** November 2026  
> **Release Focus:** HIPAA Security & Privacy Compliance, Mobile ePHI Safeguards, Safe Harbor AI Chatbot Controls & Health Data Export  

---

## 🌟 What's New in v3.3.0

### 1. 🛡️ HIPAA Compliance & Federal Patient Safeguards (45 CFR Parts 160 & 164)
- **Safe Harbor De-Identification Engine (§ 164.514):** Automated pattern-matching engine that scrubs all 18 Protected Health Information (PHI) identifiers—including patient names, SSNs, Medical Record Numbers (MRN), phone numbers, email addresses, precise dates of birth, and network IP addresses—before conversational prompts reach AI models (Gemini / Perplexity).
- **Technical Safeguards & Cryptography (§ 164.312):** Enforces in-transit TLS 1.3 cryptographic protocols and AES-256 database volume encryption for all wellness telemetry and patient interactions.
- **Clinical Non-Diagnostic Mandate:** Prominent disclaimers reinforcing that AI companions provide educational lifestyle guidance and are not substitutes for clinical diagnosis, with direct 911 emergency and 988 Suicide & Crisis Lifeline escalation banners.

### 2. 🤖 Mobile Chatbot HIPAA Tasks & Privacy Controls (`ChatbotScreen.tsx`)
- **HIPAA Header Shield Pill:** Instant visual indicator in the chat header providing one-tap access to full patient privacy rights and technical safeguard disclosures.
- **Export Chat Transcript (HIPAA Right of Access - 45 CFR § 164.524):** Patients can export their full conversational transcripts formatted with clinical notices, timestamps, and role-separated dialogues via native device sharing (`Share.share`).
- **Clear Conversation (HIPAA Right to Amend & Clear - 45 CFR § 164.526):** One-tap action with confirmation dialog calling `DELETE /api/gemini/messages?character=...` to permanently purge conversational records on the server and reset local message history.
- **Sub-Header Advisory Banner:** Persistent Safe Harbor notice reminding users that health queries are de-identified before processing and emergency medical situations require immediate 911 contact.

### 3. 🌿 Wellness Dashboard ePHI Privacy & Data Rights (`WellnessDashboardScreen.tsx`)
- **ePHI Protected Status Indicator:** Pinned header badge and banner confirming active encryption for biometric and lifestyle metrics (steps, sleep, hydration, breathing, active minutes).
- **HIPAA Privacy & Data Rights Card:** Dedicated dashboard module empowering patients with complete ownership over their health telemetry:
  - **Export Complete Health Records (45 CFR § 164.524):** Fetches verified health records from `/api/wellness/export` (wellness logs, personalized AI plans, care team assignments, clinical interactions) and shares or copies the machine-readable summary.
  - **Accounting of Disclosures (45 CFR § 164.528):** Fetches audit history from `/api/care-team/audit-disclosures` to inspect access events, timestamps, actor IDs, and disclosure purposes.
  - **Review Patient Rights:** Opens the comprehensive HIPAA modal detailing administrative, physical, and technical safeguards.

### 4. 👥 Care Persona Lobby HIPAA Certification (`PersonaLobbyScreen.tsx`)
- **Lobby Compliance Banner:** Pinned *"HIPAA Safe Harbor Protected • Patient Rights"* banner beneath the header.
- **Persona Cards:** Every care persona now features an official `HIPAA` certification badge alongside the daily quota tracker to reinforce educational and clinical boundaries.

### 5. ⚙️ Settings & Legal Privacy Integration (`SettingsScreen.tsx` & `PrivacyPolicy.tsx`)
- **Settings Hub Entry:** Added a dedicated row under **LEGAL & PRIVACY** for *"HIPAA Compliance & Health Privacy"*, giving users direct access to their patient rights, technical safeguards, and data export from anywhere in the app.
- **Privacy Policy Expansion:** Added **Section 10: HIPAA Compliance & Protected Health Information (ePHI)** formalizing federal compliance standards, Safe Harbor de-identification rules, and patient legal recourse.

### 6. 🧩 Reusable Compliance Components & Full Test Coverage
- **`HipaaComplianceModal.tsx`:** Accessible bottom-sheet modal detailing Safe Harbor (§ 164.514), Technical Safeguards (§ 164.312), Federal Patient Rights (§ 164.524, § 164.526, § 164.528), and emergency medical disclaimers.
- **`HipaaBadge.tsx`:** Reusable shield badge with compact, standard, and pill variants.
- **100% Test Pass Rate:** Verified with comprehensive unit test suites covering `HipaaComponents.test.tsx`, `ChatbotScreen.test.tsx`, `WellnessDashboardScreen.test.tsx`, and `SettingsScreen.test.tsx` (24/24 tests passing).

---

# Release Notes — UltimateHealth v3.2.1

> **Release Version:** `v3.2.1`  
> **Release Date:** November 2026  
> **Release Focus:** Web-Style Audio Player, Notification Modernization, AI Usage Guards & UI Stabilization  

---

## 🌟 What's New & Polished in v3.2.1

### 1. 🎧 Web-Style Article Listen Progress Card
- **Modern Audio Experience:** Completely removed legacy Lottie talking robot overlay in favor of a sleek, web-style audio reader card directly inside article details (`ArticleScreen.tsx`).
- **Interactive Controls:** Integrated prominent Play/Pause toggle, speed selector pill (`0.5x` to `2.0x`), and quick stop/close button.
- **Accurate Timeline & Progress Track:** Real-time elapsed time (`mm:ss`), center percentage badge, and total estimated reading duration accompanied by smooth horizontal progress fill.
- **Synchronized Hero Cover Indicator:** Subtle audio progress track placed along the bottom edge of the article hero image.
- **Speech Audio Softening:** Enhanced text-to-speech preprocessing to filter jarring symbols, raw URLs, and all-caps shouting, combined with a warmer, soothing speech pitch (`0.92`).

### 2. 🔔 Notification Screen Modernization
- **Edge-to-Edge Custom Navigation Header:** Replaced the legacy React Navigation stack header with a clean, branded in-screen header with accessible circular back button and dark/light mode alignment.
- **Dynamic Unread Count Badge:** Visual badge indicating the count of active notifications.
- **Notification Preferences Shortcut:** Direct header action to manage content cluster notification categories (`NotificationPreferencesScreen.tsx`).
- **Typography & Card Polish:** Eliminated non-standard decorative fonts (`Lobster-Regular`, `monospace`) from notification items in favor of crisp system typography, dark theme support, and subtle unread status dots.

### 3. 📊 Activity Insights Selection Alignment
- **High-Contrast Filter Selection:** Updated Monthly and Yearly dropdown filters in `ActivityOverview.tsx` to render high-contrast white text (`#FFFFFF`) and icons when selected over blue indicator backgrounds.
- **Clean List Options:** Ensured clear item styling inside dropdown selection menus.

### 4. 🤖 AI Chatbot Daily Quota & Roll-Over Engine
- **Client-Side Daily Usage Tracking:** Restricts AI interactions to 5 messages per persona per day (`aiUsageStorage.ts`).
- **Automatic Day Rollover:** Automatically clears yesterday's conversation logs on initial app open each morning.
- **Proactive Warning Banners & Fallbacks:** Informative quota-exceeded alerts and offline fallbacks across `ChatbotScreen.tsx` and `PersonaLobbyScreen.tsx`.

### 5. 🛠️ Navigation & Dashboard Glitch Fixes
- **Tab Bar Active Square Fixed:** Removed awkward background box on active tab bar navigation icons for fluid tab switching.
- **Wellness Plan Refresh Cooldown:** Resolved runtime reference error on `lastPlanRefreshedTimestamp` in `WellnessDashboardScreen.tsx` with persistent cooldown tracking.

---

# Release Notes — UltimateHealth v3.2.0

> **Release Version:** `v3.2.0`  
> **Target Platforms:** Android (VersionCode `21`), iOS, Web  
> **Release Date:** November 2026  
> **Lead Focus:** Personalized AI Wellness Engine & Seamless Authoring Flow  

---

## 🌟 Spotlight: Personalized AI Wellness Plan

The cornerstone of **UltimateHealth v3.2.0** is the brand-new, end-to-end **AI Wellness Plan Engine**. Powered by cutting-edge biometric synthesis and clinical wellness algorithms, this system transforms fragmented health metrics into a cohesive, adaptive 7-day health blueprint.

```
                      ┌────────────────────────────────────────┐
                      │     7-Day AI Wellness Engine           │
                      │  (Personalized Biometric Analysis)     │
                      └──────────────────┬─────────────────────┘
                                         │
        ┌───────────────────┬────────────┴─────────────┬────────────────────┐
        ▼                   ▼                          ▼                    ▼
  Targeted Goals      Actionable Tasks           AI Insights         Mindful Breathing
• Steps & Active Min • Daily habit milestones   • Recovery diagnosis • 4-4-4-4 Box tool
• Sleep & Calories   • Water intake cues        • Sleep & risk alerts• Stress reduction
• Hydration & Breath • Gentle wind-downs        • Weekly streaks     • In-app feedback
```

### 1. Adaptive 7-Day Health Blueprints
- **On-Demand Generation:** Generate an adaptive plan tailored to recent biometric logs directly from the Wellness Dashboard (`WellnessDashboardScreen.tsx`).
- **Data-Driven Personalization:** Tailored targets adapt to physical activity, sleep cycles, and hydration history.

### 2. Six-Pillar Health Goals
Every generated plan establishes concrete, balanced daily targets across six core wellness pillars:
- 🚶 **Daily Steps:** Progressive daily step goals preventing sedentary strain.
- ⏱️ **Active Minutes:** Sustained moderate-to-vigorous physical activity goals.
- 🔥 **Calories Burned:** Metabolic expenditure tracking calibrated to user targets.
- 😴 **Sleep Duration:** Recommended restorative sleep hours.
- 💧 **Hydration Intake:** Target water consumption in milliliters (`waterMl`).
- 🧘 **Mindfulness & Breathing:** Daily breathing session minutes for stress relief.

### 3. Actionable Daily Tasks & Focus Areas
- Break down broad health goals into digestible daily tasks (e.g., *“Drink 500ml of water upon waking”*, *“30-minute evening screen disconnect”*).
- Highlight key focus areas (Cardiovascular Endurance, Deep Sleep Optimization, Hydration Consistency) with real-time progress indicators.

### 4. Diagnostic Insights & Precautionary Warnings
- **AI Health Insights:** Comprehensive summaries highlighting improvements, streaks, and metabolic trends.
- **Safety Flags:** Preventive clinical warnings alerting users to chronic sleep debt, inadequate fluid intake, or overexertion risks.

### 5. Interactive Mindful Breathing Tool
- Built-in, animated 4-4-4-4 box breathing guide (`BreathingTool.tsx`) integrated directly into the dashboard.
- Live haptic and visual cues to guide inhalation, retention, and exhalation.
- Completed minutes sync directly into daily wellness totals.

### 6. Multi-Metric Manual Logging & Wearable Sync
- Fast, validated logging with Zod schema verification (`wellnessLogPayloadSchema`).
- Wearable integration card (`WearableSyncCard.tsx`) designed for easy health device connectivity.
- History view with paginated archives (`GET_WELLNESS_PLAN_HISTORY_API`) to track multi-week progress.

---

## ✍️ Reimagined Article Creation Flow (Editor First)

Authors and medical contributors can now capture thoughts instantly without upfront form barriers:

1. **Write First (`EditorScreen`):**
   - Tap "+ Write" or the home screen floating action button to jump straight into the Rich Text Editor.
   - Support for headings, lists, quick snippets (Clinical Note, Takeaway, 2x2 Tables), and raw HTML mode.
2. **Auto-Extracted Details Form (`ArticleDescriptionScreen`):**
   - Tapping **"Next: Article Details"** automatically detects headings (`<h1>`/`<h2>`) and opening paragraphs to suggest titles and summaries.
   - Shows an **"Article Body Ready"** banner with word count and a one-tap **"Edit Body"** return shortcut.
3. **Review & Publish (`PreviewScreen`):**
   - Attach cover images and up to 5 specialty tags before submitting for community review.

---

## 🌐 Full 13-Language Pan-India Localization

UltimateHealth now delivers localized UI coverage across all 13 official Indian languages supported by the platform:

| Language | Native Name | Code | Language | Native Name | Code |
|:---|:---|:---:|:---|:---|:---:|
| **Assamese** | অসমীয়া | `as` | **Marathi** | मराठी | `mr` |
| **Bengali** | বাংলা | `bn` | **Odia** | ଓଡ଼ିଆ | `or` |
| **English** | English | `en` | **Punjabi** | ਪੰਜਾਬੀ | `pa` |
| **Gujarati** | ગુજરાતી | `gu` | **Tamil** | தமிழ் | `ta` |
| **Hindi** | हिन्दी | `hi` | **Telugu** | తెలుగు | `te` |
| **Kannada** | ಕನ್ನಡ | `kn` | **Urdu** | اردو | `ur` |
| **Malayalam** | മലയാളം | `ml` | | | |

* **Full Localization Coverage:** Settings, Tab Bar, Onboarding Modals, Guest Placeholders, and Article Discovery now reflect native regional languages.

---

## 🛠️ Performance, Build & Infrastructure Enhancements

- **EAS Build & Yarn Classic Alignment:** Aligned package management to native Yarn Classic (`1.22.22`), removed legacy Berry configuration conflicts, and eliminated platform-dependent lockfile paths for clean cloud CI/CD builds.
- **Enhanced Test Suite Stability:** Resolved skeleton card accessibility assertions in `HomeScreen.test.tsx` and refreshed route expectations in `DeepLinkService.test.ts` (100% test pass rate across 155 test suites).
- **Smooth Guest Mode & Auth Flow:** Redesigned `SignInScreen` with animated role selection, improved Google Sign-In handling, and unobtrusive permission prompts when accessing restricted author actions.

---

# 👥 Contributors Overview

UltimateHealth is built by an active community of software engineers, healthcare advocates, UI/UX designers, and open-source contributors. We extend our sincere gratitude to everyone who helped bring **v3.2.0** to life!

### Core Maintainers & Leadership
- **S. B. | Software Developer (`@SB2318`)** — Project Lead, Architecture, Core Systems & Mobile Release Lead
- **Susmita N. M. Bhattacharya** — Core Mobile Architecture, Navigation, State Management & Feature Delivery

---

### Community Contributors by Domain

#### 🌿 Wellness Engine, AI & Biometrics
*Contributors who shaped our Wellness Dashboard, AI Plan algorithms, breathing tools, and wearable integrations:*
- `@anushkasrvstv` • `@pisum-sativum` • `@Naman-Singh` • `@Sree-Vidya` • `@Harshit-Maurya838` • `@Saurabh-Kumar-Bajpai` • `@Krishna-Kumar` • `@Yuvraj-Sarathe`

#### ✍️ Content Authoring & Editor Workflow
*Contributors who designed, built, and refined our rich-text editor, preview flows, and media handling:*
- `@Tomeshwari-02` • `@Suhani-Singh-Paliwal` • `@Arunima-Dutta` • `@Ankita-Sahu` • `@Kadali-Swarna` • `@Revanth` • `@Sujal-Mahapatra` • `@Sumit-Kumar`

#### 🌐 Localization, Accessibility & UI Design
*Contributors who translated strings across 13 Indian languages and polished accessibility, themes, and layouts:*
- `@Aditi` • `@Anijesh` • `@aeriellaaa` • `@Anshul-Jain` • `@Deepesh-Kafaltiya` • `@Maheshwari-Love` • `@Namraa-Patel` • `@Omkar-Salunkhe` • `@Thilak-Raj-P` • `@prakash-meena` • `@vedant7007`

#### 🧪 Quality Assurance, Security & Bug Fixes
*Contributors who engineered test suites, hardened security, resolved edge cases, and stabilized build pipelines:*
- `@Hasini2706` • `@Karan-Singh` • `@Suyash2527` • `@rashmii` • `@Jana` • `@Krishna-Veernala` • `@N-Sri-Venkatesh` • `@SarthakKharche` • `@dinesh9997` • `@dokkuprashanth7` • `@dependabot[bot]`

---

### Community Highlights

```
   Over 100+ Total Contributors  │  500+ Commits Merged  │  13 Languages Supported
```

Whether you submitted a feature pull request, resolved an issue, translated phrases, or tested pre-release builds—**thank you for shaping the future of digital healthcare with UltimateHealth!**

---

### Contributing to UltimateHealth
Interested in joining the community? Check out our [Contribution Guidelines](CONTRIBUTING.md) or submit an issue on [GitHub](https://github.com/SB2318/UltimateHealth).
