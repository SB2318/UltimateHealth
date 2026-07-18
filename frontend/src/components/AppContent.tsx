// @ts-nocheck
import React, { useEffect, useRef, useCallback } from 'react';
import { useColorScheme, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider, useTheme } from 'tamagui';
import { NavigationContainer, type NavigationContainerRef } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging';
import { addEventListener } from '@react-native-community/netinfo';
import { useDispatch, useSelector } from 'react-redux';

import { FirebaseProvider } from '@/hooks/FirebaseContext';
import { useNotificationListeners } from '@/hooks/useNotificationListener';
import { useVersionCheck } from '@/hooks/useVersionCheck';
import { SocketProvider } from '../contexts/SocketContext';
import { PreferencesProvider } from '../contexts/PreferencesContext';
import config from '../../tamagui.config';

import { initDeepLinking, navigateDeepLink, resolveNotificationTarget, resolveDeepLinkTarget } from '../helper/DeepLinkService';
import { firebaseInit } from '../helper/firebase';
import { cleanUpDownloads, KEYS, retrieveItem } from '../helper/Utils';
import {
  SECURE_KEYS,
  secureRetrieveItem,
} from '../helper/SecureStorageUtils';
import { setupAxiosInterceptor } from '../helper/setupAxiosInterceptor';
import { initMonitoring } from '../services/monitoring/sentry';

import { setUserToken, setGuestMode, setUserId, setUserHandle } from '../store/UserSlice';
import { setConnected } from '../store/NetworkSlice';
import { RootState } from '../store/ReduxStore';

import StackNavigation from '../navigations/StackNavigation';
import { CustomAlertDialog } from './CustomAlert';
import UpdateModal from './UpdateModal';
import { NetworkBanner } from './NetworkBanner';

export default function AppContent() {
  const navigationRef = useRef<NavigationContainerRef<any> | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pendingDeepLinkRef = useRef<string | null>(null);

  const isDarkMode = useColorScheme() === 'dark';
  const { visible, storeUrl } = useVersionCheck();
  const dispatch = useDispatch();

  const { user_token, isGuest } = useSelector(
    (state: RootState) => state.user,
  );

  useNotificationListeners();

  useEffect(() => {
    initMonitoring();
    setupAxiosInterceptor();
  }, []);

  // Hydrate Redux from secure storage on app start.
  // This runs once on mount to restore session state.
  const hydrateAuthState = useCallback(async () => {
    const token = await secureRetrieveItem(SECURE_KEYS.USER_TOKEN);
    if (token) {
      const userId = await retrieveItem(KEYS.USER_ID);
      const userHandle = await retrieveItem(KEYS.USER_HANDLE);
      dispatch(setUserToken(token));
      dispatch(setUserId(userId || ''));
      dispatch(setUserHandle(userHandle || ''));
      dispatch(setGuestMode(false));
    }
    // If no token, leave state as-is (will be guest or unauthenticated)
  }, [dispatch]);

  useEffect(() => {
    hydrateAuthState();
  }, [hydrateAuthState]);

  useEffect(() => {
    const unsubscribeDeepLink = initDeepLinking((url) => {
      if (url) {
        pendingDeepLinkRef.current = url;

        if (__DEV__) {
          console.log(
            '[Auth Guard] Cached incoming deep link:',
            url,
          );
        }
      }
    });

    return () => {
      unsubscribeDeepLink();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (__DEV__) {
        console.log('Foreground notification received:', remoteMessage);
      }
    });

    const unsubscribe1 = addEventListener(state => {
      if (__DEV__) {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
      }
      dispatch(setConnected(state.isConnected));
    });

    const onOpenApp = messaging().onNotificationOpenedApp(remoteMessage => {
      if (__DEV__) {
        console.log('Notification caused app to open:', remoteMessage);
      }
    });

    return () => {
      unsubscribe();
      unsubscribe1();
      onOpenApp();
    };
  }, [dispatch]);



  useEffect(() => {
    if (!navigationRef.current || !pendingDeepLinkRef.current) return;
    if (!isGuest && tokenRes === null && !user_token) return;

    const isAuthenticated = Boolean(tokenRes?.isValid || user_token) && !isGuest;
    const target = resolveDeepLinkTarget(pendingDeepLinkRef.current);

    if (target) {
      navigateDeepLink(
        navigationRef.current,
        target,
        isAuthenticated,
      );
    } else if (!isAuthenticated) {
      navigationRef.current.navigate('LoginScreen');
    }

    pendingDeepLinkRef.current = null;
  }, [tokenRes, user_token, isGuest]);

  useEffect(() => {
    const handleNotificationResponse = async (
      response: Notifications.NotificationResponse,
    ) => {
      const data = response.notification.request.content.data;
      const target = resolveNotificationTarget(data);
      if (!target || !navigationRef.current) return;
      const isAuthenticated = Boolean(user_token) && !isGuest;
      navigateDeepLink(navigationRef.current, target, isAuthenticated);
    };

    const responseListener = Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse,
    );

    Notifications.getLastNotificationResponseAsync().then(response => {
      if (response) handleNotificationResponse(response);
    });

    return () => { responseListener.remove(); };
  }, [user_token, isGuest]);

  useEffect(() => {
    firebaseInit();
    cleanUpDownloads();
  }, []);

  return (
    <SafeAreaProvider>
      <TamaguiProvider
        config={config}
        defaultTheme={isDarkMode ? 'dark' : 'light'}>
        <PaperProvider>
          <FirebaseProvider>
            <PreferencesProvider>
              <SocketProvider>
                <View style={{ flex: 1 }}>
                  <NetworkBanner />
                  <AppInner
                    navigationRef={navigationRef}
                    visible={visible}
                    storeUrl={storeUrl}
                  />
                </View>
              </SocketProvider>
            </PreferencesProvider>
          </FirebaseProvider>
        </PaperProvider>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}

function AppInner({
  navigationRef,
  visible,
  storeUrl,
}: {
  navigationRef: React.RefObject<NavigationContainerRef<any> | null>;
  visible: boolean;
  storeUrl: string;
}) {
  const theme = useTheme();
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={{ flex: 1, backgroundColor: theme?.background?.get() ?? (isDarkMode ? '#121212' : '#ffffff') }}>
      <NavigationContainer ref={navigationRef}>
        <StackNavigation />
      </NavigationContainer>
      <CustomAlertDialog key={'alert'} />
      <UpdateModal visible={visible} storeUrl={storeUrl} />
    </View>
  );
}
