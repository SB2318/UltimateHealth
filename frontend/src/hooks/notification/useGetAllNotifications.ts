import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {Notification} from '../../schemas/type';
import axios from 'axios';
import {PROD_URL} from '../../lib/api/APIUtils';
import {useAppSelector} from '../../store/hooks';
type AxiosError = any;

type NotificationRes = {
  totalPages: number;
  notifications: Notification[];
};
export const useGetAllNotifications = (
  page: number,
  isConnected: boolean,
): UseQueryResult<NotificationRes, AxiosError> => {
  const isGuest = useAppSelector((state: any) => state.user.isGuest);

  return useQuery({
    queryKey: ['get-all-notifications', page],
    queryFn: async () => {
      const response = await axios.get(
        `${PROD_URL}/notifications?role=2&page=${page}`,
      );
      return response.data as NotificationRes;
    },
    enabled: !!isConnected && !!page && !isGuest,
  });
};
