# Wellness API & Mobile Implementation Alignment

## 1. Overview

This document summarizes the discovery of the Backend Wellness API (`C:\backend_ultimatehealth`), its alignment with the Mobile Frontend (`c:\Resolution\UltimateHealth\frontend`), enhancements made to match the existing mobile architecture, and the removal of all mock/dummy data across the Wellness module.

---

## 2. Backend Wellness API Specification (`/api/wellness`)

**Backend Files:**
- Routes: `routes/wellnessRoute.js` (mounted at `/api/wellness` in `index.js`)
- Controller: `controllers/wellnessController.js`
- Models: `models/WellnessLog.js`, `models/WellnessPlan.js`

### Endpoints

| Method | Endpoint | Auth | Description | Response Envelope |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/wellness/log` | Bearer Token (`authToken`) | Create or merge daily wellness metrics for `{ userId, date }` (`YYYY-MM-DD`). | `{ success: true, message: string, data: WellnessLog }` |
| `GET` | `/api/wellness/weekly` | Bearer Token (`authToken`) | Retrieve the user's last 7 days of `WellnessLog` records sorted by `date: -1`. | `{ success: true, data: WellnessLog[] }` |
| `GET` | `/api/wellness/plan` | Bearer Token (`authToken`) | Fetch the user's currently active 7-day `WellnessPlan` (`isActive: true`). Returns `404` if none exists yet. | `{ success: true, data: WellnessPlan }` |
| `POST` | `/api/wellness/plan/generate` | Bearer Token (`authToken` + `aiPlanLimiter`) | Generate a personalized 7-day clinical `WellnessPlan` from the last 7 days of `WellnessLog` entries via Gemini AI (`generateWithKeyRotation`), deactivating prior plans. | `{ success: true, message: string, data: WellnessPlan }` |
| `GET` | `/api/wellness/plan/history` | Bearer Token (`authToken`) | Paginated history of past `WellnessPlan` records (`?page=1&limit=10`). | `{ success: true, data: WellnessPlan[], pagination: { total, page, limit, totalPages } }` |


## 3. Mobile Frontend & What Was Implemented

### 3.1 API Constants & TypeScript / Zod Schemas
- **Updated [`frontend/src/lib/api/APIUtils.ts`](../frontend/src/lib/api/APIUtils.ts):**
  - Existing: `LOG_WELLNESS_API` (`/wellness/log`), `GET_WELLNESS_WEEKLY_API` (`/wellness/weekly`)
  - Added:
    - `GET_WELLNESS_PLAN_API` (`/wellness/plan`)
    - `GENERATE_WELLNESS_PLAN_API` (`/wellness/plan/generate`)
    - `GET_WELLNESS_PLAN_HISTORY_API` (`/wellness/plan/history`)
- **Updated [`frontend/src/schemas/type.ts`](../frontend/src/schemas/type.ts) & [`frontend/src/schemas/zod/wellnessSchemas.ts`](../frontend/src/schemas/zod/wellnessSchemas.ts):**
  - Added `WellnessPlanGoals`, `WellnessPlan`, `WellnessPlanResponse`, and `WellnessPlanHistoryResponse` types and Zod validation schemas (`wellnessPlanGoalsSchema`, `wellnessPlanSchema`).

### 3.2 React Query Hooks (`frontend/src/hooks/wellness/`)
- **Existing Hooks Preserved:**
  - [`useGetWeeklyWellness.ts`](../frontend/src/hooks/wellness/useGetWeeklyWellness.ts) — `GET /api/wellness/weekly`
  - [`useLogWellness.ts`](../frontend/src/hooks/wellness/useLogWellness.ts) — `POST /api/wellness/log` (validates payload with `wellnessLogPayloadSchema` and invalidates `['get-weekly-wellness']`)
- **New Hooks Created:**
  - [`useGetWellnessPlan.ts`](../frontend/src/hooks/wellness/useGetWellnessPlan.ts) — `GET /api/wellness/plan` (gracefully resolves `404` to `null` when a user has not generated a plan yet).
  - [`useGenerateWellnessPlan.ts`](../frontend/src/hooks/wellness/useGenerateWellnessPlan.ts) — `POST /api/wellness/plan/generate` (invalidates `['get-wellness-plan']` and `['get-wellness-plan-history']`).
  - [`useGetWellnessPlanHistory.ts`](../frontend/src/hooks/wellness/useGetWellnessPlanHistory.ts) — `GET /api/wellness/plan/history`.

### 3.3 Utilities (`frontend/src/lib/utils/wellnessUtils.ts`)
- Extended [`formatMetricValue`](../frontend/src/lib/utils/wellnessUtils.ts) to format all 6 backend metrics (`steps`, `activeMinutes`, `waterMl`, `sleepHours`, `caloriesBurned`, `breathingSessionMinutes`).
- Added [`resolveGoalForMetric`](../frontend/src/lib/utils/wellnessUtils.ts) so `metricGoal` and `calculateDashboardScore` dynamically use the user's active AI `WellnessPlan.goals` when present and fall back to clinical defaults (`10,000` steps, `2,500 ml` water, `8h` sleep, `30 min` active, `400 kcal`, `10 min` breathing).

### 3.4 Dashboard Alignment (`frontend/src/screens/wellness/WellnessDashboardScreen.tsx`)
1. **Fixed Empty-State Deadlock:** Previously, when `weeklyLogs.length === 0`, the entire `<ScrollView>` (including the "Log Today" form) was hidden behind the empty message, preventing new users from logging their first metric. Now, the `"No wellness data yet"` card renders at the top while keeping **Log Today**, **Guided Mindfulness (`BreathingTool`)**, and **AI 7-Day Wellness Plan** accessible below.
2. **Fixed Stack Navigation Crash (`useBottomTabBarHeight`):** Wrapped `useBottomTabBarHeight()` in `useSafeBottomTabBarHeight()` so navigating to `WellnessDashboardScreen` from `SettingsScreen` (via `StackNavigation`) does not throw a missing BottomTabBar context error.
3. **Full 6-Metric Support:** Added `Active Minutes` and `Calories Burned` to both the **Today's Metrics** grid and the **Log Today** form alongside `Steps`, `Water (ml)`, `Sleep (hrs)`, and `Breathing (min)`.
4. **Integrated AI 7-Day Wellness Plan & Guided Breathing:**
   - Displays `weeklyInsight`, `focusAreas` badges, clinical `warnings`, and the 7 `dailyTasks` from `GET /api/wellness/plan`.
   - Allows generating/refreshing the AI plan via `POST /api/wellness/plan/generate`.
   - Embeds `BreathingTool` with `onSessionLogged={() => refetch()}` so completed breathing sessions automatically sync with the dashboard.

---

## 4. Mock & Dummy Data Removed

1. **[`frontend/src/screens/wellness/WeeklyChart.tsx`](../frontend/src/screens/wellness/WeeklyChart.tsx):**
   - **Removed:** Hardcoded `weekData` array (`4200`, `7800`, `5500`, `9100`, `6300`, `8200`, `0`).
   - **Replaced with:** Dynamic `logs: WellnessLog[]` and `goalSteps?: number` props driven by real backend `WellnessLog` records.
2. **[`frontend/src/screens/wellness/WearableSyncCard.tsx`](../frontend/src/screens/wellness/WearableSyncCard.tsx):**
   - **Removed:** Simulated `1500ms` timeout and dummy `{ steps: 7842, heartRate: 72, sleep: 6.5 }`.
   - **Replaced with:** Live sync against `GET_WELLNESS_WEEKLY_API` (`/api/wellness/weekly`) displaying real logged `steps`, `activeMinutes`, and `sleepHours`.
3. **[`frontend/src/screens/wellness/ManualLogCard.tsx`](../frontend/src/screens/wellness/ManualLogCard.tsx):**
   - **Removed:** Disconnected local-only state.
   - **Replaced with:** Real persistence to `POST /api/wellness/log` (`LOG_WELLNESS_API`) for quick-add water (`+250 ml`) and calorie (`+300 kcal`) actions.
