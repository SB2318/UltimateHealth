import {useQuery, UseQueryResult} from '@tanstack/react-query';
import axios from 'axios';
import {GET_ARTICLE_CONTENT} from '../helper/APIUtils';
type AxiosError = any;

export const useGetArticleContent = (
  recordId?: string,
): UseQueryResult<string, AxiosError> => {
  return useQuery({
    queryKey: ['get-article-content', recordId],
    queryFn: async () => {
      const response = await axios.get(`${GET_ARTICLE_CONTENT}/${recordId}`);
      return response.data.htmlContent as string;
    },
    enabled: Boolean(recordId),
  });
};
