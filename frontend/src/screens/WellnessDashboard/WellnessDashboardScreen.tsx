import React from 'react';
import { ScrollView, Text, StyleSheet, SafeAreaView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/ReduxStore';
import WearableSyncCard from './WearableSyncCard';
import ManualLogCard from './ManualLogCard';
import WeeklyChart from './WeeklyChart';

export default function WellnessDashboardScreen() {
  const isConnected = useSelector((state: RootState) => state.network.isConnected);
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long'
  });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.heading}>🌿 Wellness Dashboard</Text>
          <Text style={styles.date}>{today}</Text>
          {!isConnected && (
            <View style={styles.offlineBanner}>
              <Text style={styles.offlineText}>You're offline. Wellness data may not be available until you reconnect.</Text>
            </View>
          )}
        </View>

        {/* Wearable Sync */}
        <WearableSyncCard />

        {/* Manual Log */}
        <ManualLogCard />

        {/* Weekly Chart */}
        <WeeklyChart />

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },
  heading: { fontSize: 22, fontWeight: '700', color: '#111' },
  date: { fontSize: 13, color: '#888', marginTop: 2 },
  offlineBanner: {
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  offlineText: {
    fontSize: 12,
    color: '#856404',
    textAlign: 'center',
  },
});
