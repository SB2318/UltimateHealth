---
phase: wellness-dashboard
plan: api-integration
subsystem: Wellness Dashboard
tags: [wellness, api, react-query, react-native]
requires: []
provides: [wellness-api-integration]
affects: [ManualLogCard, WeeklyChart, WellnessDashboardScreen]
tech-stack:
  added: []
  patterns:
    - "useMutation + invalidateQueries for POST-then-refresh"
    - "authAxios for authenticated API calls"
    - "Zod pre-validation before mutation"
    - "useSelector for network state"
key-files:
  created:
    - frontend/src/schemas/wellnessSchemas.ts
    - frontend/src/hooks/useLogWellnessMetric.ts
    - frontend/src/hooks/useGetWeeklyWellness.ts
  modified:
    - frontend/src/helper/APIUtils.ts
    - frontend/src/type.ts
    - frontend/src/screens/WellnessDashboard/ManualLogCard.tsx
    - frontend/src/screens/WellnessDashboard/WeeklyChart.tsx
    - frontend/src/screens/WellnessDashboard/WellnessDashboardScreen.tsx
decisions:
  - "Use emoji strings as mood values (matching existing UI) — API contract accepts any string"
  - "Water metric as default chart view with toggle to steps"
  - "Pre-fill form fields from today's log if already submitted this day"
  - "authAxios for wellness endpoints (automatic Bearer token injection)"
  - "5-minute stale time on weekly query"
metrics:
  duration: ~25 minutes
  files_created: 3
  files_modified: 6
  commits: 6
completed_date: "2026-07-08"
---

# Phase Wellness Dashboard: API Integration Summary

## One-Liner

Wired Wellness Dashboard frontend components to backend `/wellness/log` and `/wellness/weekly` endpoints with React Query hooks, Zod validation, and network-aware state management.

## Summary

This plan integrated the Wellness Dashboard with the backend API, replacing placeholder/hardcoded data with live API-driven data. The implementation follows existing codebase patterns (authAxios for authenticated calls, Zod schemas in `src/schemas/`, types in `src/type.ts`, API constants in `src/helper/APIUtils.ts`).

### What was built

| Task | Description | Files |
|------|-------------|-------|
| 1 | Added `WELLNESS_LOG` and `WELLNESS_WEEKLY` URL constants | `APIUtils.ts` |
| 2 | Added `WellnessLog` and `WeeklyWellnessResponse` TypeScript types | `type.ts` |
| 3 | Created Zod validation schema for wellness log input | `wellnessSchemas.ts` |
| 4 | Created `useLogWellnessMetric` mutation hook | `useLogWellnessMetric.ts` |
| 5 | Created `useGetWeeklyWellness` query hook | `useGetWeeklyWellness.ts` |
| 6 | Updated `ManualLogCard` — API-driven save, pre-fill, loading states | `ManualLogCard.tsx` |
| 7 | Updated `WeeklyChart` — live data, water/steps toggle, loading states | `WeeklyChart.tsx` |
| 8 | Updated `WellnessDashboardScreen` — offline banner, network hookup | `WellnessDashboardScreen.tsx` |

### Key Behaviors

- **Save flow:** User fills water/calories/mood → Zod validates → `useLogWellnessMetric` mutation fires via `authAxios` → on success, weekly query auto-invalidates → chart refreshes
- **Pre-fill:** On mount, `useGetWeeklyWellness` data is checked for today's existing log — if found, fields are pre-populated
- **Loading states:** Save button shows `ActivityIndicator` while mutation is pending; chart shows loading skeleton
- **Error handling:** Validation errors show Alert popup before request; API errors show Alert with backend message
- **Offline awareness:** Chart query only enabled when `isConnected` is true; offline banner shown in header
- **Chart toggle:** Default shows water metric; user can tap "Steps" to toggle view

## Deviations from Plan

None — plan executed exactly as written.

## Commits

| Hash | Message |
|------|---------|
| `b7d6067` | feat(wellness-dashboard): add WELLNESS_LOG and WELLNESS_WEEKLY API URL constants |
| `636fc69` | feat(wellness-dashboard): add WellnessLog and WeeklyWellnessResponse types |
| `c0e8adf` | feat(wellness-dashboard): add Zod validation schema for wellness log |
| `e9cbc4a` | feat(wellness-dashboard): add React Query hooks for wellness log mutation and weekly data query |
| `aa081f3` | feat(wellness-dashboard): wire API integration into ManualLogCard, WeeklyChart, and WellnessDashboardScreen |
| `9dd56ff` | fix(wellness-dashboard): restore emoji in header title |

## Self-Check: PASSED

- [x] All 8 files exist and are verified
- [x] All 6 commits found in git history
- [x] No accidental file deletions
- [x] TypeScript compilation passes (no errors)
