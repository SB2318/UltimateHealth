import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {PROD_URL} from '../helper/APIUtils';
import axios, {AxiosError} from 'axios';
import {ArticleData} from '../type';

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
      const response = await axios.get(`${PROD_URL}/articles?page=${page}`);
      return response.data as ArticleRes;
    },
    enabled: !!isConnected && !!page,
  });
};
