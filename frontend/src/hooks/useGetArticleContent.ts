import {useQuery, UseQueryResult} from '@tanstack/react-query';
import axios, {AxiosError} from 'axios';
import {GET_ARTICLE_CONTENT} from '../helper/APIUtils';
import { CACHE_KEYS, getCachedData, setCachedData } from '../helper/CacheUtils';
import { store } from '../store/ReduxStore';

export const useGetArticleContent = (
  recordId?: string,
): UseQueryResult<string, AxiosError> => {
  return useQuery({
    queryKey: ['get-article-content', recordId],
    queryFn: async () => {
      const cacheKey = `${CACHE_KEYS.ARTICLE_CONTENT}${recordId}`;
      const isConnected = store.getState().network.isConnected;
      
      if (!isConnected) {
        const cached = await getCachedData<string>(cacheKey);
        if (cached) return cached;
        throw new Error('Offline and no cache available');
      }

      try {
        const response = await axios.get(`${GET_ARTICLE_CONTENT}/${recordId}`);
        await setCachedData(cacheKey, response.data.htmlContent);
        return response.data.htmlContent as string;
      } catch (error) {
        const cached = await getCachedData<string>(cacheKey);
        if (cached) return cached;
        throw error;
      }
    },
    enabled: Boolean(recordId),
  });
};
