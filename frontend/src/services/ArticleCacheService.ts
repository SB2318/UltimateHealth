import {createMMKV} from 'react-native-mmkv';
import type {MMKV} from 'react-native-mmkv';
import type {ArticleData} from '../type';

let _storage: MMKV | null = null;
let _initialized = false;

function getStorage(): MMKV | null {
  if (_initialized) return _storage;
  _initialized = true;
  try {
    _storage = createMMKV({id: 'article-cache-storage'});
  } catch {
    _storage = null;
  }
  return _storage;
}

const CACHED_ARTICLES_KEY = 'cached_articles';

export interface CachedArticle {
  article: ArticleData;
  htmlContent: string;
  cachedAt: number;
}

/**
 * Get all cached articles.
 */
export function getCachedArticles(): CachedArticle[] {
  try {
    const storage = getStorage();
    if (!storage) return [];
    const raw = storage.getString(CACHED_ARTICLES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as CachedArticle[];
  } catch {
    try {
      getStorage()?.remove(CACHED_ARTICLES_KEY);
    } catch {}
    return [];
  }
}

/**
 * Save / Cache an article.
 */
export function saveOfflineArticle(article: ArticleData, htmlContent: string): void {
  try {
    const storage = getStorage();
    if (!storage) return;
    const cached = getCachedArticles();
    
    // Check if already cached (comparing by ID)
    const existingIndex = cached.findIndex(item => item.article._id.toString() === article._id.toString());
    const newCachedArticle: CachedArticle = {
      article,
      htmlContent,
      cachedAt: Date.now(),
    };
    
    if (existingIndex > -1) {
      cached[existingIndex] = newCachedArticle;
    } else {
      cached.push(newCachedArticle);
    }
    
    storage.set(CACHED_ARTICLES_KEY, JSON.stringify(cached));
  } catch (error) {
    console.error('Failed to cache article offline:', error);
  }
}

/**
 * Remove a cached article.
 */
export function removeOfflineArticle(articleId: string | number): void {
  try {
    const storage = getStorage();
    if (!storage) return;
    const idStr = articleId.toString();
    let cached = getCachedArticles();
    cached = cached.filter(item => item.article._id.toString() !== idStr);
    storage.set(CACHED_ARTICLES_KEY, JSON.stringify(cached));
  } catch (error) {
    console.error('Failed to remove cached article:', error);
  }
}

/**
 * Check if an article is cached offline.
 */
export function isArticleOffline(articleId: string | number): boolean {
  const cached = getCachedArticles();
  const idStr = articleId.toString();
  return cached.some(item => item.article._id.toString() === idStr);
}

/**
 * Get cached article data by ID.
 */
export function getCachedArticleById(articleId: string | number): CachedArticle | undefined {
  const cached = getCachedArticles();
  const idStr = articleId.toString();
  return cached.find(item => item.article._id.toString() === idStr);
}

/**
 * Sync cached articles with a list of saved articles (metadata list).
 * Retains only the cached articles that are still present in the apiSavedArticles list.
 */
export function syncCachedArticles(apiSavedArticles: ArticleData[]): void {
  try {
    const storage = getStorage();
    if (!storage) return;
    const cached = getCachedArticles();
    
    const apiSavedIds = new Set(apiSavedArticles.map(a => a._id.toString()));
    const updated = cached.filter(item => apiSavedIds.has(item.article._id.toString()));
    
    storage.set(CACHED_ARTICLES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to sync cached articles:', error);
  }
}
