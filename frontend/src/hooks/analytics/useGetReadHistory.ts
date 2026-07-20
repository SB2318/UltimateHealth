import { GET_READ_HISTORY } from '@/src/helper/APIUtils';
import { ArticleData } from '@/src/type';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';


export type ReadHistoryArticle = ArticleData & {
  dateRead: string;
};

interface ReadHistoryResponse {
  articles: ReadHistoryArticle[];
  totalPages?: number;
}

export const useGetReadHistory = (
  page: number = 1,
): UseQueryResult<ReadHistoryResponse, Error> => {
  const { user_id, isGuest } = useSelector((state: any) => state.user);

  return useQuery({
    queryKey: ['get-read-history', user_id, page],
    queryFn: async () => {
      const response = await axios.get(`${GET_READ_HISTORY}/${user_id}`, {
        params: { page },
      });
      return response.data as ReadHistoryResponse;
    },
    enabled: !!user_id && !isGuest,
  });
};
