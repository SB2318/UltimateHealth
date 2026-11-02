const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Deduplicate Tamagui singletons so nested dependencies never create duplicate React contexts
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  '@tamagui/web': path.resolve(__dirname, 'node_modules/@tamagui/web'),
  '@tamagui/core': path.resolve(__dirname, 'node_modules/@tamagui/core'),
  '@tamagui/constants': path.resolve(__dirname, 'node_modules/@tamagui/constants'),
  tamagui: path.resolve(__dirname, 'node_modules/tamagui'),
};

// Alias react-native-pager-view to a mock for web
const originalResolveRequest = config.resolver.resolveRequest;
const webMocks = {
  'react-native-pager-view': 'react-native-pager-view.js',
  'react-native-snackbar': 'react-native-snackbar.web.js',
  'react-native-share': 'react-native-share.web.js',
  'react-native-fs': 'react-native-fs.web.js',
  'react-native-html-to-pdf': 'react-native-html-to-pdf.web.js',
  '@react-native-firebase/app': 'react-native-firebase-app.web.js',
  '@react-native-firebase/messaging': 'react-native-firebase-messaging.web.js',
};

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web' && webMocks[moduleName]) {
    return {
      filePath: path.resolve(__dirname, 'mocks', webMocks[moduleName]),
      type: 'sourceFile',
    };
  }
  // Enforce root node_modules for Tamagui core packages across all imports
  if (
    moduleName === '@tamagui/web' ||
    moduleName === '@tamagui/core' ||
    moduleName === 'tamagui' ||
    moduleName === '@tamagui/constants'
  ) {
    return context.resolveRequest(
      {
        ...context,
        originModulePath: path.resolve(__dirname, 'package.json'),
      },
      moduleName,
      platform
    );
  }
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

config.resolver.unstable_enablePackageExports = false;

module.exports = config;
