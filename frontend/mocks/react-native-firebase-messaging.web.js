const messaging = () => ({
  requestPermission: async () => 0,
  getToken: async () => null,
  onTokenRefresh: () => () => undefined,
  onMessage: () => () => undefined,
  onNotificationOpenedApp: () => () => undefined,
  setBackgroundMessageHandler: () => undefined,
});

messaging.AuthorizationStatus = {AUTHORIZED: 1, PROVISIONAL: 2};

module.exports = messaging;
module.exports.default = messaging;
