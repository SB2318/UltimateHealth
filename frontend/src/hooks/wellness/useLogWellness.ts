import {useMutation, useQueryClient, UseMutationResult} from '@tanstack/react-query';
import authAxios from '../../lib/api/authAxios';
import {LOG_WELLNESS_API} from '../../lib/api/APIUtils';
import {wellnessLogPayloadSchema} from '../../schemas/zod/wellnessSchemas';
import {WellnessLogPayload, WellnessLogResponse} from '../../schemas/type';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DEMO_WELLNESS_KEY, getDemoLogs} from './useGetWeeklyWellness';

type AxiosError = any;

export const useLogWellness = (): UseMutationResult<WellnessLogResponse, AxiosError, WellnessLogPayload> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['log-wellness'],
    mutationFn: async (payload: WellnessLogPayload) => {
      // D-05: validate before submission. Throws ZodError if invalid — mutation rejects, nothing is sent.
      const validated = wellnessLogPayloadSchema.parse(payload);
      if (Platform.OS === 'web') {
        const logs = await getDemoLogs();
        const nextLogs = [
          ...logs.filter(log => log.date !== validated.date),
          {
            userId: 'demo-user',
            date: validated.date,
            metrics: validated.metrics ?? {},
          },
        ].sort((a, b) => a.date.localeCompare(b.date)).slice(-7);
        await AsyncStorage.setItem(DEMO_WELLNESS_KEY, JSON.stringify(nextLogs));
        return {
          success: true,
          message: 'Saved locally in web demo mode',
          data: nextLogs[nextLogs.length - 1],
        };
      }
      const response = await authAxios.post(LOG_WELLNESS_API, validated);
      return response.data as WellnessLogResponse;
    },
    onSuccess: () => {
      // D-06: refresh the dashboard weekly query after a successful log
      queryClient.invalidateQueries({queryKey: ['get-weekly-wellness']});
    },
  });
};
