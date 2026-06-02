const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Alias react-native-pager-view to a mock for web
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web' && moduleName === 'react-native-pager-view') {
    return {
      filePath: path.resolve(__dirname, 'mocks/react-native-pager-view.js'),
      type: 'sourceFile',
    };
  }
  if (platform === 'web' && moduleName === 'react-native-fs') {
    return {
      filePath: path.resolve(__dirname, 'mocks/react-native-fs.js'),
      type: 'sourceFile',
    };
  }
  if (platform === 'web' && moduleName === 'react-native-share') {
    return {
      filePath: path.resolve(__dirname, 'mocks/react-native-share.js'),
      type: 'sourceFile',
    };
  }
  if (platform === 'web' && moduleName === '@react-native-firebase/app') {
    return {
      filePath: path.resolve(__dirname, 'mocks/react-native-firebase-app.js'),
      type: 'sourceFile',
    };
  }
  if (platform === 'web' && moduleName === '@react-native-firebase/messaging') {
    return {
      filePath: path.resolve(__dirname, 'mocks/react-native-firebase-messaging.js'),
      type: 'sourceFile',
    };
  }
  if (platform === 'web' && moduleName === 'react-native-snackbar') {
    return {
      filePath: path.resolve(__dirname, 'mocks/react-native-snackbar.js'),
      type: 'sourceFile',
    };
  }
  if (platform === 'web' && moduleName === 'react-native-version-check') {
    return {
      filePath: path.resolve(__dirname, 'mocks/react-native-version-check.js'),
      type: 'sourceFile',
    };
  }
  if (platform === 'web' && moduleName === 'react-native-tts') {
    return {
      filePath: path.resolve(__dirname, 'mocks/react-native-tts.js'),
      type: 'sourceFile',
    };
  }
  if (platform === 'web' && moduleName === 'react-native-image-picker') {
    return {
      filePath: path.resolve(__dirname, 'mocks/react-native-image-picker.js'),
      type: 'sourceFile',
    };
  }
  if (platform === 'web' && moduleName === 'react-native-html-to-pdf') {
    return {
      filePath: path.resolve(__dirname, 'mocks/react-native-html-to-pdf.js'),
      type: 'sourceFile',
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};



config.resolver.unstable_enablePackageExports = false;

module.exports = config;
