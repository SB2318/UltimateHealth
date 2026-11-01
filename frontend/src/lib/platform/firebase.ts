import {Platform} from 'react-native';
import firebase from '@react-native-firebase/app';

export const firebaseInit = ()=>{
  if (Platform.OS === 'web') {
    return;
  }
  if (!firebase.apps.length) {
    firebase.app();
  }
};
