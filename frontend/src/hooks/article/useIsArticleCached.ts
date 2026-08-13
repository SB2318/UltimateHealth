import {useQuery} from '@tanstack/react-query';
import {getCachedArticles} from '@/src/lib/storage/ArticleCacheUtils';

/** Query key for the set of articles readable offline. */
export const CACHED_ARTICLE_IDS_KEY = ['offline-cached-article-ids'];

/**
 * Reports whether an article is stored for offline reading, which happens
 * once the reader has finished it.
 *
 * Used to surface the "Available Offline" badge. Every card in a list asks the
 * same question, and the answer lives in a single AsyncStorage entry holding
 * the articles with their bodies — so asking per card would read and parse
 * that whole payload once per card on the way to the same answer. The lookup
 * runs through React Query instead: one read answers every card, and the badge
 * does not need to be fresher than the short stale window.
 */
export const useIsArticleCached = (articleId?: number): boolean => {
  const {data: cachedIds} = useQuery({
    queryKey: CACHED_ARTICLE_IDS_KEY,
    queryFn: async () => {
      const cached = await getCachedArticles();
      return cached.map(entry => entry.articleId);
    },
    staleTime: 5000,
  });

  if (!articleId || !cachedIds) {
    return false;
  }
  return cachedIds.includes(Number(articleId));
};
