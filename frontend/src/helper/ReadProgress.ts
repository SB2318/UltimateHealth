import AsyncStorage from '@react-native-async-storage/async-storage';

const PROGRESS_PREFIX = '@article_progress_';

/**
 * Save read progress percentage for a specific article.
 * @param articleId The ID of the article
 * @param percentage The scroll percentage (0 to 100)
 */
export const saveArticleProgress = async (articleId: string | number, percentage: number): Promise<void> => {
  try {
    if (!articleId) return;
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    await AsyncStorage.setItem(`${PROGRESS_PREFIX}${articleId}`, clampedPercentage.toString());
  } catch (error) {
    console.log('Error saving read progress:', error);
  }
};

/**
 * Get read progress percentage for a specific article.
 * @param articleId The ID of the article
 * @returns The scroll percentage (0 to 100)
 */
export const getArticleProgress = async (articleId: string | number): Promise<number> => {
  try {
    if (!articleId) return 0;
    const value = await AsyncStorage.getItem(`${PROGRESS_PREFIX}${articleId}`);
    return value ? parseFloat(value) : 0;
  } catch (error) {
    console.log('Error getting read progress:', error);
    return 0;
  }
};

/**
 * Get all saved read progress for caching in Redux.
 * @returns A dictionary mapping article IDs to their read percentage.
 */
export const getAllArticleProgress = async (): Promise<Record<string, number>> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const progressKeys = keys.filter(key => key.startsWith(PROGRESS_PREFIX));
    
    if (progressKeys.length === 0) return {};
    
    const results = await AsyncStorage.multiGet(progressKeys);
    
    const progressDict: Record<string, number> = {};
    results.forEach(([key, value]) => {
      if (value) {
        const articleId = key.replace(PROGRESS_PREFIX, '');
        progressDict[articleId] = parseFloat(value);
      }
    });
    
    return progressDict;
  } catch (error) {
    console.log('Error getting all read progress:', error);
    return {};
  }
};
