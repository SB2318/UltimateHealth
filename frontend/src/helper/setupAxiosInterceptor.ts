import axios from 'axios';
import {Alert, Platform, ToastAndroid} from 'react-native';
import store from '../store/ReduxStore';
import {
  setGuestMode,
  setUserHandle,
  setUserId,
  setUserToken,
} from '../store/UserSlice';

let interceptorInitialized = false;
let sessionExpiredNotified = false;

export const setupAxiosInterceptor = () => {
  if (interceptorInitialized) {
    return;
  }

  interceptorInitialized = true;

  axios.interceptors.response.use(
    response => response,
    error => {
      if (error?.response?.status === 401) {
        store.dispatch(setUserToken(''));
        store.dispatch(setUserId(''));
        store.dispatch(setUserHandle(''));
        store.dispatch(setGuestMode(true));

        axios.defaults.headers.common.Authorization = '';

        if (!sessionExpiredNotified) {
          sessionExpiredNotified = true;
          const message =
            'Your session has expired. You are now browsing as a guest.';

          if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.SHORT);
          } else {
            Alert.alert('Session Expired', message);
          }
        }
      }

      return Promise.reject(error);
    },
  );
};
