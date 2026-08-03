import { GET_ARTICLE_BY_ID } from '@/src/lib/api/APIUtils';
import { ArticleData } from '@/src/schemas/type';
import {useQuery, UseQueryResult} from '@tanstack/react-query';

import axios from 'axios';

type AxiosError = any;

export const useGetArticleDetails = (
  articleId: number,
): UseQueryResult<ArticleData, AxiosError> => {
  return useQuery({
    queryKey: ['get-article-by-id', articleId],
    queryFn: async () => {
      const response = await axios.get(`${GET_ARTICLE_BY_ID}/${articleId}`);

      return response.data.article as ArticleData;
    },
  });
};
