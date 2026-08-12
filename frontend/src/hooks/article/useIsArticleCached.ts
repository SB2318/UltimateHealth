import {useEffect, useState} from 'react';
import {isArticleCached} from '@/src/lib/storage/ArticleCacheUtils';

/**
 * Reports whether an article is stored for offline reading, which happens
 * once the reader has finished it.
 *
 * Used to surface the "Available Offline" badge. The lookup hits AsyncStorage,
 * so it runs in an effect and is guarded against setting state after unmount.
 */
export const useIsArticleCached = (articleId?: number): boolean => {
  const [cached, setCached] = useState(false);

  useEffect(() => {
    if (!articleId) {
      setCached(false);
      return;
    }

    let active = true;
    isArticleCached(articleId)
      .then(result => {
        if (active) {
          setCached(result);
        }
      })
      .catch(() => {
        if (active) {
          setCached(false);
        }
      });

    return () => {
      active = false;
    };
  }, [articleId]);

  return cached;
};
