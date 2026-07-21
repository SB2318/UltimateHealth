import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ACADEMY_PRIMARY, ACADEMY_BACKGROUND, ACADEMY_SURFACE, ACADEMY_TEXT_PRIMARY, ACADEMY_TEXT_SECONDARY } from '../../lib/ui/Theme';

interface ProgressCardProps {
  progress: number;
  label: string;
}

const ProgressCard = ({ progress, label }: ProgressCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.percentage}>{progress}%</Text>
      </View>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: ACADEMY_SURFACE,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: ACADEMY_TEXT_PRIMARY,
  },
  percentage: {
    fontSize: 14,
    fontWeight: '700',
    color: ACADEMY_PRIMARY,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: ACADEMY_BACKGROUND,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: ACADEMY_PRIMARY,
    borderRadius: 4,
  },
});

export default ProgressCard;
