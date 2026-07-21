import {useQuery, UseQueryResult} from '@tanstack/react-query';
import axios from 'axios';
import {GET_NOTIFICATION_PREFERENCES} from '../../lib/api/APIUtils';
import {NotificationPreferencesResponse} from '../../schemas/type';
import {useAppSelector} from '../../store/hooks';
type AxiosError = any;

const fetchNotificationPreferences = async (): Promise<NotificationPreferencesResponse> => {
  const {data} = await axios.get(GET_NOTIFICATION_PREFERENCES);
  return data as NotificationPreferencesResponse;
};

export const useGetNotificationPreferences = (
  isConnected: boolean,
): UseQueryResult<NotificationPreferencesResponse, AxiosError> => {
  const isGuest = useAppSelector((state: any) => state.user.isGuest);

  return useQuery({
    queryKey: ['notification-preferences'],
    queryFn: fetchNotificationPreferences,
    enabled: isConnected && !isGuest,
  });
};
