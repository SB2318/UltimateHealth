import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {WellnessLog} from '../../schemas/type';
import {getTodayDateString} from '../../lib/utils/wellnessUtils';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface WeeklyChartProps {
  logs?: WellnessLog[];
  goalSteps?: number;
}

export default function WeeklyChart({
  logs = [],
  goalSteps = 10000,
}: WeeklyChartProps) {
  const todayStr = getTodayDateString();
  const safeGoal = goalSteps > 0 ? goalSteps : 10000;

  const sortedLogs = [...logs].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <View style={styles.card}>
      <Text style={styles.title}>📊 Weekly Steps</Text>
      {sortedLogs.length === 0 ? (
        <Text style={styles.emptyText}>
          No step logs recorded for the past 7 days yet.
        </Text>
      ) : (
        <View style={styles.chart}>
          {sortedLogs.map(item => {
            const steps = item.metrics?.steps ?? 0;
            const dayLabel =
              DAY_LABELS[new Date(item.date + 'T00:00:00').getDay()] ||
              item.date.slice(5);
            const isToday = item.date === todayStr;

            return (
              <View key={item.date} style={styles.barColumn}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${Math.min((steps / safeGoal) * 100, 100)}%`,
                      backgroundColor: isToday ? '#378ADD' : '#4CAF50',
                    },
                  ]}
                />
                <Text style={styles.axisLabel}>{dayLabel}</Text>
              </View>
            );
          })}
        </View>
      )}
      <View style={styles.legend}>
        <View style={styles.dot} />
        <Text style={styles.legendText}>
          Goal: {safeGoal.toLocaleString('en-US')} steps
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  title: {fontSize: 15, fontWeight: '600', marginBottom: 16, color: '#111'},
  emptyText: {
    fontSize: 13,
    color: '#666',
    paddingVertical: 20,
    textAlign: 'center',
  },
  chart: {
    height: 160,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingHorizontal: 4,
  },
  barColumn: {
    width: 36,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bar: {
    width: 32,
    minHeight: 4,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  axisLabel: {fontSize: 11, color: '#999', marginTop: 6},
  legend: {flexDirection: 'row', alignItems: 'center', marginTop: 12},
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#378ADD',
    marginRight: 6,
  },
  legendText: {fontSize: 12, color: '#666'},
});
