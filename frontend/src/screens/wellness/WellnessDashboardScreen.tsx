import { StyleSheet, Dimensions, useColorScheme, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { YStack, XStack, Text, Card, View, Button, Separator, Theme } from 'tamagui';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { LineChart } from 'react-native-chart-kit';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { PRIMARY_COLOR, BUTTON_COLOR } from '../../lib/ui/Theme';
import { wp, hp, fp } from '../../lib/ui/Metric';
import { useAppSelector } from '../../store/hooks';
import { useGetWeeklyWellness } from '../../hooks/wellness/useGetWeeklyWellness';
import { buildChartData, calculateDashboardScore, formatMetricValue, metricGoal, getTodayLog } from '../../lib/utils/wellnessUtils';

const WellnessDashboardScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const bottomBarHeight = useBottomTabBarHeight();
  const screenWidth = Dimensions.get('window').width;

  const { isConnected } = useAppSelector((state: any) => state.network);
  const { data: weeklyLogs = [], isLoading, isError, refetch } = useGetWeeklyWellness(isConnected);

  const todayLog = getTodayLog(weeklyLogs);
  const wellnessScore = calculateDashboardScore(weeklyLogs);

  const metrics = [
    {
      id: 'steps',
      title: 'Steps',
      value: formatMetricValue('steps', todayLog?.metrics.steps ?? 0),
      target: '/ 10,000 steps',
      progress: metricGoal('steps', todayLog?.metrics.steps ?? 0),
      icon: 'walk',
      color: '#4CAF50',
      description: `${Math.round((metricGoal('steps', todayLog?.metrics.steps ?? 0)) * 100)}% of daily goal`
    },
    {
      id: 'sleep',
      title: 'Sleep',
      value: formatMetricValue('sleepHours', todayLog?.metrics.sleepHours ?? 0),
      target: '/ 8.0 hrs',
      progress: metricGoal('sleepHours', todayLog?.metrics.sleepHours ?? 0),
      icon: 'moon',
      color: '#9C27B0',
      description: `${Math.round(metricGoal('sleepHours', todayLog?.metrics.sleepHours ?? 0) * 100)}% of daily goal`
    },
    {
      id: 'hydration',
      title: 'Hydration',
      value: formatMetricValue('waterMl', todayLog?.metrics.waterMl ?? 0),
      target: '/ 2.5L total',
      progress: metricGoal('waterMl', todayLog?.metrics.waterMl ?? 0),
      icon: 'water',
      color: '#2196F3',
      description: `${Math.round(metricGoal('waterMl', todayLog?.metrics.waterMl ?? 0) * 100)}% of daily goal`
    },
    {
      id: 'active',
      title: 'Active Minutes',
      value: formatMetricValue('activeMinutes', todayLog?.metrics.activeMinutes ?? 0),
      target: '/ 30 min',
      progress: metricGoal('activeMinutes', todayLog?.metrics.activeMinutes ?? 0),
      icon: 'fitness',
      color: '#F44336',
      description: `${Math.round(metricGoal('activeMinutes', todayLog?.metrics.activeMinutes ?? 0) * 100)}% of daily goal`
    }
  ];

  const weeklyChart = buildChartData(weeklyLogs);
  const chartData = {
    labels: weeklyChart.labels,
    datasets: [
      {
        data: weeklyChart.datasets[0].data,
        color: (opacity = 1) => `rgba(0, 191, 255, ${opacity})`,
        strokeWidth: 3
      }
    ],
    legend: ['Wellness Trend']
  };

  const recommendations = (() => {
    const m = todayLog?.metrics;
    const list: Array<{id: string; type: 'warning' | 'success' | 'info'; text: string; icon: string; iconColor: string}> = [];
    if (!m) return list;
    if ((m.steps ?? 0) < 10000) list.push({id: '1', type: 'info', text: `You are ${Math.max(0, 10000 - (m.steps ?? 0)).toLocaleString('en-US')} steps away from your daily goal.`, icon: 'trending-up-outline', iconColor: '#FF9800'});
    if ((m.waterMl ?? 0) < 2500) list.push({id: '2', type: 'warning', text: `Increase water intake: ${((2500 - (m.waterMl ?? 0)) / 1000).toFixed(1)}L remaining to your daily hydration target.`, icon: 'water-outline', iconColor: '#2196F3'});
    if ((m.sleepHours ?? 0) < 8) list.push({id: '3', type: 'info', text: `Aim for 8 hours of sleep — you logged ${(m.sleepHours ?? 0).toFixed(1)} hours.`, icon: 'moon-outline', iconColor: '#9C27B0'});
    if (list.length === 0) list.push({id: '4', type: 'success', text: 'All daily wellness goals met. Great job!', icon: 'checkmark-circle-outline', iconColor: '#4CAF50'});
    return list;
  })();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#000A60' : '#F5F7FB' }]}>
      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={PRIMARY_COLOR} testID="loading-indicator" />
        </View>
      ) : isError ? (
        <View style={styles.centerContainer}>
          <Card padding={16} borderRadius={12} backgroundColor={isDarkMode ? '#001280' : '#FFFFFF'} bordered borderWidth={0.6} borderColor={isDarkMode ? '#334EBC' : '#E5E7EB'}>
            <Text fontSize={fp(4)} fontWeight="600" color={isDarkMode ? '#FFFFFF' : '#333333'}>Unable to load wellness data</Text>
            <Text fontSize={fp(3.2)} color={isDarkMode ? '#B0C4DE' : '#777777'} marginTop="$1">Check your connection and try again.</Text>
            <Button onPress={() => refetch()} marginTop="$3" backgroundColor={BUTTON_COLOR}><Text color="#FFFFFF">Retry</Text></Button>
          </Card>
        </View>
      ) : weeklyLogs.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text fontSize={fp(4)} fontWeight="600" color={isDarkMode ? '#FFFFFF' : '#333333'}>No wellness data yet</Text>
          <Text fontSize={fp(3.2)} color={isDarkMode ? '#B0C4DE' : '#777777'} marginTop="$1">Log today&apos;s metrics to see your dashboard.</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: bottomBarHeight + hp(4),
            paddingHorizontal: wp(4)
          }}
        >
          {/* Header Greeting */}
          <YStack marginVertical="$3">
            <Text fontSize={fp(7)} fontWeight="800" color={isDarkMode ? '#FFFFFF' : '#0F52BA'}>
              Wellness Dashboard
            </Text>
            <Text fontSize={fp(3.8)} color={isDarkMode ? '#B0C4DE' : '#666666'} marginTop="$1">
              Track your vital metrics and customized health score.
            </Text>
          </YStack>

          {/* Score Section */}
          <Card
            padding={16}
            borderRadius={16}
            backgroundColor={isDarkMode ? '#001280' : '#FFFFFF'}
            elevate
            bordered
            borderWidth={0.6}
            borderColor={isDarkMode ? '#334EBC' : '#E5E7EB'}
            marginBottom={16}
          >
            <XStack justifyContent="space-between" alignItems="center">
              <YStack flex={1}>
                <Text fontSize={fp(4.2)} fontWeight="700" color={isDarkMode ? '#FFFFFF' : '#333333'}>
                  Overall Health Score
                </Text>
                <Text fontSize={fp(3.2)} color={isDarkMode ? '#B0C4DE' : '#777777'} marginTop="$1">
                  Your score is calculated based on sleep, steps, and hydration trends.
                </Text>

                <XStack alignItems="center" marginTop="$3">
                  <View
                    paddingHorizontal={12}
                    paddingVertical={6}
                    borderRadius={20}
                    backgroundColor="#E8F5E9"
                  >
                    <Text fontSize={fp(3.2)} fontWeight="bold" color="#2E7D32">
                      {wellnessScore}% of weekly goals
                    </Text>
                  </View>
                </XStack>
              </YStack>

              {/* Circular Ring Presentation */}
              <View style={styles.scoreCircle}>
                <Text fontSize={fp(6.5)} fontWeight="bold" color={PRIMARY_COLOR}>
                  {wellnessScore}
                </Text>
                <Text fontSize={fp(3)} color={isDarkMode ? '#FFFFFF' : '#555555'}>
                  /100
                </Text>
              </View>
            </XStack>
          </Card>

          {/* Metrics Grid */}
          <Text fontSize={fp(4.5)} fontWeight="700" color={isDarkMode ? '#FFFFFF' : '#333333'} marginBottom={10}>
            Today's Metrics
          </Text>
          <XStack flexWrap="wrap" justifyContent="space-between" marginBottom={16}>
            {metrics.map((item) => (
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
                elevate
              >
                <XStack justifyContent="space-between" alignItems="center" marginBottom={8}>
                  <Text fontSize={fp(3.6)} fontWeight="600" color={isDarkMode ? '#FFFFFF' : '#555555'}>
                    {item.title}
                  </Text>
                  <Ionicons name={item.icon as any} size={20} color={item.color} />
                </XStack>

                <XStack alignItems="baseline">
                  <Text fontSize={fp(5)} fontWeight="bold" color={isDarkMode ? '#FFFFFF' : '#111111'}>
                    {item.value}
                  </Text>
                  <Text fontSize={fp(2.8)} color={isDarkMode ? '#B0C4DE' : '#888888'} marginLeft={4}>
                    {item.target}
                  </Text>
                </XStack>

                {/* Progress Line */}
                <View style={styles.progressBarBackground}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${item.progress * 100}%`, backgroundColor: item.color }
                    ]}
                  />
                </View>

                <Text fontSize={fp(2.8)} color={isDarkMode ? '#B0C4DE' : '#777777'} marginTop={4}>
                  {item.description}
                </Text>
              </Card>
            ))}
          </XStack>

          {/* Line Chart Section */}
          {weeklyLogs.length > 0 && (
            <>
              <Text fontSize={fp(4.5)} fontWeight="700" color={isDarkMode ? '#FFFFFF' : '#333333'} marginBottom={10}>
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
                alignItems="center"
              >
                <LineChart
                  data={chartData}
                  width={screenWidth - wp(12)}
                  height={200}
                  chartConfig={{
                    backgroundColor: isDarkMode ? '#001280' : '#FFFFFF',
                    backgroundGradientFrom: isDarkMode ? '#001280' : '#FFFFFF',
                    backgroundGradientTo: isDarkMode ? '#001280' : '#FFFFFF',
                    decimalPlaces: 0,
                    color: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(15, 82, 186, ${opacity})`,
                    labelColor: (opacity = 1) => isDarkMode ? `rgba(176, 196, 222, ${opacity})` : `rgba(102, 102, 102, ${opacity})`,
                    propsForDots: {
                      r: '4',
                      strokeWidth: '2',
                      stroke: PRIMARY_COLOR
                    },
                    propsForBackgroundLines: {
                      stroke: isDarkMode ? '#334EBC' : '#E5E7EB',
                      strokeDasharray: ''
                    }
                  }}
                  bezier
                  style={{
                    marginVertical: 4,
                    borderRadius: 16
                  }}
                />
              </Card>
            </>
          )}

          {/* Actionable Recommendations */}
          <Text fontSize={fp(4.5)} fontWeight="700" color={isDarkMode ? '#FFFFFF' : '#333333'} marginBottom={10}>
            Insights & Recommendations
          </Text>
          <YStack gap="$3">
            {recommendations.map((rec) => (
              <Card
                key={rec.id}
                padding={12}
                borderRadius={12}
                backgroundColor={isDarkMode ? '#001280' : '#FFFFFF'}
                bordered
                borderWidth={0.6}
                borderColor={isDarkMode ? '#334EBC' : '#E5E7EB'}
                elevate
              >
                <XStack gap="$3" alignItems="center">
                  <Ionicons name={rec.icon as any} size={24} color={rec.iconColor} />
                  <Text flex={1} fontSize={fp(3.2)} color={isDarkMode ? '#FFFFFF' : '#444444'} lineHeight={18}>
                    {rec.text}
                  </Text>
                </XStack>
              </Card>
            ))}
          </YStack>

        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(8)
  },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 191, 255, 0.08)'
  },
  progressBarBackground: {
    height: 6,
    width: '100%',
    backgroundColor: '#ECEFF1',
    borderRadius: 3,
    marginTop: 8,
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3
  }
});

export default WellnessDashboardScreen;