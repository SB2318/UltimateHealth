import {FirebaseProvider} from '@/hooks/FirebaseContext';
import {useCheckTokenStatus} from '@/src/hooks/useGetTokenStatus';
import {useNotificationListeners} from '@/hooks/useNotificationListener';
import {useVersionCheck} from '@/hooks/useVersionCheck';
import {SocketProvider} from '../contexts/SocketContext';
import config from '@/tamagui.config';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {View, useColorScheme} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {addEventListener} from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import {Theme, TamaguiProvider} from 'tamagui';
import {initDeepLinking} from '../helper/DeepLinkService';
import StackNavigation from '../navigations/StackNavigation';
import {CustomAlertDialog} from './CustomAlert';
import UpdateModal from './UpdateModal';
import {setConnected} from '../store/NetworkSlice';
import {firebaseInit} from '../helper/firebase';
import {cleanUpDownloads, KEYS, retrieveItem} from '../helper/Utils';
import { setUserToken, setGuestMode } from '../store/UserSlice';
import { loadThemeMode } from '../store/themeSlice';
import axios from 'axios';

export default function AppContent() {
  const navigationRef = useRef(null);
  const dispatch = useDispatch();
  const {mode: themeMode} = useSelector((state: any) => state.theme || {mode: 'system'});
  const systemColorScheme = useColorScheme();
  const effectiveTheme = themeMode === 'system' ? (systemColorScheme === 'dark' ? 'dark' : 'light') : themeMode;
  const backgroundStyle = {
    backgroundColor: effectiveTheme === 'dark' ? '#0F172A' : '#F5F7FB',
  };

  const {data: tokenRes = null, isLoading} = useCheckTokenStatus();

  const {visible, storeUrl} = useVersionCheck();

  useEffect(() => {
    dispatch(loadThemeMode());
  }, [dispatch]);

  useEffect(() => {
    if (navigationRef.current && tokenRes) {
      
      checkToken();
    }
  }, [tokenRes, navigationRef]);

  const checkToken = async () =>{
     const token = await retrieveItem(KEYS.USER_TOKEN);
     //axios.defaults.headers.
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Content-Type"] = "application/json";
      dispatch(setUserToken(token));
      if (token) {
        dispatch(setGuestMode(false));
      }
      initDeepLinking(navigationRef.current, tokenRes?.isValid || false);
    
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(
        'Foreground notification received from message:',
        remoteMessage,
      );
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background notification received:', remoteMessage); // wjem app is in bg
      // const data = remoteMessage.data;
      //handleNotification(data);
    });

    // On app open

    const unsubscribe1 = addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      /** Dispatch use a reducer to update the value in store */
      dispatch(setConnected(state.isConnected));
    });
    const onOpenApp = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open:', remoteMessage);
      // const data = remoteMessage.data;
      // handleNotification(data);
    });

    return () => {
      unsubscribe();
      unsubscribe1();
      onOpenApp();
    };
  }, [dispatch]);

  useEffect(() => {
    firebaseInit();
    cleanUpDownloads();
  }, []);

  useNotificationListeners();

  return (
    <TamaguiProvider config={config}>
      <Theme name={effectiveTheme}>
        <FirebaseProvider>
          <SocketProvider>
            <SafeAreaProvider>
              <PaperProvider>
                <View style={[{flex: 1}, backgroundStyle]}>
                  <StatusBar style={effectiveTheme === 'dark' ? 'light' : 'dark'} backgroundColor="#007AFF" />
                  <NavigationContainer ref={navigationRef}>
                    <StackNavigation />
                  </NavigationContainer>
                  <CustomAlertDialog key={'alert'} />
                  <UpdateModal visible={visible} storeUrl={storeUrl} />
                </View>
              </PaperProvider>
            </SafeAreaProvider>
          </SocketProvider>
        </FirebaseProvider>
      </Theme>
    </TamaguiProvider>
  );
}
