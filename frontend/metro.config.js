const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Deduplicate Tamagui singletons so nested dependencies never create duplicate React contexts
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  '@tamagui/web': path.resolve(__dirname, 'node_modules/@tamagui/web'),
  '@tamagui/core': path.resolve(__dirname, 'node_modules/@tamagui/core'),
  tamagui: path.resolve(__dirname, 'node_modules/tamagui'),
};

// Alias react-native-pager-view to a mock for web
const originalResolveRequest = config.resolver.resolveRequest;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web' && moduleName === 'react-native-pager-view') {
    return {
      filePath: path.resolve(__dirname, 'mocks/react-native-pager-view.js'),
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
