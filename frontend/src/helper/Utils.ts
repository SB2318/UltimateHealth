
import { Alert ,BackHandler} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export const checkInternetConnection = (callback: (isConnected: boolean) => void) => {
  const unsubscribe = NetInfo.addEventListener((state) => {
    callback(state.isConnected);
  });

  return unsubscribe;
};


/** BackButton Handler */
export const handleBackButton = () =>{
    
      Alert.alert('Exit App', 'Are you sure you want to exit?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    
    }

 
/** Async Storage for get Item */
  export const retrieveItem = async key => {
      try {
        const value = await AsyncStorage.getItem(key);
        return value;
      } catch (error) {
        console.error('Error retrieving item:', error);
        return null;
      }
    };

    /** Async Storage Store Item */
    const storeItem = async (key, value) => {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        console.error('Error storing item:', error);
      }
    };

    
  