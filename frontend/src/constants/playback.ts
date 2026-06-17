export const PLAYBACK_SPEEDS = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0] as const;

// Sleep timer durations in minutes. `null` means "end of episode".
export const SLEEP_TIMER_OPTIONS = [5, 10, 15, 30, 60, null] as const;
export type SleepTimerOption = (typeof SLEEP_TIMER_OPTIONS)[number];
