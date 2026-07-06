/**
 * Unit tests for health metric calculators
 * Tests all calculator functions with known correct values and edge cases
 */

import {
  calculateBMI,
  classifyBMI,
  calculateBMR,
  calculateTDEE,
  calculateCaloricNeeds,
  getBMIAssessment,
  type BMRInput,
  type TDEEInput,
  type CaloricNeedsInput,
} from '../calculators';

describe('calculateBMI', () => {
  test('calculates BMI correctly for normal weight adult', () => {
    const result = calculateBMI({ weightKg: 70, heightCm: 175 });
    expect(result).toBeCloseTo(22.86, 1);
  });

  test('calculates BMI correctly for underweight person', () => {
    const result = calculateBMI({ weightKg: 50, heightCm: 170 });
    expect(result).toBeCloseTo(17.3, 1);
  });

  test('calculates BMI correctly for overweight person', () => {
    const result = calculateBMI({ weightKg: 90, heightCm: 175 });
    expect(result).toBeCloseTo(29.39, 1);
  });

  test('calculates BMI correctly for obese person', () => {
    const result = calculateBMI({ weightKg: 100, heightCm: 175 });
    expect(result).toBeCloseTo(32.7, 1);
  });

  test('returns rounded value to 1 decimal place', () => {
    const result = calculateBMI({ weightKg: 72.5, heightCm: 176.3 });
    expect(result).toBe(Math.round(result * 10) / 10);
  });

  test('throws error for zero weight', () => {
    expect(() => calculateBMI({ weightKg: 0, heightCm: 175 })).toThrow('Weight must be greater than 0');
  });

  test('throws error for negative weight', () => {
    expect(() => calculateBMI({ weightKg: -50, heightCm: 175 })).toThrow('Weight must be greater than 0');
  });

  test('throws error for zero height', () => {
    expect(() => calculateBMI({ weightKg: 70, heightCm: 0 })).toThrow('Height must be greater than 0');
  });

  test('throws error for negative height', () => {
    expect(() => calculateBMI({ weightKg: 70, heightCm: -175 })).toThrow('Height must be greater than 0');
  });

  test('handles very small values correctly', () => {
    const result = calculateBMI({ weightKg: 0.5, heightCm: 50 });
    expect(result).toBeGreaterThan(0);
  });

  test('handles very large values correctly', () => {
    const result = calculateBMI({ weightKg: 150, heightCm: 200 });
    expect(result).toBeGreaterThan(0);
  });
});

describe('classifyBMI', () => {
  test('classifies underweight (BMI < 18.5)', () => {
    expect(classifyBMI(18.4)).toBe('Underweight');
    expect(classifyBMI(17.0)).toBe('Underweight');
  });

  test('classifies normal weight (18.5 <= BMI < 25)', () => {
    expect(classifyBMI(18.5)).toBe('Normal weight');
    expect(classifyBMI(22.0)).toBe('Normal weight');
    expect(classifyBMI(24.9)).toBe('Normal weight');
  });

  test('classifies overweight (25 <= BMI < 30)', () => {
    expect(classifyBMI(25.0)).toBe('Overweight');
    expect(classifyBMI(27.5)).toBe('Overweight');
    expect(classifyBMI(29.9)).toBe('Overweight');
  });

  test('classifies obese class I (30 <= BMI < 35)', () => {
    expect(classifyBMI(30.0)).toBe('Obese Class I');
    expect(classifyBMI(32.5)).toBe('Obese Class I');
    expect(classifyBMI(34.9)).toBe('Obese Class I');
  });

  test('classifies obese class II (35 <= BMI < 40)', () => {
    expect(classifyBMI(35.0)).toBe('Obese Class II');
    expect(classifyBMI(37.5)).toBe('Obese Class II');
    expect(classifyBMI(39.9)).toBe('Obese Class II');
  });

  test('classifies obese class III (BMI >= 40)', () => {
    expect(classifyBMI(40.0)).toBe('Obese Class III');
    expect(classifyBMI(45.0)).toBe('Obese Class III');
    expect(classifyBMI(50.0)).toBe('Obese Class III');
  });
});

describe('calculateBMR', () => {
  test('calculates BMR correctly for adult male', () => {
    // 30-year-old male, 70kg, 175cm
    const result = calculateBMR({
      weightKg: 70,
      heightCm: 175,
      ageYears: 30,
      sex: 'male',
    });
    // Expected: 10*70 + 6.25*175 - 5*30 + 5 = 700 + 1093.75 - 150 + 5 = 1648.75 ≈ 1649
    expect(result).toBeCloseTo(1649, 0);
  });

  test('calculates BMR correctly for adult female', () => {
    // 30-year-old female, 65kg, 165cm
    const result = calculateBMR({
      weightKg: 65,
      heightCm: 165,
      ageYears: 30,
      sex: 'female',
    });
    // Expected: 10*65 + 6.25*165 - 5*30 - 161 = 650 + 1031.25 - 150 - 161 = 1370.25 ≈ 1370
    expect(result).toBeCloseTo(1370, 0);
  });

  test('BMR is higher for males than females with same stats', () => {
    const maleInput: BMRInput = {
      weightKg: 70,
      heightCm: 175,
      ageYears: 30,
      sex: 'male',
    };
    const femaleInput: BMRInput = {
      weightKg: 70,
      heightCm: 175,
      ageYears: 30,
      sex: 'female',
    };

    const maleBMR = calculateBMR(maleInput);
    const femaleBMR = calculateBMR(femaleInput);

    expect(maleBMR).toBeGreaterThan(femaleBMR);
  });

  test('BMR increases with weight', () => {
    const lightInput: BMRInput = {
      weightKg: 60,
      heightCm: 175,
      ageYears: 30,
      sex: 'male',
    };
    const heavyInput: BMRInput = {
      weightKg: 80,
      heightCm: 175,
      ageYears: 30,
      sex: 'male',
    };

    const lightBMR = calculateBMR(lightInput);
    const heavyBMR = calculateBMR(heavyInput);

    expect(heavyBMR).toBeGreaterThan(lightBMR);
  });

  test('BMR increases with height', () => {
    const shortInput: BMRInput = {
      weightKg: 70,
      heightCm: 160,
      ageYears: 30,
      sex: 'male',
    };
    const tallInput: BMRInput = {
      weightKg: 70,
      heightCm: 190,
      ageYears: 30,
      sex: 'male',
    };

    const shortBMR = calculateBMR(shortInput);
    const tallBMR = calculateBMR(tallInput);

    expect(tallBMR).toBeGreaterThan(shortBMR);
  });

  test('BMR decreases with age', () => {
    const youngInput: BMRInput = {
      weightKg: 70,
      heightCm: 175,
      ageYears: 20,
      sex: 'male',
    };
    const oldInput: BMRInput = {
      weightKg: 70,
      heightCm: 175,
      ageYears: 50,
      sex: 'male',
    };

    const youngBMR = calculateBMR(youngInput);
    const oldBMR = calculateBMR(oldInput);

    expect(youngBMR).toBeGreaterThan(oldBMR);
  });

  test('returns integer value', () => {
    const result = calculateBMR({
      weightKg: 70,
      heightCm: 175,
      ageYears: 30,
      sex: 'male',
    });

    expect(Number.isInteger(result)).toBe(true);
  });

  test('throws error for zero weight', () => {
    expect(() =>
      calculateBMR({ weightKg: 0, heightCm: 175, ageYears: 30, sex: 'male' })
    ).toThrow('Weight must be greater than 0');
  });

  test('throws error for zero height', () => {
    expect(() =>
      calculateBMR({ weightKg: 70, heightCm: 0, ageYears: 30, sex: 'male' })
    ).toThrow('Height must be greater than 0');
  });

  test('throws error for zero age', () => {
    expect(() =>
      calculateBMR({ weightKg: 70, heightCm: 175, ageYears: 0, sex: 'male' })
    ).toThrow('Age must be between 1 and 150');
  });

  test('throws error for negative age', () => {
    expect(() =>
      calculateBMR({ weightKg: 70, heightCm: 175, ageYears: -30, sex: 'male' })
    ).toThrow('Age must be between 1 and 150');
  });

  test('throws error for age > 150', () => {
    expect(() =>
      calculateBMR({ weightKg: 70, heightCm: 175, ageYears: 151, sex: 'male' })
    ).toThrow('Age must be between 1 and 150');
  });

  test('accepts age 1 (minimum valid age)', () => {
    const result = calculateBMR({
      weightKg: 10,
      heightCm: 100,
      ageYears: 1,
      sex: 'male',
    });

    expect(result).toBeGreaterThan(0);
  });

  test('accepts age 150 (maximum valid age)', () => {
    const result = calculateBMR({
      weightKg: 70,
      heightCm: 175,
      ageYears: 150,
      sex: 'male',
    });

    expect(result).toBeGreaterThan(0);
  });
});

describe('calculateTDEE', () => {
  const baseInput: TDEEInput = {
    weightKg: 70,
    heightCm: 175,
    ageYears: 30,
    sex: 'male',
    activityLevel: 'moderately-active',
  };

  test('calculates TDEE correctly for sedentary person', () => {
    const input: TDEEInput = { ...baseInput, activityLevel: 'sedentary' };
    const result = calculateTDEE(input);
    const bmr = calculateBMR(input);

    expect(result).toBeCloseTo(bmr * 1.2, 0);
  });

  test('calculates TDEE correctly for lightly active person', () => {
    const input: TDEEInput = { ...baseInput, activityLevel: 'lightly-active' };
    const result = calculateTDEE(input);
    const bmr = calculateBMR(input);

    expect(result).toBeCloseTo(bmr * 1.375, 0);
  });

  test('calculates TDEE correctly for moderately active person', () => {
    const input: TDEEInput = { ...baseInput, activityLevel: 'moderately-active' };
    const result = calculateTDEE(input);
    const bmr = calculateBMR(input);

    expect(result).toBeCloseTo(bmr * 1.55, 0);
  });

  test('calculates TDEE correctly for very active person', () => {
    const input: TDEEInput = { ...baseInput, activityLevel: 'very-active' };
    const result = calculateTDEE(input);
    const bmr = calculateBMR(input);

    expect(result).toBeCloseTo(bmr * 1.725, 0);
  });

  test('calculates TDEE correctly for extremely active person', () => {
    const input: TDEEInput = { ...baseInput, activityLevel: 'extremely-active' };
    const result = calculateTDEE(input);
    const bmr = calculateBMR(input);

    expect(result).toBeCloseTo(bmr * 1.9, 0);
  });

  test('TDEE increases with activity level', () => {
    const sedentaryTDEE = calculateTDEE({ ...baseInput, activityLevel: 'sedentary' });
    const activeTDEE = calculateTDEE({ ...baseInput, activityLevel: 'extremely-active' });

    expect(activeTDEE).toBeGreaterThan(sedentaryTDEE);
  });

  test('returns integer value', () => {
    const result = calculateTDEE(baseInput);
    expect(Number.isInteger(result)).toBe(true);
  });

  test('throws error for invalid activity level', () => {
    const input: any = { ...baseInput, activityLevel: 'invalid-level' };
    expect(() => calculateTDEE(input)).toThrow('Invalid activity level');
  });

  test('TDEE is always greater than BMR', () => {
    const tdee = calculateTDEE(baseInput);
    const bmr = calculateBMR(baseInput);

    expect(tdee).toBeGreaterThan(bmr);
  });
});

describe('calculateCaloricNeeds', () => {
  const baseInput: CaloricNeedsInput = {
    weightKg: 70,
    heightCm: 175,
    ageYears: 30,
    sex: 'male',
    activityLevel: 'moderately-active',
    goal: 'maintain',
  };

  test('calculates maintenance calories correctly', () => {
    const input: CaloricNeedsInput = { ...baseInput, goal: 'maintain' };
    const result = calculateCaloricNeeds(input);
    const tdee = calculateTDEE(input);

    expect(result).toBeCloseTo(tdee, 0);
  });

  test('calculates weight loss calories correctly', () => {
    const input: CaloricNeedsInput = { ...baseInput, goal: 'lose' };
    const result = calculateCaloricNeeds(input);
    const tdee = calculateTDEE(input);

    expect(result).toBeCloseTo(tdee * 0.85, 0);
  });

  test('calculates weight gain calories correctly', () => {
    const input: CaloricNeedsInput = { ...baseInput, goal: 'gain' };
    const result = calculateCaloricNeeds(input);
    const tdee = calculateTDEE(input);

    expect(result).toBeCloseTo(tdee * 1.1, 0);
  });

  test('weight loss calories are less than maintenance', () => {
    const maintenance = calculateCaloricNeeds({ ...baseInput, goal: 'maintain' });
    const loss = calculateCaloricNeeds({ ...baseInput, goal: 'lose' });

    expect(loss).toBeLessThan(maintenance);
  });

  test('weight gain calories are greater than maintenance', () => {
    const maintenance = calculateCaloricNeeds({ ...baseInput, goal: 'maintain' });
    const gain = calculateCaloricNeeds({ ...baseInput, goal: 'gain' });

    expect(gain).toBeGreaterThan(maintenance);
  });

  test('returns integer value', () => {
    const result = calculateCaloricNeeds(baseInput);
    expect(Number.isInteger(result)).toBe(true);
  });

  test('throws error for invalid goal', () => {
    const input: any = { ...baseInput, goal: 'invalid-goal' };
    expect(() => calculateCaloricNeeds(input)).toThrow('Invalid goal');
  });

  test('loss goal creates significant caloric deficit', () => {
    const maintenance = calculateCaloricNeeds({ ...baseInput, goal: 'maintain' });
    const loss = calculateCaloricNeeds({ ...baseInput, goal: 'lose' });

    const deficit = maintenance - loss;
    expect(deficit).toBeGreaterThan(300);
    expect(deficit).toBeLessThan(500);
  });

  test('gain goal creates ~300 kcal surplus', () => {
    const maintenance = calculateCaloricNeeds({ ...baseInput, goal: 'maintain' });
    const gain = calculateCaloricNeeds({ ...baseInput, goal: 'gain' });

    const surplus = gain - maintenance;
    expect(surplus).toBeCloseTo(300, -2); // Within 100 kcal
  });
});

describe('getBMIAssessment', () => {
  test('returns appropriate message for underweight', () => {
    const assessment = getBMIAssessment(17.5);
    expect(assessment).toContain('gain weight');
  });

  test('returns appropriate message for normal weight', () => {
    const assessment = getBMIAssessment(22.0);
    expect(assessment).toContain('healthy range');
  });

  test('returns appropriate message for overweight', () => {
    const assessment = getBMIAssessment(27.5);
    expect(assessment).toContain('lifestyle changes');
  });

  test('returns appropriate message for obese class I', () => {
    const assessment = getBMIAssessment(32.5);
    expect(assessment).toContain('Health risks');
  });

  test('returns appropriate message for obese class II', () => {
    const assessment = getBMIAssessment(37.5);
    expect(assessment).toContain('Significant health risks');
  });

  test('returns appropriate message for obese class III', () => {
    const assessment = getBMIAssessment(42.0);
    expect(assessment).toContain('Serious health risks');
  });

  test('returns non-empty string', () => {
    const assessment = getBMIAssessment(25.0);
    expect(assessment).toBeTruthy();
    expect(typeof assessment).toBe('string');
  });
});

describe('Integration tests: BMI → Classification → Assessment', () => {
  test('full workflow for normal weight person', () => {
    const bmi = calculateBMI({ weightKg: 70, heightCm: 175 });
    const classification = classifyBMI(bmi);
    const assessment = getBMIAssessment(bmi);

    expect(bmi).toBeCloseTo(22.86, 1);
    expect(classification).toBe('Normal weight');
    expect(assessment).toContain('healthy range');
  });

  test('full workflow for underweight person', () => {
    const bmi = calculateBMI({ weightKg: 50, heightCm: 170 });
    const classification = classifyBMI(bmi);
    const assessment = getBMIAssessment(bmi);

    expect(bmi).toBeCloseTo(17.3, 1);
    expect(classification).toBe('Underweight');
    expect(assessment).toContain('gain weight');
  });

  test('full workflow for obese person', () => {
    const bmi = calculateBMI({ weightKg: 100, heightCm: 170 });
    const classification = classifyBMI(bmi);
    const assessment = getBMIAssessment(bmi);

    expect(bmi).toBeCloseTo(34.6, 1);
    expect(classification).toBe('Obese Class I');
    expect(assessment).toContain('Health risks');
  });
});

describe('Integration tests: Full health metrics workflow', () => {
  test('complete health assessment for 30-year-old male', () => {
    const bmi = calculateBMI({ weightKg: 75, heightCm: 180 });
    const bmr = calculateBMR({
      weightKg: 75,
      heightCm: 180,
      ageYears: 30,
      sex: 'male',
    });
    const tdee = calculateTDEE({
      weightKg: 75,
      heightCm: 180,
      ageYears: 30,
      sex: 'male',
      activityLevel: 'moderately-active',
    });
    const caloriesForWeightLoss = calculateCaloricNeeds({
      weightKg: 75,
      heightCm: 180,
      ageYears: 30,
      sex: 'male',
      activityLevel: 'moderately-active',
      goal: 'lose',
    });

    expect(bmi).toBeCloseTo(23.15, 1);
    expect(bmr).toBeGreaterThan(1600);
    expect(tdee).toBeGreaterThan(bmr);
    expect(caloriesForWeightLoss).toBeLessThan(tdee);

    const bmiClassification = classifyBMI(bmi);
    expect(bmiClassification).toBe('Normal weight');
  });

  test('complete health assessment for 25-year-old female', () => {
    const bmi = calculateBMI({ weightKg: 60, heightCm: 165 });
    const bmr = calculateBMR({
      weightKg: 60,
      heightCm: 165,
      ageYears: 25,
      sex: 'female',
    });
    const tdee = calculateTDEE({
      weightKg: 60,
      heightCm: 165,
      ageYears: 25,
      sex: 'female',
      activityLevel: 'lightly-active',
    });
    const caloriesForWeightGain = calculateCaloricNeeds({
      weightKg: 60,
      heightCm: 165,
      ageYears: 25,
      sex: 'female',
      activityLevel: 'lightly-active',
      goal: 'gain',
    });

    expect(bmi).toBeCloseTo(22.04, 1);
    expect(bmr).toBeGreaterThan(1200);
    expect(tdee).toBeGreaterThan(bmr);
    expect(caloriesForWeightGain).toBeGreaterThan(tdee);

    const bmiClassification = classifyBMI(bmi);
    expect(bmiClassification).toBe('Normal weight');
  });
});
