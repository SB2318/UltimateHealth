import {registerRootComponent} from 'expo';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {Provider} from 'react-redux';
import store from './src/store/ReduxStore';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import {StyleSheet, Platform} from 'react-native';

import { logger } from './src/lib/services/monitoring/logger';

if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    html, body, #root {
      overflow-x: hidden;
      width: 100%;
      max-width: 100vw;
    }
  `;
  document.head.appendChild(style);
}

// Firebase background handler must be registered at the app root (run once,
// before any component mounts). FCM requires this to be at module scope.
try {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    logger.log('Background notification received:', remoteMessage);
  });
} catch (error) {
  // Gracefully avoid crashing the runtime if Firebase native module is not yet ready or running in Expo Go/dev
  logger.warn('[Firebase] Background handler initialization skipped:', error);
}

const AppWrapper = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

registerRootComponent(AppWrapper);
