import {useQuery, UseQueryResult} from '@tanstack/react-query';
import authAxios from '../../lib/api/authAxios';
import {GET_WELLNESS_PLAN_HISTORY_API} from '../../lib/api/APIUtils';
import {WellnessPlanHistoryResponse} from '../../schemas/type';

type AxiosError = any;

export const useGetWellnessPlanHistory = (
  isConnected: boolean,
  page: number = 1,
  limit: number = 10,
): UseQueryResult<WellnessPlanHistoryResponse, AxiosError> => {
  return useQuery({
    queryKey: ['get-wellness-plan-history', page, limit],
    queryFn: async () => {
      const response = await authAxios.get(GET_WELLNESS_PLAN_HISTORY_API, {
        params: {page, limit},
      });
      const body = response.data as WellnessPlanHistoryResponse;
      if (body?.success === false) {
        throw new Error('Failed to load wellness plan history');
      }
      return {
        success: true,
        data: Array.isArray(body?.data) ? body.data : [],
        pagination: body?.pagination,
      };
    },
    enabled: isConnected,
  });
};
