import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GlassContainer} from './GlassContainer';
import {GlassButton} from './GlassButton';
import {
  ProfessionalColors,
  Typography,
  Spacing,
  BorderRadius,
} from '../styles/GlassStyles';
import {PRIMARY_COLOR} from '../helper/Theme';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

// Challenge categories with colors and icons
type ChallengeCategory = 'Physical' | 'Nutrition' | 'Mindfulness' | 'Sleep' | 'Social';

interface ChallengeCategoryConfig {
  color: string;
  icon: string;
  glassColor: string;
}

const CATEGORY_CONFIG: Record<ChallengeCategory, ChallengeCategoryConfig> = {
  Physical: {
    color: '#10B981',
    icon: '🏃',
    glassColor: 'rgba(16, 185, 129, 0.15)',
  },
  Nutrition: {
    color: '#F59E0B',
    icon: '🥗',
    glassColor: 'rgba(245, 158, 11, 0.15)',
  },
  Mindfulness: {
    color: '#8B5CF6',
    icon: '🧘',
    glassColor: 'rgba(139, 92, 246, 0.15)',
  },
  Sleep: {
    color: '#3B82F6',
    icon: '🌙',
    glassColor: 'rgba(59, 130, 246, 0.15)',
  },
  Social: {
    color: '#EC4899',
    icon: '🤝',
    glassColor: 'rgba(236, 72, 153, 0.15)',
  },
};

// 30 unique daily wellness challenges
const WELLNESS_CHALLENGES: {
  category: ChallengeCategory;
  title: string;
  description: string;
  duration: string;
}[] = [
  {category: 'Physical', title: '10-Minute Walk', description: 'Take a refreshing 10-minute walk outside. Feel the breeze and clear your mind.', duration: '10 min'},
  {category: 'Nutrition', title: 'Rainbow Plate', description: 'Eat at least 3 different colored fruits or vegetables today. Variety fuels vitality.', duration: 'All day'},
  {category: 'Mindfulness', title: '5-Breath Reset', description: 'Pause and take 5 deep, slow breaths. Focus only on the air flowing in and out.', duration: '2 min'},
  {category: 'Sleep', title: 'Screen Sunset', description: 'Turn off all screens 30 minutes before bedtime tonight. Let your mind naturally unwind.', duration: '30 min'},
  {category: 'Social', title: 'Gratitude Message', description: 'Send a heartfelt thank-you message to someone who made your day better recently.', duration: '5 min'},
  {category: 'Physical', title: 'Desk Stretch', description: 'Do a full-body stretch routine at your desk every 2 hours today. Release the tension.', duration: '5 min x3'},
  {category: 'Nutrition', title: 'Hydration Hero', description: 'Drink 8 glasses of water throughout the day. Set hourly reminders if needed.', duration: 'All day'},
  {category: 'Mindfulness', title: 'Mindful Eating', description: 'Eat one meal today without any distractions. Notice every flavor and texture.', duration: '20 min'},
  {category: 'Sleep', title: 'Sleep Sanctuary', description: 'Make your bedroom pitch-dark and cool tonight. Optimize your sleep environment.', duration: 'Evening'},
  {category: 'Social', title: 'Deep Listening', description: 'Have a conversation where you focus entirely on listening, not planning your response.', duration: '15 min'},
  {category: 'Physical', title: 'Stair Climber', description: 'Take the stairs instead of the elevator at least 3 times today. Small steps, big impact.', duration: 'All day'},
  {category: 'Nutrition', title: 'Herbal Tea Time', description: 'Replace one caffeinated drink with a calming herbal tea today. Your body will thank you.', duration: '10 min'},
  {category: 'Mindfulness', title: 'Body Scan', description: 'Lie down and mentally scan your body from toes to head, releasing tension as you go.', duration: '10 min'},
  {category: 'Sleep', title: 'Journal Wind-Down', description: 'Write down 3 things that went well today before bed. End the day on a positive note.', duration: '10 min'},
  {category: 'Social', title: 'Compliment Spark', description: 'Give 3 genuine compliments to people around you today. Watch their face light up.', duration: 'All day'},
  {category: 'Physical', title: 'Wall Sit Challenge', description: 'Hold a wall sit for 30 seconds, 3 times today. Build lower body strength gradually.', duration: '2 min x3'},
  {category: 'Nutrition', title: 'Green Boost', description: 'Add a serving of leafy greens to one meal today. Spinach, kale, or arugula — your choice.', duration: 'Any meal'},
  {category: 'Mindfulness', title: 'One-Minute Pause', description: 'Set 3 random alarms. When each rings, pause for 60 seconds of pure awareness.', duration: '1 min x3'},
  {category: 'Sleep', title: 'Breathing Lullaby', description: 'Try 4-7-8 breathing before sleep: inhale 4s, hold 7s, exhale 8s. Repeat 4 times.', duration: '5 min'},
  {category: 'Social', title: 'Digital Detox Chat', description: 'Have a 15-minute phone-free conversation with someone. Real connection, no distractions.', duration: '15 min'},
  {category: 'Physical', title: 'Calf Raises', description: 'Do 20 calf raises while waiting in line or cooking today. Sneaky strength building.', duration: '2 min'},
  {category: 'Nutrition', title: 'Mindful Morning', description: 'Start your day with warm lemon water before anything else. Awaken your digestion gently.', duration: '5 min'},
  {category: 'Mindfulness', title: 'Gratitude Snapshot', description: 'Take a mental photo of one beautiful thing you see today. Hold it in your mind for 30 seconds.', duration: '1 min'},
  {category: 'Sleep', title: 'Progressive Relax', description: 'Tense and release each muscle group from feet to face. Full body relaxation before sleep.', duration: '15 min'},
  {category: 'Social', title: 'Kindness Ripple', description: 'Do one unexpected act of kindness for a stranger today. Small ripples make big waves.', duration: 'Any time'},
  {category: 'Physical', title: 'Morning Dance', description: 'Dance to your favorite song as soon as you wake up. Start the day with joy and movement.', duration: '5 min'},
  {category: 'Nutrition', title: 'Snack Swap', description: 'Replace one processed snack with a whole food alternative today. Nuts, fruit, or yogurt.', duration: 'Any time'},
  {category: 'Mindfulness', title: 'Sensory Walk', description: 'Walk for 5 minutes noticing only what you hear. Then 5 minutes noticing only what you feel.', duration: '10 min'},
  {category: 'Sleep', title: 'Cool Down Routine', description: 'Take a warm shower 90 minutes before bed. The cool-down afterward signals sleep time.', duration: 'Evening'},
  {category: 'Social', title: 'Reconnection Call', description: 'Call someone you haven\'t spoken to in over a month. Reconnect and revive the bond.', duration: '15 min'},
];

// Storage keys
const STREAK_KEY = '@wellness_streak';
const LAST_COMPLETED_KEY = '@wellness_last_completed';
const CHALLENGE_HISTORY_KEY = '@wellness_challenge_history';

interface ChallengeHistoryEntry {
  date: string;
  challengeTitle: string;
  category: ChallengeCategory;
  completed: boolean;
}

interface DailyWellnessChallengeProps {
  onViewHistory?: () => void;
}

const DailyWellnessChallenge: React.FC<DailyWellnessChallengeProps> = ({
  onViewHistory,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isCompleted, setIsCompleted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [completingAnimation, setCompletingAnimation] = useState(false);

  // Animation values
  const scaleAnim = useState(new Animated.Value(1))[0];
  const checkmarkAnim = useState(new Animated.Value(0))[0];
  const sparkleAnim = useState(new Animated.Value(0))[0];
  const cardOpacity = useState(new Animated.Value(0))[0];

  // Get today's challenge based on day of year
  const todayChallenge = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const index = dayOfYear % WELLNESS_CHALLENGES.length;
    return WELLNESS_CHALLENGES[index];
  }, []);

  const categoryConfig = CATEGORY_CONFIG[todayChallenge.category];

  // Load streak and completion data
  const loadData = useCallback(async () => {
    try {
      const [savedStreak, lastCompleted] = await Promise.all([
        AsyncStorage.getItem(STREAK_KEY),
        AsyncStorage.getItem(LAST_COMPLETED_KEY),
      ]);

      const currentStreak = savedStreak ? parseInt(savedStreak, 10) : 0;
      setStreak(currentStreak);

      // Check if today's challenge is already completed
      const today = new Date().toISOString().split('T')[0];
      if (lastCompleted === today) {
        setIsCompleted(true);
      } else {
        setIsCompleted(false);
        // Check if streak should be reset (missed a day)
        if (lastCompleted) {
          const lastDate = new Date(lastCompleted);
          const todayDate = new Date(today);
          const diffDays = Math.floor(
            (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24),
          );
          if (diffDays > 1) {
            // Streak broken
            setStreak(0);
            await AsyncStorage.setItem(STREAK_KEY, '0');
          }
        }
      }

      // Animate card entrance
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.log('Error loading wellness data:', error);
    }
  }, [cardOpacity]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleComplete = useCallback(async () => {
    if (isCompleted || completingAnimation) return;

    setCompletingAnimation(true);

    // Scale animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 150,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();

    // Checkmark animation
    Animated.spring(checkmarkAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // Sparkle animation
    Animated.sequence([
      Animated.timing(sparkleAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(sparkleAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();

    try {
      const today = new Date().toISOString().split('T')[0];
      const newStreak = streak + 1;

      await Promise.all([
        AsyncStorage.setItem(STREAK_KEY, newStreak.toString()),
        AsyncStorage.setItem(LAST_COMPLETED_KEY, today),
      ]);

      // Save to challenge history
      const historyStr = await AsyncStorage.getItem(CHALLENGE_HISTORY_KEY);
      const history: ChallengeHistoryEntry[] = historyStr
        ? JSON.parse(historyStr)
        : [];
      history.push({
        date: today,
        challengeTitle: todayChallenge.title,
        category: todayChallenge.category,
        completed: true,
      });
      // Keep last 90 days
      const trimmedHistory = history.slice(-90);
      await AsyncStorage.setItem(
        CHALLENGE_HISTORY_KEY,
        JSON.stringify(trimmedHistory),
      );

      setStreak(newStreak);
      setIsCompleted(true);
    } catch (error) {
      console.log('Error saving wellness data:', error);
    }

    setTimeout(() => setCompletingAnimation(false), 800);
  }, [
    isCompleted,
    completingAnimation,
    scaleAnim,
    checkmarkAnim,
    sparkleAnim,
    streak,
    todayChallenge,
  ]);

  const getStreakMessage = () => {
    if (streak === 0) return 'Start your streak today!';
    if (streak === 1) return 'Great start! Keep going!';
    if (streak < 7) return `${streak} days strong! 🔥`;
    if (streak < 30) return `${streak} days! You're on fire! 🔥🔥`;
    return `${streak} days! Wellness warrior! 🔥🔥🔥`;
  };

  const checkmarkScale = checkmarkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const sparkleOpacity = sparkleAnim;
  const sparkleScale = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1.5],
  });

  return (
    <Animated.View style={{opacity: cardOpacity}}>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={onViewHistory}
        accessible
        accessibilityLabel="Daily wellness challenge card"
        accessibilityRole="button">
        <GlassContainer variant="elevated" style={styles.container}>
          <Animated.View style={{transform: [{scale: scaleAnim}]}}>
            {/* Header Row */}
            <View style={styles.headerRow}>
              <View style={styles.titleRow}>
                <Text style={styles.headerIcon}>✨</Text>
                <Text
                  style={[
                    styles.headerTitle,
                    {color: isDarkMode ? ProfessionalColors.white : ProfessionalColors.gray900},
                  ]}>
                  Daily Challenge
                </Text>
              </View>
              {/* Streak Badge */}
              <View
                style={[
                  styles.streakBadge,
                  {
                    backgroundColor: isDarkMode
                      ? 'rgba(245, 158, 11, 0.2)'
                      : 'rgba(245, 158, 11, 0.12)',
                    borderColor: 'rgba(245, 158, 11, 0.3)',
                  },
                ]}>
                <Text style={styles.streakIcon}>🔥</Text>
                <Text style={styles.streakCount}>{streak}</Text>
              </View>
            </View>

            {/* Category Badge */}
            <View
              style={[
                styles.categoryBadge,
                {backgroundColor: categoryConfig.glassColor},
              ]}>
              <Text style={styles.categoryIcon}>{categoryConfig.icon}</Text>
              <Text style={[styles.categoryText, {color: categoryConfig.color}]}>
                {todayChallenge.category}
              </Text>
              <View style={[styles.durationChip, {
                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              }]}>
                <Text style={[styles.durationText, {
                  color: isDarkMode ? ProfessionalColors.gray300 : ProfessionalColors.gray600,
                }]}>
                  {todayChallenge.duration}
                </Text>
              </View>
            </View>

            {/* Challenge Title */}
            <Text
              style={[
                styles.challengeTitle,
                {
                  color: isDarkMode ? ProfessionalColors.white : ProfessionalColors.gray900,
                },
              ]}>
              {todayChallenge.title}
            </Text>

            {/* Challenge Description */}
            <Text
              style={[
                styles.challengeDescription,
                {
                  color: isDarkMode ? ProfessionalColors.gray300 : ProfessionalColors.gray600,
                },
              ]}>
              {todayChallenge.description}
            </Text>

            {/* Action Area */}
            <View style={styles.actionRow}>
              {isCompleted ? (
                <View style={styles.completedRow}>
                  <Animated.View
                    style={[
                      styles.checkCircle,
                      {transform: [{scale: checkmarkScale}]},
                    ]}>
                    <Text style={styles.checkIcon}>✓</Text>
                  </Animated.View>
                  <Text
                    style={[
                      styles.completedText,
                      {color: ProfessionalColors.success},
                    ]}>
                    Challenge Complete!
                  </Text>
                  {/* Sparkle effect */}
                  <Animated.View
                    style={[
                      styles.sparkleContainer,
                      {opacity: sparkleOpacity, transform: [{scale: sparkleScale}]},
                    ]}>
                    <Text style={styles.sparkleEmoji}>✨</Text>
                  </Animated.View>
                </View>
              ) : (
                <GlassButton
                  title="Mark as Done"
                  onPress={handleComplete}
                  variant="primary"
                  size="sm"
                  borderRadius="lg"
                />
              )}
            </View>

            {/* Streak Message */}
            <Text
              style={[
                styles.streakMessage,
                {
                  color: isDarkMode ? ProfessionalColors.gray400 : ProfessionalColors.gray500,
                },
              ]}>
              {getStreakMessage()}
            </Text>

            {/* Weekly Progress Dots */}
            <View style={styles.weeklyRow}>
              {getWeekDays().map((day, i) => (
                <View key={i} style={styles.weekDayContainer}>
                  <View
                    style={[
                      styles.weekDot,
                      {
                        backgroundColor:
                          day.isToday
                            ? categoryConfig.color
                            : day.isPast
                            ? isDarkMode
                              ? 'rgba(255,255,255,0.15)'
                              : 'rgba(0,0,0,0.08)'
                            : isDarkMode
                            ? 'rgba(255,255,255,0.06)'
                            : 'rgba(0,0,0,0.03)',
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.weekDayLabel,
                      {
                        color: day.isToday
                          ? categoryConfig.color
                          : isDarkMode
                          ? ProfessionalColors.gray500
                          : ProfessionalColors.gray400,
                        fontWeight: day.isToday ? '700' : '400',
                      },
                    ]}>
                    {day.label}
                  </Text>
                </View>
              ))}
            </View>
          </Animated.View>
        </GlassContainer>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Helper to get week day info
const getWeekDays = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const today = new Date().getDay();
  return days.map((label, i) => ({
    label,
    isToday: i === today,
    isPast: i < today,
  }));
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
    padding: Spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  headerIcon: {
    fontSize: 20,
  },
  headerTitle: {
    ...Typography.h5,
    fontWeight: '700',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.xxl,
    borderWidth: 1,
    gap: 4,
  },
  streakIcon: {
    fontSize: 14,
  },
  streakCount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F59E0B',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.xxl,
    gap: 6,
    marginBottom: Spacing.md,
  },
  categoryIcon: {
    fontSize: 14,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
  },
  durationChip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.xl,
    marginLeft: 4,
  },
  durationText: {
    fontSize: 11,
    fontWeight: '500',
  },
  challengeTitle: {
    ...Typography.h4,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  challengeDescription: {
    ...Typography.bodySmall,
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  actionRow: {
    marginBottom: Spacing.sm,
  },
  completedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: ProfessionalColors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  completedText: {
    ...Typography.bodyMedium,
    fontWeight: '600',
  },
  sparkleContainer: {
    position: 'absolute',
    right: 0,
  },
  sparkleEmoji: {
    fontSize: 20,
  },
  streakMessage: {
    ...Typography.caption,
    fontStyle: 'italic',
    marginBottom: Spacing.md,
  },
  weeklyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
  },
  weekDayContainer: {
    alignItems: 'center',
    gap: 4,
  },
  weekDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  weekDayLabel: {
    fontSize: 10,
  },
});

export default DailyWellnessChallenge;
