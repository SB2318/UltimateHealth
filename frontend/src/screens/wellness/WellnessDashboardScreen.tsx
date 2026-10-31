import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  useColorScheme,
  ScrollView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {YStack, XStack, Text, Card, View, Button} from 'tamagui';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {LineChart} from 'react-native-chart-kit';
import Ionicons from '@expo/vector-icons/Ionicons';
import {StatusBar} from 'expo-status-bar';
import {PRIMARY_COLOR, BUTTON_COLOR} from '../../lib/ui/Theme';
import {wp, hp, fp} from '../../lib/ui/Metric';
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

const WellnessDashboardScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const bottomBarHeight = useSafeBottomTabBarHeight();
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

  // AI Wellness Plan state (synced with GET /wellness/plan, POST /wellness/plan/generate, GET /wellness/plan/history)
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

  // On successful log: clear the form (D-06 — the hook already invalidated the weekly query)
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
    // MAJOR-02: reject an all-empty submission — otherwise a `{date, metrics:{}}`
    // payload renders as a fabricated "Log saved" and a 0-valued row.
    if (Object.values(parsed.data.metrics ?? {}).every(v => v === undefined)) {
      setLogError('Enter at least one metric to log today.');
      return;
    }
    setLogError('');
    logMutation.mutate(parsed.data);
  };

  const planGoals = activePlan?.goals ?? null;
  const todayLog = getTodayLog(weeklyLogs);
  const todayMetrics = todayLog?.metrics ?? {}; // server rows may omit `metrics` (MAJOR-01)
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
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#000A60' : '#F5F7FB'},
      ]}>
      <StatusBar style="light" backgroundColor="#000A60" />
      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator
            size="large"
            color={PRIMARY_COLOR}
            testID="loading-indicator"
          />
        </View>
      ) : isError ? (
        <View style={styles.centerContainer}>
          <Card
            padding={16}
            borderRadius={12}
            backgroundColor={isDarkMode ? '#001280' : '#FFFFFF'}
            bordered
            borderWidth={0.6}
            borderColor={isDarkMode ? '#334EBC' : '#E5E7EB'}>
            <Text
              fontSize={fp(4)}
              fontWeight="600"
              color={isDarkMode ? '#FFFFFF' : '#333333'}>
              Unable to load wellness data
            </Text>
            <Text
              fontSize={fp(3.2)}
              color={isDarkMode ? '#B0C4DE' : '#777777'}
              marginTop="$1">
              Check your connection and try again.
            </Text>
            <Button
              onPress={() => refetch()}
              marginTop="$3"
              backgroundColor={BUTTON_COLOR}>
              <Text color="#FFFFFF">Retry</Text>
            </Button>
          </Card>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: bottomBarHeight + hp(4),
            paddingHorizontal: wp(4),
          }}>
          {/* Header Greeting */}
          <YStack marginVertical="$3">
            <Text
              fontSize={fp(7)}
              fontWeight="800"
              color={isDarkMode ? '#FFFFFF' : '#0F52BA'}>
              Wellness Dashboard
            </Text>
            <Text
              fontSize={fp(3.8)}
              color={isDarkMode ? '#B0C4DE' : '#666666'}
              marginTop="$1">
              Track your vital metrics and customized health score.
            </Text>
          </YStack>

          {weeklyLogs.length === 0 ? (
            <Card
              padding={20}
              borderRadius={16}
              backgroundColor={isDarkMode ? '#001280' : '#FFFFFF'}
              bordered
              borderWidth={0.6}
              borderColor={isDarkMode ? '#334EBC' : '#E5E7EB'}
              marginBottom={16}
              alignItems="center">
              <Ionicons
                name="pulse-outline"
                size={32}
                color={PRIMARY_COLOR}
              />
              <Text
                fontSize={fp(4)}
                fontWeight="600"
                color={isDarkMode ? '#FFFFFF' : '#333333'}
                marginTop="$2">
                No wellness data yet
              </Text>
              <Text
                fontSize={fp(3.2)}
                color={isDarkMode ? '#B0C4DE' : '#777777'}
                marginTop="$1"
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
                      fontSize={fp(4.2)}
                      fontWeight="700"
                      color={isDarkMode ? '#FFFFFF' : '#333333'}>
                      Overall Health Score
                    </Text>
                    <Text
                      fontSize={fp(3.2)}
                      color={isDarkMode ? '#B0C4DE' : '#777777'}
                      marginTop="$1">
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
                          fontSize={fp(3.2)}
                          fontWeight="bold"
                          color="#2E7D32">
                          {wellnessScore}% of weekly goals
                        </Text>
                      </View>
                    </XStack>
                  </YStack>

                  {/* Circular Ring Presentation */}
                  <View style={styles.scoreCircle}>
                    <Text
                      fontSize={fp(6.5)}
                      fontWeight="bold"
                      color={PRIMARY_COLOR}>
                      {wellnessScore}
                    </Text>
                    <Text
                      fontSize={fp(3)}
                      color={isDarkMode ? '#FFFFFF' : '#555555'}>
                      /100
                    </Text>
                  </View>
                </XStack>
              </Card>

              {/* Metrics Grid */}
              <Text
                fontSize={fp(4.5)}
                fontWeight="700"
                color={isDarkMode ? '#FFFFFF' : '#333333'}
                marginBottom={10}>
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
                    padding={12}
                    borderRadius={12}
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
                        fontSize={fp(3.6)}
                        fontWeight="600"
                        color={isDarkMode ? '#FFFFFF' : '#555555'}>
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
                        fontSize={fp(5)}
                        fontWeight="bold"
                        color={isDarkMode ? '#FFFFFF' : '#111111'}>
                        {item.value}
                      </Text>
                      <Text
                        fontSize={fp(2.8)}
                        color={isDarkMode ? '#B0C4DE' : '#888888'}
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
                      fontSize={fp(2.8)}
                      color={isDarkMode ? '#B0C4DE' : '#777777'}
                      marginTop={4}>
                      {item.description}
                    </Text>
                  </Card>
                ))}
              </XStack>

              {/* Line Chart Section */}
              <Text
                fontSize={fp(4.5)}
                fontWeight="700"
                color={isDarkMode ? '#FFFFFF' : '#333333'}
                marginBottom={10}>
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
                      stroke: PRIMARY_COLOR,
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
            fontSize={fp(4.5)}
            fontWeight="700"
            color={isDarkMode ? '#FFFFFF' : '#333333'}
            marginBottom={10}>
            Log Today
          </Text>
          <Card
            padding={14}
            borderRadius={16}
            backgroundColor={isDarkMode ? '#001280' : '#FFFFFF'}
            elevate
            bordered
            borderWidth={0.6}
            borderColor={isDarkMode ? '#334EBC' : '#E5E7EB'}
            marginBottom={16}>
            <Text
              fontSize={fp(3.4)}
              color={isDarkMode ? '#B0C4DE' : '#777777'}
              marginBottom="$3">
              Log or update today&apos;s wellness metrics.
            </Text>
            <YStack gap="$3">
              <XStack justifyContent="space-between" alignItems="center" gap="$3">
                <Text
                  fontSize={fp(3.2)}
                  fontWeight="600"
                  color={isDarkMode ? '#FFFFFF' : '#555555'}
                  width={wp(28)}>
                  Steps
                </Text>
                <TextInput
                  style={[
                    styles.logInput,
                    {
                      backgroundColor: isDarkMode ? '#0A0F5C' : '#F5F7FB',
                      color: isDarkMode ? '#FFFFFF' : '#333333',
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
                  fontSize={fp(3.2)}
                  fontWeight="600"
                  color={isDarkMode ? '#FFFFFF' : '#555555'}
                  width={wp(28)}>
                  Water (ml)
                </Text>
                <TextInput
                  style={[
                    styles.logInput,
                    {
                      backgroundColor: isDarkMode ? '#0A0F5C' : '#F5F7FB',
                      color: isDarkMode ? '#FFFFFF' : '#333333',
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
                  fontSize={fp(3.2)}
                  fontWeight="600"
                  color={isDarkMode ? '#FFFFFF' : '#555555'}
                  width={wp(28)}>
                  Sleep (hrs)
                </Text>
                <TextInput
                  style={[
                    styles.logInput,
                    {
                      backgroundColor: isDarkMode ? '#0A0F5C' : '#F5F7FB',
                      color: isDarkMode ? '#FFFFFF' : '#333333',
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
                  fontSize={fp(3.2)}
                  fontWeight="600"
                  color={isDarkMode ? '#FFFFFF' : '#555555'}
                  width={wp(28)}>
                  Breathing (min)
                </Text>
                <TextInput
                  style={[
                    styles.logInput,
                    {
                      backgroundColor: isDarkMode ? '#0A0F5C' : '#F5F7FB',
                      color: isDarkMode ? '#FFFFFF' : '#333333',
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
                  fontSize={fp(3.2)}
                  fontWeight="600"
                  color={isDarkMode ? '#FFFFFF' : '#555555'}
                  width={wp(28)}>
                  Active (min)
                </Text>
                <TextInput
                  style={[
                    styles.logInput,
                    {
                      backgroundColor: isDarkMode ? '#0A0F5C' : '#F5F7FB',
                      color: isDarkMode ? '#FFFFFF' : '#333333',
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
                  fontSize={fp(3.2)}
                  fontWeight="600"
                  color={isDarkMode ? '#FFFFFF' : '#555555'}
                  width={wp(28)}>
                  Calories (kcal)
                </Text>
                <TextInput
                  style={[
                    styles.logInput,
                    {
                      backgroundColor: isDarkMode ? '#0A0F5C' : '#F5F7FB',
                      color: isDarkMode ? '#FFFFFF' : '#333333',
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

            <Button
              testID="log-submit"
              onPress={handleLogSubmit}
              marginTop="$3"
              backgroundColor={BUTTON_COLOR}>
              <Text color="#FFFFFF">Save today&apos;s log</Text>
            </Button>

            {logError !== '' && (
              <Text
                testID="log-error"
                color="#D32F2F"
                fontSize={fp(3)}
                marginTop="$2">
                {logError}
              </Text>
            )}
            {logMutation.isSuccess && (
              <Text
                testID="log-success"
                color="#2E7D32"
                fontSize={fp(3)}
                marginTop="$2">
                Log saved. Dashboard updated.
              </Text>
            )}
            {logMutation.isError && (
              <Text
                testID="log-failed"
                color="#D32F2F"
                fontSize={fp(3)}
                marginTop="$2">
                Failed to save log. Please try again.
              </Text>
            )}
          </Card>

          {/* Guided Breathing Section */}
          <XStack
            justifyContent="space-between"
            alignItems="center"
            marginBottom={10}>
            <Text
              fontSize={fp(4.5)}
              fontWeight="700"
              color={isDarkMode ? '#FFFFFF' : '#333333'}>
              Guided Mindfulness
            </Text>
            <TouchableOpacity
              onPress={() => setShowBreathingTool(prev => !prev)}
              accessibilityRole="button"
              accessibilityLabel={
                showBreathingTool
                  ? 'Hide guided breathing tool'
                  : 'Open guided breathing tool'
              }>
              <Text
                fontSize={fp(3.3)}
                fontWeight="700"
                color={PRIMARY_COLOR}>
                {showBreathingTool ? 'Hide Session ▴' : 'Start Session ▾'}
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
            marginBottom={10}>
            <Text
              fontSize={fp(4.5)}
              fontWeight="700"
              color={isDarkMode ? '#FFFFFF' : '#333333'}>
              AI 7-Day Wellness Plan
            </Text>
            {planHistory.length > 1 && (
              <TouchableOpacity
                onPress={() => setShowPlanHistory(prev => !prev)}>
                <Text
                  fontSize={fp(3.2)}
                  fontWeight="600"
                  color={PRIMARY_COLOR}>
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
              <ActivityIndicator size="small" color={PRIMARY_COLOR} />
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
                      fontSize={fp(3.2)}
                      color="#0F172A"
                      lineHeight={18}>
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
                            fontSize={fp(3)}
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
                        fontSize={fp(3.6)}
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
                            fontSize={fp(3.2)}
                            color={isDarkMode ? '#E2E8F0' : '#334155'}
                            lineHeight={18}>
                            {task}
                          </Text>
                        </XStack>
                      ))}
                    </YStack>
                  )}

                <Button
                  testID="generate-wellness-plan-btn"
                  onPress={handleGeneratePlan}
                  disabled={isGeneratingPlan}
                  marginTop="$3"
                  backgroundColor={BUTTON_COLOR}>
                  <Text color="#FFFFFF">
                    {isGeneratingPlan
                      ? 'Generating AI Plan...'
                      : 'Refresh AI Plan from Latest Logs'}
                  </Text>
                </Button>
              </YStack>
            ) : (
              <YStack gap="$2.5">
                <Text
                  fontSize={fp(3.4)}
                  color={isDarkMode ? '#B0C4DE' : '#555555'}
                  lineHeight={20}>
                  Generate a personalized, clinician-guided 7-day wellness plan
                  tailored to your logged steps, sleep, hydration, and activity.
                </Text>
                <Button
                  testID="generate-wellness-plan-btn"
                  onPress={handleGeneratePlan}
                  disabled={isGeneratingPlan}
                  marginTop="$2"
                  backgroundColor={BUTTON_COLOR}>
                  <Text color="#FFFFFF">
                    {isGeneratingPlan
                      ? 'Generating AI Plan...'
                      : 'Generate AI 7-Day Plan'}
                  </Text>
                </Button>
              </YStack>
            )}

            {planStatusMessage !== '' && (
              <Text
                fontSize={fp(3)}
                color={
                  planStatusMessage.includes('Could not')
                    ? '#D32F2F'
                    : '#2E7D32'
                }
                marginTop="$2">
                {planStatusMessage}
              </Text>
            )}
          </Card>

          {/* Actionable Recommendations */}
          {recommendations.length > 0 && (
            <>
              <Text
                fontSize={fp(4.5)}
                fontWeight="700"
                color={isDarkMode ? '#FFFFFF' : '#333333'}
                marginBottom={10}>
                Insights & Recommendations
              </Text>
              <YStack gap="$3">
                {recommendations.map(rec => (
                  <Card
                    key={rec.id}
                    padding={12}
                    borderRadius={12}
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
                        fontSize={fp(3.2)}
                        color={isDarkMode ? '#FFFFFF' : '#444444'}
                        lineHeight={18}>
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(8),
  },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 191, 255, 0.08)',
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
    height: 42,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
    backgroundColor: 'rgba(0, 191, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0, 191, 255, 0.35)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  focusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0369A1',
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
});

export default WellnessDashboardScreen;
