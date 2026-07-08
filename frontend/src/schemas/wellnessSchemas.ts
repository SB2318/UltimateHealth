import { z } from 'zod';

export const wellnessLogSchema = z.object({
  water: z.number().min(0, 'Water must be >= 0').max(10000, 'Water seems too high'),
  calories: z.number().min(0, 'Calories must be >= 0').max(10000, 'Calories seems too high'),
  mood: z.string().min(1, 'Mood is required'),
  date: z.string(),
});

export type WellnessLogFormData = z.infer<typeof wellnessLogSchema>;
