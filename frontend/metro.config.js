const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Alias native-only modules to web mocks
const WEB_MOCKS = {
  'react-native-pager-view': 'mocks/react-native-pager-view.js',
  'react-native-snackbar': 'mocks/react-native-snackbar.js',
  'react-native-share': 'mocks/react-native-share.js',
  'react-native-fs': 'mocks/react-native-fs.js',
  'react-native-html-to-pdf': 'mocks/react-native-html-to-pdf.js',
  '@react-native-firebase/app': 'mocks/react-native-firebase-app.js',
  '@react-native-firebase/messaging': 'mocks/react-native-firebase-messaging.js',
};

const originalResolveRequest = config.resolver.resolveRequest;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web' && WEB_MOCKS[moduleName]) {
    return {
      filePath: path.resolve(__dirname, WEB_MOCKS[moduleName]),
      type: 'sourceFile',
    };
  }
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

config.resolver.unstable_enablePackageExports = false;

module.exports = config;