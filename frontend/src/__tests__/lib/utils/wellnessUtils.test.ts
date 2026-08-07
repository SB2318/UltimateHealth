import {
  formatMetricValue,
  metricGoal,
  buildChartData,
  calculateDashboardScore,
  getTodayLog,
} from '../../../lib/utils/wellnessUtils';
import {WellnessLog} from '../../../schemas/type';

const fullDayLog = (date: string): WellnessLog => ({
  userId: 'u1',
  date,
  metrics: {steps: 10000, waterMl: 2500, sleepHours: 8, activeMinutes: 30},
});

describe('formatMetricValue', () => {
  it('formats steps and active minutes with thousands separators', () => {
    expect(formatMetricValue('steps', 8450)).toBe('8,450');
  });

  it('formats waterMl as litres with one decimal', () => {
    expect(formatMetricValue('waterMl', 1800)).toBe('1.8L');
  });

  it('formats sleepHours with one decimal and an h suffix', () => {
    expect(formatMetricValue('sleepHours', 7.5)).toBe('7.5h');
  });

  it('returns placeholder for undefined values', () => {
    expect(formatMetricValue('missing', undefined as any)).toBe('--');
  });
});

describe('metricGoal', () => {
  it('returns 1 when the goal is met exactly', () => {
    expect(metricGoal('steps', 10000)).toBe(1);
  });

  it('returns the ratio for partial progress', () => {
    expect(metricGoal('waterMl', 1250)).toBe(0.5);
  });

  it('caps at 1 when the value exceeds the goal', () => {
    expect(metricGoal('steps', 50000)).toBe(1);
  });

  it('returns 0 for unknown metric keys', () => {
    expect(metricGoal('unknown', 5)).toBe(0);
  });
});

describe('buildChartData', () => {
  it('builds one point per sorted calendar day, newest last', () => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const logs: WellnessLog[] = [
      {userId: 'u1', date: '2026-08-06', metrics: {steps: 2500}},
      {userId: 'u1', date: '2026-08-05', metrics: {steps: 8450}},
    ];

    const chart = buildChartData(logs);

    expect(chart.labels).toHaveLength(2);
    // Weekday computed at runtime (depends on the actual calendar date, never hardcoded)
    expect(chart.labels[0]).toBe(dayNames[new Date('2026-08-05T00:00:00').getDay()]);
    expect(chart.labels[1]).toBe(dayNames[new Date('2026-08-06T00:00:00').getDay()]);
    expect(chart.datasets[0].data).toEqual([8450, 2500]);
  });

  it('defaults missing steps to 0', () => {
    const chart = buildChartData([
      {userId: 'u1', date: '2026-08-05', metrics: {waterMl: 500}},
    ]);

    expect(chart.datasets[0].data).toEqual([0]);
  });
});

describe('calculateDashboardScore', () => {
  it('returns 100 for a log hitting all daily goals', () => {
    expect(calculateDashboardScore([fullDayLog('2026-08-05')])).toBe(100);
  });

  it('returns 0 for an empty array', () => {
    expect(calculateDashboardScore([])).toBe(0);
  });

  it('only counts logs that have metrics, scoring missing metrics as 0', () => {
    const logs: WellnessLog[] = [
      {userId: 'u1', date: '2026-08-05', metrics: {}},
      {userId: 'u1', date: '2026-08-06', metrics: {steps: 5000}},
    ];
    // steps 5000 / 10000 = 0.5 across the 4-part average → 12.5 → 13
    expect(calculateDashboardScore(logs)).toBe(13);
  });
});

describe('getTodayLog', () => {
  it('returns the log matching the injected today date', () => {
    const logs: WellnessLog[] = [
      {userId: 'u1', date: '2026-08-06', metrics: {steps: 100}},
      fullDayLog('2026-08-07'),
      {userId: 'u1', date: '2026-08-08', metrics: {steps: 200}},
    ];

    const today = getTodayLog(logs, new Date('2026-08-07T12:00:00'));
    expect(today?.date).toBe('2026-08-07');
    expect(today?.metrics.steps).toBe(10000);
  });

  it('returns null when no log exists for today', () => {
    const logs: WellnessLog[] = [
      {userId: 'u1', date: '2026-08-06', metrics: {steps: 100}},
    ];

    expect(getTodayLog(logs, new Date('2026-08-07T12:00:00'))).toBeNull();
  });
});