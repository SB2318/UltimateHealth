import React, {useEffect, useState} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import * as Sentry from '@sentry/react-native';
import * as SplashScreen from 'expo-splash-screen';
import {loadAsync} from 'expo-font';
import {Asset} from 'expo-asset';
import {logger} from './src/lib/services/monitoring/logger';

import AppContent from './src/components/common/AppContent';

SplashScreen.preventAutoHideAsync().catch(() => {
  // Splash screen may already be controlled by the native runtime.
});

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2,
            staleTime: 1000 * 60,
          },
        },
      }),
  );

  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initializeApp = async () => {
      try {
        await Promise.all([
          loadAsync({
            Lobster: require('./assets/fonts/Lobster-Regular.ttf'),
          }),

          Asset.loadAsync([
            require('./assets/images/adaptive-icon.png'),
            require('./assets/images/ic_ultimatehealth_appicon.png'),
          ]),

          import('expo-audio').then(({setAudioModeAsync}) =>
            setAudioModeAsync({
              playsInSilentMode: true,
              allowsRecording: true,
            }),
          ),
        ]);
      } catch (error) {
        Sentry.captureException(error, {
          tags: {feature: 'app_initialization'},
          extra: {context: 'App startup resource preloading'},
        });

        if (__DEV__) {
          logger.error(
            '[App] Failed to preload startup resources:',
            error,
          );
        }
      } finally {
        if (!isMounted) return;

        setAppReady(true);

        try {
          await SplashScreen.hideAsync();
        } catch (error) {
          if (__DEV__) {
            logger.error(
              '[App] Failed to hide native splash screen:',
              error,
            );
          }
        }
      }
    };

    initializeApp();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!appReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default Sentry.wrap(App);
