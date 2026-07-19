import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {useGetUserPublishedPodcasts} from './useGetUserPublishedPodcasts';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useGetUserPublishedPodcasts', () => {
  afterEach(() => jest.clearAllMocks());

  it('fetches published podcasts successfully', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {totalPages: 2, publishedPodcasts: []},
    });

    const {result} = renderHook(() => useGetUserPublishedPodcasts(1, 1), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.totalPages).toBe(2);
  });

  it('returns null on catch', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    const {result} = renderHook(() => useGetUserPublishedPodcasts(1, 1), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeNull();
  });
});
