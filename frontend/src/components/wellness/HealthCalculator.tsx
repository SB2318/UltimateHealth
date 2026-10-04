import {useMemo, useState} from 'react';
import {StyleSheet, TextInput, Pressable} from 'react-native';
import {Card, Text, View, XStack, YStack} from 'tamagui';
import {fp} from '../../lib/ui/Metric';

type UnitSystem = 'metric' | 'imperial';
type Sex = 'male' | 'female';

const toNumber = (value: string): number | null => {
  const parsed = Number(value);
  return value.trim() === '' || !Number.isFinite(parsed) ? null : parsed;
};

export const calculateHealthMetrics = (
  height: number,
  weight: number,
  age: number,
  sex: Sex,
  units: UnitSystem,
): {bmi: number; bmr: number} => {
  const heightCm = units === 'metric' ? height : height * 2.54;
  const weightKg = units === 'metric' ? weight : weight * 0.45359237;
  const bmi = weightKg / ((heightCm / 100) ** 2);
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + (sex === 'male' ? 5 : -161);
  return {bmi, bmr};
};

export const getBmiCategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Healthy range';
  if (bmi < 30) return 'Overweight';
  return 'Obesity range';
};

type Props = {
  isDarkMode: boolean;
};

const HealthCalculator = ({isDarkMode}: Props) => {
  const [units, setUnits] = useState<UnitSystem>('metric');
  const [sex, setSex] = useState<Sex>('female');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');

  const result = useMemo(() => {
    const heightValue = toNumber(height);
    const weightValue = toNumber(weight);
    const ageValue = toNumber(age);
    if (!heightValue || !weightValue || !ageValue || heightValue <= 0 || weightValue <= 0 || ageValue <= 0 || ageValue > 120) return null;
    return calculateHealthMetrics(heightValue, weightValue, ageValue, sex, units);
  }, [age, height, sex, units, weight]);

  const colors = {
    text: isDarkMode ? '#FFFFFF' : '#333333',
    muted: isDarkMode ? '#B0C4DE' : '#777777',
    input: isDarkMode ? '#0A0F5C' : '#F5F7FB',
    border: isDarkMode ? '#334EBC' : '#E5E7EB',
    card: isDarkMode ? '#001280' : '#FFFFFF',
  };

  return (
    <Card padding={14} borderRadius={16} backgroundColor={colors.card} elevate bordered borderWidth={0.6} borderColor={colors.border} marginBottom={16}>
      <Text fontSize={fp(4.5)} fontWeight="700" color={colors.text}>Health Calculator</Text>
      <Text fontSize={fp(3.1)} color={colors.muted} marginTop="$1" marginBottom="$3">
        Estimate BMI and daily resting calorie needs. Results are educational, not medical advice.
      </Text>

      <Text fontSize={fp(2.8)} color={colors.muted} fontWeight="700" marginBottom="$1">
        Measurement system
      </Text>
      <XStack gap="$2" marginBottom="$3" style={styles.optionRow}>
        {(['metric', 'imperial'] as UnitSystem[]).map(unit => (
          <Pressable
            key={unit}
            onPress={() => setUnits(unit)}
            accessibilityRole="radio"
            accessibilityState={{selected: units === unit}}
            style={[
              styles.toggle,
              {
                backgroundColor: units === unit ? '#0F52BA' : colors.input,
                borderColor: units === unit ? '#0F52BA' : colors.border,
              },
            ]}>
            <Text color={units === unit ? '#FFFFFF' : colors.text} fontWeight="700">
              {units === unit ? '✓ ' : ''}{unit === 'metric' ? 'Metric' : 'Imperial'}
            </Text>
          </Pressable>
        ))}
      </XStack>

      <Text fontSize={fp(2.8)} color={colors.muted} fontWeight="700" marginBottom="$1">
        Biological sex
      </Text>
      <XStack gap="$2" marginBottom="$3" style={styles.optionRow}>
        {(['female', 'male'] as Sex[]).map(option => (
          <Pressable
            key={option}
            onPress={() => setSex(option)}
            accessibilityRole="radio"
            accessibilityLabel={`${option} biological sex`}
            accessibilityState={{selected: sex === option}}
            style={[
              styles.sexButton,
              {
                backgroundColor: sex === option ? '#E7F0FF' : colors.input,
                borderColor: sex === option ? '#0F52BA' : colors.border,
                borderWidth: sex === option ? 2 : 1,
              },
            ]}>
            <Text color={sex === option ? '#0F52BA' : colors.text} fontWeight="700">
              {sex === option ? '✓ ' : ''}{option === 'female' ? 'Female' : 'Male'}
            </Text>
          </Pressable>
        ))}
      </XStack>

      <YStack gap="$2">
        <TextInput testID="calculator-height" value={height} onChangeText={setHeight} keyboardType="numeric" placeholder={units === 'metric' ? 'Height (cm)' : 'Height (inches)'} placeholderTextColor={colors.muted} style={[styles.input, {backgroundColor: colors.input, color: colors.text, borderColor: colors.border}]} />
        <TextInput testID="calculator-weight" value={weight} onChangeText={setWeight} keyboardType="numeric" placeholder={units === 'metric' ? 'Weight (kg)' : 'Weight (lb)'} placeholderTextColor={colors.muted} style={[styles.input, {backgroundColor: colors.input, color: colors.text, borderColor: colors.border}]} />
        <TextInput testID="calculator-age" value={age} onChangeText={setAge} keyboardType="numeric" placeholder="Age (years)" placeholderTextColor={colors.muted} style={[styles.input, {backgroundColor: colors.input, color: colors.text, borderColor: colors.border}]} />
      </YStack>

      {result && (
        <XStack marginTop="$3" gap="$2">
          <View flex={1} padding={10} borderRadius={10} backgroundColor={colors.input} alignItems="center">
            <Text fontSize={fp(5.5)} fontWeight="800" color="#0F52BA">{result.bmi.toFixed(1)}</Text>
            <Text fontSize={fp(2.8)} color={colors.muted}>BMI</Text>
            <Text fontSize={fp(2.8)} color={colors.text} marginTop="$1">{getBmiCategory(result.bmi)}</Text>
          </View>
          <View flex={1} padding={10} borderRadius={10} backgroundColor={colors.input} alignItems="center">
            <Text fontSize={fp(5.5)} fontWeight="800" color="#4CAF50">{Math.round(result.bmr).toLocaleString('en-US')}</Text>
            <Text fontSize={fp(2.8)} color={colors.muted}>BMR kcal/day</Text>
            <Text fontSize={fp(2.8)} color={colors.text} marginTop="$1">Resting estimate</Text>
          </View>
        </XStack>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  optionRow: {width: '100%'},
  toggle: {flex: 1, alignItems: 'center', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10, borderWidth: 1},
  sexButton: {flex: 1, alignItems: 'center', paddingVertical: 11, borderRadius: 10},
  input: {width: '100%', borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, fontSize: 15},
});

export default HealthCalculator;
