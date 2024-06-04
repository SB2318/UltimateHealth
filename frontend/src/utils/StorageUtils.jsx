import AsyncStorage from '@react-native-async-storage/async-storage';

export const retrieveItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error('Error retrieving item:', error);
    return null;
  }
};
