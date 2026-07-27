import React, { createContext, useContext, useEffect, ReactNode, useState } from 'react';
import { Platform } from 'react-native';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging'; 
import Constants from 'expo-constants';
import { logger } from '../lib/services/monitoring/logger';


const extra = Constants.expoConfig?.extra ?? {};

const firebaseConfig = {
  appId: Platform.select({
    ios: extra.FIREBASE_APP_ID_IOS,
    android: extra.FIREBASE_APP_ID_ANDROID,
    default: extra.FIREBASE_APP_ID_ANDROID,
  }),
  apiKey: Platform.select({
    ios: extra.FIREBASE_API_KEY_IOS,
    android: extra.FIREBASE_API_KEY_ANDROID,
    default: extra.FIREBASE_API_KEY_ANDROID,
  }),
  databaseURL: extra.FIREBASE_DATABASE_URL,
  storageBucket: extra.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: extra.FIREBASE_SENDER_ID,
  projectId: extra.FIREBASE_PROJECT_ID,
  authDomain: extra.FIREBASE_AUTH_DOMAIN,
  measurementId: extra.FIREBASE_MEASUREMENT_ID,
  persistence: true,
};

const FirebaseContext = createContext<{
  messaging: typeof messaging | null;
  fcmToken: string | null;
}>({ messaging: null, fcmToken: null });

interface FirebaseProviderProps {
  children: ReactNode;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribeTokenRefresh: (() => void) | null = null;

    const initializeFirebase = async () => {
      try {
        const requiredFields = ['apiKey', 'appId', 'projectId', 'messagingSenderId'];
        const missingFields = requiredFields.filter(
          (field) => !firebaseConfig[field as keyof typeof firebaseConfig]
        );

        if (missingFields.length > 0) {
          logger.warn(
            `Firebase configuration is incomplete. Missing fields: ${missingFields.join(', ')}. Skipping Firebase initialization.`
          );
          return;
        }

        // 1. Initialize core Firebase client application instance securely
        if (!firebase.apps.length) {
          await firebase.initializeApp(firebaseConfig);
        } else {
          firebase.app();
        }

        // 2. Request explicit push notification permissions (Required for iOS & Android 13+)
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (!enabled) {
          logger.warn('Push notification permissions were denied by the user.');
          return;
        }

        // 3. Fetch current registration token
        const token = await messaging().getToken();
        if (token) {
          logger.log('Firebase Token initialized successfully:', token);
          setFcmToken(token);
        }

        // 4. Register structural runtime listener to watch for push token rotations
        unsubscribeTokenRefresh = messaging().onTokenRefresh((newToken) => {
          logger.log('FCM Token automatically rotated/refreshed:', newToken);
          setFcmToken(newToken);
        });

      } catch (error) {
        logger.error('Error during Firebase initialization or token retrieval:', error);
      }
    };

    initializeFirebase();

    // Clean up event tracking listeners on unmount boundary
    return () => {
      if (unsubscribeTokenRefresh) {
        unsubscribeTokenRefresh();
      }
    };
  }, []);

  return (
    <FirebaseContext.Provider value={{ messaging, fcmToken }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebaseMessaging = () => {
  return useContext(FirebaseContext);
};