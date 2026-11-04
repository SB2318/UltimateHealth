import {Platform} from 'react-native';
import * as Notifications from 'expo-notifications';
import type {Notification} from '../../schemas/type';

export const mergeNotificationsById = (
  current: Notification[],
  incoming: Notification[],
): Notification[] => {
  const notifications = new Map<string, Notification>();

  current.forEach(notification => {
    notifications.set(notification._id, notification);
  });
  incoming.forEach(notification => {
    notifications.set(notification._id, notification);
  });

  return Array.from(notifications.values());
};

/**
 * Updates the app launcher icon badge count on supported native platforms.
 * Safe to call on web and on unsupported hardware.
 */
export const updateAppBadgeCount = async (count: number): Promise<void> => {
  if (Platform.OS === 'web') return;
  try {
    const safeCount = Math.max(0, Math.floor(count || 0));
    await Notifications.setBadgeCountAsync(safeCount);
  } catch (error) {
    if (__DEV__) {
      console.warn('Failed to update app badge count:', error);
    }
  }
};

/**
 * Resets the app icon badge count to zero immediately.
 */
export const resetAppBadgeCount = async (): Promise<void> => {
  await updateAppBadgeCount(0);
};

/**
 * Decrements the app icon badge count by an amount (defaults to 1).
 */
export const decrementAppBadgeCount = async (amount: number = 1): Promise<void> => {
  if (Platform.OS === 'web') return;
  try {
    const current = await Notifications.getBadgeCountAsync();
    const safeCount = Math.max(0, current - amount);
    await Notifications.setBadgeCountAsync(safeCount);
  } catch (error) {
    if (__DEV__) {
      console.warn('Failed to decrement app badge count:', error);
    }
  }
};
