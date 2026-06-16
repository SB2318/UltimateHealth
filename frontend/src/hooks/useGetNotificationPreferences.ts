import {useQuery, UseQueryResult} from '@tanstack/react-query';
import axios, {AxiosError} from 'axios';
import {GET_NOTIFICATION_PREFERENCES} from '../helper/APIUtils';
import {NotificationPreferencesResponse} from '../type';
import { useAppSelector } from './reduxHooks';


const fetchNotificationPreferences = async (): Promise<NotificationPreferencesResponse> => {
  const {data} = await axios.get(GET_NOTIFICATION_PREFERENCES);
  return data as NotificationPreferencesResponse;
};

export const useGetNotificationPreferences = (
  isConnected: boolean,
): UseQueryResult<NotificationPreferencesResponse, AxiosError> => {
  const isGuest = useAppSelector((state => state.user.isGuest);

  return useQuery({
    queryKey: ['notification-preferences'],
    queryFn: fetchNotificationPreferences,
    enabled: isConnected && !isGuest,
  });
};
