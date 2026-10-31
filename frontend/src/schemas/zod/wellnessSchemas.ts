import * as z from 'zod';

export const wellnessMetricsSchema = z.object({
  steps: z.number().min(0).optional(),
  activeMinutes: z.number().min(0).optional(),
  sleepHours: z.number().min(0).max(24).optional(),
  waterMl: z.number().min(0).optional(),
  caloriesBurned: z.number().min(0).optional(),
  breathingSessionMinutes: z.number().min(0).optional(),
});

export const wellnessLogPayloadSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  metrics: wellnessMetricsSchema.optional(),
});

export const wellnessPlanGoalsSchema = z.object({
  dailySteps: z.number().min(0).optional(),
  dailyActiveMinutes: z.number().min(0).optional(),
  dailyCaloriesBurned: z.number().min(0).optional(),
  dailySleepHours: z.number().min(0).max(24).optional(),
  dailyBreathingMinutes: z.number().min(0).optional(),
  dailyWaterMl: z.number().min(0).optional(),
});

export const wellnessPlanSchema = z.object({
  _id: z.string().optional(),
  userId: z.string(),
  isActive: z.boolean(),
  goals: wellnessPlanGoalsSchema,
  dailyTasks: z.array(z.string()),
  focusAreas: z.array(z.string()).optional(),
  weeklyInsight: z.string().optional(),
  warnings: z.array(z.string()).optional(),
  basedOnLogs: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type WellnessLogPayloadSchema = z.infer<typeof wellnessLogPayloadSchema>;
export type WellnessPlanSchema = z.infer<typeof wellnessPlanSchema>;
