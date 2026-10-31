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
  articleId: number | string | undefined,
  recordId?: string,
): UseQueryResult<ArticleData, AxiosError> => {
  const dispatch = useAppDispatch();
  const lookupKey =
    articleId !== undefined &&
    articleId !== null &&
    articleId !== '' &&
    articleId !== 0 &&
    !Number.isNaN(articleId)
      ? articleId
      : recordId;

  const numericArticleId =
    typeof lookupKey === 'number'
      ? lookupKey
      : !Number.isNaN(Number(lookupKey))
        ? Number(lookupKey)
        : undefined;

  const sessionArticle = useAppSelector(state =>
    state.offline.articles.find(
      entry =>
        (numericArticleId !== undefined &&
          entry.articleId === numericArticleId) ||
        (recordId && entry.article?.pb_recordId === recordId) ||
        (typeof lookupKey === 'string' &&
          entry.article?.pb_recordId === lookupKey),
    ),
  );

  // The query function outlives the render that created it, so the session
  // copy is read through a ref rather than captured from this render.
  const sessionArticleRef = useRef(sessionArticle);
  sessionArticleRef.current = sessionArticle;

  return useQuery({
    queryKey: ['get-article-by-id', lookupKey],
    enabled: Boolean(lookupKey),
    queryFn: async () => {
      try {
        const response = await axios.get(`${GET_ARTICLE_BY_ID}/${lookupKey}`);
        const article = response.data.article as ArticleData;

        // Session copy only — opening an article writes nothing to the device.
        // It is persisted when the reader finishes it, from the detail screen.
        const resolvedId = Number(article?._id ?? numericArticleId ?? 0);
        if (resolvedId) {
          dispatch(cacheSessionArticle({articleId: resolvedId, article}));
        }

        return article;
      } catch (error) {
        // Offline: prefer this session's copy, then fall back to an article
        // the reader finished earlier and which was stored for offline use.
        if (isOfflineError(error)) {
          const session = sessionArticleRef.current;
          if (session) {
            return session.article;
          }

          if (numericArticleId !== undefined) {
            const cached = await getCachedArticle(numericArticleId);
            if (cached) {
              return cached.article;
            }
          }
        }
        throw error;
      }
    },
  });
};
