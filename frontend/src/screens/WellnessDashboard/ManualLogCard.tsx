import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/ReduxStore';
import { useLogWellnessMetric } from '../../hooks/useLogWellnessMetric';
import { useGetWeeklyWellness } from '../../hooks/useGetWeeklyWellness';
import { wellnessLogSchema } from '../../schemas/wellnessSchemas';

export default function ManualLogCard() {
  const isConnected = useSelector((state: RootState) => state.network.isConnected);
  const { data: weeklyData, isLoading: isWeeklyLoading } = useGetWeeklyWellness(isConnected);
  const mutation = useLogWellnessMetric();

  const [water, setWater] = useState(0);
  const [calories, setCalories] = useState(0);
  const [mood, setMood] = useState('');

  const moods = ['😔', '😐', '🙂', '😄', '🤩'];
  const waterGoal = 2500;
  const calGoal = 2000;

  // Pre-fill form from today's existing data if available
  useEffect(() => {
    if (!weeklyData?.logs) return;
    const todayStr = new Date().toISOString().split('T')[0];
    const todayLog = weeklyData.logs.find(
      (log) => log.date && log.date.startsWith(todayStr),
    );
    if (todayLog) {
      setWater(todayLog.water ?? 0);
      setCalories(todayLog.calories ?? 0);
      setMood(todayLog.mood ?? '');
    }
  }, [weeklyData]);

  const handleSave = useCallback(async () => {
    const validation = wellnessLogSchema.safeParse({
      water,
      calories,
      mood,
      date: new Date().toISOString().split('T')[0],
    });

    if (!validation.success) {
      const firstError = validation.error.errors[0]?.message ?? 'Invalid input';
      Alert.alert('Validation Error', firstError);
      return;
    }

    try {
      await mutation.mutateAsync({
        water: validation.data.water,
        calories: validation.data.calories,
        mood: validation.data.mood,
        date: validation.data.date,
      });
    } catch (err: any) {
      const message =
        err?.response?.data?.message ??
        err?.message ??
        'Failed to save wellness data';
      Alert.alert('Error', message);
    }
  }, [water, calories, mood, mutation]);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Today's Log</Text>

      {/* Water */}
      <View style={styles.card}>
        <Text style={styles.label}>💧 Water Intake</Text>
        <Text style={styles.value}>{water} / {waterGoal} ml</Text>
        <View style={styles.progressOuter}>
          <View style={[styles.progressInner, {
            width: `${Math.min((water / waterGoal) * 100, 100)}%`,
            backgroundColor: '#378ADD'
          }]} />
        </View>
        <TouchableOpacity
          style={styles.button}
          disabled={mutation.isPending}
          onPress={() => setWater(w => Math.min(w + 250, waterGoal))}>
          <Text style={styles.buttonText}>+ Add 250 ml</Text>
        </TouchableOpacity>
      </View>

      {/* Calories */}
      <View style={styles.card}>
        <Text style={styles.label}>🔥 Calories</Text>
        <Text style={styles.value}>{calories} / {calGoal} kcal</Text>
        <View style={styles.progressOuter}>
          <View style={[styles.progressInner, {
            width: `${Math.min((calories / calGoal) * 100, 100)}%`,
            backgroundColor: '#BA7517'
          }]} />
        </View>
        <TouchableOpacity
          style={styles.button}
          disabled={mutation.isPending}
          onPress={() => setCalories(c => Math.min(c + 300, calGoal))}>
          <Text style={styles.buttonText}>+ Log Meal (300 kcal)</Text>
        </TouchableOpacity>
      </View>

      {/* Mood */}
      <View style={styles.card}>
        <Text style={styles.label}>😊 Mood</Text>
        <View style={styles.moodRow}>
          {moods.map((m) => (
            <TouchableOpacity key={m} onPress={() => setMood(m)} disabled={mutation.isPending}>
              <Text style={[
                styles.moodEmoji,
                mood === m && styles.moodSelected
              ]}>{m}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {mood ? <Text style={styles.moodText}>Selected: {mood}</Text> : null}
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={[styles.saveButton, mutation.isPending && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={mutation.isPending || isWeeklyLoading}
        activeOpacity={0.7}
      >
        {mutation.isPending ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Save Today's Log</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12, color: '#111' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  label: { fontSize: 13, color: '#666', marginBottom: 4 },
  value: { fontSize: 20, fontWeight: '500', color: '#111', marginBottom: 8 },
  progressOuter: {
    height: 6, backgroundColor: '#eee',
    borderRadius: 99, overflow: 'hidden', marginBottom: 12
  },
  progressInner: { height: 6, borderRadius: 99 },
  button: {
    borderWidth: 0.5, borderColor: '#ccc',
    borderRadius: 8, padding: 10, alignItems: 'center'
  },
  buttonText: { fontSize: 13, color: '#333' },
  moodRow: { flexDirection: 'row', gap: 12, marginVertical: 8 },
  moodEmoji: { fontSize: 28, opacity: 0.4 },
  moodSelected: { opacity: 1, transform: [{ scale: 1.2 }] },
  moodText: { fontSize: 13, color: '#666', marginTop: 4 },
  saveButton: {
    backgroundColor: '#378ADD',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  saveButtonDisabled: {
    backgroundColor: '#a0c4f0',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
