import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Alert
} from 'react-native';
import authAxios from '../helper/authAxios';
import { LOG_WELLNESS_METRICS } from '../helper/APIUtils';

type Mode = '4-7-8' | 'Box';
type Phase = 'Inhale' | 'Hold' | 'Exhale' | 'Hold (Empty)';

interface PhaseConfig {
  name: Phase;
  duration: number; // in seconds
  scale: number;
}

const MODES: Record<Mode, PhaseConfig[]> = {
  '4-7-8': [
    { name: 'Inhale', duration: 4, scale: 1.5 },
    { name: 'Hold', duration: 7, scale: 1.5 },
    { name: 'Exhale', duration: 8, scale: 1.0 },
  ],
  'Box': [
    { name: 'Inhale', duration: 4, scale: 1.5 },
    { name: 'Hold', duration: 4, scale: 1.5 },
    { name: 'Exhale', duration: 4, scale: 1.0 },
    { name: 'Hold (Empty)', duration: 4, scale: 1.0 },
  ],
};

interface BreathingToolProps {
  defaultCycles?: number;
}

export default function BreathingTool({ defaultCycles = 5 }: BreathingToolProps) {
  const [selectedMode, setSelectedMode] = useState<Mode>('4-7-8');
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [phaseRemaining, setPhaseRemaining] = useState(0);
  
  const [sessionElapsed, setSessionElapsed] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  
  const [isCompleted, setIsCompleted] = useState(false);

  const animatedScale = useRef(new Animated.Value(1)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize phase when mode changes or tool resets
  useEffect(() => {
    if (!isRunning && !isPaused) {
      setCurrentPhaseIndex(0);
      setPhaseRemaining(MODES[selectedMode][0].duration);
      setSessionElapsed(0);
      setCompletedCycles(0);
      animatedScale.setValue(1);
    }
  }, [selectedMode, isRunning, isPaused, animatedScale]);

  const currentPhaseConfig = MODES[selectedMode][currentPhaseIndex];

  // Timer effect handles the countdown, phase transitions, and cycle tracking
  useEffect(() => {
    if (isRunning && !isPaused) {
      timerRef.current = setInterval(() => {
        setSessionElapsed(prev => prev + 1);
        
        setPhaseRemaining(prev => {
          if (prev <= 1) {
            // Phase is complete, calculate the next phase index
            const nextPhaseIndex = (currentPhaseIndex + 1) % MODES[selectedMode].length;
            
            // If the next phase is 0, a full breathing cycle has been completed
            if (nextPhaseIndex === 0) {
              setCompletedCycles(c => {
                const newCycles = c + 1;
                // If target cycles are reached, automatically complete the session
                if (newCycles >= defaultCycles) {
                  handleCompleteSession();
                }
                return newCycles;
              });
            }
            
            setCurrentPhaseIndex(nextPhaseIndex);
            
            // Trigger the breathing circle animation for the newly entered phase
            const nextConfig = MODES[selectedMode][nextPhaseIndex];
            Animated.timing(animatedScale, {
              toValue: nextConfig.scale,
              duration: nextConfig.duration * 1000,
              easing: Easing.linear,
              useNativeDriver: true,
            }).start();
            
            // Reset the phase countdown timer
            return nextConfig.duration;
          }
          // Decrement remaining seconds
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, isPaused, currentPhaseIndex, selectedMode, animatedScale]);

  const handleStart = () => {
    setIsCompleted(false);
    setIsRunning(true);
    setIsPaused(false);
    
    const config = MODES[selectedMode][currentPhaseIndex];
    Animated.timing(animatedScale, {
      toValue: config.scale,
      duration: phaseRemaining * 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const handlePause = () => {
    setIsPaused(true);
    animatedScale.stopAnimation();
  };

  const handleResume = () => {
    setIsPaused(false);
    const config = MODES[selectedMode][currentPhaseIndex];
    Animated.timing(animatedScale, {
      toValue: config.scale,
      duration: phaseRemaining * 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const submitSessionData = async (seconds: number) => {
    // Round up to ensure any session > 0s logs at least 1 minute
    const minutes = Math.ceil(seconds / 60);
    if (minutes > 0) {
      try {
        await authAxios.post(LOG_WELLNESS_METRICS, {
          breathingSessionMinutes: minutes,
        });
      } catch (error) {
        console.error('Failed to log wellness metrics:', error);
        Alert.alert('Session Log Failed', 'We could not save your breathing session metrics. Please check your network connection.');
      }
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    animatedScale.stopAnimation();
    submitSessionData(sessionElapsed);
  };

  const handleCompleteSession = () => {
    setIsRunning(false);
    setIsPaused(false);
    setIsCompleted(true);
    animatedScale.stopAnimation();
    submitSessionData(sessionElapsed + 1); // +1 because the last tick is about to execute
  };

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (isCompleted) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>🎉 Session Complete!</Text>
        <Text style={styles.summaryText}>
          You completed {defaultCycles} cycles of {selectedMode} breathing.
        </Text>
        <Text style={styles.summaryText}>Total Time: {formatTime(sessionElapsed)}</Text>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => {
            setIsCompleted(false);
            setSessionElapsed(0);
            setCompletedCycles(0);
          }}
          accessibilityRole="button"
          accessibilityLabel="Done button"
        >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.card} accessible={true} accessibilityLabel="Guided Breathing Tool">
      <Text style={styles.title}>🧘 Guided Breathing</Text>
      
      {!isRunning && !isPaused && (
        <View style={styles.modeSelector}>
          {(Object.keys(MODES) as Mode[]).map(mode => (
            <TouchableOpacity
              key={mode}
              style={[
                styles.modeButton,
                selectedMode === mode && styles.modeButtonActive
              ]}
              onPress={() => setSelectedMode(mode)}
              accessibilityRole="button"
              accessibilityLabel={`${mode} breathing mode`}
              accessibilityState={{ selected: selectedMode === mode }}
            >
              <Text style={[
                styles.modeText,
                selectedMode === mode && styles.modeTextActive
              ]}>{mode}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            styles.breathingCircle,
            { transform: [{ scale: animatedScale }] }
          ]}
        />
        <View style={styles.phaseContainer}>
          <Text style={styles.phaseText}>{currentPhaseConfig.name}</Text>
          <Text style={styles.countdownText}>{phaseRemaining}s</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statText}>Cycle {Math.min(completedCycles + 1, defaultCycles)} / {defaultCycles}</Text>
        <Text style={styles.statText}>Elapsed: {formatTime(sessionElapsed)}</Text>
      </View>

      <View style={styles.controls}>
        {!isRunning ? (
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={handleStart}
            accessibilityRole="button"
            accessibilityLabel="Start breathing session"
          >
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <>
            {isPaused ? (
              <TouchableOpacity 
                style={styles.primaryButton} 
                onPress={handleResume}
                accessibilityRole="button"
                accessibilityLabel="Resume breathing session"
              >
                <Text style={styles.buttonText}>Resume</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={styles.secondaryButton} 
                onPress={handlePause}
                accessibilityRole="button"
                accessibilityLabel="Pause breathing session"
              >
                <Text style={styles.secondaryButtonText}>Pause</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              style={[styles.secondaryButton, styles.stopButton]} 
              onPress={handleStop}
              accessibilityRole="button"
              accessibilityLabel="Stop breathing session"
            >
              <Text style={styles.stopButtonText}>Stop</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 0.5,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  modeSelector: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
    width: '100%',
  },
  modeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  modeButtonActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  modeText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  modeTextActive: {
    color: '#378ADD',
    fontWeight: '600',
  },
  circleContainer: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  breathingCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(55, 138, 221, 0.2)',
    position: 'absolute',
  },
  phaseContainer: {
    alignItems: 'center',
  },
  phaseText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  countdownText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#378ADD',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  statText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  controls: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#378ADD',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  stopButton: {
    borderColor: '#ff4d4f',
    backgroundColor: '#fff0f0',
  },
  stopButtonText: {
    color: '#ff4d4f',
    fontSize: 16,
    fontWeight: '600',
  },
  summaryText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
    textAlign: 'center',
  }
});
