/**
 * Health metric calculators for BMI, BMR, TDEE, and caloric needs.
 * All calculations use scientifically-validated formulas.
 */

export interface BMIInput {
  weightKg: number;
  heightCm: number;
}

export interface BMRInput {
  weightKg: number;
  heightCm: number;
  ageYears: number;
  sex: 'male' | 'female';
}

export interface TDEEInput extends BMRInput {
  activityLevel: 'sedentary' | 'lightly-active' | 'moderately-active' | 'very-active' | 'extremely-active';
}

export interface CaloricNeedsInput extends TDEEInput {
  goal: 'maintain' | 'lose' | 'gain';
}

export type BMIClassification = 'Underweight' | 'Normal weight' | 'Overweight' | 'Obese Class I' | 'Obese Class II' | 'Obese Class III';

export const ACTIVITY_MULTIPLIERS: Record<TDEEInput['activityLevel'], number> = {
  'sedentary': 1.2,              // Little or no exercise
  'lightly-active': 1.375,       // Light exercise 1-3 days per week
  'moderately-active': 1.55,     // Moderate exercise 3-5 days per week
  'very-active': 1.725,          // Hard exercise 6-7 days per week
  'extremely-active': 1.9,       // Very hard exercise, physical job or training twice per day
};

/**
 * Calculate BMI (Body Mass Index)
 * Formula: weight (kg) / (height (m))^2
 * @param input - Weight in kg and height in cm
 * @returns BMI value rounded to 1 decimal place
 */
export function calculateBMI(input: BMIInput): number {
  const { weightKg, heightCm } = input;

  if (weightKg <= 0) throw new Error('Weight must be greater than 0');
  if (heightCm <= 0) throw new Error('Height must be greater than 0');

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  return Math.round(bmi * 10) / 10;
}

/**
 * Classify BMI into health categories
 * Based on WHO standard BMI classifications
 * @param bmi - BMI value
 * @returns BMI classification
 */
export function classifyBMI(bmi: number): BMIClassification {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  if (bmi < 35) return 'Obese Class I';
  if (bmi < 40) return 'Obese Class II';
  return 'Obese Class III';
}

/**
 * Calculate BMR (Basal Metabolic Rate)
 * Uses Mifflin-St Jeor equation (most accurate for modern populations)
 * Formula for men: (10 * weight + 6.25 * height - 5 * age + 5)
 * Formula for women: (10 * weight + 6.25 * height - 5 * age - 161)
 * @param input - Weight (kg), height (cm), age (years), and sex
 * @returns BMR in kcal/day rounded to nearest whole number
 */
export function calculateBMR(input: BMRInput): number {
  const { weightKg, heightCm, ageYears, sex } = input;

  if (weightKg <= 0) throw new Error('Weight must be greater than 0');
  if (heightCm <= 0) throw new Error('Height must be greater than 0');
  if (ageYears <= 0 || ageYears > 150) throw new Error('Age must be between 1 and 150');

  const baseBMR = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  const bmr = sex === 'male' ? baseBMR + 5 : baseBMR - 161;

  return Math.round(bmr);
}

/**
 * Calculate TDEE (Total Daily Energy Expenditure)
 * Formula: BMR * Activity Multiplier
 * @param input - BMR inputs plus activity level
 * @returns TDEE in kcal/day rounded to nearest whole number
 */
export function calculateTDEE(input: TDEEInput): number {
  const bmr = calculateBMR(input);
  const activityMultiplier = ACTIVITY_MULTIPLIERS[input.activityLevel];

  if (!activityMultiplier) {
    throw new Error(`Invalid activity level: ${input.activityLevel}`);
  }

  const tdee = bmr * activityMultiplier;
  return Math.round(tdee);
}

/**
 * Calculate caloric needs based on fitness goal
 * Formulas:
 * - Maintain: TDEE * 1.0
 * - Lose weight: TDEE * 0.85 (500 kcal deficit per day = ~0.5kg per week)
 * - Gain weight: TDEE * 1.1 (300 kcal surplus per day = ~0.3kg per week)
 * @param input - TDEE inputs plus fitness goal
 * @returns Daily caloric target in kcal
 */
export function calculateCaloricNeeds(input: CaloricNeedsInput): number {
  const tdee = calculateTDEE(input);

  const goalMultipliers: Record<CaloricNeedsInput['goal'], number> = {
    'maintain': 1.0,
    'lose': 0.85,      // ~500 kcal deficit
    'gain': 1.1,       // ~300 kcal surplus
  };

  const multiplier = goalMultipliers[input.goal];
  if (multiplier === undefined) {
    throw new Error(`Invalid goal: ${input.goal}`);
  }

  return Math.round(tdee * multiplier);
}

/**
 * Get BMI health assessment message
 * @param bmi - BMI value
 * @returns Health assessment message
 */
export function getBMIAssessment(bmi: number): string {
  const classification = classifyBMI(bmi);

  const assessments: Record<BMIClassification, string> = {
    'Underweight': 'You may need to gain weight for better health. Consult a healthcare provider.',
    'Normal weight': 'Your weight is in a healthy range.',
    'Overweight': 'You may benefit from lifestyle changes. Consider consulting a healthcare provider.',
    'Obese Class I': 'Health risks increase. Professional guidance is recommended.',
    'Obese Class II': 'Significant health risks. Please consult a healthcare provider.',
    'Obese Class III': 'Serious health risks. Immediate consultation with a healthcare provider is recommended.',
  };

  return assessments[classification];
}
