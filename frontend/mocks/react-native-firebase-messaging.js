const unsubscribe = () => undefined;

const messaging = () => ({
  onMessage: () => unsubscribe,
  onNotificationOpenedApp: () => unsubscribe,
  setBackgroundMessageHandler: () => undefined,
  getInitialNotification: async () => null,
  getToken: async () => null,
  requestPermission: async () => 0,
  registerDeviceForRemoteMessages: async () => undefined,
});

module.exports = messaging;
module.exports.default = messaging;
