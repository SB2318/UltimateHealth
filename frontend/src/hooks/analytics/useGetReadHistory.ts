import { GET_READ_HISTORY } from '@/src/lib/api/APIUtils';
import { ArticleData } from '@/src/schemas/type';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { useAppSelector } from '../../store/hooks';

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
  const { user_id, isGuest } = useAppSelector((state: any) => state.user);

  return useQuery({
    queryKey: ['get-read-history', user_id, page],
    queryFn: async () => {
      try {
        const response = await axios.get(`${GET_READ_HISTORY}/${user_id}`, {
          params: { page },
        });
        return (
          response?.data ?? {
            articles: [],
            totalPages: 1,
          }
        ) as ReadHistoryResponse;
      } catch {
        return {
          articles: [],
          totalPages: 1,
        };
      }
    },
    enabled: !!user_id && !isGuest,
  });
};
