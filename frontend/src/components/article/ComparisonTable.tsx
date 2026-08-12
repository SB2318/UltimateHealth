import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { XStack, YStack, Text } from 'tamagui';
import { ComparisonField } from '../../hooks/useTermComparison';

type Props = {
  termA: string;
  termB: string;
  fields: ComparisonField[];
  isDark: boolean;
};

export default function ComparisonTable({ termA, termB, fields, isDark }: Props) {
  const bg      = isDark ? '#1a1a2e' : '#ffffff';
  const border  = isDark ? '#2a2a4a' : '#e0e0e0';
  const header  = isDark ? '#16213e' : '#f0f4ff';
  const accent  = '#4361ee';

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <YStack>
        {/* Header row */}
        <XStack>
          <YStack style={[styles.labelCell, { backgroundColor: header, borderColor: border }]}>
            <Text fontWeight="700" color={accent}>Field</Text>
          </YStack>
          <YStack style={[styles.dataCell, { backgroundColor: accent }]}>
            <Text fontWeight="700" color="white" numberOfLines={1}>{termA}</Text>
          </YStack>
          <YStack style={[styles.dataCell, { backgroundColor: '#e63946' }]}>
            <Text fontWeight="700" color="white" numberOfLines={1}>{termB}</Text>
          </YStack>
        </XStack>

        {/* Data rows */}
        {fields.map((row, i) => (
          <XStack key={row.label}>
            <YStack style={[
              styles.labelCell,
              { backgroundColor: i % 2 === 0 ? header : bg, borderColor: border }
            ]}>
              <Text fontWeight="600" fontSize={12} color={accent}>{row.label}</Text>
            </YStack>
            <YStack style={[
              styles.dataCell,
              { backgroundColor: i % 2 === 0 ? bg : header, borderColor: border }
            ]}>
              <Text fontSize={12}>{row.termA ?? 'Not applicable'}</Text>
            </YStack>
            <YStack style={[
              styles.dataCell,
              { backgroundColor: i % 2 === 0 ? bg : header, borderColor: border }
            ]}>
              <Text fontSize={12}>{row.termB ?? 'Not applicable'}</Text>
            </YStack>
          </XStack>
        ))}
      </YStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  labelCell: {
    width: 110,
    padding: 10,
    borderWidth: 0.5,
    justifyContent: 'center',
  },
  dataCell: {
    width: 180,
    padding: 10,
    borderWidth: 0.5,
    justifyContent: 'center',
  },
});
