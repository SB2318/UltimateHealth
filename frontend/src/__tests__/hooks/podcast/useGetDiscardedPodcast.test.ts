import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import { useGetDiscardedPodcasts } from '@/src/hooks/podcast/useGetDiscardedPodcast';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useGetDiscardedPodcasts', () => {
  afterEach(() => jest.clearAllMocks());

  it('fetches discarded podcasts successfully', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {totalPages: 1, discardedPodcasts: []},
    });

    const {result} = renderHook(() => useGetDiscardedPodcasts(1, true), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.totalPages).toBe(1);
  });

  it('sets error state on network failure', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    const {result} = renderHook(() => useGetDiscardedPodcasts(1, true), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
