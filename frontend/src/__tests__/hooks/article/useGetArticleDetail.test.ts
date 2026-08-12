import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import React from 'react';
import {useGetArticleDetails} from '../../../hooks/article/useGetArticleDetail';
import offlineReducer from '../../../store/offlineSlice';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

/** Query clients created during a test, cleared afterwards to free timers. */
let clients: QueryClient[] = [];

// The hook keeps the opened article in the session cache, so it needs a store.
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
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(Provider, {
      store,
      children: React.createElement(
        QueryClientProvider,
        {client: queryClient},
        children,
      ),
    });
}

describe('useGetArticleDetails', () => {
  afterEach(() => {
    jest.clearAllMocks();
    clients.forEach(client => client.clear());
    clients = [];
  });

  it('fetches article details successfully', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {article: {id: 1, title: 'Test Article'}},
    });

    const {result} = renderHook(() => useGetArticleDetails(1), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.title).toBe('Test Article');
  });

  it('sets error state on network failure', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    const {result} = renderHook(() => useGetArticleDetails(1), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it('calls the correct endpoint', async () => {
    mockedAxios.get.mockResolvedValueOnce({data: {article: {}}});

    const {result} = renderHook(() => useGetArticleDetails(1), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('1'),
    );
  });
});
