import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ARTICLE_CACHE_KEY,
  CACHE_TTL_MS,
  MAX_CACHED_ARTICLES,
  cacheArticleContent,
  cacheArticleDetail,
  clearArticleCache,
  getCachedArticle,
  getCachedArticleContent,
  getCachedArticles,
  isArticleCached,
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

  it('caches a viewed article and reads it back', async () => {
    await cacheArticleDetail(1, makeArticle(1));

    const cached = await getCachedArticle(1);
    expect(cached?.article.title).toBe('Article 1');
    expect(await isArticleCached(1)).toBe(true);
    expect(await isArticleCached(999)).toBe(false);
  });

  it('retains only the most recent MAX_CACHED_ARTICLES articles', async () => {
    for (let id = 1; id <= MAX_CACHED_ARTICLES + 5; id++) {
      await cacheArticleDetail(id, makeArticle(id));
    }

    const cached = await getCachedArticles();
    expect(cached).toHaveLength(MAX_CACHED_ARTICLES);

    // The five oldest were evicted; the newest survives.
    expect(await isArticleCached(1)).toBe(false);
    expect(await isArticleCached(5)).toBe(false);
    expect(await isArticleCached(MAX_CACHED_ARTICLES + 5)).toBe(true);
  });

  it('moves a re-viewed article to the front so it survives eviction', async () => {
    await cacheArticleDetail(1, makeArticle(1));
    for (let id = 2; id <= MAX_CACHED_ARTICLES; id++) {
      await cacheArticleDetail(id, makeArticle(id));
    }

    // Re-open article 1, then push enough new articles to overflow the cache.
    await cacheArticleDetail(1, makeArticle(1));
    await cacheArticleDetail(101, makeArticle(101));

    // Article 2 was the least recently viewed and is gone; article 1 remains.
    expect(await isArticleCached(1)).toBe(true);
    expect(await isArticleCached(2)).toBe(false);
  });

  it('does not store duplicate entries when an article is re-viewed', async () => {
    await cacheArticleDetail(1, makeArticle(1));
    await cacheArticleDetail(1, makeArticle(1, {title: 'Updated'}));

    const cached = await getCachedArticles();
    expect(cached).toHaveLength(1);
    expect(cached[0].article.title).toBe('Updated');
  });

  it('expires articles older than the TTL', async () => {
    await cacheArticleDetail(1, makeArticle(1));

    // Age the entry past the 7-day TTL.
    const aged = readRaw().map((entry: any) => ({
      ...entry,
      cachedAt: Date.now() - CACHE_TTL_MS - 1,
    }));
    store[ARTICLE_CACHE_KEY] = JSON.stringify(aged);

    expect(await getCachedArticle(1)).toBeNull();
    expect(await isArticleCached(1)).toBe(false);
    expect(await getCachedArticles()).toHaveLength(0);
  });

  it('attaches article content to the cached entry by record id', async () => {
    await cacheArticleDetail(1, makeArticle(1));
    await cacheArticleContent('rec-1', '<p>Body</p>');

    expect(await getCachedArticleContent('rec-1')).toBe('<p>Body</p>');
  });

  it('preserves cached content when the article is re-viewed', async () => {
    await cacheArticleDetail(1, makeArticle(1));
    await cacheArticleContent('rec-1', '<p>Body</p>');
    await cacheArticleDetail(1, makeArticle(1, {title: 'Updated'}));

    // Re-viewing refreshes metadata but must not discard the offline body.
    expect(await getCachedArticleContent('rec-1')).toBe('<p>Body</p>');
  });

  it('ignores content for an article that is not cached', async () => {
    await cacheArticleContent('rec-unknown', '<p>Orphan</p>');

    expect(await getCachedArticleContent('rec-unknown')).toBeNull();
    expect(await getCachedArticles()).toHaveLength(0);
  });

  it('recovers from corrupt cache data instead of throwing', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    store[ARTICLE_CACHE_KEY] = 'not-json';

    expect(await getCachedArticles()).toEqual([]);

    // The cache is usable again after the reset.
    await cacheArticleDetail(1, makeArticle(1));
    expect(await isArticleCached(1)).toBe(true);
  });

  it('clears every cached article', async () => {
    await cacheArticleDetail(1, makeArticle(1));
    await clearArticleCache();

    expect(await getCachedArticles()).toEqual([]);
  });
});
