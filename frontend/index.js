import {registerRootComponent} from 'expo';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {Provider} from 'react-redux';
import store from './src/store/ReduxStore';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import {Platform, StyleSheet} from 'react-native';
import {initMonitoring} from './src/services/monitoring/sentry';

initMonitoring();

// Firebase background messaging is native-only here. Web background messaging
// belongs in a service worker, not the main app bundle.
if (Platform.OS !== 'web') {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background notification received:', remoteMessage);
  });
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
