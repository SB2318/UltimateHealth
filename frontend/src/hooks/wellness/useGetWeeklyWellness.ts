import {useQuery, UseQueryResult} from '@tanstack/react-query';
import authAxios from '../../lib/api/authAxios';
import {GET_WELLNESS_WEEKLY_API} from '../../lib/api/APIUtils';
import {WeeklyWellnessResponse, WellnessLog} from '../../schemas/type';

type AxiosError = any;

export const useGetWeeklyWellness = (
  isConnected: boolean,
): UseQueryResult<WellnessLog[], AxiosError> => {
  return useQuery({
    queryKey: ['get-weekly-wellness'],
    queryFn: async () => {
      const response = await authAxios.get(GET_WELLNESS_WEEKLY_API);
      const body = response.data as WeeklyWellnessResponse;
      return body.data ?? [];
    },
    enabled: isConnected,
  });
};
