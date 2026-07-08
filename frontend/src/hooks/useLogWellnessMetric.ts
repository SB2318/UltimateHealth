import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import authAxios from '../helper/authAxios';
import { WELLNESS_LOG } from '../helper/APIUtils';
import { WellnessLog } from '../type';
type AxiosError = any;

type LogWellnessParams = {
  water: number;
  calories: number;
  mood: string;
  date?: string;
};

export const useLogWellnessMetric = (): UseMutationResult<
  WellnessLog,
  AxiosError,
  LogWellnessParams
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['log-wellness'],
    mutationFn: async ({ water, calories, mood, date }: LogWellnessParams) => {
      const res = await authAxios.post(WELLNESS_LOG, {
        water,
        calories,
        mood,
        date,
      });
      return res.data as WellnessLog;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-weekly-wellness'] });
    },
  });
};
