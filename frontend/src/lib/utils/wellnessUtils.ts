import {WellnessLog} from '../../schemas/type';

const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** Format metric value for compact display: steps '8,450', waterMl -> '1.8L', hours '7.5h'. */
export const formatMetricValue = (key: string, value: number): string => {
  if (value === undefined || value === null || Number.isNaN(value)) return '--';
  switch (key) {
    case 'steps': case 'activeMinutes': return Math.round(value).toLocaleString('en-US');
    case 'waterMl': return `${(value / 1000).toFixed(1)}L`;
    case 'sleepHours': return `${value.toFixed(1)}h`;
    default: return String(value);
  }
};

/** How far a metric is toward its daily goal (0..1). */
export const metricGoal = (key: string, value: number): number => {
  const GOALS: Record<string, number> = {steps: 10000, waterMl: 2500, sleepHours: 8, activeMinutes: 30};
  const goal = GOALS[key];
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
export const calculateDashboardScore = (logs: WellnessLog[]): number => {
  const rows = logs.filter(l => l.metrics && Object.keys(l.metrics).length > 0);
  if (rows.length === 0) return 0;
  const g = (k: string, v?: number) => (v === undefined ? 0 : metricGoal(k, v));
  const score = rows.map(l => {
    const m = l.metrics!;
    const parts = [g('steps', m.steps), g('sleepHours', m.sleepHours), g('waterMl', m.waterMl), g('activeMinutes', m.activeMinutes)];
    return parts.reduce((a, b) => a + b, 0) / Math.max(1, parts.length);
  });
  return Math.round((score.reduce((a, b) => a + b, 0) / score.length) * 100);
};

/** Today's log (date === today) or null. */
export const getTodayLog = (logs: WellnessLog[], today = new Date()): WellnessLog | null => {
  const todayStr = today.toISOString().slice(0, 10);
  return logs.find(l => l.date === todayStr) ?? null;
};