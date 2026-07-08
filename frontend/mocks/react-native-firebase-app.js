// Web mock for @react-native-firebase/app

const firebase = {
  apps: [],
  initializeApp: () => ({
    name: '[DEFAULT]',
    options: {},
  }),
  app: () => ({
    name: '[DEFAULT]',
    options: {},
  }),
  messaging: () => null,
  auth: () => null,
};

export default firebase;
