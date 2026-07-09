import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/ReduxStore';
import { useGetWeeklyWellness } from '../../hooks/useGetWeeklyWellness';

type ChartMetric = 'water' | 'steps';

const dayLabelMap: Record<string, string> = {
  '0': 'Sun', '1': 'Mon', '2': 'Tue', '3': 'Wed',
  '4': 'Thu', '5': 'Fri', '6': 'Sat',
};

function getDayLabel(dateStr: string): string {
  const d = new Date(dateStr);
  return dayLabelMap[String(d.getDay())] ?? '';
}

export default function WeeklyChart() {
  const isConnected = useSelector((state: RootState) => state.network.isConnected);
  const { data, isLoading, isError } = useGetWeeklyWellness(isConnected);
  const [metric, setMetric] = React.useState<ChartMetric>('water');

  const chartData = useMemo(() => {
    if (!data?.logs || data.logs.length === 0) return [];

    // Sort logs by date ascending (filter out logs with missing dates)
    const sorted = [...data.logs]
      .filter(log => log.date)
      .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());

    return sorted.map((log, _idx) => {
      const value = metric === 'steps' ? (log.steps ?? 0) : (log.water ?? 0);
      const isToday =
        log.date?.startsWith(new Date().toISOString().split('T')[0]);
      return {
        value,
        label: getDayLabel(log.date),
        frontColor: isToday ? '#378ADD' : '#4CAF50',
      };
    });
  }, [data, metric]);

  const maxValue = useMemo(() => {
    if (chartData.length === 0) return 100;
    const max = Math.max(...chartData.map((d) => d.value), 1);
    // Round up to nearest nice number
    const magnitude = Math.pow(10, Math.floor(Math.log10(max)));
    return Math.ceil(max / magnitude) * magnitude;
  }, [chartData]);

  const goalValue = metric === 'steps'
    ? (data?.goal?.steps ?? 10000)
    : (data?.goal?.water ?? 2500);

  if (isLoading) {
    return (
      <View style={styles.card}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#378ADD" />
          <Text style={styles.loadingText}>Loading weekly data...</Text>
        </View>
      </View>
    );
  }

  if (isError || chartData.length === 0) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>📊 Weekly {metric === 'steps' ? 'Steps' : 'Water'}</Text>
        <Text style={styles.emptyText}>
          {isError ? 'Unable to load weekly data' : 'No data yet — start logging!'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      {/* Title + Toggle */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>
          📊 Weekly {metric === 'steps' ? 'Steps' : 'Water'}
        </Text>
        <View style={styles.toggleRow}>
          <Text
            style={[styles.toggleOption, metric === 'water' && styles.toggleActive]}
            onPress={() => setMetric('water')}
          >
            Water
          </Text>
          <Text
            style={[styles.toggleOption, metric === 'steps' && styles.toggleActive]}
            onPress={() => setMetric('steps')}
          >
            Steps
          </Text>
        </View>
      </View>

      <BarChart
        data={chartData}
        barWidth={32}
        spacing={12}
        roundedTop
        hideRules
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{ color: '#999', fontSize: 11 }}
        noOfSections={4}
        maxValue={maxValue}
      />
      <View style={styles.legend}>
        <View style={styles.dot} />
        <Text style={styles.legendText}>
          Goal: {metric === 'steps' ? `${goalValue.toLocaleString()} steps` : `${goalValue.toLocaleString()} ml`}
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
  title: { fontSize: 15, fontWeight: '600', marginBottom: 16, color: '#111' },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  toggleRow: { flexDirection: 'row', gap: 8 },
  toggleOption: {
    fontSize: 12,
    color: '#999',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  toggleActive: {
    color: '#378ADD',
    borderColor: '#378ADD',
    backgroundColor: '#e8f0fe',
    fontWeight: '600',
  },
  legend: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#378ADD', marginRight: 6 },
  legendText: { fontSize: 12, color: '#666' },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  loadingText: {
    fontSize: 13,
    color: '#999',
    marginTop: 8,
  },
  emptyText: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    paddingVertical: 24,
  },
});
