import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, useColorScheme, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { YStack, XStack, Text, ScrollView, Card, Separator, Theme } from 'tamagui';
import { PRIMARY_COLOR } from '../helper/Theme';
import { GlassStyles } from '../styles/GlassStyles';
import {
  getTopicScores,
  getTrendReport,
  getUnexploredTopics,
  TopicScore,
  TrendPoint,
  TOPICS,
} from '../helper/TopicTracker';

const screenWidth = Dimensions.get('window').width;

const HealthTrackingScreen = ({ navigation }: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [activeTab, setActiveTab] = useState<'overall' | 'weekly' | 'monthly'>('overall');
  const [scores, setScores] = useState<TopicScore[]>([]);
  const [trends, setTrends] = useState<TrendPoint[]>([]);
  const [unexplored, setUnexplored] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Animation values
  const animatedWidths = scores.map(() => new Animated.Value(0));

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      const fetchedScores = await getTopicScores();
      setScores(fetchedScores);

      const fetchedTrends = await getTrendReport(activeTab === 'weekly' ? 'weekly' : 'monthly');
      setTrends(fetchedTrends);

      const fetchedUnexplored = await getUnexploredTopics();
      setUnexplored(fetchedUnexplored);

      // Trigger animations
      fetchedScores.forEach((score, index) => {
        if (animatedWidths[index]) {
          Animated.timing(animatedWidths[index], {
            toValue: score.percentage / 100,
            duration: 800,
            useNativeDriver: false,
          }).start();
        }
      });

      setLoading(false);
    } catch (e) {
      console.log('Error loading topic tracking data', e);
      setLoading(false);
    }
  };

  const getTopicColor = (topic: string) => {
    switch (topic) {
      case TOPICS.SLEEP_HEALTH:
        return 'hsl(220, 90%, 56%)'; // Premium Blue
      case TOPICS.NUTRITION:
        return 'hsl(140, 75%, 45%)'; // Vibrant Emerald Green
      case TOPICS.FITNESS:
        return 'hsl(25, 95%, 50%)'; // Energetic Orange
      case TOPICS.MENTAL_WELLNESS:
        return 'hsl(280, 80%, 60%)'; // Calming Purple
      default:
        return PRIMARY_COLOR;
    }
  };

  const getTopicEmoji = (topic: string) => {
    switch (topic) {
      case TOPICS.SLEEP_HEALTH:
        return '😴';
      case TOPICS.NUTRITION:
        return '🥗';
      case TOPICS.FITNESS:
        return '💪';
      case TOPICS.MENTAL_WELLNESS:
        return '🧘';
      default:
        return '🌱';
    }
  };

  const getUnexploredDescription = (topic: string) => {
    switch (topic) {
      case TOPICS.SLEEP_HEALTH:
        return 'Discover optimal sleep cycles, combat fatigue, and achieve deeper overnight recovery.';
      case TOPICS.NUTRITION:
        return 'Optimize your daily diet, balance metabolic energy, and learn about mindful gut health.';
      case TOPICS.FITNESS:
        return 'Build sustainable strength, improve active mobility, and set daily recovery streaks.';
      case TOPICS.MENTAL_WELLNESS:
        return 'Reduce stress, practice emotional mindfulness, and build resilient mental habits.';
      default:
        return 'Explore fresh perspectives and gain holistic health wisdom.';
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#030712' : '#F8FAFC' },
      ]}
      edges={['top']}
    >
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />

      {/* Header */}
      <XStack
        paddingHorizontal="$4"
        paddingVertical="$3"
        alignItems="center"
        justifyContent="space-between"
        borderBottomWidth={1}
        borderColor={isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            styles.backButton,
            { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' },
          ]}
        >
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#F3F4F6' : '#1F2937'} />
        </TouchableOpacity>
        <Text fontSize={20} fontWeight="800" color={isDarkMode ? '#F3F4F6' : '#1F2937'}>
          Health Interests
        </Text>
        <View style={{ width: 40 }} />
      </XStack>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Toggle Selector */}
        <XStack
          marginHorizontal="$4"
          marginTop="$5"
          padding="$1"
          backgroundColor={isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'}
          borderRadius={14}
          borderWidth={1}
          borderColor={isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}
        >
          {(['overall', 'weekly', 'monthly'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => {
                  setLoading(true);
                  setActiveTab(tab);
                }}
                style={[
                  styles.tabButton,
                  isActive && {
                    backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#ffffff',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4,
                    elevation: 2,
                  },
                ]}
              >
                <Text
                  fontSize={14}
                  fontWeight={isActive ? '700' : '500'}
                  color={
                    isActive
                      ? isDarkMode ? '#FFFFFF' : '#1F2937'
                      : isDarkMode ? '#9CA3AF' : '#6B7280'
                  }
                  textTransform="capitalize"
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </XStack>

        {/* Content Tabs */}
        {activeTab === 'overall' ? (
          <YStack paddingHorizontal="$4" marginTop="$6" gap="$4">
            {/* Health Interest Profile Card */}
            <Card
              padding="$5"
              borderRadius={24}
              backgroundColor={isDarkMode ? 'rgba(255,255,255,0.02)' : '#ffffff'}
              borderWidth={1}
              borderColor={isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}
              style={GlassStyles.glassContainerDark}
            >
              <Text fontSize={17} fontWeight="800" color={isDarkMode ? '#F3F4F6' : '#1F2937'} marginBottom="$4">
                Your Wellness Profile
              </Text>

              {scores.map((score, index) => {
                const topicColor = getTopicColor(score.topic);
                const emoji = getTopicEmoji(score.topic);
                return (
                  <YStack key={score.topic} marginBottom="$4">
                    <XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
                      <XStack gap="$2" alignItems="center">
                        <Text fontSize={18}>{emoji}</Text>
                        <Text fontSize={15} fontWeight="700" color={isDarkMode ? '#E5E7EB' : '#374151'}>
                          {score.topic}
                        </Text>
                      </XStack>
                      <Text fontSize={15} fontWeight="800" color={topicColor}>
                        {score.percentage}%
                      </Text>
                    </XStack>

                    {/* Styled HSL Animated Progress Bar */}
                    <View
                      style={[
                        styles.progressBarBg,
                        { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : '#F1F5F9' },
                      ]}
                    >
                      <Animated.View
                        style={[
                          styles.progressBarFill,
                          {
                            backgroundColor: topicColor,
                            width: animatedWidths[index]
                              ? animatedWidths[index].interpolate({
                                  inputRange: [0, 1],
                                  outputRange: ['0%', '100%'],
                                })
                              : `${score.percentage}%`,
                          },
                        ]}
                      />
                    </View>
                  </YStack>
                );
              })}
            </Card>
          </YStack>
        ) : (
          /* Trend Report Tab Content */
          <YStack paddingHorizontal="$4" marginTop="$6" gap="$4">
            <Card
              padding="$5"
              borderRadius={24}
              backgroundColor={isDarkMode ? 'rgba(255,255,255,0.02)' : '#ffffff'}
              borderWidth={1}
              borderColor={isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}
              style={GlassStyles.glassContainerDark}
            >
              <Text fontSize={17} fontWeight="800" color={isDarkMode ? '#F3F4F6' : '#1F2937'} marginBottom="$5">
                {activeTab === 'weekly' ? 'Weekly Activity Trends' : 'Monthly Activity Trends'}
              </Text>

              {/* Responsive custom-built Bar chart grids for maximum responsive controls */}
              <XStack justifyContent="space-between" alignItems="flex-end" height={220} paddingBottom="$4">
                {trends.map((point, index) => {
                  const valSleep = point[TOPICS.SLEEP_HEALTH] || 0;
                  const valNutrition = point[TOPICS.NUTRITION] || 0;
                  const valFitness = point[TOPICS.FITNESS] || 0;
                  const valMental = point[TOPICS.MENTAL_WELLNESS] || 0;
                  const total = valSleep + valNutrition + valFitness + valMental;
                  const maxPossibleHeight = 160;

                  // Compute relative heights
                  const hSleep = total > 0 ? (valSleep / total) * maxPossibleHeight : 0;
                  const hNutrition = total > 0 ? (valNutrition / total) * maxPossibleHeight : 0;
                  const hFitness = total > 0 ? (valFitness / total) * maxPossibleHeight : 0;
                  const hMental = total > 0 ? (valMental / total) * maxPossibleHeight : 0;

                  return (
                    <YStack key={index} alignItems="center" style={{ flex: 1 }}>
                      {/* Segmented Stacked Bar */}
                      <YStack
                        width={28}
                        height={maxPossibleHeight}
                        borderRadius={14}
                        overflow="hidden"
                        backgroundColor={isDarkMode ? 'rgba(255,255,255,0.03)' : '#F1F5F9'}
                        justifyContent="flex-end"
                      >
                        {hMental > 0 && <View style={{ height: hMental, backgroundColor: getTopicColor(TOPICS.MENTAL_WELLNESS) }} />}
                        {hFitness > 0 && <View style={{ height: hFitness, backgroundColor: getTopicColor(TOPICS.FITNESS) }} />}
                        {hNutrition > 0 && <View style={{ height: hNutrition, backgroundColor: getTopicColor(TOPICS.NUTRITION) }} />}
                        {hSleep > 0 && <View style={{ height: hSleep, backgroundColor: getTopicColor(TOPICS.SLEEP_HEALTH) }} />}
                      </YStack>
                      <Text fontSize={12} fontWeight="600" color={isDarkMode ? '#9CA3AF' : '#6B7280'} marginTop="$3">
                        {point.label}
                      </Text>
                    </YStack>
                  );
                })}
              </XStack>

              {/* Custom Legend */}
              <Separator marginVertical="$4" opacity={0.3} />
              <XStack flexWrap="wrap" gap="$3" justifyContent="center">
                {Object.values(TOPICS).map(topic => (
                  <XStack key={topic} alignItems="center" gap="$1.5">
                    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: getTopicColor(topic) }} />
                    <Text fontSize={13} fontWeight="500" color={isDarkMode ? '#9CA3AF' : '#6B7280'}>
                      {topic}
                    </Text>
                  </XStack>
                ))}
              </XStack>
            </Card>
          </YStack>
        )}

        {/* Future Scope Phase Recommendations / Unexplored Path */}
        <YStack paddingHorizontal="$4" marginTop="$6" gap="$4">
          <Text fontSize={18} fontWeight="800" color={isDarkMode ? '#F3F4F6' : '#1F2937'}>
            Explore Unexplored Paths
          </Text>

          {unexplored.map(topic => {
            const color = getTopicColor(topic);
            const emoji = getTopicEmoji(topic);
            return (
              <Card
                key={topic}
                padding="$5"
                borderRadius={20}
                borderWidth={1.5}
                borderColor={color}
                backgroundColor={isDarkMode ? 'rgba(255,255,255,0.01)' : '#ffffff'}
                style={GlassStyles.glassContainerDark}
              >
                <XStack gap="$3" alignItems="center" marginBottom="$2.5">
                  <View style={[styles.emojiBg, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : '#F1F5F9' }]}>
                    <Text fontSize={22}>{emoji}</Text>
                  </View>
                  <YStack flex={1}>
                    <Text fontSize={13} fontWeight="700" color={color} letterSpacing={0.5}>
                      RECOMMENDED PATH
                    </Text>
                    <Text fontSize={17} fontWeight="800" color={isDarkMode ? '#FFFFFF' : '#1F2937'}>
                      {topic} Journey
                    </Text>
                  </YStack>
                </XStack>

                <Text fontSize={14} color={isDarkMode ? '#D1D5DB' : '#4B5563'} lineHeight={20} marginBottom="$4">
                  {getUnexploredDescription(topic)}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    // Navigate to Home screen with filter or go back
                    navigation.navigate('TabNavigation');
                  }}
                  style={[styles.actionBtn, { backgroundColor: color }]}
                >
                  <Text fontSize={14} fontWeight="700" color="#ffffff">
                    Start Learning Journey
                  </Text>
                  <Ionicons name="arrow-forward" size={16} color="#ffffff" style={{ marginLeft: 6 }} />
                </TouchableOpacity>
              </Card>
            );
          })}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HealthTrackingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  progressBarBg: {
    height: 8,
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  emojiBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    paddingVertical: 12,
    width: '100%',
  },
});
