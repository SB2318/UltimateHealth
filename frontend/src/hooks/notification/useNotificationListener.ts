// @ts-nocheck
import { useEffect } from 'react';
import {Platform} from 'react-native';
import * as Notifications from 'expo-notifications';
import { logger } from '../../lib/services/monitoring/logger';
import { useQueryClient } from '@tanstack/react-query';
import messaging from '@react-native-firebase/messaging';

export function useNotificationListeners() {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (Platform.OS === 'web') {
      return;
    }
    // When notification arrives (foreground)
    const receivedSub =
      Notifications.addNotificationReceivedListener(notification => {
        logger.log('Notification received:', notification);

        const data = notification.request.content.data;
        logger.log('Payload data:', data);

        queryClient.invalidateQueries({
          queryKey: ['get-unread-notifications-count'],
        });
        queryClient.invalidateQueries({
          queryKey: ['get-all-notifications'],
        });
      });

    // When user taps notification
    const responseSub =
      Notifications.addNotificationResponseReceivedListener(response => {
        logger.log('Notification tapped:', response);

        const data =
          response.notification.request.content.data;
        logger.log('Tapped payload:', data);

        queryClient.invalidateQueries({
          queryKey: ['get-unread-notifications-count'],
        });
      });

    let unsubscribeFCM = () => {};
    try {
      unsubscribeFCM = messaging().onMessage(async remoteMessage => {
        logger.log('FCM foreground notification received:', remoteMessage);
        queryClient.invalidateQueries({
          queryKey: ['get-unread-notifications-count'],
        });
        queryClient.invalidateQueries({
          queryKey: ['get-all-notifications'],
        });
      });
    } catch (_) {}

    return () => {
      receivedSub.remove();
      responseSub.remove();
      unsubscribeFCM();
    };
  }, [queryClient]);
}
