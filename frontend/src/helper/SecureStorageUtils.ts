import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SECURE_KEYS = {
  USER_TOKEN: 'SECURE_USER_TOKEN',
  EXPO_PUSH_TOKEN: 'SECURE_EXPO_PUSH_TOKEN',
  LANGUAGE_PREFERENCES: 'SECURE_LANGUAGE_PREFERENCES',
} as const;

export type SecureKey = (typeof SECURE_KEYS)[keyof typeof SECURE_KEYS];

export const secureStoreItem = async (
  key: SecureKey,
  value: string,
): Promise<boolean> => {
  try {
    if (!value || typeof value !== 'string' || value.trim().length === 0) {
      console.warn(`[SecureStorage] Attempted to store invalid value for key: ${key}`);
      return false;
    }

    try {
      await SecureStore.setItemAsync(key, value);
    } catch (e) {
      console.warn(`[SecureStorage] Failed to store ${key}, falling back to AsyncStorage`, e);
      await AsyncStorage.setItem(`FALLBACK_${key}`, value);
    }
    return true;
  } catch (error) {
    console.error(`[SecureStorage] Error storing key "${key}":`, error);
    return false;
  }
};

export const secureRetrieveItem = async (
  key: SecureKey,
): Promise<string | null> => {
  try {
    let value = await SecureStore.getItemAsync(key);
    if (!value) {
      value = await AsyncStorage.getItem(`FALLBACK_${key}`);
    }
    if (!value || value.trim().length === 0) {
      return null;
    }
    return value;
  } catch (error) {
    console.error(`[SecureStorage] Error retrieving key "${key}":`, error);
    try {
      const fallback = await AsyncStorage.getItem(`FALLBACK_${key}`);
      return fallback || null;
    } catch (e) {
      return null;
    }
  }
};

export const secureRemoveItem = async (key: SecureKey): Promise<boolean> => {
  try {
    await SecureStore.deleteItemAsync(key);
    await AsyncStorage.removeItem(`FALLBACK_${key}`);
    return true;
  } catch (error) {
    console.error(`[SecureStorage] Error removing key "${key}":`, error);
    try {
      await AsyncStorage.removeItem(`FALLBACK_${key}`);
    } catch (e) {}
    return false;
  }
};

export const secureClearAllItems = async (): Promise<void> => {
  try {
    await Promise.all(
      Object.values(SECURE_KEYS).map(async key => {
        try {
          await SecureStore.deleteItemAsync(key);
        } catch (e) {}
        try {
          await AsyncStorage.removeItem(`FALLBACK_${key}`);
        } catch (e) {}
      })
    );
  } catch (error) {
    console.error('[SecureStorage] Error clearing all items:', error);
  }
};

