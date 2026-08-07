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

export type WellnessLogPayloadSchema = z.infer<typeof wellnessLogPayloadSchema>;
