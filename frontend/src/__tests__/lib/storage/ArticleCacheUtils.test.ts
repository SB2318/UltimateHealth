import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ARTICLE_CACHE_KEY,
  CACHE_TTL_MS,
  MAX_CACHED_ARTICLES,
  cacheFullyReadArticle,
  clearArticleCache,
  getCachedArticle,
  getCachedArticleContent,
  getCachedArticles,
  isArticleCached,
  pruneArticleCache,
} from '../../../lib/storage/ArticleCacheUtils';

/** In-memory stand-in for AsyncStorage so cache contents are observable. */
let store: Record<string, string> = {};

const makeArticle = (id: number, overrides: Record<string, any> = {}) =>
  ({
    _id: String(id),
    title: `Article ${id}`,
    pb_recordId: `rec-${id}`,
    ...overrides,
  }) as any;

const readRaw = () => JSON.parse(store[ARTICLE_CACHE_KEY] ?? '[]');

describe('ArticleCacheUtils', () => {
  afterEach(() => {
    // Restore the shared AsyncStorage mock from jest.setup.ts so this file's
    // in-memory implementation cannot leak into other suites in the worker.
    (AsyncStorage.getItem as jest.Mock).mockReset().mockResolvedValue(null);
    (AsyncStorage.setItem as jest.Mock).mockReset().mockResolvedValue(undefined);
    (AsyncStorage.removeItem as jest.Mock)
      .mockReset()
      .mockResolvedValue(undefined);
  });

  beforeEach(() => {
    store = {};
    jest.clearAllMocks();
    jest.restoreAllMocks();

    (AsyncStorage.getItem as jest.Mock).mockImplementation(
      async (key: string) => store[key] ?? null,
    );
    (AsyncStorage.setItem as jest.Mock).mockImplementation(
      async (key: string, value: string) => {
        store[key] = value;
      },
    );
    (AsyncStorage.removeItem as jest.Mock).mockImplementation(
      async (key: string) => {
        delete store[key];
      },
    );
  });

  it('stores a fully read article with its body and reads it back', async () => {
    await cacheFullyReadArticle(1, makeArticle(1), '<p>Body</p>');

    const cached = await getCachedArticle(1);
    expect(cached?.article.title).toBe('Article 1');
    expect(await getCachedArticleContent('rec-1')).toBe('<p>Body</p>');
    expect(await isArticleCached(1)).toBe(true);
    expect(await isArticleCached(999)).toBe(false);
  });

  it('retains only the most recent MAX_CACHED_ARTICLES articles', async () => {
    for (let id = 1; id <= MAX_CACHED_ARTICLES + 5; id++) {
      await cacheFullyReadArticle(id, makeArticle(id));
    }

    const cached = await getCachedArticles();
    expect(cached).toHaveLength(MAX_CACHED_ARTICLES);

    // The five oldest were evicted; the newest survives.
    expect(await isArticleCached(1)).toBe(false);
    expect(await isArticleCached(5)).toBe(false);
    expect(await isArticleCached(MAX_CACHED_ARTICLES + 5)).toBe(true);
  });

  it('moves a re-read article to the front so it survives eviction', async () => {
    for (let id = 1; id <= MAX_CACHED_ARTICLES; id++) {
      await cacheFullyReadArticle(id, makeArticle(id));
    }

    // Finish article 1 again, then push a new one to overflow the cache.
    await cacheFullyReadArticle(1, makeArticle(1));
    await cacheFullyReadArticle(101, makeArticle(101));

    // Article 2 was the least recently finished and is gone; article 1 stays.
    expect(await isArticleCached(1)).toBe(true);
    expect(await isArticleCached(2)).toBe(false);
  });

  it('does not store duplicate entries when an article is re-read', async () => {
    await cacheFullyReadArticle(1, makeArticle(1));
    await cacheFullyReadArticle(1, makeArticle(1, {title: 'Updated'}));

    const cached = await getCachedArticles();
    expect(cached).toHaveLength(1);
    expect(cached[0].article.title).toBe('Updated');
  });

  it('expires articles older than the TTL', async () => {
    await cacheFullyReadArticle(1, makeArticle(1), '<p>Body</p>');

    // Age the entry past the 7-day TTL.
    const aged = readRaw().map((entry: any) => ({
      ...entry,
      cachedAt: Date.now() - CACHE_TTL_MS - 1,
    }));
    store[ARTICLE_CACHE_KEY] = JSON.stringify(aged);

    expect(await getCachedArticle(1)).toBeNull();
    expect(await getCachedArticleContent('rec-1')).toBeNull();
    expect(await isArticleCached(1)).toBe(false);
    expect(await getCachedArticles()).toHaveLength(0);
  });

  it('keeps the stored body when a re-read carries no content', async () => {
    await cacheFullyReadArticle(1, makeArticle(1), '<p>Body</p>');
    await cacheFullyReadArticle(1, makeArticle(1, {title: 'Updated'}));

    // Re-reading refreshes metadata but must not blank the offline body.
    expect(await getCachedArticleContent('rec-1')).toBe('<p>Body</p>');
  });

  it('ignores an article with no id', async () => {
    await cacheFullyReadArticle(0, makeArticle(0));

    expect(await getCachedArticles()).toHaveLength(0);
  });

  it('drops expired entries when the cache is pruned on app unmount', async () => {
    await cacheFullyReadArticle(1, makeArticle(1));
    await cacheFullyReadArticle(2, makeArticle(2));

    // Age only article 1 past the TTL.
    const aged = readRaw().map((entry: any) =>
      entry.articleId === 1
        ? {...entry, cachedAt: Date.now() - CACHE_TTL_MS - 1}
        : entry,
    );
    store[ARTICLE_CACHE_KEY] = JSON.stringify(aged);

    await pruneArticleCache();

    expect(readRaw()).toHaveLength(1);
    expect(readRaw()[0].articleId).toBe(2);
  });

  it('recovers from corrupt cache data instead of throwing', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    store[ARTICLE_CACHE_KEY] = 'not-json';

    expect(await getCachedArticles()).toEqual([]);

    // The cache is usable again after the reset.
    await cacheFullyReadArticle(1, makeArticle(1));
    expect(await isArticleCached(1)).toBe(true);
  });

  it('clears every cached article', async () => {
    await cacheFullyReadArticle(1, makeArticle(1));
    await clearArticleCache();

    expect(await getCachedArticles()).toEqual([]);
  });
});
