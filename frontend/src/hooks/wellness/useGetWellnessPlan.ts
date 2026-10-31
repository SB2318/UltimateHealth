import {useQuery, UseQueryResult} from '@tanstack/react-query';
import authAxios from '../../lib/api/authAxios';
import {GET_WELLNESS_PLAN_API} from '../../lib/api/APIUtils';
import {WellnessPlan, WellnessPlanResponse} from '../../schemas/type';

type AxiosError = any;

export const useGetWellnessPlan = (
  isConnected: boolean,
): UseQueryResult<WellnessPlan | null, AxiosError> => {
  return useQuery({
    queryKey: ['get-wellness-plan'],
    queryFn: async () => {
      try {
        const response = await authAxios.get(GET_WELLNESS_PLAN_API);
        const body = response.data as WellnessPlanResponse;
        if (body?.success === false) {
          return null;
        }
        return body?.data ?? null;
      } catch (err: any) {
        // 404 means the user has not generated an active wellness plan yet
        if (err?.response?.status === 404) {
          return null;
        }
        throw err;
      }
    },
    enabled: isConnected,
  });
};
