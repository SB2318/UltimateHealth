import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GlassContainer} from '../components/GlassContainer';
import {
  ProfessionalColors,
  Typography,
  Spacing,
  BorderRadius,
} from '../styles/GlassStyles';
import {PRIMARY_COLOR} from '../helper/Theme';
import {StatusBar} from 'expo-status-bar';

// Challenge categories
type ChallengeCategory = 'Physical' | 'Nutrition' | 'Mindfulness' | 'Sleep' | 'Social';

interface ChallengeCategoryConfig {
  color: string;
  icon: string;
  glassColor: string;
}

const CATEGORY_CONFIG: Record<ChallengeCategory, ChallengeCategoryConfig> = {
  Physical: {color: '#10B981', icon: '🏃', glassColor: 'rgba(16, 185, 129, 0.15)'},
  Nutrition: {color: '#F59E0B', icon: '🥗', glassColor: 'rgba(245, 158, 11, 0.15)'},
  Mindfulness: {color: '#8B5CF6', icon: '🧘', glassColor: 'rgba(139, 92, 246, 0.15)'},
  Sleep: {color: '#3B82F6', icon: '🌙', glassColor: 'rgba(59, 130, 246, 0.15)'},
  Social: {color: '#EC4899', icon: '🤝', glassColor: 'rgba(236, 72, 153, 0.15)'},
};

interface ChallengeHistoryEntry {
  date: string;
  challengeTitle: string;
  category: ChallengeCategory;
  completed: boolean;
}

const WellnessChallengeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [history, setHistory] = useState<ChallengeHistoryEntry[]>([]);
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const loadData = useCallback(async () => {
    try {
      const [savedStreak, historyStr] = await Promise.all([
        AsyncStorage.getItem('@wellness_streak'),
        AsyncStorage.getItem('@wellness_challenge_history'),
      ]);

      if (savedStreak) {
        setStreak(parseInt(savedStreak, 10));
      }

      if (historyStr) {
        const parsed: ChallengeHistoryEntry[] = JSON.parse(historyStr);
        setHistory(parsed.reverse()); // Show newest first

        // Calculate longest streak
        let maxStreak = 0;
        let currentStreak = 0;
        const sorted = [...parsed].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        for (const entry of sorted) {
          if (entry.completed) {
            currentStreak++;
            maxStreak = Math.max(maxStreak, currentStreak);
          } else {
            currentStreak = 0;
          }
        }
        setLongestStreak(Math.max(maxStreak, parseInt(savedStreak || '0', 10)));
      }
    } catch (error) {
      console.log('Error loading wellness history:', error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Category stats
  const categoryStats = history.reduce(
    (acc, entry) => {
      if (entry.completed) {
        acc[entry.category] = (acc[entry.category] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  const totalCompleted = history.filter(e => e.completed).length;

  const renderHistoryItem = ({item}: {item: ChallengeHistoryEntry}) => {
    const config = CATEGORY_CONFIG[item.category];
    return (
      <GlassContainer variant="card" style={styles.historyCard}>
        <View style={styles.historyRow}>
          <View
            style={[
              styles.historyCategoryDot,
              {backgroundColor: config.color},
            ]}
          />
          <View style={styles.historyContent}>
            <Text
              style={[
                styles.historyTitle,
                {
                  color: isDarkMode
                    ? ProfessionalColors.white
                    : ProfessionalColors.gray900,
                },
              ]}>
              {config.icon} {item.challengeTitle}
            </Text>
            <Text
              style={[
                styles.historyDate,
                {
                  color: isDarkMode
                    ? ProfessionalColors.gray400
                    : ProfessionalColors.gray500,
                },
              ]}>
              {formatDate(item.date)}
            </Text>
          </View>
          {item.completed && (
            <View style={styles.completedDot}>
              <Text style={styles.completedCheck}>✓</Text>
            </View>
          )}
        </View>
      </GlassContainer>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#000A60' : '#F0F8FF'},
      ]}>
      <StatusBar
        style={isDarkMode ? 'light' : 'dark'}
        backgroundColor="#007AFF"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats Header */}
        <View style={styles.statsSection}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: isDarkMode
                  ? ProfessionalColors.white
                  : ProfessionalColors.gray900,
              },
            ]}>
            Your Wellness Journey
          </Text>

          <View style={styles.statsGrid}>
            <GlassContainer variant="card" style={styles.statCard}>
              <Text style={styles.statIcon}>🔥</Text>
              <Text
                style={[
                  styles.statValue,
                  {color: '#F59E0B'},
                ]}>
                {streak}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  {
                    color: isDarkMode
                      ? ProfessionalColors.gray400
                      : ProfessionalColors.gray500,
                  },
                ]}>
                Current Streak
              </Text>
            </GlassContainer>

            <GlassContainer variant="card" style={styles.statCard}>
              <Text style={styles.statIcon}>🏆</Text>
              <Text
                style={[
                  styles.statValue,
                  {color: ProfessionalColors.primary},
                ]}>
                {longestStreak}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  {
                    color: isDarkMode
                      ? ProfessionalColors.gray400
                      : ProfessionalColors.gray500,
                  },
                ]}>
                Best Streak
              </Text>
            </GlassContainer>

            <GlassContainer variant="card" style={styles.statCard}>
              <Text style={styles.statIcon}>✅</Text>
              <Text
                style={[
                  styles.statValue,
                  {color: ProfessionalColors.success},
                ]}>
                {totalCompleted}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  {
                    color: isDarkMode
                      ? ProfessionalColors.gray400
                      : ProfessionalColors.gray500,
                  },
                ]}>
                Completed
              </Text>
            </GlassContainer>
          </View>
        </View>

        {/* Category Breakdown */}
        {Object.keys(categoryStats).length > 0 && (
          <View style={styles.categorySection}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: isDarkMode
                    ? ProfessionalColors.white
                    : ProfessionalColors.gray900,
                },
              ]}>
              Category Breakdown
            </Text>
            <GlassContainer variant="card" style={styles.categoryContainer}>
              {(
                Object.entries(categoryStats) as [ChallengeCategory, number][]
              ).map(([category, count]) => {
                const config = CATEGORY_CONFIG[category];
                return (
                  <View key={category} style={styles.categoryRow}>
                    <Text style={styles.categoryRowIcon}>{config.icon}</Text>
                    <Text
                      style={[
                        styles.categoryRowName,
                        {
                          color: isDarkMode
                            ? ProfessionalColors.white
                            : ProfessionalColors.gray800,
                        },
                      ]}>
                      {category}
                    </Text>
                    <View style={styles.categoryBarBackground}>
                      <View
                        style={[
                          styles.categoryBarFill,
                          {
                            backgroundColor: config.color,
                            width: `${Math.min(
                              (count / Math.max(totalCompleted, 1)) * 100,
                              100,
                            )}%`,
                          },
                        ]}
                      />
                    </View>
                    <Text
                      style={[
                        styles.categoryRowCount,
                        {color: config.color},
                      ]}>
                      {count}
                    </Text>
                  </View>
                );
              })}
            </GlassContainer>
          </View>
        )}

        {/* Challenge History */}
        <View style={styles.historySection}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: isDarkMode
                  ? ProfessionalColors.white
                  : ProfessionalColors.gray900,
              },
            ]}>
            Recent Challenges
          </Text>
          {history.length > 0 ? (
            history.map((item, index) => (
              <View key={`${item.date}-${index}`}>
                {renderHistoryItem({item})}
              </View>
            ))
          ) : (
            <GlassContainer variant="card" style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🌱</Text>
              <Text
                style={[
                  styles.emptyTitle,
                  {
                    color: isDarkMode
                      ? ProfessionalColors.white
                      : ProfessionalColors.gray900,
                  },
                ]}>
                No challenges yet
              </Text>
              <Text
                style={[
                  styles.emptyDescription,
                  {
                    color: isDarkMode
                      ? ProfessionalColors.gray400
                      : ProfessionalColors.gray500,
                  },
                ]}>
                Complete your first daily challenge to start your wellness journey!
              </Text>
            </GlassContainer>
          )}
        </View>

        <View style={{height: 40}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statsSection: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h5,
    fontWeight: '700',
    marginBottom: Spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xs,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: Spacing.xs,
  },
  statValue: {
    ...Typography.h3,
    fontWeight: '700',
  },
  statLabel: {
    ...Typography.caption,
    textAlign: 'center',
    marginTop: 2,
  },
  categorySection: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
  },
  categoryContainer: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  categoryRowIcon: {
    fontSize: 16,
    width: 24,
  },
  categoryRowName: {
    ...Typography.bodySmall,
    fontWeight: '500',
    width: 80,
  },
  categoryBarBackground: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.06)',
    overflow: 'hidden',
  },
  categoryBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  categoryRowCount: {
    ...Typography.bodySmall,
    fontWeight: '700',
    width: 30,
    textAlign: 'right',
  },
  historySection: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    gap: Spacing.sm,
  },
  historyCard: {
    padding: Spacing.md,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  historyCategoryDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    ...Typography.bodyMedium,
    fontWeight: '500',
  },
  historyDate: {
    ...Typography.caption,
    marginTop: 2,
  },
  completedDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: ProfessionalColors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedCheck: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xxxl,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    ...Typography.h6,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  emptyDescription: {
    ...Typography.bodySmall,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default WellnessChallengeScreen;
