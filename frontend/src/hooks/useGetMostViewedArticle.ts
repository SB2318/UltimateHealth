import {useQuery, UseQueryResult} from '@tanstack/react-query';
import axios from 'axios';
import {ArticleData} from '../type';
import {GET_MOSTLY_VIEWED} from '../helper/APIUtils';

export const useGetAuthorMostViewedArticles = ({
  userId,
  others,
  isConnected,
}: {
  userId?: string;
  others?: boolean;
  isConnected?: boolean;
}): UseQueryResult<ArticleData[]> => {
  return useQuery<ArticleData[]>({
    queryKey: ['get-mostly-viewed-article', userId, others],

    queryFn: async () => {
      const response = await axios.get(`${GET_MOSTLY_VIEWED}${userId}`);
      return response.data as ArticleData[];
    },

    enabled: !!isConnected && !!userId,
  });
};
