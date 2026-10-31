/**
 * Dietary Macronutrient Distribution & Caloric Target Calculator.
 */

export type DietaryGoal = 'cutting' | 'maintenance' | 'lean-bulk';

export interface MacroInput {
  targetCalories: number;
  weightKg: number;
  goal: DietaryGoal;
}

export interface MacroBreakdown {
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  proteinCalories: number;
  carbsCalories: number;
  fatsCalories: number;
  summary: string;
}

/**
 * Calculates optimal macronutrient split tailored to fitness goal and body weight.
 * - Protein: 4 kcal/g
 * - Carbohydrates: 4 kcal/g
 * - Fats: 9 kcal/g
 */
export function calculateMacroNutrientSplit(input: MacroInput): MacroBreakdown {
  const { targetCalories, weightKg, goal } = input;

  if (targetCalories < 800) {
    throw new Error('Target calories must be at least 800 kcal');
  }
  if (weightKg <= 0) {
    throw new Error('Weight must be greater than zero');
  }

  // Determine protein intake based on goal (g per kg of bodyweight)
  let proteinPerKg: number;
  let fatRatioOfCalories: number;

  switch (goal) {
    case 'cutting':
      proteinPerKg = 2.2; // High protein to preserve lean muscle during deficit
      fatRatioOfCalories = 0.25; // 25% fat
      break;
    case 'lean-bulk':
      proteinPerKg = 2.0;
      fatRatioOfCalories = 0.25; // 25% fat
      break;
    case 'maintenance':
    default:
      proteinPerKg = 1.8;
      fatRatioOfCalories = 0.30; // 30% fat
      break;
  }

  const proteinGrams = Math.round(weightKg * proteinPerKg);
  const proteinCalories = proteinGrams * 4;

  const fatsCalories = Math.round(targetCalories * fatRatioOfCalories);
  const fatsGrams = Math.round(fatsCalories / 9);

  const remainingCalories = Math.max(0, targetCalories - (proteinCalories + fatsCalories));
  const carbsCalories = remainingCalories;
  const carbsGrams = Math.round(carbsCalories / 4);

  return {
    proteinGrams,
    carbsGrams,
    fatsGrams,
    proteinCalories,
    carbsCalories,
    fatsCalories,
    summary: `${proteinGrams}g Protein / ${carbsGrams}g Carbs / ${fatsGrams}g Fats for ${goal}`
  };
}
