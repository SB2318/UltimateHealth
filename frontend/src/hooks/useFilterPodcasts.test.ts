import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {useFilterPodcasts} from './useFilterPodcasts';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useFilterPodcasts', () => {
  afterEach(() => jest.clearAllMocks());

  it('filters podcasts successfully', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: [{id: 1, title: 'Filtered Podcast'}],
    });

    const {result} = renderHook(() => useFilterPodcasts(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate({selectedCategoryList: [], sortingType: 'oldest'});

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.[0].title).toBe('Filtered Podcast');
  });

  it('sets error state on network failure', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));

    const {result} = renderHook(() => useFilterPodcasts(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate({selectedCategoryList: [], sortingType: 'newest'});

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
