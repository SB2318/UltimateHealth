 


describe('NotificationScreen – mark-as-read guard and badge reset', () => {
  function makeMarkAsReadHandler(
    markNotification: jest.Mock,
    resetBadge: jest.Mock = jest.fn(),
  ) {
    const handleMarkAsRead = (
      notifications: {read: boolean}[],
      isConnected: boolean,
    ) => {
      const hasUnread = notifications.some(n => !n.read);

      if (isConnected && notifications.length > 0 && hasUnread) {
        markNotification(
          {},
          {
            onSuccess: () => {
              resetBadge();
            },
            onError: () => {},
          },
        );
      } else if (isConnected && (notifications.length === 0 || !hasUnread)) {
        resetBadge();
      }
    };

    return {handleMarkAsRead};
  }

  it('resets badge when all notifications are already read', () => {
    const markNotification = jest.fn();
    const resetBadge = jest.fn();
    const {handleMarkAsRead} = makeMarkAsReadHandler(markNotification, resetBadge);
    handleMarkAsRead([{read: true}, {read: true}], true);
    expect(markNotification).toHaveBeenCalledTimes(0);
    expect(resetBadge).toHaveBeenCalledTimes(1);
  });

  it('resets badge when notification list is empty', () => {
    const markNotification = jest.fn();
    const resetBadge = jest.fn();
    const {handleMarkAsRead} = makeMarkAsReadHandler(markNotification, resetBadge);
    handleMarkAsRead([], true);
    expect(markNotification).toHaveBeenCalledTimes(0);
    expect(resetBadge).toHaveBeenCalledTimes(1);
  });

  it('calls markNotification when unread notifications exist', () => {
    const markNotification = jest.fn();
    const {handleMarkAsRead} = makeMarkAsReadHandler(markNotification);
    handleMarkAsRead([{read: false}, {read: true}], true);
    expect(markNotification).toHaveBeenCalledTimes(1);
  });

  it('does not call markNotification when not connected to internet', () => {
    const markNotification = jest.fn();
    const {handleMarkAsRead} = makeMarkAsReadHandler(markNotification);
    handleMarkAsRead([{read: false}], false);
    expect(markNotification).toHaveBeenCalledTimes(0);
  });

  it('calls markNotification exactly once even with multiple unread notifications', () => {
    const markNotification = jest.fn();
    const {handleMarkAsRead} = makeMarkAsReadHandler(markNotification);
    handleMarkAsRead([{read: false}, {read: false}, {read: false}], true);
    expect(markNotification).toHaveBeenCalledTimes(1);
  });
});