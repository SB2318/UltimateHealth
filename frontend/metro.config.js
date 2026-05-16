// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = false;

// --- Web module aliases ---
// Maps native-only package names → web stubs when bundling for web.
const webStubs = {
  // Use the browser entrypoint for dotlottie-react on web
  '@lottiefiles/dotlottie-react': path.resolve(
    __dirname,
    'node_modules/@lottiefiles/dotlottie-react/dist/browser/index.js',
  ),
  // Collapsible tab view uses react-native-pager-view (native only)
  'react-native-pager-view': path.resolve(__dirname, 'src/stubs/nativeStub.js'),
  'react-native-collapsible-tab-view': path.resolve(
    __dirname,
    'src/stubs/collapsibleTabViewStub.js',
  ),
  // Snackbar — native toast, no web equivalent
  'react-native-snackbar': path.resolve(__dirname, 'src/stubs/snackbarStub.js'),
  // TTS — native only
  'react-native-tts': path.resolve(__dirname, 'src/stubs/nativeStub.js'),
  // Version check — native only
  'react-native-version-check': path.resolve(__dirname, 'src/stubs/nativeStub.js'),
  // Share — native only
  'react-native-share': path.resolve(__dirname, 'src/stubs/nativeStub.js'),
  // Firebase — native only
  '@react-native-firebase/app': path.resolve(__dirname, 'src/stubs/nativeStub.js'),
  '@react-native-firebase/messaging': path.resolve(__dirname, 'src/stubs/nativeStub.js'),
};

// Intercept module resolution for web platform
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web' && webStubs[moduleName]) {
    return { filePath: webStubs[moduleName], type: 'sourceFile' };
  }
  // Fall back to default Metro resolution
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
