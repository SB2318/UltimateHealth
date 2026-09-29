import {useQuery, UseQueryResult} from '@tanstack/react-query';
import authAxios from '../../lib/api/authAxios';
import {GET_WELLNESS_WEEKLY_API} from '../../lib/api/APIUtils';
import {WeeklyWellnessResponse, WellnessLog} from '../../schemas/type';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AxiosError = any;
export const DEMO_WELLNESS_KEY = 'ultimatehealth_demo_wellness_logs';

export const getDemoLogs = async (): Promise<WellnessLog[]> => {
  const stored = await AsyncStorage.getItem(DEMO_WELLNESS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as WellnessLog[];
    } catch {
      await AsyncStorage.removeItem(DEMO_WELLNESS_KEY);
    }
  }
  const today = new Date();
  const logs = Array.from({length: 7}, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));
    return {
      userId: 'demo-user',
      date: date.toISOString().slice(0, 10),
      metrics: {
        steps: 5200 + index * 650,
        activeMinutes: 18 + index * 2,
        sleepHours: 6.5 + index * 0.2,
        waterMl: 1500 + index * 130,
        breathingSessionMinutes: index + 3,
      },
    };
  });
  await AsyncStorage.setItem(DEMO_WELLNESS_KEY, JSON.stringify(logs));
  return logs;
};

export const useGetWeeklyWellness = (
  isConnected: boolean,
): UseQueryResult<WellnessLog[], AxiosError> => {
  return useQuery({
    queryKey: ['get-weekly-wellness'],
    queryFn: async () => {
      if (Platform.OS === 'web') {
        return getDemoLogs();
      }
      const response = await authAxios.get(GET_WELLNESS_WEEKLY_API);
      const body = response.data as WeeklyWellnessResponse;
      // MAJOR-04: the GET response is a runtime contract, not a compile-time one.
      if (body?.success === false) throw new Error('Failed to load wellness data');
      return Array.isArray(body?.data) ? body.data : [];
    },
    enabled: Platform.OS === 'web' || isConnected,
  });
};
