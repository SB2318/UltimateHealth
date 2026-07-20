import { StyleSheet, Dimensions, useColorScheme, ScrollView, SafeAreaView } from 'react-native';
import { YStack, XStack, Text, Card, View, Separator, Theme } from 'tamagui';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { LineChart } from 'react-native-chart-kit';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { PRIMARY_COLOR, BUTTON_COLOR } from '../../lib/ui/Theme';
import { wp, hp, fp } from '../../lib/ui/Metric';

const WellnessDashboardScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const bottomBarHeight = useBottomTabBarHeight();
  const screenWidth = Dimensions.get('window').width;

  // Static placeholder data as requested
  const wellnessScore = 85;
  const riskLevel = 'Low'; // Low, Medium, High
  
  const metrics = [
    {
      id: 'steps',
      title: 'Steps',
      value: '8,450',
      target: '/ 10,000 steps',
      progress: 0.845,
      icon: 'walk',
      color: '#4CAF50',
      description: '84% of daily goal'
    },
    {
      id: 'sleep',
      title: 'Sleep',
      value: '7.5 hrs',
      target: '/ 8.0 hrs',
      progress: 0.937,
      icon: 'moon',
      color: '#9C27B0',
      description: 'Good quality sleep'
    },
    {
      id: 'heartRate',
      title: 'Heart Rate',
      value: '72 bpm',
      target: 'Resting avg',
      progress: 0.72,
      icon: 'heart',
      color: '#F44336',
      description: 'Normal resting zone'
    },
    {
      id: 'hydration',
      title: 'Hydration',
      value: '1.8L',
      target: '/ 2.5L total',
      progress: 0.72,
      icon: 'water',
      color: '#2196F3',
      description: '0.7L remaining'
    }
  ];

  const recommendations = [
    {
      id: '1',
      type: 'warning',
      text: 'Increase water intake: You are still 0.7L away from your daily hydration target.',
      icon: 'water-outline',
      iconColor: '#2196F3'
    },
    {
      id: '2',
      type: 'success',
      text: 'Great sleep quality last night! You achieved deep rest cycles for 7.5 hours.',
      icon: 'checkmark-circle-outline',
      iconColor: '#4CAF50'
    },
    {
      id: '3',
      type: 'info',
      text: 'Keep up the step activity. You are close to hitting your 10,000 daily steps goal.',
      icon: 'trending-up-outline',
      iconColor: '#FF9800'
    }
  ];

  // Chart data for wellness trend (Mon - Sun)
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [78, 80, 82, 81, 85, 84, 85],
        color: (opacity = 1) => `rgba(0, 191, 255, ${opacity})`,
        strokeWidth: 3
      }
    ],
    legend: ['Wellness Trend']
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return '#E8F5E9';
      case 'medium': return '#FFF8E1';
      case 'high': return '#FFEBEE';
      default: return '#ECEFF1';
    }
  };

  const getRiskTextColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return '#2E7D32';
      case 'medium': return '#F57F17';
      case 'high': return '#C62828';
      default: return '#37474F';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#000A60' : '#F5F7FB' }]}>
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

        {/* Score & Risk Badge Section */}
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
                  backgroundColor={getRiskBadgeColor(riskLevel)}
                >
                  <Text fontSize={fp(3.2)} fontWeight="bold" color={getRiskTextColor(riskLevel)}>
                    {riskLevel} Risk
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
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
