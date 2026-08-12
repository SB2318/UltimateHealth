import AsyncStorage from '@react-native-async-storage/async-storage';
import {act, renderHook, waitFor} from '@testing-library/react-native';
import {useSaveFullyReadArticle} from '@/src/hooks/article/useSaveFullyReadArticle';
import {
  ARTICLE_CACHE_KEY,
  getCachedArticleContent,
  isArticleCached,
} from '@/src/lib/storage/ArticleCacheUtils';
import {StatusEnum} from '@/src/lib/utils/Utils';

/** In-memory AsyncStorage so the device cache is observable within a test. */
let store: Record<string, string> = {};

const makeArticle = (id: number, status = StatusEnum.PUBLISHED) =>
  ({
    _id: String(id),
    title: `Article ${id}`,
    pb_recordId: `rec-${id}`,
    status,
  }) as any;

describe('useSaveFullyReadArticle', () => {
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

  it('stores the article and its body once the reader finishes it', async () => {
    const {result} = renderHook(() =>
      useSaveFullyReadArticle(1, makeArticle(1), '<p>Body</p>'),
    );

    act(() => result.current());

    await waitFor(async () => expect(await isArticleCached(1)).toBe(true));
    expect(await getCachedArticleContent('rec-1')).toBe('<p>Body</p>');
  });

  it('writes once however many bottom-of-page events arrive', async () => {
    const {result} = renderHook(() =>
      useSaveFullyReadArticle(1, makeArticle(1), '<p>Body</p>'),
    );

    act(() => {
      result.current();
      result.current();
      result.current();
    });

    await waitFor(async () => expect(await isArticleCached(1)).toBe(true));
    expect(
      (AsyncStorage.setItem as jest.Mock).mock.calls.filter(
        ([key]) => key === ARTICLE_CACHE_KEY,
      ),
    ).toHaveLength(1);
  });

  it('does not store an article that is not published', async () => {
    const {result} = renderHook(() =>
      useSaveFullyReadArticle(
        1,
        makeArticle(1, StatusEnum.REVIEW_PENDING),
        '<p>Draft</p>',
      ),
    );

    act(() => result.current());

    expect(store[ARTICLE_CACHE_KEY]).toBeUndefined();
  });

  it('does nothing while the article is still loading', async () => {
    const {result} = renderHook(() => useSaveFullyReadArticle(1, undefined));

    act(() => result.current());

    expect(store[ARTICLE_CACHE_KEY]).toBeUndefined();
  });

  it('stores the next article when the reader moves on and finishes it', async () => {
    const {result, rerender} = renderHook(
      ({id}: {id: number}) =>
        useSaveFullyReadArticle(id, makeArticle(id), '<p>Body</p>'),
      {initialProps: {id: 1}},
    );

    act(() => result.current());
    await waitFor(async () => expect(await isArticleCached(1)).toBe(true));

    rerender({id: 2});
    act(() => result.current());

    await waitFor(async () => expect(await isArticleCached(2)).toBe(true));
  });
});
