import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {PROD_URL} from '../helper/APIUtils';
import axios, {AxiosError} from 'axios';
import {ArticleData} from '../type';
import { CACHE_KEYS, getCachedData, setCachedData } from '../helper/CacheUtils';

type ArticleRes = {
  articles: ArticleData[];
  totalPages: number;
};
export const useGetPaginatedArticle = (
  isConnected: boolean,
  page: number,
): UseQueryResult<ArticleRes | null, AxiosError> => {
  return useQuery({
    queryKey: ['get-all-articles', page],
    queryFn: async () => {
      const cacheKey = `${CACHE_KEYS.PAGINATED_ARTICLES}${page}`;
      if (!isConnected) {
        const cached = await getCachedData<ArticleRes>(cacheKey);
        return cached;
      }
      try {
        const response = await axios.get(`${PROD_URL}/articles?page=${page}`);
        await setCachedData(cacheKey, response.data);
        return response.data as ArticleRes;
      } catch (err) {
        console.error('Error fetching articles:', err);
        const cached = await getCachedData<ArticleRes>(cacheKey);
        return cached;
      }
    },
    enabled: !!page,
  });
};
