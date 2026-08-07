import {useMutation, useQueryClient, UseMutationResult} from '@tanstack/react-query';
import authAxios from '../../lib/api/authAxios';
import {LOG_WELLNESS_API} from '../../lib/api/APIUtils';
import {wellnessLogPayloadSchema} from '../../schemas/zod/wellnessSchemas';
import {WellnessLogPayload, WellnessLogResponse} from '../../schemas/type';

type AxiosError = any;

export const useLogWellness = (): UseMutationResult<WellnessLogResponse, AxiosError, WellnessLogPayload> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['log-wellness'],
    mutationFn: async (payload: WellnessLogPayload) => {
      // D-05: validate before submission. Throws ZodError if invalid — mutation rejects, nothing is sent.
      const validated = wellnessLogPayloadSchema.parse(payload);
      const response = await authAxios.post(LOG_WELLNESS_API, validated);
      return response.data as WellnessLogResponse;
    },
    onSuccess: () => {
      // D-06: refresh the dashboard weekly query after a successful log
      queryClient.invalidateQueries({queryKey: ['get-weekly-wellness']});
    },
  });
};
