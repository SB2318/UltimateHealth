import React, { useEffect, useRef } from 'react';
import { useColorScheme, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import { NavigationContainer } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging';

import { FirebaseProvider } from '@/hooks/FirebaseContext';
import { useCheckTokenStatus } from '@/src/hooks/useGetTokenStatus';
import { useNotificationListeners } from '@/hooks/useNotificationListener';
import { useVersionCheck } from '@/hooks/useVersionCheck';
import { SocketProvider } from '../contexts/SocketContext';
import { PreferencesProvider } from '../contexts/PreferencesContext';
import config from '@/tamagui.config';

import { registerAndSyncPushToken } from '../helper/PushNotificationService';
import { initDeepLinking, navigateDeepLink, resolveDeepLinkTarget, resolveNotificationTarget } from '../helper/DeepLinkService';
import { firebaseInit } from '../helper/firebase';
import { cleanUpDownloads } from '../helper/utils';
import StackNavigation from '../navigations/StackNavigation';

export function AppContent() {
  const colorScheme = useColorScheme();
  
  const { user_token, tokenRes, isLoading, isGuest } = useCheckTokenStatus();
  
  const navigationRef = useRef<any>(null);
  
  const pendingDeepLinkRef = useRef<string | null>(null);

  useVersionCheck();
  useNotificationListeners();

  useEffect(() => {
    firebaseInit();
    cleanUpDownloads();

    if (user_token) {
      registerAndSyncPushToken(user_token);
    }

    const unsubscribeDeepLink = initDeepLinking((url) => {
      if (url) {
        pendingDeepLinkRef.current = url;
        console.log('[Auth Guard] Cached incoming deep link securely inside reference buffer:', url);
      }
    });

    const onOpenApp = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:', remoteMessage);
    });

    return () => {
      onOpenApp();
      unsubscribeDeepLink();
    };
  }, [user_token]);

  useEffect(() => {
    if (isLoading || !navigationRef.current || !pendingDeepLinkRef.current) return;

    const isAuthenticated = Boolean(tokenRes?.isValid || user_token) && !isGuest;

    const target = resolveDeepLinkTarget(pendingDeepLinkRef.current);

    if (target) {
      console.log('[Auth Guard] Routing deep link payload destination string.');
      navigateDeepLink(navigationRef.current, target, isAuthenticated);
    } else if (!isAuthenticated) {
      console.log('[Auth Guard] User is anonymous and no valid deep link found. Diverting to login gate schemas.');
      navigationRef.current.navigate('LoginScreen');
    }
    
    pendingDeepLinkRef.current = null;
  }, [isLoading, tokenRes, user_token, isGuest]);

  useEffect(() => {
    const handleNotificationResponse = async (response: Notifications.NotificationResponse) => {
      const data = response.notification.request.content.data;
      const target = resolveNotificationTarget(data);

      if (!target || !navigationRef.current) return;

      const isAuthenticated = Boolean(tokenRes?.isValid || user_token) && !isGuest;
      navigateDeepLink(navigationRef.current, target, isAuthenticated);
    };

    const responseListener = Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);

    Notifications.getLastNotificationResponseAsync().then(response => {
      if (response) {
        handleNotificationResponse(response);
      }
    });

    return () => {
      responseListener.remove();
    };
  }, [user_token, tokenRes, isGuest]);

  return (
    <SafeAreaProvider>
      <TamaguiProvider config={config} defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}>
        <PaperProvider>
          <FirebaseProvider>
            <PreferencesProvider>
              <SocketProvider>
                <View style={{ flex: 1 }}>
                  <NavigationContainer ref={navigationRef}>
                    {/* 🚀 RESTORE APP ROUTER: Embed the navigation stack routing component back into the tree layout */}
                    <StackNavigation />
                  </NavigationContainer>
                </View>
              </SocketProvider>
            </PreferencesProvider>
          </FirebaseProvider>
        </PaperProvider>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}

