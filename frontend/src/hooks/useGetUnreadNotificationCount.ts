import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {PROD_URL} from '../helper/APIUtils';
import axios from 'axios';
import {useAppSelector} from 'react-redux';
type AxiosError = any;

export const useGetUnreadNotificationCount = (
  isConnected: boolean,
): UseQueryResult<number, AxiosError> => {
  const isGuest = useAppSelector((state: any) => state.user.isGuest);

  return useQuery({
    queryKey: ['get-unread-notifications-count'],
    queryFn: async () => {
      const response = await axios.get(
        `${PROD_URL}/notification/unread-count?role=2`,
      );
      return response.data.unreadCount as number;
    },
    enabled: !!isConnected && !isGuest,
  });
};
