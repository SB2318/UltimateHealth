import {useQuery, UseQueryResult} from '@tanstack/react-query';
import authAxios from '../../lib/api/authAxios';
import {GET_WELLNESS_WEEKLY_API} from '../../lib/api/APIUtils';
import {WeeklyWellnessResponse, WellnessLog} from '../../schemas/type';

type AxiosError = any;

export const useGetWeeklyWellness = (
  isConnected: boolean,
  options?: { enabled?: boolean },
): UseQueryResult<WellnessLog[], AxiosError> => {
  const isQueryEnabled = Boolean(isConnected) && (options?.enabled ?? true);
  return useQuery({
    queryKey: ['get-weekly-wellness'],
    queryFn: async () => {
      const response = await authAxios.get(GET_WELLNESS_WEEKLY_API);
      const body = response.data as WeeklyWellnessResponse;
      // MAJOR-04: the GET response is a runtime contract, not a compile-time one.
      if (body?.success === false) throw new Error('Failed to load wellness data');
      return Array.isArray(body?.data) ? body.data : [];
    },
    enabled: isQueryEnabled,
  });
};
