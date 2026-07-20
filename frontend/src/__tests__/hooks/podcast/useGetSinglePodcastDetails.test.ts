import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import { useGetSinglePodcastDetails } from '@/src/hooks/podcast/useGetSinglePodcastDetails';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useGetSinglePodcastDetails', () => {
  afterEach(() => jest.clearAllMocks());

  it('fetches podcast details successfully', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {id: 1, title: 'Podcast'},
    });

    const {result} = renderHook(() => useGetSinglePodcastDetails('1'), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.title).toBe('Podcast');
  });

  it('returns null on error', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    const {result} = renderHook(() => useGetSinglePodcastDetails('1'), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
