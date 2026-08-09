import { GET_ARTICLE_BY_ID } from '@/src/lib/api/APIUtils';
import { ArticleData } from '@/src/schemas/type';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {
  cacheArticleDetail,
  getCachedArticle,
} from '@/src/lib/storage/ArticleCacheUtils';
import {isOfflineError} from '@/src/lib/api/networkError';

import axios from 'axios';

type AxiosError = any;

export const useGetArticleDetails = (
  articleId: number,
): UseQueryResult<ArticleData, AxiosError> => {
  return useQuery({
    queryKey: ['get-article-by-id', articleId],
    queryFn: async () => {
      try {
        const response = await axios.get(`${GET_ARTICLE_BY_ID}/${articleId}`);
        const article = response.data.article as ArticleData;

        // Record the view so the article stays readable offline. Awaited so a
        // caller that goes offline immediately after still finds it cached.
        await cacheArticleDetail(articleId, article);

        return article;
      } catch (error) {
        // Offline: serve the last copy we stored for this article, if any.
        if (isOfflineError(error)) {
          const cached = await getCachedArticle(articleId);
          if (cached) {
            return cached.article;
          }
        }
        throw error;
      }
    },
  });
};
