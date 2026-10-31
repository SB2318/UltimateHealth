import {WellnessLog, WellnessPlanGoals} from '../../schemas/type';
import {format} from 'date-fns';

const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const DEFAULT_WELLNESS_GOALS: Record<string, number> = {
  steps: 10000,
  waterMl: 2500,
  sleepHours: 8,
  activeMinutes: 30,
  caloriesBurned: 400,
  breathingSessionMinutes: 10,
};

/**
 * Today's date as YYYY-MM-DD in LOCAL time (single source of truth for the
 * dashboard form, getTodayLog, and BreathingTool). Using the same convention
 * everywhere keeps sessions attributed to the user's own calendar day.
 */
export const getTodayDateString = (today: Date = new Date()): string =>
  format(today, 'yyyy-MM-dd');

/** Format metric value for compact display: steps '8,450', waterMl -> '1.8L', hours '7.5h'. */
export const formatMetricValue = (key: string, value: number): string => {
  if (value === undefined || value === null || Number.isNaN(value)) return '--';
  switch (key) {
    case 'steps':
    case 'activeMinutes':
      return Math.round(value).toLocaleString('en-US');
    case 'waterMl':
      return `${(value / 1000).toFixed(1)}L`;
    case 'sleepHours':
      return `${value.toFixed(1)}h`;
    case 'caloriesBurned':
      return `${Math.round(value).toLocaleString('en-US')} kcal`;
    case 'breathingSessionMinutes':
      return `${Math.round(value)} min`;
    default:
      return String(value);
  }
};

/** Resolve custom plan goals or fall back to standard clinical targets. */
export const resolveGoalForMetric = (
  key: string,
  planGoals?: WellnessPlanGoals | null,
): number => {
  if (planGoals) {
    switch (key) {
      case 'steps':
        if (planGoals.dailySteps && planGoals.dailySteps > 0)
          return planGoals.dailySteps;
        break;
      case 'waterMl':
        if (planGoals.dailyWaterMl && planGoals.dailyWaterMl > 0)
          return planGoals.dailyWaterMl;
        break;
      case 'sleepHours':
        if (planGoals.dailySleepHours && planGoals.dailySleepHours > 0)
          return planGoals.dailySleepHours;
        break;
      case 'activeMinutes':
        if (planGoals.dailyActiveMinutes && planGoals.dailyActiveMinutes > 0)
          return planGoals.dailyActiveMinutes;
        break;
      case 'caloriesBurned':
        if (planGoals.dailyCaloriesBurned && planGoals.dailyCaloriesBurned > 0)
          return planGoals.dailyCaloriesBurned;
        break;
      case 'breathingSessionMinutes':
        if (
          planGoals.dailyBreathingMinutes &&
          planGoals.dailyBreathingMinutes > 0
        )
          return planGoals.dailyBreathingMinutes;
        break;
    }
  }
  return DEFAULT_WELLNESS_GOALS[key] ?? 0;
};

/** How far a metric is toward its daily goal (0..1). */
export const metricGoal = (
  key: string,
  value: number,
  planGoals?: WellnessPlanGoals | null,
): number => {
  const goal = resolveGoalForMetric(key, planGoals);
  if (!goal || value === undefined || value === null) return 0;
  return Math.min(1, Math.max(0, value / goal));
};

/** Build the weekly chart dataset: one point per calendar day in the returned logs, newest last. */
export const buildChartData = (logs: WellnessLog[]) => {
  const sorted = [...logs].sort((a, b) => a.date.localeCompare(b.date));
  return {
    labels: sorted.map(l => DAY_SHORT[new Date(l.date + 'T00:00:00').getDay()]),
    datasets: [{data: sorted.map(l => l.metrics?.steps ?? 0)}],
  };
};

/** Map weekly logs to the dashboard 'score' (0-100) — display only, no clinical claim. */
export const calculateDashboardScore = (
  logs: WellnessLog[],
  planGoals?: WellnessPlanGoals | null,
): number => {
  const rows = logs.filter(l => l.metrics && Object.keys(l.metrics).length > 0);
  if (rows.length === 0) return 0;
  const g = (k: string, v?: number) =>
    v === undefined ? 0 : metricGoal(k, v, planGoals);
  const score = rows.map(l => {
    const m = l.metrics!;
    const parts = [
      g('steps', m.steps),
      g('sleepHours', m.sleepHours),
      g('waterMl', m.waterMl),
      g('activeMinutes', m.activeMinutes),
    ];
    return parts.reduce((a, b) => a + b, 0) / Math.max(1, parts.length);
  });
  return Math.round((score.reduce((a, b) => a + b, 0) / score.length) * 100);
};

/** Today's log (date === today) or null. */
export const getTodayLog = (
  logs: WellnessLog[],
  today = new Date(),
): WellnessLog | null => {
  const todayStr = getTodayDateString(today);
  return logs.find(l => l.date === todayStr) ?? null;
};
