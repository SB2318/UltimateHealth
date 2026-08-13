import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import React from 'react';
import { useGetArticleContent } from '@/src/hooks/article/useGetArticleContent';
import offlineReducer from '@/src/store/offlineSlice';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

/** Query clients created during a test, cleared afterwards to free timers. */
let clients: QueryClient[] = [];

// The hook keeps the opened body in the session cache, so it needs a store.
function makeWrapper() {
  // gcTime 0: React Query's default five-minute garbage-collection timer
  // outlives the test and keeps the Jest worker from exiting.
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {retry: false, gcTime: 0},
      mutations: {retry: false},
    },
  });
  clients.push(queryClient);
  const store = configureStore({reducer: {offline: offlineReducer}});
  return ({children}: {children: React.ReactNode}) => (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
}

describe('useGetArticleContent', () => {
  afterEach(() => {
    jest.clearAllMocks();
    clients.forEach(client => client.clear());
    clients = [];
  });

  it('fetches article content successfully', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {htmlContent: '<p>Content</p>'},
    });

    const {result} = renderHook(() => useGetArticleContent('rec1'), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBe('<p>Content</p>');
  });

  it('sets error state on network failure', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    const {result} = renderHook(() => useGetArticleContent('rec1'), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it('does not fetch if recordId is missing', async () => {
    const {result} = renderHook(() => useGetArticleContent(undefined), {
      wrapper: makeWrapper(),
    });

    expect(result.current.fetchStatus).toBe('idle');
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });
});
