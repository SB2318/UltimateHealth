import AsyncStorage from '@react-native-async-storage/async-storage';

export const CACHE_KEYS = {
  PAGINATED_ARTICLES: '@cache_paginated_articles_',
  ARTICLE_DETAILS: '@cache_article_details_',
  ARTICLE_CONTENT: '@cache_article_content_',
};

export const setCachedData = async (key: string, data: any) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('Error saving cache data', e);
  }
};

export const getCachedData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('Error reading cache data', e);
    return null;
  }
};
