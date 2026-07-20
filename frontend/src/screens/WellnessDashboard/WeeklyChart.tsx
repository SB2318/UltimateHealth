 
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const weekData = [
  { value: 4200, label: 'Mon', frontColor: '#4CAF50' },
  { value: 7800, label: 'Tue', frontColor: '#4CAF50' },
  { value: 5500, label: 'Wed', frontColor: '#4CAF50' },
  { value: 9100, label: 'Thu', frontColor: '#4CAF50' },
  { value: 6300, label: 'Fri', frontColor: '#4CAF50' },
  { value: 8200, label: 'Sat', frontColor: '#378ADD' }, // today highlight
  { value: 0,    label: 'Sun', frontColor: '#ccc' },    // future
];

export default function WeeklyChart() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>📊 Weekly Steps</Text>
      <View style={styles.chart}>
        {weekData.map(item => (
          <View key={item.label} style={styles.barColumn}>
            <View
              style={[
                styles.bar,
                {
                  height: `${Math.min((item.value / 10000) * 100, 100)}%`,
                  backgroundColor: item.frontColor,
                },
              ]}
            />
            <Text style={styles.axisLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
      <View style={styles.legend}>
        <View style={styles.dot} />
        <Text style={styles.legendText}>Goal: 10,000 steps</Text>
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
  title: { fontSize: 15, fontWeight: '600', marginBottom: 16, color: '#111' },
  chart: {
    height: 160,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
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
  axisLabel: { fontSize: 11, color: '#999', marginTop: 6 },
  legend: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#378ADD', marginRight: 6 },
  legendText: { fontSize: 12, color: '#666' },
});
