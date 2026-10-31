import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from '@tanstack/react-query';
import authAxios from '../../lib/api/authAxios';
import {GENERATE_WELLNESS_PLAN_API} from '../../lib/api/APIUtils';
import {WellnessPlanResponse} from '../../schemas/type';

type AxiosError = any;

export const useGenerateWellnessPlan = (): UseMutationResult<
  WellnessPlanResponse,
  AxiosError,
  void
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['generate-wellness-plan'],
    mutationFn: async () => {
      const response = await authAxios.post(GENERATE_WELLNESS_PLAN_API);
      return response.data as WellnessPlanResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['get-wellness-plan']});
      queryClient.invalidateQueries({queryKey: ['get-wellness-plan-history']});
    },
  });
};
