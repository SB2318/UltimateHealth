import {calculateHealthMetrics, getBmiCategory} from '../../../components/wellness/HealthCalculator';

describe('HealthCalculator', () => {
  it('calculates metric BMI and Mifflin-St Jeor BMR', () => {
    const result = calculateHealthMetrics(170, 70, 30, 'female', 'metric');

    expect(result.bmi).toBeCloseTo(24.2, 1);
    expect(result.bmr).toBeCloseTo(1451.5, 1);
  });

  it('converts imperial measurements before calculating', () => {
    const result = calculateHealthMetrics(66.93, 154.32, 30, 'male', 'imperial');

    expect(result.bmi).toBeCloseTo(24.2, 1);
    expect(result.bmr).toBeCloseTo(1617.5, 0);
  });

  it('labels BMI ranges for the result card', () => {
    expect(getBmiCategory(17)).toBe('Underweight');
    expect(getBmiCategory(22)).toBe('Healthy range');
    expect(getBmiCategory(27)).toBe('Overweight');
    expect(getBmiCategory(32)).toBe('Obesity range');
  });
});
