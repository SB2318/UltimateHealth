import { GET_ARTICLE_CONTENT } from '@/src/lib/api/APIUtils';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {useRef} from 'react';
import {getCachedArticleContent} from '@/src/lib/storage/ArticleCacheUtils';
import {cacheSessionContent} from '@/src/store/offlineSlice';
import {useAppDispatch, useAppSelector} from '@/src/store/hooks';
import {isOfflineError} from '@/src/lib/api/networkError';
import axios from 'axios';
type AxiosError = any;

export const useGetArticleContent = (
  recordId?: string,
): UseQueryResult<string, AxiosError> => {
  const dispatch = useAppDispatch();
  const sessionContent = useAppSelector(state =>
    state.offline.contents.find(entry => entry.recordId === recordId),
  );

  // Read through a ref: the query function outlives the render that made it.
  const sessionContentRef = useRef(sessionContent);
  sessionContentRef.current = sessionContent;

  return useQuery({
    queryKey: ['get-article-content', recordId],
    queryFn: async () => {
      try {
        const response = await axios.get(`${GET_ARTICLE_CONTENT}/${recordId}`);
        const htmlContent = response.data.htmlContent as string;

        // Session copy only, matching the article detail above. The body is
        // written to the device with its article once the reader finishes it.
        dispatch(
          cacheSessionContent({recordId: recordId as string, htmlContent}),
        );

        return htmlContent;
      } catch (error) {
        if (isOfflineError(error)) {
          const session = sessionContentRef.current;
          if (session) {
            return session.htmlContent;
          }

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
