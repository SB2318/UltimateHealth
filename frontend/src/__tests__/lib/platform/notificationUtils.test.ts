import {
  mergeNotificationsById,
  updateAppBadgeCount,
  resetAppBadgeCount,
  decrementAppBadgeCount,
} from '../../../lib/platform/notificationUtils';
import * as Notifications from 'expo-notifications';
import {Platform} from 'react-native';

const notification = (id: string, title = id) =>
  ({_id: id, title}) as any;

describe('mergeNotificationsById', () => {
  it('returns an empty list when both pages are empty', () => {
    expect(mergeNotificationsById([], [])).toEqual([]);
  });

  it('preserves the order of unique notifications', () => {
    expect(
      mergeNotificationsById(
        [notification('1'), notification('2')],
        [notification('3')],
      ).map(item => item._id),
    ).toEqual(['1', '2', '3']);
  });

  it('deduplicates IDs and keeps the latest server value', () => {
    expect(
      mergeNotificationsById(
        [notification('1', 'old title'), notification('2')],
        [notification('1', 'updated title')],
      ),
    ).toEqual([
      notification('1', 'updated title'),
      notification('2'),
    ]);
  });

  it('deduplicates repeated entries within the incoming page', () => {
    expect(
      mergeNotificationsById(
        [],
        [notification('1', 'first'), notification('1', 'second')],
      ),
    ).toEqual([notification('1', 'second')]);
  });
});

describe('badge count utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('updates app badge count with non-negative integer', async () => {
    await updateAppBadgeCount(5);
    expect(Notifications.setBadgeCountAsync).toHaveBeenCalledWith(5);

    await updateAppBadgeCount(-2);
    expect(Notifications.setBadgeCountAsync).toHaveBeenCalledWith(0);
  });

  it('resets badge count to 0', async () => {
    await resetAppBadgeCount();
    expect(Notifications.setBadgeCountAsync).toHaveBeenCalledWith(0);
  });

  it('decrements badge count properly', async () => {
    (Notifications.getBadgeCountAsync as jest.Mock).mockResolvedValueOnce(3);
    await decrementAppBadgeCount(1);
    expect(Notifications.setBadgeCountAsync).toHaveBeenCalledWith(2);

    (Notifications.getBadgeCountAsync as jest.Mock).mockResolvedValueOnce(0);
    await decrementAppBadgeCount(1);
    expect(Notifications.setBadgeCountAsync).toHaveBeenCalledWith(0);
  });
});
