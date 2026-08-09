import { GET_ARTICLE_CONTENT } from '@/src/lib/api/APIUtils';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {
  cacheArticleContent,
  getCachedArticleContent,
} from '@/src/lib/storage/ArticleCacheUtils';
import {isOfflineError} from '@/src/lib/api/networkError';
import axios from 'axios';
type AxiosError = any;

export const useGetArticleContent = (
  recordId?: string,
): UseQueryResult<string, AxiosError> => {
  return useQuery({
    queryKey: ['get-article-content', recordId],
    queryFn: async () => {
      try {
        const response = await axios.get(`${GET_ARTICLE_CONTENT}/${recordId}`);
        const htmlContent = response.data.htmlContent as string;

        // Store the body alongside the article detail cached on view, so the
        // whole article — not just its metadata — is readable offline.
        await cacheArticleContent(recordId as string, htmlContent);

        return htmlContent;
      } catch (error) {
        if (isOfflineError(error)) {
          const cached = await getCachedArticleContent(recordId as string);
          if (cached !== null) {
            return cached;
          }
        }
        throw error;
      }
    },
    enabled: Boolean(recordId),
  });
};
