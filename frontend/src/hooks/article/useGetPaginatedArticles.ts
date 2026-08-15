import { PROD_URL } from '@/src/lib/api/APIUtils';
import { ArticleData } from '@/src/schemas/type';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

type AxiosError = any;

type ArticleRes = {
  articles: ArticleData[];
  totalPages: number;
};

export const useGetPaginatedArticle = (
  isConnected: boolean,
  page: number,
): UseQueryResult<ArticleRes, AxiosError> => {
  return useQuery({
    queryKey: ['get-all-articles', page],
    queryFn: async () => {
      if (__DEV__) {
        console.log('response url: ', `${PROD_URL}/articles?page=${page}`);
      }

      const response = await axios.get(`${PROD_URL}/articles?page=${page}`);

      return response.data as ArticleRes;
    },
    enabled: !!isConnected && !!page,
  });
};
