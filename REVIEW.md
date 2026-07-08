---
phase: code-review
reviewed: 2026-07-08T14:00:00Z
depth: standard
files_reviewed: 9
files_reviewed_list:
  - frontend/src/helper/APIUtils.ts
  - frontend/src/type.ts
  - frontend/src/schemas/wellnessSchemas.ts
  - frontend/src/hooks/useLogWellnessMetric.ts
  - frontend/src/hooks/useGetWeeklyWellness.ts
  - frontend/src/screens/WellnessDashboard/ManualLogCard.tsx
  - frontend/src/screens/WellnessDashboard/WeeklyChart.tsx
  - frontend/src/screens/WellnessDashboard/WellnessDashboardScreen.tsx
findings:
  critical: 1
  warning: 5
  info: 3
  total: 9
status: issues_found
---

# Code Review Report

**Reviewed:** 2026-07-08T14:00:00Z
**Depth:** standard
**Files Reviewed:** 9
**Status:** issues_found

## Summary

Reviewed the Wellness Dashboard API integration covering 8 files (6 modified/created + 2 reference). The implementation correctly uses `authAxios` for authenticated endpoints, follows the existing hook naming conventions, and properly handles form validation with Zod. However, several issues were found:

1. A **critical** type mismatch between the Zod schema and static TypeScript type for the `date` field, along with the sort comparator in WeeklyChart that will produce `NaN` values when dates are absent.
2. Multiple **warnings** around race conditions on form state overwrite, offline user experience gaps, and unused parameters.
3. The offline banner claims "cached data" is shown, which partially works via React Query in-memory cache but could mislead users who restart the app.

---

## Critical Issues

### CR-01: `log.date` can be undefined at runtime, causing sort corruption in WeeklyChart

**File:** `frontend/src/screens/WellnessDashboard/WeeklyChart.tsx:29-31`
**Issue:** The sort comparator on line 30 calls `new Date(a.date).getTime()` without guarding against `undefined` dates. While the `WellnessLog` TypeScript type declares `date: string` (required), the Zod schema (`wellnessLogSchema`) defines `date: z.string().optional()` — meaning the API may omit it. If a log entry arrives without a `date`, `new Date(undefined).getTime()` returns `NaN`, causing `Array.sort()` to produce undefined ordering (implementation-dependent behavior). The code already uses optional chaining on line 36 (`log.date?.startsWith(...)`), showing awareness that `date` may be undefined, but the sort comparator is not guarded.

**Fix:** Filter out logs without dates before sorting, or add a fallback:

```typescript
// Option A: Filter
const sorted = [...data.logs]
  .filter((log) => log.date != null)
  .sort(
    (a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime(),
  );

// Option B: Fallback for missing dates
const sorted = [...data.logs].sort((a, b) => {
  const dateA = a.date ? new Date(a.date).getTime() : 0;
  const dateB = b.date ? new Date(b.date).getTime() : 0;
  return dateA - dateB;
});
```

---

## Warnings

### WR-01: Type mismatch — `date` is required in `WellnessLog` but optional in Zod schema

**File:** `frontend/src/type.ts:878` and `frontend/src/schemas/wellnessSchemas.ts:7`
**Issue:** The static TypeScript type `WellnessLog` declares `date: string` (required), but the runtime Zod schema defines `date: z.string().optional()`. This means:
- TypeScript promises consumers that `date` is always present.
- At runtime, Zod allows the API to return logs without a `date`.
- All downstream consumers that rely on `date` (the sort comparator, `getDayLabel`, `.startsWith()` check) must treat it as potentially undefined, but only some do.

**Fix:** Align the types. Either make `date` required in the Zod schema, or make it optional in the TypeScript type:

```typescript
// Option A: Make Zod match TypeScript (recommended — API always returns a date)
export const wellnessLogSchema = z.object({
  water: z.number().min(0).max(10000),
  calories: z.number().min(0).max(10000),
  mood: z.string().min(1, 'Mood is required'),
  date: z.string(),  // required
});

// Option B: Make TypeScript match Zod
export type WellnessLog = {
  _id?: string;
  water: number;
  calories: number;
  mood: string;
  date?: string;  // now optional
  steps?: number;
  heartRate?: number;
  sleep?: number;
  userId?: string;
  createdAt?: string;
};
```

---

### WR-02: Form state overwritten by `useEffect` on every weekly data refetch

**File:** `frontend/src/screens/WellnessDashboard/ManualLogCard.tsx:25-36`
**Issue:** The `useEffect` pre-fills form fields (`water`, `calories`, `mood`) from `weeklyData.logs` whenever the `weeklyData` reference changes. After a successful mutation, `onSuccess` calls `queryClient.invalidateQueries(['get-weekly-wellness'])`, which triggers a refetch. The refetched data replaces the component's `weeklyData`, causing the `useEffect` to re-run and overwrite any in-progress user edits. If the user had started modifying fields after the previous save, their changes would be silently reverted.

**Fix:** Only pre-fill on initial load, not on every refetch. Use a ref to track initial population:

```typescript
const hasPreFilled = useRef(false);

useEffect(() => {
  if (!weeklyData?.logs || hasPreFilled.current) return;
  const todayStr = new Date().toISOString().split('T')[0];
  const todayLog = weeklyData.logs.find(
    (log) => log.date && log.date.startsWith(todayStr),
  );
  if (todayLog) {
    setWater(todayLog.water ?? 0);
    setCalories(todayLog.calories ?? 0);
    setMood(todayLog.mood ?? '');
    hasPreFilled.current = true;
  }
}, [weeklyData]);
```

---

### WR-03: Save button not disabled when offline — user can attempt save and get error

**File:** `frontend/src/screens/WellnessDashboard/ManualLogCard.tsx:126-128`
**Issue:** The Save button's `disabled` prop checks `mutation.isPending || isWeeklyLoading` but does **not** check `!isConnected`. When the device is offline, the user can fill out the form and press Save. The mutation uses `authAxios`, which will fail with a network error. The catch block shows an Alert, but the user loses their in-progress input and gets a poor experience. The offline banner in the parent screen is visible, but the Save button should also be disabled (or show an inline warning) to prevent attempts that will certainly fail.

**Fix:** Add the connectivity check to the disabled condition:

```typescript
<TouchableOpacity
  style={[styles.saveButton, (mutation.isPending || !isConnected) && styles.saveButtonDisabled]}
  onPress={handleSave}
  disabled={mutation.isPending || !isConnected || isWeeklyLoading}
  activeOpacity={0.7}
>
```

---

### WR-04: `wellnessLogSchema.mood` accepts any string — no enum/emoji restriction

**File:** `frontend/src/schemas/wellnessSchemas.ts:6`
**Issue:** The `mood` field validates as `z.string().min(1)`, meaning any non-empty string passes validation. The UI restricts selection to the five emoji values (`['😔', '😐', '🙂', '😄', '🤩']`), but Zod allows arbitrary strings like "angry" or "bad_data" to be submitted. If the backend expects only specific mood values, or if the UI is later modified to include a text input, invalid data could reach the API.

**Fix:** Restrict the schema to the allowed mood values using `z.enum()`:

```typescript
export const wellnessLogSchema = z.object({
  water: z.number().min(0, 'Water must be >= 0').max(10000, 'Water seems too high'),
  calories: z.number().min(0, 'Calories must be >= 0').max(10000, 'Calories seems too high'),
  mood: z.enum(['😔', '😐', '🙂', '😄', '🤩'], {
    errorMap: () => ({ message: 'Please select a valid mood' }),
  }),
  date: z.string().optional(),
});
```

---

### WR-05: `WellnessDashboardScreen` offline banner claims "cached data" — no persistent cache

**File:** `frontend/src/screens/WellnessDashboard/WellnessDashboardScreen.tsx:24`
**Issue:** The banner reads "You are offline - showing cached data." React Query does keep the last fetched data in memory while the query is disabled, so cached results are shown for the current session. However, this is only an in-memory cache — if the app is restarted, re-navigated, or the component unmounts (e.g., navigating to another tab that unmounts the screen), the cache is lost and the screen will show empty states. The banner creates an expectation of persistence that is not fully delivered. Additionally, `ManualLogCard` and `WeeklyChart` will both show empty/loading states if there is no cached data.

**Fix:** Either implement a persistent cache (e.g., `@tanstack/query-async-storage-persister` with `AsyncStorage`) or rephrase the banner to be accurate about what is shown.

---

## Info

### IN-01: Unused `_idx` parameter in `WeeklyChart.map()` callback

**File:** `frontend/src/screens/WellnessDashboard/WeeklyChart.tsx:33`
**Issue:** The map callback receives `_idx` as the second parameter but never uses it. The underscore prefix correctly signals intent, but the parameter should be removed for clarity.

```typescript
// Before
return sorted.map((log, _idx) => {
// After
return sorted.map((log) => {
```

---

### IN-02: Import style inconsistency — `import { z }` vs `import * as z`

**File:** `frontend/src/schemas/wellnessSchemas.ts:1`
**Issue:** The existing `profileSchemas.ts` uses `import * as z from 'zod'`, while the new file uses `import { z } from 'zod'`. Both work with the project's TypeScript configuration, but the inconsistency makes the codebase harder to read and refactor. Align with the existing convention.

```typescript
// Change to match existing convention:
import * as z from 'zod';
```

---

### IN-03: `maxValue` calculation uses spread on potentially large state array

**File:** `frontend/src/screens/WellnessDashboard/WeeklyChart.tsx:47`
**Issue:** `Math.max(...chartData.map((d) => d.value), 1)` uses the spread operator. For the current weekly dataset (max 7 entries) this is harmless, but it's a general anti-pattern because `Math.max` with spread can overflow the call stack with very large arrays. Consider using `reduce` for robustness:

```typescript
const max = chartData.reduce((max, d) => Math.max(max, d.value), 1);
```

---

_Reviewed: 2026-07-08T14:00:00Z_
_Reviewer: OpenCode (gsd-code-reviewer)_
_Depth: standard_
