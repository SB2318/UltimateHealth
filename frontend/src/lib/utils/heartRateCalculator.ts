/**
 * Karvonen Formula based Target Heart Rate Zones Calculator.
 */

export interface HeartRateZoneInput {
  ageYears: number;
  restingHeartRate: number;
}

export interface HeartRateZone {
  name: string;
  intensity: string;
  minBpm: number;
  maxBpm: number;
  description: string;
}

export interface HeartRateCalculationResult {
  maxHeartRate: number;
  heartRateReserve: number;
  zones: HeartRateZone[];
}

/**
 * Calculates target heart rate training zones using the Karvonen method.
 * Target Heart Rate = ((Max HR − Resting HR) × % Intensity) + Resting HR
 */
export function calculateHeartRateZones(input: HeartRateZoneInput): HeartRateCalculationResult {
  const { ageYears, restingHeartRate } = input;

  if (ageYears <= 0 || ageYears > 120) {
    throw new Error('Age must be between 1 and 120');
  }
  if (restingHeartRate < 30 || restingHeartRate > 150) {
    throw new Error('Resting heart rate must be within a realistic physiological range (30-150 bpm)');
  }

  // Standard formula: 220 - age
  const maxHeartRate = 220 - ageYears;
  const heartRateReserve = maxHeartRate - restingHeartRate;

  const calculateZoneBpm = (intensity: number) => Math.round((heartRateReserve * intensity) + restingHeartRate);

  const zones: HeartRateZone[] = [
    {
      name: 'Zone 1: Very Light',
      intensity: '50% - 60%',
      minBpm: calculateZoneBpm(0.50),
      maxBpm: calculateZoneBpm(0.60),
      description: 'Active recovery, warm-up, and cool-down.'
    },
    {
      name: 'Zone 2: Light (Fat Burn)',
      intensity: '60% - 70%',
      minBpm: calculateZoneBpm(0.60),
      maxBpm: calculateZoneBpm(0.70),
      description: 'Aerobic base building, endurance, and optimal fat oxidation.'
    },
    {
      name: 'Zone 3: Moderate (Aerobic)',
      intensity: '70% - 80%',
      minBpm: calculateZoneBpm(0.70),
      maxBpm: calculateZoneBpm(0.80),
      description: 'Improves cardiovascular efficiency and aerobic capacity.'
    },
    {
      name: 'Zone 4: Hard (Anaerobic)',
      intensity: '80% - 90%',
      minBpm: calculateZoneBpm(0.80),
      maxBpm: calculateZoneBpm(0.90),
      description: 'Lactate threshold training, boosts speed and anaerobic endurance.'
    },
    {
      name: 'Zone 5: Maximum',
      intensity: '90% - 100%',
      minBpm: calculateZoneBpm(0.90),
      maxBpm: maxHeartRate,
      description: 'Peak exertion, sprinting, and maximum neuromuscular capacity.'
    }
  ];

  return {
    maxHeartRate,
    heartRateReserve,
    zones
  };
}
