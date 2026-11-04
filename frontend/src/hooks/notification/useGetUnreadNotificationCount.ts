import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {PROD_URL} from '../../lib/api/APIUtils';
import axios from 'axios';
import {useAppSelector} from '../../store/hooks';
import {updateAppBadgeCount} from '../../lib/platform/notificationUtils';
type AxiosError = any;

export const useGetUnreadNotificationCount = (
  isConnected: boolean,
): UseQueryResult<number, AxiosError> => {
  const isGuest = useAppSelector((state: any) => state.user.isGuest);
  const user_token = useAppSelector((state: any) => state.user.user_token);

  return useQuery({
    queryKey: ['get-unread-notifications-count'],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${PROD_URL}/notification/unread-count?role=2`,
        );
        const count = (response?.data?.unreadCount ?? 0) as number;
        await updateAppBadgeCount(count);
        return count;
      } catch (err) {
        return 0;
      }
    },
    refetchInterval: 30000,
    enabled:
      !!isConnected && !isGuest && user_token !== '' && user_token !== null,
  });
};
