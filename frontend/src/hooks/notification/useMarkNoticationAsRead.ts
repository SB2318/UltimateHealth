import axios from 'axios';
import {PROD_URL} from '../../lib/api/APIUtils';
import {useMutation, useQueryClient, UseMutationResult} from '@tanstack/react-query';
type AxiosError = any;

export const useMarkNotificationAsRead = (): UseMutationResult<
  any,
  AxiosError
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['mark-notification-as-read'],
    mutationFn: async () => {
      const res = await axios.put(
        `${PROD_URL}/notifications/mark-as-read?role=2`,
        {
          role: 2,
        },
      );

      return res.data as any;
    },
    onSuccess: () => {
      queryClient.setQueryData(['get-unread-notifications-count'], 0);
      queryClient.invalidateQueries({queryKey: ['get-unread-notifications-count']});
    },
  });
};
