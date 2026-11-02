import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import authAxios from '../../lib/api/authAxios';
import {GET_WELLNESS_WEEKLY_API} from '../../lib/api/APIUtils';
import {WeeklyWellnessResponse, WellnessLog} from '../../schemas/type';
import {getTodayLog} from '../../lib/utils/wellnessUtils';

interface WearableSyncCardProps {
  todayLog?: WellnessLog | null;
  onSynced?: (logs: WellnessLog[]) => void;
}

export default function WearableSyncCard({
  todayLog: propTodayLog,
  onSynced,
}: WearableSyncCardProps) {
  const [syncing, setSyncing] = useState(false);
  const [syncedLog, setSyncedLog] = useState<WellnessLog | null>(null);
  const [syncError, setSyncError] = useState<string>('');

  const activeLog = syncedLog ?? propTodayLog ?? null;
  const metrics = activeLog?.metrics;

  async function handleSync() {
    setSyncing(true);
    setSyncError('');
    try {
      const response = await authAxios.get(GET_WELLNESS_WEEKLY_API);
      const body = response.data as WeeklyWellnessResponse;
      const logs = Array.isArray(body?.data) ? body.data : [];
      const latestToday = getTodayLog(logs) ?? logs[0] ?? null;
      setSyncedLog(latestToday);
      onSynced?.(logs);
    } catch {
      setSyncError('Could not sync wellness data. Check your connection.');
    } finally {
      setSyncing(false);
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {Platform.OS === 'ios' ? '🍎 Apple HealthKit' : '🏃 Google Fit'} & Cloud
        Sync
      </Text>

      {metrics &&
      (metrics.steps !== undefined ||
        metrics.sleepHours !== undefined ||
        metrics.activeMinutes !== undefined) ? (
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>
              {(metrics.steps ?? 0).toLocaleString('en-US')}
            </Text>
            <Text style={styles.statLabel}>Steps</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{metrics.activeMinutes ?? 0} min</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{metrics.sleepHours ?? 0}h</Text>
            <Text style={styles.statLabel}>Sleep</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.hint}>
          Sync to fetch your latest logged wellness activity from the server
        </Text>
      )}

      {syncError ? <Text style={styles.errorText}>{syncError}</Text> : null}

      <TouchableOpacity
        style={[styles.button, syncing && styles.buttonDisabled]}
        onPress={handleSync}
        disabled={syncing}
        accessibilityRole="button"
        accessibilityLabel={
          syncing ? 'Syncing wearable data' : 'Sync wearable data'
        }
        accessibilityHint={
          syncing
            ? 'Please wait while your wearable data is being synchronized'
            : 'Synchronizes your wearable health data'
        }
        accessibilityState={{disabled: syncing, busy: syncing}}>
        {syncing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>🔄 Sync Now</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginBottom: 0,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
    marginBottom: 12,
  },
  hint: {
    fontSize: 13,
    color: '#999',
    marginBottom: 12,
  },
  errorText: {
    fontSize: 12,
    color: '#D32F2F',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  statLabel: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  button: {
    backgroundColor: '#378ADD',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#aac8ef',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
