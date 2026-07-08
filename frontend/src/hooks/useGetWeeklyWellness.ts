import { useQuery, UseQueryResult } from '@tanstack/react-query';
import authAxios from '../helper/authAxios';
import { WELLNESS_WEEKLY } from '../helper/APIUtils';
import { WeeklyWellnessResponse } from '../type';
type AxiosError = any;

export const useGetWeeklyWellness = (
  isConnected: boolean,
): UseQueryResult<WeeklyWellnessResponse, AxiosError> => {
  return useQuery({
    queryKey: ['get-weekly-wellness'],
    queryFn: async () => {
      const response = await authAxios.get(WELLNESS_WEEKLY);
      return response.data as WeeklyWellnessResponse;
    },
    enabled: !!isConnected,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
