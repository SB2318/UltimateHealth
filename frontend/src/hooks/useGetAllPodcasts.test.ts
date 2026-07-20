import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {useGetAllPodcasts} from './useGetAllPodcasts';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useGetAllPodcasts', () => {
  afterEach(() => jest.clearAllMocks());

  it('fetches all podcasts successfully', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {totalPages: 2, allPodcasts: [{id: 1}]},
    });

    const {result} = renderHook(() => useGetAllPodcasts(true, 1), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.totalPages).toBe(2);
  });

  it('sets error state on network failure', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    const {result} = renderHook(() => useGetAllPodcasts(true, 1), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it('does not fetch if not connected', async () => {
    const {result} = renderHook(() => useGetAllPodcasts(false, 1), {
      wrapper: makeWrapper(),
    });

    expect(result.current.fetchStatus).toBe('idle');
  });
});
