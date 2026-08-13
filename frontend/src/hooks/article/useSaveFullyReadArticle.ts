import {useCallback, useEffect, useRef} from 'react';
import {ArticleData} from '@/src/schemas/type';
import {cacheFullyReadArticle} from '@/src/lib/storage/ArticleCacheUtils';
import {StatusEnum} from '@/src/lib/utils/Utils';
import {debugLog} from '@/src/lib/utils/debugLog';

/**
 * Stores an article for offline reading once the reader has finished it.
 *
 * Returns the callback the detail screen fires from the same place it reports
 * the read event — reaching the end of the article. Opening an article is not
 * enough: only what someone actually read through is worth the device storage.
 *
 * The write runs at that moment rather than waiting on the read-event request
 * to be acknowledged. Tying it to the response would mean a dropped request
 * silently costs the reader offline access, and a flaky connection is exactly
 * when they are going to want it.
 */
export const useSaveFullyReadArticle = (
  articleId: number,
  article?: ArticleData,
  htmlContent?: string,
): (() => void) => {
  // Which article has already been stored. Bottom-of-page scroll events fire
  // repeatedly, and each one would otherwise rewrite the whole cache.
  const savedArticleIdRef = useRef<number | null>(null);

  useEffect(() => {
    savedArticleIdRef.current = null;
  }, [articleId]);

  return useCallback(() => {
    if (!articleId || !article) {
      return;
    }

    // Drafts and articles under review can still change or be discarded;
    // keeping a copy of one offline would preserve content never published.
    if (article.status !== StatusEnum.PUBLISHED) {
      return;
    }

    if (savedArticleIdRef.current === articleId) {
      return;
    }
    savedArticleIdRef.current = articleId;

    cacheFullyReadArticle(articleId, article, htmlContent).catch(error => {
      // Offline reading is an enhancement; failing to store must not surface
      // to a reader who has simply finished an article.
      savedArticleIdRef.current = null;
      debugLog('Unable to store fully read article for offline use', error);
    });
  }, [articleId, article, htmlContent]);
};
