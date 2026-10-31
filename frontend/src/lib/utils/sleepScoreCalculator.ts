/**
 * Sleep Quality Score and Architecture Assessment Utility.
 */

export interface SleepSessionInput {
  totalMinutesAsleep: number;
  deepSleepMinutes: number;
  remSleepMinutes: number;
  awakeningsCount: number;
  timeInBedMinutes: number;
}

export interface SleepAssessmentResult {
  score: number; // 0 to 100
  rating: 'Optimal' | 'Good' | 'Fair' | 'Poor';
  efficiencyPercentage: number;
  deepSleepPercentage: number;
  remSleepPercentage: number;
  recommendations: string[];
}

/**
 * Calculates a comprehensive sleep quality score (0 - 100) based on
 * duration, sleep architecture (deep & REM ratios), and sleep efficiency.
 */
export function calculateSleepQualityScore(input: SleepSessionInput): SleepAssessmentResult {
  const {
    totalMinutesAsleep,
    deepSleepMinutes,
    remSleepMinutes,
    awakeningsCount,
    timeInBedMinutes
  } = input;

  if (timeInBedMinutes <= 0 || totalMinutesAsleep <= 0) {
    throw new Error('Sleep duration and time in bed must be greater than zero');
  }

  // 1. Efficiency metric (Total Sleep Time / Time in Bed)
  const efficiencyPercentage = Math.min(100, Math.round((totalMinutesAsleep / timeInBedMinutes) * 100));

  // 2. Stages ratios
  const deepSleepPercentage = Math.round((deepSleepMinutes / totalMinutesAsleep) * 100);
  const remSleepPercentage = Math.round((remSleepMinutes / totalMinutesAsleep) * 100);

  // Scoring weights: Duration (40%), Efficiency (30%), Architecture (20%), Awakenings penalty (10%)
  let score = 0;

  // Duration component (optimal: 7-9 hours, i.e. 420-540 mins)
  if (totalMinutesAsleep >= 420 && totalMinutesAsleep <= 540) {
    score += 40;
  } else if (totalMinutesAsleep >= 360 && totalMinutesAsleep < 420) {
    score += 30;
  } else if (totalMinutesAsleep > 540 && totalMinutesAsleep <= 600) {
    score += 35;
  } else {
    score += 20;
  }

  // Efficiency component (optimal: >= 85%)
  if (efficiencyPercentage >= 90) {
    score += 30;
  } else if (efficiencyPercentage >= 85) {
    score += 25;
  } else if (efficiencyPercentage >= 75) {
    score += 15;
  } else {
    score += 8;
  }

  // Sleep Architecture component (Optimal deep: 15-25%, REM: 20-25%)
  if (deepSleepPercentage >= 15 && remSleepPercentage >= 20) {
    score += 20;
  } else if (deepSleepPercentage >= 10 || remSleepPercentage >= 15) {
    score += 12;
  } else {
    score += 5;
  }

  // Awakenings penalty
  const awakeningsPenalty = Math.min(10, awakeningsCount * 2);
  score += Math.max(0, 10 - awakeningsPenalty);

  score = Math.max(0, Math.min(100, Math.round(score)));

  let rating: SleepAssessmentResult['rating'] = 'Fair';
  const recommendations: string[] = [];

  if (score >= 88) {
    rating = 'Optimal';
    recommendations.push('Excellent restorative sleep rhythm.');
  } else if (score >= 75) {
    rating = 'Good';
    recommendations.push('Consistent sleep profile. Maintain current wind-down routine.');
  } else if (score >= 60) {
    rating = 'Fair';
    if (efficiencyPercentage < 85) {
      recommendations.push('Consider reducing screen time 1 hour before bed to boost sleep efficiency.');
    }
    if (deepSleepPercentage < 15) {
      recommendations.push('Light daytime exercise can help promote deeper slow-wave sleep.');
    }
  } else {
    rating = 'Poor';
    recommendations.push('Aim for a regular sleep/wake schedule to stabilize circadian rhythm.');
  }

  return {
    score,
    rating,
    efficiencyPercentage,
    deepSleepPercentage,
    remSleepPercentage,
    recommendations
  };
}
