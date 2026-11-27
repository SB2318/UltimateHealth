// @ts-nocheck
import React, {useState, useEffect, useRef, useCallback } from 'react';
import { useColorScheme, View, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import { NavigationContainer, DarkTheme, DefaultTheme, type NavigationContainerRef } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging';
import { addEventListener } from '@react-native-community/netinfo';
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";

import { FirebaseProvider } from '../../contexts/FirebaseContext';
import { useNotificationListeners } from '../../hooks/notification/useNotificationListener';
import { useVersionCheck } from '@/src/hooks/app/useVersionCheck';
import { SocketProvider } from '../../contexts/SocketContext';
import { usePreferences } from '../../contexts/PreferencesContext';
import {
  resolveThemeMode,
  HIGH_CONTRAST_COLORS,
  type ResolvedTheme,
} from '../../lib/ui/themePreference';
import config from '../../../tamagui.config';

import { initDeepLinking, navigateDeepLink, resolveNotificationTarget, resolveDeepLinkTarget } from '../../lib/platform/DeepLinkService';
import { firebaseInit } from '../../lib/platform/firebase';
import { cleanUpDownloads, KEYS, retrieveItem } from '../../lib/utils/Utils';
import {
  SECURE_KEYS,
  secureRetrieveItem,
} from '../../lib/storage/SecureStorageUtils';
import { setupAxiosInterceptor } from '../../lib/api/setupAxiosInterceptor';
import { initMonitoring } from '../../lib/services/monitoring/sentry';

import { useCheckTokenStatus } from '../../hooks/auth/useGetTokenStatus';
import { setUserToken, setGuestMode, setUserId, setUserHandle } from '../../store/UserSlice';
import { setConnected } from '../../store/NetworkSlice';
import { clearSessionArticles } from '../../store/offlineSlice';
import { pruneArticleCache } from '../../lib/storage/ArticleCacheUtils';
import { RootState } from '../../store/ReduxStore';
import type { RootStackParamList } from '../../schemas/type';

import StackNavigation from '../../navigations/StackNavigation';
import WebDemoShell from '../../screens/web/WebDemoShell';
import { CustomAlertDialog } from './CustomAlert';
import UpdateModal from '../auth/UpdateModal';
import { NetworkBanner } from './NetworkBanner';
import OnboardingModal from './OnboardingModal';

const appDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#0A0F1D',
    card: '#0F172A',
    text: '#F8FAFC',
    border: '#1E293B',
    primary: '#0F52BA',
    notification: '#3B82F6',
  },
};

const appLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F0F8FF',
    card: '#FFFFFF',
    text: '#0F172A',
    border: '#E2E8F0',
    primary: '#0F52BA',
    notification: '#0F52BA',
  },
};

// WCAG AAA tier from issue #2043: pitch-black surfaces, white text,
// high-visibility yellow accent (see HIGH_CONTRAST_COLORS).
const appHighContrastTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: HIGH_CONTRAST_COLORS.background,
    card: HIGH_CONTRAST_COLORS.card,
    text: HIGH_CONTRAST_COLORS.text,
    border: HIGH_CONTRAST_COLORS.border,
    primary: HIGH_CONTRAST_COLORS.primary,
    notification: HIGH_CONTRAST_COLORS.primary,
  },
};

const appHighContrastPaperTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: HIGH_CONTRAST_COLORS.background,
    surface: HIGH_CONTRAST_COLORS.surface,
    onSurface: HIGH_CONTRAST_COLORS.text,
    onBackground: HIGH_CONTRAST_COLORS.text,
    primary: HIGH_CONTRAST_COLORS.primary,
    onPrimary: HIGH_CONTRAST_COLORS.onPrimary,
    surfaceVariant: HIGH_CONTRAST_COLORS.surface,
    outline: HIGH_CONTRAST_COLORS.border,
  },
};

export default function AppContent() {
  const navigationRef = useRef<NavigationContainerRef<any> | null>(null);
   
  const pendingDeepLinkRef = useRef<string | null>(null);

  // Explicit preference wins; 'system' follows the OS scheme. The default
  // ('system') preserves the previous behaviour exactly.
  const { themePreference } = usePreferences();
  const themeMode = resolveThemeMode(themePreference, useColorScheme());
  const isDarkMode = themeMode !== 'light';
  const isHighContrast = themeMode === 'high-contrast';
  const paperTheme = isHighContrast
    ? appHighContrastPaperTheme
    : isDarkMode
      ? MD3DarkTheme
      : MD3LightTheme;
  const { visible, storeUrl } = useVersionCheck();
  const dispatch = useAppDispatch();

  const { user_token, isGuest } = useAppSelector(
    (state: RootState) => state.user,
  );

  const { data: tokenRes } = useCheckTokenStatus();
  // The browser build is a public showcase because the production API
  // requires authentication and is not reachable from localhost. Native
  // builds keep the regular auth flow.
  const isWebDemo = Platform.OS === 'web';

  useNotificationListeners();

  useEffect(() => {
    initMonitoring();
    setupAxiosInterceptor();
  }, []);

  // Offline reading (#1880). Articles opened during a session are held in
  // memory only; that copy is released when the app unmounts. What stays on
  // the device is limited to articles the reader finished, and expired ones
  // are dropped here rather than waiting for the next time they browse.
  useEffect(() => {
    return () => {
      dispatch(clearSessionArticles());
      pruneArticleCache();
    };
  }, [dispatch]);

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
    if (Platform.OS === 'web') {
      return;
    }
    let unsubscribe = () => {};
    let onOpenApp = () => {};
    try {
      unsubscribe = messaging().onMessage(async remoteMessage => {
        if (__DEV__) {
          console.log('Foreground notification received:', remoteMessage);
        }
      });
      onOpenApp = messaging().onNotificationOpenedApp(remoteMessage => {
        if (__DEV__) {
          console.log('Notification caused app to open:', remoteMessage);
        }
      });
    } catch (_) {}

    const unsubscribe1 = addEventListener(state => {
      if (__DEV__) {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
      }
      dispatch(setConnected(state.isConnected));
    });

    return () => {
      unsubscribe();
      unsubscribe1();
      onOpenApp();
    };
  }, [dispatch]);

  useEffect(() => {
    if (!navigationRef.current || !pendingDeepLinkRef.current) return;
    if (!isGuest && !tokenRes && !user_token) return;

    const isAuthenticated = Boolean(tokenRes?.isValid || user_token) && !isGuest;
    const target = resolveDeepLinkTarget(pendingDeepLinkRef.current);

    if (target) {
      navigateDeepLink(
        navigationRef.current,
        target,
        isAuthenticated,
      );
    } 

    pendingDeepLinkRef.current = null;
  }, [tokenRes, user_token, isGuest]);

  useEffect(() => {
    if (Platform.OS === 'web') {
      return;
    }
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
    if (Platform.OS === 'web') {
      return;
    }
    firebaseInit();
    cleanUpDownloads();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        style={isDarkMode ? 'light' : 'dark'}
        backgroundColor={
          isHighContrast ? '#000000' : isDarkMode ? '#0A0F1D' : '#000A60'
        }
      />
      <TamaguiProvider
        config={config}
        defaultTheme={
          isHighContrast ? 'highContrast' : isDarkMode ? 'dark' : 'light'
        }>
        <PaperProvider theme={paperTheme}>
          <FirebaseProvider>
            <SocketProvider>
              <View
                style={{
                  flex: 1,
                  backgroundColor: isHighContrast
                    ? '#000000'
                    : isDarkMode
                      ? '#0A0F1D'
                      : '#F0F8FF',
                }}>
                <NetworkBanner />
                <AppInner
                  navigationRef={navigationRef}
                  visible={visible}
                  storeUrl={storeUrl}
                  themeMode={themeMode}
                />
              </View>
            </SocketProvider>
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
  initialRouteName,
  themeMode,
}: {
  navigationRef: React.RefObject<NavigationContainerRef<any> | null>;
  visible: boolean;
  storeUrl: string;
  initialRouteName?: keyof RootStackParamList;
  themeMode: ResolvedTheme;
}) {
  const isDarkMode = themeMode !== 'light';
  const isHighContrast = themeMode === 'high-contrast';
  const navigationTheme = isHighContrast
    ? appHighContrastTheme
    : isDarkMode
      ? appDarkTheme
      : appLightTheme;
  const { user_token, isGuest } = useAppSelector((state: RootState) => state.user);
  const [onboardingDismissed, setOnboardingDismissed] = useState(false);

  // Show onboarding until the user authenticates, explicitly picks guest mode, or dismisses modal to sign in.
  const showOnboarding = !user_token && !isGuest && !onboardingDismissed;

  const handleCloseModal = () => {
    setOnboardingDismissed(true);
  };

  const handleSignInUser = () => {
    setOnboardingDismissed(true);
    navigationRef.current?.navigate('SignInScreen', { role: 'General User' });
  };
  const handleGuest = () => {
    setOnboardingDismissed(true);
    navigationRef.current?.reset({index: 0, routes: [{name: 'TabNavigation'}]});
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isHighContrast
          ? '#000000'
          : isDarkMode
            ? '#0A0F1D'
            : '#F0F8FF',
      }}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <StackNavigation />
      </NavigationContainer>
      <CustomAlertDialog key={'alert'} />
      <UpdateModal visible={visible} storeUrl={storeUrl} />

      {/* Onboarding — shown until user signs in or continues as guest */}
      <OnboardingModal
        visible={showOnboarding}
        onClose={handleCloseModal}
        onSignInUser={handleSignInUser}
        onSignInDoctor={handleSignInUser}
        onContinue={() => {}}
        onGuestContinue={handleGuest}
      />
    </View>
  );
}
