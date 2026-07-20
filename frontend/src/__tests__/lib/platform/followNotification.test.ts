import {emitFollowNotification} from '../../../lib/platform/followNotification';

describe('emitFollowNotification', () => {
  it('targets the user passed by the successful follow operation', () => {
    const emit = jest.fn();

    emitFollowNotification(
      {emit} as any,
      'followed-user-id',
      'health_reader',
    );

    expect(emit).toHaveBeenCalledWith('notification', {
      type: 'userFollow',
      userId: 'followed-user-id',
      message: {
        title: 'health_reader has followed you',
        body: '',
      },
    });
  });

  it('does not emit when the socket is unavailable', () => {
    expect(() =>
      emitFollowNotification(null, 'followed-user-id', 'health_reader'),
    ).not.toThrow();
  });
});
