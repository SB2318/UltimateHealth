import { PROD_URL } from '@/src/lib/api/APIUtils';
import { ArticleData } from '@/src/schemas/type';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

type AxiosError = any;

type ArticleRes = {
  articles: ArticleData[];
  totalPages: number;
  total?: number;
  currentPage?: number;
};

export const useGetPaginatedArticle = (
  isConnected: boolean,
  page: number,
): UseQueryResult<ArticleRes, AxiosError> => {
  return useQuery({
    queryKey: ['get-all-articles', page],
    queryFn: async () => {
      const response = await axios.get(`${PROD_URL}/articles?page=${page}`);
      const data = response.data;
      const articles = Array.isArray(data?.articles)
        ? data.articles
        : Array.isArray(data)
          ? data
          : [];
      return {
        articles,
        totalPages: typeof data?.totalPages === 'number' ? data.totalPages : 1,
        total: data?.total,
        currentPage: data?.currentPage ?? page,
      } as ArticleRes;
    },
    enabled: isConnected !== false && !!page,
  });
};
