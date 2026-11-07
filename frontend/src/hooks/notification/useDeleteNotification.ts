import {useMutation, useQueryClient, UseMutationResult} from '@tanstack/react-query';
import {PROD_URL} from '../../lib/api/APIUtils';
import axios from 'axios';
type AxiosError = any;

export const useDeleteNotification = (): UseMutationResult<
  any,
  AxiosError,
  string
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-notification-by-id'],
    mutationFn: async (id: string) => {
      const res = await axios.delete(`${PROD_URL}/notification/${id}`);
      return res.data as any;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-unread-notifications-count'],
      });
    },
  });
};
