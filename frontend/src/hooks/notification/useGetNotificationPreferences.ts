import {useQuery, UseQueryResult} from '@tanstack/react-query';
import axios from 'axios';
import {GET_NOTIFICATION_PREFERENCES} from '../../lib/api/APIUtils';
import {NotificationPreferencesResponse} from '../../schemas/type';
import {useAppSelector} from '../../store/hooks';
import {RootState} from '../../store/ReduxStore';
type AxiosError = any;

const fetchNotificationPreferences = async (): Promise<NotificationPreferencesResponse> => {
  const {data} = await axios.get(GET_NOTIFICATION_PREFERENCES);
  return (data ?? { success: false, preferences: [] }) as NotificationPreferencesResponse;
};

export const useGetNotificationPreferences = (
  isConnected: boolean,
): UseQueryResult<NotificationPreferencesResponse, AxiosError> => {
  const isGuest = useAppSelector((state: RootState) => state.user.isGuest);
  const userId = useAppSelector((state: RootState) => state.user.user_id);
  const user_token = useAppSelector((state: RootState) => state.user.user_token);

  return useQuery({
    queryKey: ['notification-preferences', userId],
    queryFn: fetchNotificationPreferences,
    enabled: isConnected && !isGuest && user_token !== '' && user_token !== null,
  });
};
