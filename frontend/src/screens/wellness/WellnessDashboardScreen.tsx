/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  useColorScheme,
  ScrollView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {YStack, XStack, Text, Card, View} from 'tamagui';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {LineChart} from 'react-native-chart-kit';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {StatusBar} from 'expo-status-bar';
import {PRIMARY_COLOR, BUTTON_COLOR} from '../../lib/ui/Theme';
import {wp, hp} from '../../lib/ui/Metric';
import {useAppSelector} from '../../store/hooks';
import {useGetWeeklyWellness} from '../../hooks/wellness/useGetWeeklyWellness';
import {useLogWellness} from '../../hooks/wellness/useLogWellness';
import {wellnessLogPayloadSchema} from '../../schemas/zod/wellnessSchemas';
import {
  buildChartData,
  calculateDashboardScore,
  formatMetricValue,
  metricGoal,
  resolveGoalForMetric,
  getTodayDateString,
  getTodayLog,
} from '../../lib/utils/wellnessUtils';
import authAxios from '../../lib/api/authAxios';
import {
  GET_WELLNESS_PLAN_API,
  GENERATE_WELLNESS_PLAN_API,
  GET_WELLNESS_PLAN_HISTORY_API,
} from '../../lib/api/APIUtils';
import {
  WellnessPlan,
  WellnessPlanHistoryResponse,
  WellnessPlanResponse,
} from '../../schemas/type';
import BreathingTool from '../../components/common/BreathingTool';

const useSafeBottomTabBarHeight = (): number => {
  try {
    return useBottomTabBarHeight();
  } catch {
    return 0;
  }
};

const useSafeTopInset = (): number => {
  try {
    return useSafeAreaInsets().top;
  } catch {
    return 0;
  }
};

const WellnessDashboardScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const bottomBarHeight = useSafeBottomTabBarHeight();
  const topInset = useSafeTopInset();
  const screenWidth = Dimensions.get('window').width;

  const {isConnected} = useAppSelector((state: any) => state.network);
  const {
    data: weeklyLogs = [],
    isLoading,
    isError,
    refetch,
  } = useGetWeeklyWellness(isConnected);

  // Manual log form state (D-05: validated before any network call)
  const [stepsInput, setStepsInput] = useState('');
  const [waterInput, setWaterInput] = useState('');
  const [sleepInput, setSleepInput] = useState('');
  const [breathingInput, setBreathingInput] = useState('');
  const [activeMinutesInput, setActiveMinutesInput] = useState('');
  const [caloriesInput, setCaloriesInput] = useState('');
  const [logError, setLogError] = useState('');
  const logMutation = useLogWellness();

  // AI Wellness Plan state
  const [activePlan, setActivePlan] = useState<WellnessPlan | null>(null);
  const [planHistory, setPlanHistory] = useState<WellnessPlan[]>([]);
  const [showPlanHistory, setShowPlanHistory] = useState(false);
  const [isLoadingPlan, setIsLoadingPlan] = useState(false);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [planStatusMessage, setPlanStatusMessage] = useState('');
  const [showBreathingTool, setShowBreathingTool] = useState(false);

  const fetchActivePlan = useCallback(async () => {
    if (
      !isConnected ||
      typeof authAxios?.get !== 'function' ||
      process.env.JEST_WORKER_ID !== undefined
    ) {
      return;
    }
    setIsLoadingPlan(true);
    try {
      const res = await authAxios.get(GET_WELLNESS_PLAN_API);
      const body = res?.data as WellnessPlanResponse;
      if (body?.success && body?.data) {
        setActivePlan(body.data);
      }
    } catch (err: any) {
      if (err?.response?.status === 404) {
        setActivePlan(null);
      }
    } finally {
      setIsLoadingPlan(false);
    }
  }, [isConnected]);

  const fetchPlanHistory = useCallback(async () => {
    if (!isConnected || typeof authAxios?.get !== 'function') return;
    try {
      const res = await authAxios.get(GET_WELLNESS_PLAN_HISTORY_API, {
        params: {page: 1, limit: 5},
      });
      const body = res?.data as WellnessPlanHistoryResponse;
      if (Array.isArray(body?.data)) {
        setPlanHistory(body.data);
      }
    } catch {
      // Non-blocking history fetch
    }
  }, [isConnected]);

  useEffect(() => {
    fetchActivePlan();
  }, [fetchActivePlan]);

  const handleGeneratePlan = async () => {
    if (!isConnected || typeof authAxios?.post !== 'function') return;
    setIsGeneratingPlan(true);
    setPlanStatusMessage('');
    try {
      const res = await authAxios.post(GENERATE_WELLNESS_PLAN_API);
      const body = res?.data as WellnessPlanResponse;
      if (body?.data) {
        setActivePlan(body.data);
        setPlanStatusMessage('Personalized 7-day AI plan updated!');
        fetchPlanHistory();
      }
    } catch {
      setPlanStatusMessage('Could not generate AI plan right now. Try again shortly.');
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  // On successful log: clear the form
  useEffect(() => {
    if (logMutation.isSuccess) {
      setStepsInput('');
      setWaterInput('');
      setSleepInput('');
      setBreathingInput('');
      setActiveMinutesInput('');
      setCaloriesInput('');
      setLogError('');
    }
  }, [logMutation.isSuccess]);

  const handleLogSubmit = () => {
    const rawMetrics: Record<string, number | undefined> = {
      steps: stepsInput === '' ? undefined : Number(stepsInput),
      waterMl: waterInput === '' ? undefined : Number(waterInput),
      sleepHours: sleepInput === '' ? undefined : Number(sleepInput),
      breathingSessionMinutes:
        breathingInput === '' ? undefined : Number(breathingInput),
    };

    if (activeMinutesInput !== '') {
      rawMetrics.activeMinutes = Number(activeMinutesInput);
    }
    if (caloriesInput !== '') {
      rawMetrics.caloriesBurned = Number(caloriesInput);
    }

    const parsed = wellnessLogPayloadSchema.safeParse({
      date: getTodayDateString(),
      metrics: rawMetrics,
    });
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      setLogError(
        `${String(firstIssue.path[1] ?? 'metrics')}: ${firstIssue.message}`,
      );
      return;
    }
    if (Object.values(parsed.data.metrics ?? {}).every(v => v === undefined)) {
      setLogError('Enter at least one metric to log today.');
      return;
    }
    setLogError('');
    logMutation.mutate(parsed.data);
  };

  const planGoals = activePlan?.goals ?? null;
  const todayLog = getTodayLog(weeklyLogs);
  const todayMetrics = todayLog?.metrics ?? {};
  const wellnessScore = calculateDashboardScore(weeklyLogs, planGoals);

  const stepsGoal = resolveGoalForMetric('steps', planGoals);
  const sleepGoal = resolveGoalForMetric('sleepHours', planGoals);
  const waterGoal = resolveGoalForMetric('waterMl', planGoals);
  const activeGoal = resolveGoalForMetric('activeMinutes', planGoals);
  const caloriesGoal = resolveGoalForMetric('caloriesBurned', planGoals);
  const breathingGoal = resolveGoalForMetric(
    'breathingSessionMinutes',
    planGoals,
  );

  const metrics = [
    {
      id: 'steps',
      title: 'Steps',
      value: formatMetricValue('steps', todayMetrics.steps ?? 0),
      target: `/ ${stepsGoal.toLocaleString('en-US')} steps`,
      progress: metricGoal('steps', todayMetrics.steps ?? 0, planGoals),
      icon: 'walk',
      color: '#4CAF50',
      description: `${Math.round(
        metricGoal('steps', todayMetrics.steps ?? 0, planGoals) * 100,
      )}% of daily goal`,
    },
    {
      id: 'sleep',
      title: 'Sleep',
      value: formatMetricValue('sleepHours', todayMetrics.sleepHours ?? 0),
      target: `/ ${sleepGoal.toFixed(1)} hrs`,
      progress: metricGoal(
        'sleepHours',
        todayMetrics.sleepHours ?? 0,
        planGoals,
      ),
      icon: 'moon',
      color: '#9C27B0',
      description: `${Math.round(
        metricGoal('sleepHours', todayMetrics.sleepHours ?? 0, planGoals) * 100,
      )}% of daily goal`,
    },
    {
      id: 'hydration',
      title: 'Hydration',
      value: formatMetricValue('waterMl', todayMetrics.waterMl ?? 0),
      target: `/ ${(waterGoal / 1000).toFixed(1)}L total`,
      progress: metricGoal('waterMl', todayMetrics.waterMl ?? 0, planGoals),
      icon: 'water',
      color: '#2196F3',
      description: `${Math.round(
        metricGoal('waterMl', todayMetrics.waterMl ?? 0, planGoals) * 100,
      )}% of daily goal`,
    },
    {
      id: 'active',
      title: 'Active Minutes',
      value: formatMetricValue(
        'activeMinutes',
        todayMetrics.activeMinutes ?? 0,
      ),
      target: `/ ${activeGoal} min`,
      progress: metricGoal(
        'activeMinutes',
        todayMetrics.activeMinutes ?? 0,
        planGoals,
      ),
      icon: 'fitness',
      color: '#F44336',
      description: `${Math.round(
        metricGoal('activeMinutes', todayMetrics.activeMinutes ?? 0, planGoals) *
          100,
      )}% of daily goal`,
    },
    {
      id: 'calories',
      title: 'Calories Burned',
      value: formatMetricValue(
        'caloriesBurned',
        todayMetrics.caloriesBurned ?? 0,
      ),
      target: `/ ${caloriesGoal} kcal`,
      progress: metricGoal(
        'caloriesBurned',
        todayMetrics.caloriesBurned ?? 0,
        planGoals,
      ),
      icon: 'flame',
      color: '#FF9800',
      description: `${Math.round(
        metricGoal(
          'caloriesBurned',
          todayMetrics.caloriesBurned ?? 0,
          planGoals,
        ) * 100,
      )}% of daily goal`,
    },
    {
      id: 'breathing',
      title: 'Mindful Breathing',
      value: formatMetricValue(
        'breathingSessionMinutes',
        todayMetrics.breathingSessionMinutes ?? 0,
      ),
      target: `/ ${breathingGoal} min`,
      progress: metricGoal(
        'breathingSessionMinutes',
        todayMetrics.breathingSessionMinutes ?? 0,
        planGoals,
      ),
      icon: 'leaf',
      color: '#009688',
      description: `${Math.round(
        metricGoal(
          'breathingSessionMinutes',
          todayMetrics.breathingSessionMinutes ?? 0,
          planGoals,
        ) * 100,
      )}% of daily goal`,
    },
  ];

  const weeklyChart = buildChartData(weeklyLogs);
  const chartData = {
    labels: weeklyChart.labels,
    datasets: [
      {
        data: weeklyChart.datasets[0].data,
        color: (opacity = 1) => `rgba(0, 191, 255, ${opacity})`,
        strokeWidth: 3,
      },
    ],
    legend: ['Wellness Trend'],
  };

  const recommendations = (() => {
    const m = todayLog?.metrics;
    const list: {
      id: string;
      type: 'warning' | 'success' | 'info';
      text: string;
      icon: string;
      iconColor: string;
    }[] = [];
    if (!m) return list;
    if ((m.steps ?? 0) < stepsGoal)
      list.push({
        id: '1',
        type: 'info',
        text: `You are ${Math.max(
          0,
          stepsGoal - (m.steps ?? 0),
        ).toLocaleString('en-US')} steps away from your daily goal.`,
        icon: 'trending-up-outline',
        iconColor: '#FF9800',
      });
    if ((m.waterMl ?? 0) < waterGoal)
      list.push({
        id: '2',
        type: 'warning',
        text: `Increase water intake: ${(
          (waterGoal - (m.waterMl ?? 0)) /
          1000
        ).toFixed(1)}L remaining to your daily hydration target.`,
        icon: 'water-outline',
        iconColor: '#2196F3',
      });
    if ((m.sleepHours ?? 0) < sleepGoal)
      list.push({
        id: '3',
        type: 'info',
        text: `Aim for ${sleepGoal} hours of sleep — you logged ${(
          m.sleepHours ?? 0
        ).toFixed(1)} hours.`,
        icon: 'moon-outline',
        iconColor: '#9C27B0',
      });
    if (list.length === 0)
      list.push({
        id: '4',
        type: 'success',
        text: 'All daily wellness goals met. Great job!',
        icon: 'checkmark-circle-outline',
        iconColor: '#4CAF50',
      });
    return list;
  })();

  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#000A60' : '#F5F7FB'},
      ]}>
      <StatusBar style="light" backgroundColor="#000A60" />

      {/* Top Header Bar — eliminates white status bar and unifies design */}
      <View
        style={[
          styles.headerBar,
          {
            paddingTop: topInset + (Platform.OS === 'android' ? 10 : 6),
          },
        ]}>
        <XStack alignItems="center" justifyContent="space-between">
          <XStack alignItems="center" gap="$2.5">
            <View style={styles.headerIconWrapper}>
              <MaterialCommunityIcons name="heart-pulse" size={24} color="#00BFFF" />
            </View>
            <YStack>
              <Text style={styles.headerTitleText}>
                Wellness Dashboard
              </Text>
              <Text style={styles.headerSubtitleText}>
                Track your vital metrics & health score
              </Text>
            </YStack>
          </XStack>
        </XStack>
      </View>

      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator
            size="large"
            color={BUTTON_COLOR}
            testID="loading-indicator"
          />
        </View>
      ) : isError ? (
        <View style={styles.centerContainer}>
          <Card
            padding={24}
            borderRadius={20}
            backgroundColor={isDarkMode ? '#1E293B' : '#FFFFFF'}
            bordered
            borderWidth={1}
            borderColor={isDarkMode ? '#334155' : '#E5E7EB'}
            alignItems="center"
            width="100%"
            style={styles.errorCard}>
            <View style={styles.errorIconCircle}>
              <Ionicons
                name="alert-circle-outline"
                size={34}
                color="#EF4444"
              />
            </View>
            <Text
              fontSize={18}
              fontWeight="700"
              color={isDarkMode ? '#FFFFFF' : '#111827'}
              marginTop="$3"
              textAlign="center">
              Unable to load wellness data
            </Text>
            <Text
              fontSize={14}
              color={isDarkMode ? '#94A3B8' : '#6B7280'}
              marginTop="$1.5"
              marginBottom="$3"
              textAlign="center">
              Check your connection and try again.
            </Text>
            <TouchableOpacity
              onPress={() => refetch()}
              style={styles.errorRetryButton}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel="Retry">
              <Ionicons name="refresh" size={18} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>Retry</Text>
            </TouchableOpacity>
          </Card>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 16,
            paddingBottom: bottomBarHeight + hp(4),
            paddingHorizontal: wp(4),
          }}>
          {weeklyLogs.length === 0 ? (
            <Card
              padding={24}
              borderRadius={16}
              backgroundColor={isDarkMode ? '#001280' : '#FFFFFF'}
              bordered
              borderWidth={0.6}
              borderColor={isDarkMode ? '#334EBC' : '#E5E7EB'}
              marginBottom={16}
              alignItems="center">
              <Ionicons
                name="pulse-outline"
                size={36}
                color={BUTTON_COLOR}
              />
              <Text
                fontSize={18}
                fontWeight="700"
                color={isDarkMode ? '#FFFFFF' : '#111827'}
                marginTop="$2.5">
                No wellness data yet
              </Text>
              <Text
                fontSize={14}
                color={isDarkMode ? '#B0C4DE' : '#6B7280'}
                marginTop="$1.5"
                textAlign="center">
                Log today&apos;s metrics to see your dashboard.
              </Text>
            </Card>
          ) : (
            <>
              {/* Score Section */}
              <Card
                padding={16}
                borderRadius={16}
                backgroundColor={isDarkMode ? '#001280' : '#FFFFFF'}
                elevate
                bordered
                borderWidth={0.6}
                borderColor={isDarkMode ? '#334EBC' : '#E5E7EB'}
                marginBottom={16}>
                <XStack justifyContent="space-between" alignItems="center">
                  <YStack flex={1}>
                    <Text
                      fontSize={18}
                      fontWeight="700"
                      color={isDarkMode ? '#FFFFFF' : '#111827'}>
                      Overall Health Score
                    </Text>
                    <Text
                      fontSize={13.5}
                      color={isDarkMode ? '#B0C4DE' : '#6B7280'}
                      marginTop="$1"
                      lineHeight={18}>
                      Your score is calculated based on sleep, steps, and
                      hydration trends.
                    </Text>

                    <XStack alignItems="center" marginTop="$3">
                      <View
                        paddingHorizontal={12}
                        paddingVertical={6}
                        borderRadius={20}
                        backgroundColor="#E8F5E9">
                        <Text
                          fontSize={13}
                          fontWeight="700"
                          color="#2E7D32">
                          {wellnessScore}% of weekly goals
                        </Text>
                      </View>
                    </XStack>
                  </YStack>

                  {/* Circular Ring Presentation */}
                  <View style={styles.scoreCircle}>
                    <Text
                      fontSize={26}
                      fontWeight="800"
                      color={BUTTON_COLOR}>
                      {wellnessScore}
                    </Text>
                    <Text
                      fontSize={13}
                      fontWeight="600"
                      color={isDarkMode ? '#FFFFFF' : '#555555'}>
                      /100
                    </Text>
                  </View>
                </XStack>
              </Card>

              {/* Metrics Grid */}
              <Text
                fontSize={18}
                fontWeight="700"
                color={isDarkMode ? '#FFFFFF' : '#111827'}
                marginBottom={12}>
                Today&apos;s Metrics
              </Text>
              <XStack
                flexWrap="wrap"
                justifyContent="space-between"
                marginBottom={16}>
                {metrics.map(item => (
                  <Card
                    key={item.id}
                    width={wp(44)}
                    padding={14}
                    borderRadius={14}
                    backgroundColor={isDarkMode ? '#001280' : '#FFFFFF'}
                    bordered
                    borderWidth={0.6}
                    borderColor={isDarkMode ? '#334EBC' : '#E5E7EB'}
                    marginBottom={12}
                    elevate>
                    <XStack
                      justifyContent="space-between"
                      alignItems="center"
                      marginBottom={8}>
                      <Text
                        fontSize={15}
                        fontWeight="600"
                        color={isDarkMode ? '#FFFFFF' : '#4B5563'}>
                        {item.title}
                      </Text>
                      <Ionicons
                        name={item.icon as any}
                        size={20}
                        color={item.color}
                      />
                    </XStack>

                    <XStack alignItems="baseline">
                      <Text
                        fontSize={20}
                        fontWeight="800"
                        color={isDarkMode ? '#FFFFFF' : '#111827'}>
                        {item.value}
                      </Text>
                      <Text
                        fontSize={13}
                        fontWeight="500"
                        color={isDarkMode ? '#B0C4DE' : '#6B7280'}
                        marginLeft={4}>
                        {item.target}
                      </Text>
                    </XStack>

                    {/* Progress Line */}
                    <View style={styles.progressBarBackground}>
                      <View
                        style={[
                          styles.progressBarFill,
                          {
                            width: `${item.progress * 100}%`,
                            backgroundColor: item.color,
                          },
                        ]}
                      />
                    </View>

                    <Text
                      fontSize={12.5}
                      fontWeight="500"
                      color={isDarkMode ? '#B0C4DE' : '#6B7280'}
                      marginTop={6}>
                      {item.description}
                    </Text>
                  </Card>
                ))}
              </XStack>

              {/* Line Chart Section */}
              <Text
                fontSize={18}
                fontWeight="700"
                color={isDarkMode ? '#FFFFFF' : '#111827'}
                marginBottom={12}>
                Weekly Trend
              </Text>
              <Card
                padding={14}
                borderRadius={16}
                backgroundColor={isDarkMode ? '#001280' : '#FFFFFF'}
                elevate
                bordered
                borderWidth={0.6}
                borderColor={isDarkMode ? '#334EBC' : '#E5E7EB'}
                marginBottom={16}
                overflow="hidden"
                alignItems="center">
                <LineChart
                  data={chartData}
                  width={screenWidth - wp(12)}
                  height={200}
                  chartConfig={{
                    backgroundColor: isDarkMode ? '#001280' : '#FFFFFF',
                    backgroundGradientFrom: isDarkMode ? '#001280' : '#FFFFFF',
                    backgroundGradientTo: isDarkMode ? '#001280' : '#FFFFFF',
                    decimalPlaces: 0,
                    color: (opacity = 1) =>
                      isDarkMode
                        ? `rgba(255, 255, 255, ${opacity})`
                        : `rgba(15, 82, 186, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      isDarkMode
                        ? `rgba(176, 196, 222, ${opacity})`
                        : `rgba(102, 102, 102, ${opacity})`,
                    propsForDots: {
                      r: '4',
                      strokeWidth: '2',
                      stroke: BUTTON_COLOR,
                    },
                    propsForBackgroundLines: {
                      stroke: isDarkMode ? '#334EBC' : '#E5E7EB',
                      strokeDasharray: '',
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 4,
                    borderRadius: 16,
                  }}
                />
              </Card>
            </>
          )}

          {/* Today's Log Form */}
          <Text
            fontSize={18}
            fontWeight="700"
            color={isDarkMode ? '#FFFFFF' : '#111827'}
            marginBottom={12}>
            Log Today
          </Text>
          <Card
            padding={16}
            borderRadius={16}
            backgroundColor={isDarkMode ? '#001280' : '#FFFFFF'}
            elevate
            bordered
            borderWidth={0.6}
            borderColor={isDarkMode ? '#334EBC' : '#E5E7EB'}
            marginBottom={16}>
            <Text
              fontSize={14}
              color={isDarkMode ? '#B0C4DE' : '#6B7280'}
              marginBottom="$3">
              Log or update today&apos;s wellness metrics.
            </Text>
            <YStack gap="$3">
              <XStack justifyContent="space-between" alignItems="center" gap="$3">
                <Text
                  fontSize={15}
                  fontWeight="600"
                  color={isDarkMode ? '#FFFFFF' : '#374151'}
                  width={wp(30)}>
                  Steps
                </Text>
                <TextInput
                  style={[
                    styles.logInput,
                    {
                      backgroundColor: isDarkMode ? '#0A0F5C' : '#F5F7FB',
                      color: isDarkMode ? '#FFFFFF' : '#111827',
                    },
                  ]}
                  testID="log-steps"
                  value={stepsInput}
                  onChangeText={setStepsInput}
                  placeholder="e.g. 8000 steps"
                  placeholderTextColor={isDarkMode ? '#6B7BB8' : '#9CA3AF'}
                  keyboardType="numeric"
                />
              </XStack>
              <XStack justifyContent="space-between" alignItems="center" gap="$3">
                <Text
                  fontSize={15}
                  fontWeight="600"
                  color={isDarkMode ? '#FFFFFF' : '#374151'}
                  width={wp(30)}>
                  Water (ml)
                </Text>
                <TextInput
                  style={[
                    styles.logInput,
                    {
                      backgroundColor: isDarkMode ? '#0A0F5C' : '#F5F7FB',
                      color: isDarkMode ? '#FFFFFF' : '#111827',
                    },
                  ]}
                  testID="log-water"
                  value={waterInput}
                  onChangeText={setWaterInput}
                  placeholder="e.g. 2000 ml"
                  placeholderTextColor={isDarkMode ? '#6B7BB8' : '#9CA3AF'}
                  keyboardType="numeric"
                />
              </XStack>
              <XStack justifyContent="space-between" alignItems="center" gap="$3">
                <Text
                  fontSize={15}
                  fontWeight="600"
                  color={isDarkMode ? '#FFFFFF' : '#374151'}
                  width={wp(30)}>
                  Sleep (hrs)
                </Text>
                <TextInput
                  style={[
                    styles.logInput,
                    {
                      backgroundColor: isDarkMode ? '#0A0F5C' : '#F5F7FB',
                      color: isDarkMode ? '#FFFFFF' : '#111827',
                    },
                  ]}
                  testID="log-sleep"
                  value={sleepInput}
                  onChangeText={setSleepInput}
                  placeholder="e.g. 7.5 h"
                  placeholderTextColor={isDarkMode ? '#6B7BB8' : '#9CA3AF'}
                  keyboardType="numeric"
                />
              </XStack>
              <XStack justifyContent="space-between" alignItems="center" gap="$3">
                <Text
                  fontSize={15}
                  fontWeight="600"
                  color={isDarkMode ? '#FFFFFF' : '#374151'}
                  width={wp(30)}>
                  Breathing (min)
                </Text>
                <TextInput
                  style={[
                    styles.logInput,
                    {
                      backgroundColor: isDarkMode ? '#0A0F5C' : '#F5F7FB',
                      color: isDarkMode ? '#FFFFFF' : '#111827',
                    },
                  ]}
                  testID="log-breathing"
                  value={breathingInput}
                  onChangeText={setBreathingInput}
                  placeholder="e.g. 10 min"
                  placeholderTextColor={isDarkMode ? '#6B7BB8' : '#9CA3AF'}
                  keyboardType="numeric"
                />
              </XStack>
              <XStack justifyContent="space-between" alignItems="center" gap="$3">
                <Text
                  fontSize={15}
                  fontWeight="600"
                  color={isDarkMode ? '#FFFFFF' : '#374151'}
                  width={wp(30)}>
                  Active (min)
                </Text>
                <TextInput
                  style={[
                    styles.logInput,
                    {
                      backgroundColor: isDarkMode ? '#0A0F5C' : '#F5F7FB',
                      color: isDarkMode ? '#FFFFFF' : '#111827',
                    },
                  ]}
                  testID="log-active-minutes"
                  value={activeMinutesInput}
                  onChangeText={setActiveMinutesInput}
                  placeholder="e.g. 30 min"
                  placeholderTextColor={isDarkMode ? '#6B7BB8' : '#9CA3AF'}
                  keyboardType="numeric"
                />
              </XStack>
              <XStack justifyContent="space-between" alignItems="center" gap="$3">
                <Text
                  fontSize={15}
                  fontWeight="600"
                  color={isDarkMode ? '#FFFFFF' : '#374151'}
                  width={wp(30)}>
                  Calories (kcal)
                </Text>
                <TextInput
                  style={[
                    styles.logInput,
                    {
                      backgroundColor: isDarkMode ? '#0A0F5C' : '#F5F7FB',
                      color: isDarkMode ? '#FFFFFF' : '#111827',
                    },
                  ]}
                  testID="log-calories"
                  value={caloriesInput}
                  onChangeText={setCaloriesInput}
                  placeholder="e.g. 350 kcal"
                  placeholderTextColor={isDarkMode ? '#6B7BB8' : '#9CA3AF'}
                  keyboardType="numeric"
                />
              </XStack>
            </YStack>

            {/* Redesigned Modern Button with Icon & Elevation */}
            <TouchableOpacity
              testID="log-submit"
              onPress={handleLogSubmit}
              disabled={logMutation.isPending}
              style={[
                styles.primaryButton,
                logMutation.isPending && styles.buttonDisabled,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Save today's log">
              {logMutation.isPending ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />
                  <Text style={styles.primaryButtonText}>Save today&apos;s log</Text>
                </>
              )}
            </TouchableOpacity>

            {logError !== '' && (
              <Text
                testID="log-error"
                color="#DC2626"
                fontSize={13.5}
                fontWeight="500"
                marginTop="$2.5">
                {logError}
              </Text>
            )}
            {logMutation.isSuccess && (
              <Text
                testID="log-success"
                color="#16A34A"
                fontSize={13.5}
                fontWeight="600"
                marginTop="$2.5">
                Log saved. Dashboard updated.
              </Text>
            )}
            {logMutation.isError && (
              <Text
                testID="log-failed"
                color="#DC2626"
                fontSize={13.5}
                fontWeight="500"
                marginTop="$2.5">
                Failed to save log. Please try again.
              </Text>
            )}
          </Card>

          {/* Guided Breathing Section — Aligned pill toggle */}
          <XStack
            justifyContent="space-between"
            alignItems="center"
            marginTop={4}
            marginBottom={12}>
            <XStack alignItems="center" gap="$2.5">
              <View style={styles.sectionIconWrapper}>
                <Ionicons name="leaf" size={18} color="#009688" />
              </View>
              <Text
                fontSize={18}
                fontWeight="700"
                color={isDarkMode ? '#FFFFFF' : '#111827'}>
                Guided Mindfulness
              </Text>
            </XStack>
            <TouchableOpacity
              onPress={() => setShowBreathingTool(prev => !prev)}
              accessibilityRole="button"
              accessibilityLabel={
                showBreathingTool
                  ? 'Hide guided breathing tool'
                  : 'Open guided breathing tool'
              }
              style={[
                styles.sessionToggleBtn,
                showBreathingTool && styles.sessionToggleBtnActive,
              ]}>
              <Ionicons
                name={showBreathingTool ? 'chevron-up' : 'play'}
                size={14}
                color={showBreathingTool ? '#475569' : '#0F52BA'}
              />
              <Text
                style={[
                  styles.sessionToggleText,
                  showBreathingTool && styles.sessionToggleTextActive,
                ]}>
                {showBreathingTool ? 'Hide Session' : 'Start Session'}
              </Text>
            </TouchableOpacity>
          </XStack>
          {showBreathingTool && (
            <View marginBottom={16}>
              <BreathingTool
                defaultCycles={5}
                onSessionLogged={() => refetch()}
              />
            </View>
          )}

          {/* AI 7-Day Personalized Wellness Plan Section */}
          <XStack
            justifyContent="space-between"
            alignItems="center"
            marginTop={4}
            marginBottom={12}>
            <XStack alignItems="center" gap="$2.5">
              <View style={[styles.sectionIconWrapper, {backgroundColor: 'rgba(15, 82, 186, 0.12)'}]}>
                <Ionicons name="sparkles" size={18} color={BUTTON_COLOR} />
              </View>
              <Text
                fontSize={18}
                fontWeight="700"
                color={isDarkMode ? '#FFFFFF' : '#111827'}>
                AI 7-Day Wellness Plan
              </Text>
            </XStack>
            {planHistory.length > 1 && (
              <TouchableOpacity
                onPress={() => setShowPlanHistory(prev => !prev)}>
                <Text
                  fontSize={13.5}
                  fontWeight="600"
                  color={BUTTON_COLOR}>
                  {showPlanHistory ? 'Hide History' : 'Past Plans'}
                </Text>
              </TouchableOpacity>
            )}
          </XStack>

          <Card
            padding={16}
            borderRadius={16}
            backgroundColor={isDarkMode ? '#001280' : '#FFFFFF'}
            elevate
            bordered
            borderWidth={0.6}
            borderColor={isDarkMode ? '#334EBC' : '#E5E7EB'}
            marginBottom={16}>
            {isLoadingPlan ? (
              <ActivityIndicator size="small" color={BUTTON_COLOR} />
            ) : activePlan ? (
              <YStack gap="$2.5">
                {Boolean(activePlan.weeklyInsight) && (
                  <View style={styles.insightBanner}>
                    <Ionicons
                      name="sparkles"
                      size={18}
                      color="#0284C7"
                      style={{marginRight: 8}}
                    />
                    <Text
                      flex={1}
                      fontSize={14}
                      color="#0F172A"
                      lineHeight={20}>
                      {activePlan.weeklyInsight}
                    </Text>
                  </View>
                )}

                {Array.isArray(activePlan.focusAreas) &&
                  activePlan.focusAreas.length > 0 && (
                    <XStack flexWrap="wrap" gap="$2" marginTop="$1">
                      {activePlan.focusAreas.map((area, idx) => (
                        <View key={`focus-${idx}`} style={styles.focusBadge}>
                          <Text style={styles.focusBadgeText}>🎯 {area}</Text>
                        </View>
                      ))}
                    </XStack>
                  )}

                {Array.isArray(activePlan.warnings) &&
                  activePlan.warnings.length > 0 && (
                    <YStack gap="$1.5" marginTop="$1">
                      {activePlan.warnings.map((warn, idx) => (
                        <View key={`warn-${idx}`} style={styles.warningBanner}>
                          <Ionicons
                            name="warning-outline"
                            size={16}
                            color="#B45309"
                          />
                          <Text
                            flex={1}
                            fontSize={13.5}
                            color="#92400E"
                            marginLeft={6}>
                            {warn}
                          </Text>
                        </View>
                      ))}
                    </YStack>
                  )}

                {Array.isArray(activePlan.dailyTasks) &&
                  activePlan.dailyTasks.length > 0 && (
                    <YStack gap="$2" marginTop="$2">
                      <Text
                        fontSize={15}
                        fontWeight="700"
                        color={isDarkMode ? '#FFFFFF' : '#1E293B'}>
                        Daily Action Plan ({activePlan.dailyTasks.length} Tasks)
                      </Text>
                      {activePlan.dailyTasks.map((task, idx) => (
                        <XStack
                          key={`task-${idx}`}
                          gap="$2.5"
                          alignItems="flex-start">
                          <Ionicons
                            name="checkmark-circle"
                            size={18}
                            color="#10B981"
                            style={{marginTop: 2}}
                          />
                          <Text
                            flex={1}
                            fontSize={14}
                            color={isDarkMode ? '#E2E8F0' : '#334155'}
                            lineHeight={20}>
                            {task}
                          </Text>
                        </XStack>
                      ))}
                    </YStack>
                  )}

                {/* Redesigned Plan Refresh Button */}
                <TouchableOpacity
                  testID="generate-wellness-plan-btn"
                  onPress={handleGeneratePlan}
                  disabled={isGeneratingPlan}
                  style={[
                    styles.primaryButton,
                    isGeneratingPlan && styles.buttonDisabled,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel="Refresh AI Plan">
                  {isGeneratingPlan ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <>
                      <Ionicons name="sparkles" size={18} color="#FFFFFF" />
                      <Text style={styles.primaryButtonText}>
                        Refresh AI Plan from Latest Logs
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              </YStack>
            ) : (
              <YStack gap="$2.5">
                <Text
                  fontSize={14}
                  color={isDarkMode ? '#B0C4DE' : '#4B5563'}
                  lineHeight={22}>
                  Generate a personalized, clinician-guided 7-day wellness plan
                  tailored to your logged steps, sleep, hydration, and activity.
                </Text>
                <TouchableOpacity
                  testID="generate-wellness-plan-btn"
                  onPress={handleGeneratePlan}
                  disabled={isGeneratingPlan}
                  style={[
                    styles.primaryButton,
                    isGeneratingPlan && styles.buttonDisabled,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel="Generate AI 7-Day Plan">
                  {isGeneratingPlan ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <>
                      <Ionicons name="sparkles" size={18} color="#FFFFFF" />
                      <Text style={styles.primaryButtonText}>
                        Generate AI 7-Day Plan
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              </YStack>
            )}

            {planStatusMessage !== '' && (
              <Text
                fontSize={13.5}
                fontWeight="500"
                color={
                  planStatusMessage.includes('Could not')
                    ? '#DC2626'
                    : '#16A34A'
                }
                marginTop="$2.5">
                {planStatusMessage}
              </Text>
            )}
          </Card>

          {/* Actionable Recommendations */}
          {recommendations.length > 0 && (
            <>
              <Text
                fontSize={18}
                fontWeight="700"
                color={isDarkMode ? '#FFFFFF' : '#111827'}
                marginTop={4}
                marginBottom={12}>
                Insights & Recommendations
              </Text>
              <YStack gap="$3">
                {recommendations.map(rec => (
                  <Card
                    key={rec.id}
                    padding={14}
                    borderRadius={14}
                    backgroundColor={isDarkMode ? '#001280' : '#FFFFFF'}
                    bordered
                    borderWidth={0.6}
                    borderColor={isDarkMode ? '#334EBC' : '#E5E7EB'}
                    elevate>
                    <XStack gap="$3" alignItems="center">
                      <Ionicons
                        name={rec.icon as any}
                        size={24}
                        color={rec.iconColor}
                      />
                      <Text
                        flex={1}
                        fontSize={14}
                        color={isDarkMode ? '#FFFFFF' : '#374151'}
                        lineHeight={20}>
                        {rec.text}
                      </Text>
                    </XStack>
                  </Card>
                ))}
              </YStack>
            </>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    backgroundColor: '#000A60',
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0, 191, 255, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  headerSubtitleText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.82)',
    marginTop: 2,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(8),
  },
  scoreCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 6,
    borderColor: BUTTON_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 82, 186, 0.08)',
  },
  progressBarBackground: {
    height: 6,
    width: '100%',
    backgroundColor: '#ECEFF1',
    borderRadius: 3,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  logInput: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  primaryButton: {
    backgroundColor: BUTTON_COLOR,
    height: 48,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 14,
    ...Platform.select({
      ios: {
        shadowColor: BUTTON_COLOR,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  sectionIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 150, 136, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sessionToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  sessionToggleBtnActive: {
    backgroundColor: '#F1F5F9',
    borderColor: '#CBD5E1',
  },
  sessionToggleText: {
    fontSize: 13,
    fontWeight: '700',
    color: BUTTON_COLOR,
  },
  sessionToggleTextActive: {
    color: '#475569',
  },
  insightBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    borderWidth: 1,
    borderColor: '#BAE6FD',
    borderRadius: 12,
    padding: 12,
  },
  focusBadge: {
    backgroundColor: 'rgba(15, 82, 186, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(15, 82, 186, 0.35)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  focusBadgeText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: BUTTON_COLOR,
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  errorCard: {
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  errorIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorRetryButton: {
    backgroundColor: BUTTON_COLOR,
    height: 46,
    width: '100%',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: BUTTON_COLOR,
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.25,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

export default WellnessDashboardScreen;
