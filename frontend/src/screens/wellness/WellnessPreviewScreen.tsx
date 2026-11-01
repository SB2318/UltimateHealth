import {SafeAreaView, ScrollView, StyleSheet, useColorScheme} from 'react-native';
import {Card, Text, View, XStack, YStack, Button} from 'tamagui';
import {useNavigation} from '@react-navigation/native';
import HealthCalculator from '../../components/wellness/HealthCalculator';
import {calculateWellnessInsights} from '../../lib/utils/wellnessUtils';
import {WellnessLog} from '../../schemas/type';
import {fp, hp, wp} from '../../lib/ui/Metric';
import {PRIMARY_COLOR} from '../../lib/ui/Theme';

const SAMPLE_LOGS: WellnessLog[] = [
  {userId: 'preview', date: '2026-10-01', metrics: {steps: 10000, waterMl: 2500, sleepHours: 8}},
  {userId: 'preview', date: '2026-10-02', metrics: {steps: 8200, waterMl: 2500, sleepHours: 7.5}},
  {userId: 'preview', date: '2026-10-03', metrics: {steps: 10000, waterMl: 2500, sleepHours: 8, activeMinutes: 30}},
];

const WellnessPreviewScreen = () => {
  const navigation = useNavigation<any>();
  const isDarkMode = useColorScheme() === 'dark';
  const colors = {
    background: isDarkMode ? '#000A60' : '#F5F7FB',
    card: isDarkMode ? '#001280' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#333333',
    muted: isDarkMode ? '#B0C4DE' : '#777777',
    border: isDarkMode ? '#334EBC' : '#E5E7EB',
  };
  const insights = calculateWellnessInsights(SAMPLE_LOGS, new Date('2026-10-03T12:00:00'));

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <ScrollView contentContainerStyle={styles.content}>
        <XStack justifyContent="space-between" alignItems="center" marginBottom="$3">
          <Text fontSize={16} fontWeight="700" color={colors.text}>Public wellness preview</Text>
          <Button
            size="$3"
            onPress={() => navigation.navigate('LoginScreen', {})}
            accessibilityRole="button"
            accessibilityLabel="Open sign in and sign up">
            <Text color="#FFFFFF">Sign in / Sign up</Text>
          </Button>
        </XStack>
        <Text fontSize={fp(7)} fontWeight="800" color={isDarkMode ? '#FFFFFF' : '#0F52BA'}>Wellness Preview</Text>
        <Text fontSize={fp(3.2)} color={colors.muted} marginTop="$1" marginBottom="$3">
          Explore sample wellness features without signing in. No data is saved from this preview.
        </Text>

        <HealthCalculator isDarkMode={isDarkMode} />

        <Card padding={14} borderRadius={16} backgroundColor={colors.card} elevate bordered borderWidth={0.6} borderColor={colors.border}>
          <Text fontSize={fp(4.5)} fontWeight="700" color={colors.text}>Weekly Insights</Text>
          <XStack justifyContent="space-between" gap="$2" marginTop="$3">
            <YStack flex={1} alignItems="center">
              <Text fontSize={fp(6)} fontWeight="800" color={PRIMARY_COLOR}>{insights.daysLogged}</Text>
              <Text textAlign="center" fontSize={fp(2.8)} color={colors.muted}>Days logged</Text>
            </YStack>
            <YStack flex={1} alignItems="center">
              <Text fontSize={fp(6)} fontWeight="800" color="#FF9800">{insights.currentStreak}</Text>
              <Text textAlign="center" fontSize={fp(2.8)} color={colors.muted}>Day streak</Text>
            </YStack>
            <YStack flex={1} alignItems="center">
              <Text fontSize={fp(6)} fontWeight="800" color="#4CAF50">{insights.completionRate}%</Text>
              <Text textAlign="center" fontSize={fp(2.8)} color={colors.muted}>Goal days</Text>
            </YStack>
          </XStack>
          <View marginTop="$3">
            <Text textAlign="center" fontSize={fp(3.1)} color={colors.muted}>
              Sample data: {insights.goalDays} of {insights.daysLogged} days reached at least two daily goals.
            </Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {paddingHorizontal: wp(4), paddingBottom: hp(4), paddingTop: hp(2)},
});

export default WellnessPreviewScreen;
