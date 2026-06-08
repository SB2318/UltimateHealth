import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {ArticleData} from '../type';
import axios, {AxiosError} from 'axios';
import {GET_ARTICLE_BY_ID} from '../helper/APIUtils';
import { CACHE_KEYS, getCachedData, setCachedData } from '../helper/CacheUtils';
import { store } from '../store/ReduxStore';

export const useGetArticleDetails = (
  articleId: number,
): UseQueryResult<ArticleData, AxiosError> => {
  return useQuery({
    queryKey: ['get-article-by-id', articleId],
    queryFn: async () => {
      const cacheKey = `${CACHE_KEYS.ARTICLE_DETAILS}${articleId}`;
      const isConnected = store.getState().network.isConnected;
      
      if (!isConnected) {
        const cached = await getCachedData<ArticleData>(cacheKey);
        if (cached) return cached;
        throw new Error('Offline and no cache available');
      }
      
      try {
        const response = await axios.get(`${GET_ARTICLE_BY_ID}/${articleId}`);
        await setCachedData(cacheKey, response.data.article);
        return response.data.article as ArticleData;
      } catch (error) {
        const cached = await getCachedData<ArticleData>(cacheKey);
        if (cached) return cached;
        throw error;
      }
    },
  });
};
