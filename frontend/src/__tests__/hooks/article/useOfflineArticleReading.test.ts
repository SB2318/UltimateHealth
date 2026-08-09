import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {useGetArticleDetails} from '@/src/hooks/article/useGetArticleDetail';
import {useGetArticleContent} from '@/src/hooks/article/useGetArticleContent';
import {
  cacheArticleContent,
  cacheArticleDetail,
} from '@/src/lib/storage/ArticleCacheUtils';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

/** In-memory AsyncStorage so the cache persists across hooks within a test. */
let store: Record<string, string> = {};

/**
 * Query clients created during a test. React Query keeps garbage-collection
 * timers per client, so they are cleared in afterEach — otherwise Jest cannot
 * exit and the worker has to be force-killed.
 */
let clients: QueryClient[] = [];

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {retry: false, gcTime: 0},
      mutations: {retry: false},
    },
  });
  clients.push(queryClient);
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

const article = {
  _id: '1',
  title: 'Managing Hypertension',
  pb_recordId: 'rec-1',
} as any;

/** Axios reports a connectivity failure as an error carrying no `response`. */
const offlineError = () => Object.assign(new Error('Network Error'), {
  code: 'ERR_NETWORK',
  request: {},
});

describe('offline article reading', () => {
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

  it('caches an article automatically when it is viewed online', async () => {
    mockedAxios.get.mockResolvedValueOnce({data: {article}});

    const {result} = renderHook(() => useGetArticleDetails(1), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Cached as a side effect of viewing — no explicit "save" needed.
    expect(store.OFFLINE_ARTICLE_CACHE).toBeDefined();
    expect(JSON.parse(store.OFFLINE_ARTICLE_CACHE)[0].articleId).toBe(1);
  });

  it('serves a previously viewed article when the device is offline', async () => {
    await cacheArticleDetail(1, article);
    mockedAxios.get.mockRejectedValueOnce(offlineError());

    const {result} = renderHook(() => useGetArticleDetails(1), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.title).toBe('Managing Hypertension');
  });

  it('serves cached article body when the device is offline', async () => {
    await cacheArticleDetail(1, article);
    await cacheArticleContent('rec-1', '<p>Body</p>');
    mockedAxios.get.mockRejectedValueOnce(offlineError());

    const {result} = renderHook(() => useGetArticleContent('rec-1'), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBe('<p>Body</p>');
  });

  it('still fails offline when the article was never viewed', async () => {
    mockedAxios.get.mockRejectedValueOnce(offlineError());

    const {result} = renderHook(() => useGetArticleDetails(42), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it('does not mask a server error with stale cached content', async () => {
    await cacheArticleDetail(1, article);
    // A 404 is a real answer — an article removed upstream must not keep
    // rendering from cache, which matters for retracted health content.
    mockedAxios.get.mockRejectedValueOnce({response: {status: 404}});

    const {result} = renderHook(() => useGetArticleDetails(1), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
