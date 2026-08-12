import AsyncStorage from '@react-native-async-storage/async-storage';
import {ArticleData} from '../../schemas/type';
import {debugError} from '../utils/debugLog';

/**
 * Offline reading cache for articles the reader has finished.
 *
 * Nothing is written here for merely opening an article: a browsing session
 * would otherwise fill the device with articles nobody intends to re-read.
 * The write happens once, at the same point the read event fires — when the
 * reader reaches the end of the article. Everything else stays in memory for
 * the session (see `offlineSlice`) and is gone when the app unmounts.
 *
 * What is kept is bounded two ways: by recency (`MAX_CACHED_ARTICLES`) and by
 * age (`CACHE_TTL_MS`), so the cache cannot grow without limit or serve stale
 * health content indefinitely.
 */

/** AsyncStorage key holding the serialised cache. */
export const ARTICLE_CACHE_KEY = 'OFFLINE_ARTICLE_CACHE';

/** How many fully read articles are retained. */
export const MAX_CACHED_ARTICLES = 20;

/** Entries older than this are dropped on the next read or write. */
export const CACHE_TTL_DAYS = 7;
export const CACHE_TTL_MS = CACHE_TTL_DAYS * 24 * 60 * 60 * 1000;

export type CachedArticle = {
  articleId: number;
  article: ArticleData;
  /** PocketBase record id, used to match the separately fetched body. */
  recordId?: string;
  htmlContent?: string;
  /** Epoch ms of the moment the article was finished; drives LRU and expiry. */
  cachedAt: number;
};

const isExpired = (entry: CachedArticle, now: number): boolean =>
  now - entry.cachedAt > CACHE_TTL_MS;

/** Reads the cache, tolerating absent or corrupt storage. */
const readCache = async (): Promise<CachedArticle[]> => {
  try {
    const raw = await AsyncStorage.getItem(ARTICLE_CACHE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    // A corrupt payload must not break reading forever, so reset it.
    debugError('[ArticleCache] Unable to read cache, resetting:', error);
    try {
      await AsyncStorage.removeItem(ARTICLE_CACHE_KEY);
    } catch {}
    return [];
  }
};

const writeCache = async (entries: CachedArticle[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(ARTICLE_CACHE_KEY, JSON.stringify(entries));
  } catch (error) {
    debugError('[ArticleCache] Unable to persist cache:', error);
  }
};

/**
 * Drops expired entries and trims to the most recent `MAX_CACHED_ARTICLES`.
 * Entries are held newest-first, so the tail is the least recently finished.
 */
const prune = (entries: CachedArticle[], now: number): CachedArticle[] =>
  entries.filter(entry => !isExpired(entry, now)).slice(0, MAX_CACHED_ARTICLES);

/**
 * Stores an article the reader has finished, moving it to the front.
 *
 * Called once per article from the fully-read handler on the detail screen.
 * Re-reading refreshes the entry, so articles a reader returns to survive
 * eviction while ones finished long ago age out. The body is passed in
 * alongside the metadata so the whole article is readable offline — it is
 * already in memory by the time the reader reaches the end.
 */
export const cacheFullyReadArticle = async (
  articleId: number,
  article: ArticleData,
  htmlContent?: string,
): Promise<void> => {
  if (!articleId || !article) {
    return;
  }

  const now = Date.now();
  const entries = await readCache();
  const existing = entries.find(entry => entry.articleId === articleId);

  const updated: CachedArticle = {
    articleId,
    article,
    recordId: article.pb_recordId || existing?.recordId,
    // Keep the body already stored if this read did not carry one, so a
    // re-read that finishes before the content request cannot blank it.
    htmlContent:
      typeof htmlContent === 'string' ? htmlContent : existing?.htmlContent,
    cachedAt: now,
  };

  const remaining = entries.filter(entry => entry.articleId !== articleId);
  await writeCache(prune([updated, ...remaining], now));
};

/** Returns a cached article, or null when absent or expired. */
export const getCachedArticle = async (
  articleId: number,
): Promise<CachedArticle | null> => {
  const now = Date.now();
  const entries = await readCache();
  const entry = entries.find(item => item.articleId === articleId);

  if (!entry || isExpired(entry, now)) {
    return null;
  }
  return entry;
};

/** Returns a cached article body, or null when absent or expired. */
export const getCachedArticleContent = async (
  recordId: string,
): Promise<string | null> => {
  const now = Date.now();
  const entries = await readCache();
  const entry = entries.find(item => item.recordId === recordId);

  if (!entry || isExpired(entry, now) || typeof entry.htmlContent !== 'string') {
    return null;
  }
  return entry.htmlContent;
};

/**
 * Returns every unexpired cached article, newest first, and persists the
 * pruned list so expired entries are cleaned up as a side effect of browsing.
 */
export const getCachedArticles = async (): Promise<CachedArticle[]> => {
  const now = Date.now();
  const entries = await readCache();
  const pruned = prune(entries, now);

  if (pruned.length !== entries.length) {
    await writeCache(pruned);
  }
  return pruned;
};

/** Whether an article is readable offline. */
export const isArticleCached = async (articleId: number): Promise<boolean> => {
  const entry = await getCachedArticle(articleId);
  return entry !== null;
};

/**
 * Drops expired entries. Run when the app unmounts so storage is not left
 * holding articles past their TTL until the reader happens to browse again.
 */
export const pruneArticleCache = async (): Promise<void> => {
  const entries = await readCache();
  if (entries.length === 0) {
    return;
  }

  const pruned = prune(entries, Date.now());
  if (pruned.length !== entries.length) {
    await writeCache(pruned);
  }
};

/** Removes every cached article. */
export const clearArticleCache = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(ARTICLE_CACHE_KEY);
  } catch (error) {
    debugError('[ArticleCache] Unable to clear cache:', error);
  }
};
