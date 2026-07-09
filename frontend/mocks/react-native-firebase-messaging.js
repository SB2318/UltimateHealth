// Web mock for @react-native-firebase/messaging
// Default export is a factory function: messaging() returns an instance.

const messaging = () => ({
  setBackgroundMessageHandler: () => {},
  onMessage: () => () => {},
  onTokenRefresh: () => () => {},
  onNotificationOpenedApp: () => () => {},
  getInitialNotification: async () => null,
  getToken: async () => null,
  requestPermission: async () => {},
  registerForRemoteNotifications: async () => {},
  hasPermission: async () => 1,
  subscribeToTopic: () => {},
  unsubscribeFromTopic: () => {},
});

export default messaging;
