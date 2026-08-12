import { GET_ARTICLE_BY_ID } from '@/src/lib/api/APIUtils';
import { ArticleData } from '@/src/schemas/type';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {useRef} from 'react';
import {getCachedArticle} from '@/src/lib/storage/ArticleCacheUtils';
import {cacheSessionArticle} from '@/src/store/offlineSlice';
import {useAppDispatch, useAppSelector} from '@/src/store/hooks';
import {isOfflineError} from '@/src/lib/api/networkError';

import axios from 'axios';

type AxiosError = any;

export const useGetArticleDetails = (
  articleId: number,
): UseQueryResult<ArticleData, AxiosError> => {
  const dispatch = useAppDispatch();
  const sessionArticle = useAppSelector(state =>
    state.offline.articles.find(entry => entry.articleId === articleId),
  );

  // The query function outlives the render that created it, so the session
  // copy is read through a ref rather than captured from this render.
  const sessionArticleRef = useRef(sessionArticle);
  sessionArticleRef.current = sessionArticle;

  return useQuery({
    queryKey: ['get-article-by-id', articleId],
    queryFn: async () => {
      try {
        const response = await axios.get(`${GET_ARTICLE_BY_ID}/${articleId}`);
        const article = response.data.article as ArticleData;

        // Session copy only — opening an article writes nothing to the device.
        // It is persisted when the reader finishes it, from the detail screen.
        dispatch(cacheSessionArticle({articleId, article}));

        return article;
      } catch (error) {
        // Offline: prefer this session's copy, then fall back to an article
        // the reader finished earlier and which was stored for offline use.
        if (isOfflineError(error)) {
          const session = sessionArticleRef.current;
          if (session) {
            return session.article;
          }

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
