import AsyncStorage from '@react-native-async-storage/async-storage';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {useIsArticleCached} from '@/src/hooks/article/useIsArticleCached';
import {
  ARTICLE_CACHE_KEY,
  cacheFullyReadArticle,
} from '@/src/lib/storage/ArticleCacheUtils';

/** In-memory AsyncStorage so reads of the cache are countable. */
let store: Record<string, string> = {};

/** Query clients created during a test, cleared afterwards to free timers. */
let clients: QueryClient[] = [];

const article = {
  _id: '1',
  title: 'Managing Hypertension',
  pb_recordId: 'rec-1',
  status: 'published',
} as any;

/** One provider shared by every hook, as a list shares one for its cards. */
function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {retry: false, gcTime: 0},
      mutations: {retry: false},
    },
  });
  clients.push(queryClient);

  return ({children}: {children: React.ReactNode}) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

const cacheReadCount = () =>
  (AsyncStorage.getItem as jest.Mock).mock.calls.filter(
    ([key]) => key === ARTICLE_CACHE_KEY,
  ).length;

describe('useIsArticleCached', () => {
  afterEach(() => {
    clients.forEach(client => client.clear());
    clients = [];

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

  it('reports an article the reader finished as available offline', async () => {
    await cacheFullyReadArticle(1, article, '<p>Body</p>');

    const {result} = renderHook(() => useIsArticleCached(1), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current).toBe(true));
  });

  it('reports an article that was never finished as unavailable', async () => {
    await cacheFullyReadArticle(1, article, '<p>Body</p>');

    const {result} = renderHook(() => useIsArticleCached(42), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current).toBe(false));
  });

  it('reads the cache once however many cards ask', async () => {
    await cacheFullyReadArticle(1, article, '<p>Body</p>');
    const wrapper = makeWrapper();
    jest.clearAllMocks();

    // Standing in for a list of cards mounting together: the answer lives in
    // one AsyncStorage entry holding article bodies, so reading it per card
    // would parse that payload once per card.
    const {result} = renderHook(
      () => [
        useIsArticleCached(1),
        useIsArticleCached(2),
        useIsArticleCached(3),
        useIsArticleCached(4),
      ],
      {wrapper},
    );

    await waitFor(() => expect(result.current[0]).toBe(true));
    expect(cacheReadCount()).toBe(1);
  });

  it('returns false without reading storage when there is no article id', async () => {
    const {result} = renderHook(() => useIsArticleCached(undefined), {
      wrapper: makeWrapper(),
    });

    expect(result.current).toBe(false);
  });
});
