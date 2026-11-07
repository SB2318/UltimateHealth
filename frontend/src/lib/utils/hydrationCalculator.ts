/**
 * Personalized Daily Hydration and Fluid Intake Calculator.
 */

export interface HydrationInput {
  weightKg: number;
  activityMinutesPerDay: number;
  climate: 'temperate' | 'hot' | 'very-hot';
  caffeineIntakeCups?: number;
}

export interface HydrationRecommendation {
  recommendedDailyWaterMl: number;
  recommendedGlasses: number; // Standard 250ml glasses
  hourlyPaceMl: number;       // Across 14 awake hours
  hydrationTip: string;
}

/**
 * Calculates optimal fluid intake based on body weight, workout intensity, and ambient climate.
 */
export function calculateHydrationGoal(input: HydrationInput): HydrationRecommendation {
  const { weightKg, activityMinutesPerDay, climate, caffeineIntakeCups = 0 } = input;

  if (weightKg <= 0) {
    throw new Error('Weight must be greater than zero');
  }

  // Base requirement: 35ml per kg of body weight
  let totalMl = weightKg * 35;

  // Add 350ml per 30 minutes of moderate-to-vigorous activity
  const exerciseAddition = (activityMinutesPerDay / 30) * 350;
  totalMl += exerciseAddition;

  // Climate adjustments
  if (climate === 'hot') {
    totalMl += 400;
  } else if (climate === 'very-hot') {
    totalMl += 800;
  }

  // Caffeine mild compensatory factor (100ml water per cup of high caffeine)
  if (caffeineIntakeCups > 2) {
    totalMl += (caffeineIntakeCups - 2) * 100;
  }

  totalMl = Math.round(totalMl / 50) * 50; // Round to nearest 50ml
  const recommendedGlasses = Math.round(totalMl / 250);
  const hourlyPaceMl = Math.round(totalMl / 14);

  let hydrationTip = 'Drink steadily throughout the morning and afternoon for steady hydration.';
  if (activityMinutesPerDay > 45) {
    hydrationTip = 'Include electrolytes if training vigorously in warm weather.';
  }

  return {
    recommendedDailyWaterMl: totalMl,
    recommendedGlasses,
    hourlyPaceMl,
    hydrationTip
  };
}
