import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import React from 'react';
import {useGetArticleDetails} from '@/src/hooks/article/useGetArticleDetail';
import {useGetArticleContent} from '@/src/hooks/article/useGetArticleContent';
import {
  ARTICLE_CACHE_KEY,
  cacheFullyReadArticle,
} from '@/src/lib/storage/ArticleCacheUtils';
import offlineReducer, {
  cacheSessionArticle,
  cacheSessionContent,
} from '@/src/store/offlineSlice';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

/** In-memory AsyncStorage so the device cache is observable within a test. */
let store: Record<string, string> = {};

/**
 * Query clients created during a test. React Query keeps garbage-collection
 * timers per client, so they are cleared in afterEach — otherwise Jest cannot
 * exit and the worker has to be force-killed.
 */
let clients: QueryClient[] = [];

const makeStore = () => configureStore({reducer: {offline: offlineReducer}});

function makeWrapper(reduxStore = makeStore()) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {retry: false, gcTime: 0},
      mutations: {retry: false},
    },
  });
  clients.push(queryClient);

  const wrapper = ({children}: {children: React.ReactNode}) =>
    React.createElement(Provider, {
      store: reduxStore,
      children: React.createElement(
        QueryClientProvider,
        {client: queryClient},
        children,
      ),
    });

  return {wrapper, reduxStore};
}

const article = {
  _id: '1',
  title: 'Managing Hypertension',
  pb_recordId: 'rec-1',
  status: 'published',
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

  it('writes nothing to the device when an article is merely opened', async () => {
    mockedAxios.get.mockResolvedValueOnce({data: {article}});
    const {wrapper, reduxStore} = makeWrapper();

    const {result} = renderHook(() => useGetArticleDetails(1), {wrapper});
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Opening is not reading: storage stays untouched, the copy is in memory.
    expect(store[ARTICLE_CACHE_KEY]).toBeUndefined();
    expect(reduxStore.getState().offline.articles[0].articleId).toBe(1);
  });

  it('keeps an opened article body in memory rather than on the device', async () => {
    mockedAxios.get.mockResolvedValueOnce({data: {htmlContent: '<p>Body</p>'}});
    const {wrapper, reduxStore} = makeWrapper();

    const {result} = renderHook(() => useGetArticleContent('rec-1'), {wrapper});
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(store[ARTICLE_CACHE_KEY]).toBeUndefined();
    expect(reduxStore.getState().offline.contents[0].htmlContent).toBe(
      '<p>Body</p>',
    );
  });

  it('serves an article opened this session when connectivity drops', async () => {
    const reduxStore = makeStore();
    reduxStore.dispatch(cacheSessionArticle({articleId: 1, article}));
    mockedAxios.get.mockRejectedValueOnce(offlineError());

    const {result} = renderHook(() => useGetArticleDetails(1), {
      wrapper: makeWrapper(reduxStore).wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.title).toBe('Managing Hypertension');
  });

  it('serves an article body opened this session when connectivity drops', async () => {
    const reduxStore = makeStore();
    reduxStore.dispatch(
      cacheSessionContent({recordId: 'rec-1', htmlContent: '<p>Body</p>'}),
    );
    mockedAxios.get.mockRejectedValueOnce(offlineError());

    const {result} = renderHook(() => useGetArticleContent('rec-1'), {
      wrapper: makeWrapper(reduxStore).wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBe('<p>Body</p>');
  });

  it('serves a fully read article offline in a later session', async () => {
    // Stored when the reader reached the end; the session cache is empty here,
    // standing in for the app having been closed and reopened.
    await cacheFullyReadArticle(1, article, '<p>Body</p>');
    mockedAxios.get.mockRejectedValueOnce(offlineError());

    const {result} = renderHook(() => useGetArticleDetails(1), {
      wrapper: makeWrapper().wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.title).toBe('Managing Hypertension');
  });

  it('serves a fully read article body offline in a later session', async () => {
    await cacheFullyReadArticle(1, article, '<p>Body</p>');
    mockedAxios.get.mockRejectedValueOnce(offlineError());

    const {result} = renderHook(() => useGetArticleContent('rec-1'), {
      wrapper: makeWrapper().wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBe('<p>Body</p>');
  });

  it('still fails offline for an article that was never read', async () => {
    mockedAxios.get.mockRejectedValueOnce(offlineError());

    const {result} = renderHook(() => useGetArticleDetails(42), {
      wrapper: makeWrapper().wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it('does not mask a server error with stale cached content', async () => {
    await cacheFullyReadArticle(1, article, '<p>Body</p>');
    // A 404 is a real answer — an article removed upstream must not keep
    // rendering from cache, which matters for retracted health content.
    mockedAxios.get.mockRejectedValueOnce({response: {status: 404}});

    const {result} = renderHook(() => useGetArticleDetails(1), {
      wrapper: makeWrapper().wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
