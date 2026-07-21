import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import { useGetPaginatedArticle } from '@/src/hooks/article/useGetPaginatedArticles';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useGetPaginatedArticle', () => {
  afterEach(() => jest.clearAllMocks());

  it('fetches paginated articles successfully', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {articles: [{id: 1}], totalPages: 5},
    });

    const {result} = renderHook(() => useGetPaginatedArticle(true, 1), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.totalPages).toBe(5);
  });

  it('returns null on catch', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    const {result} = renderHook(() => useGetPaginatedArticle(true, 1), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true)); // Try/catch inside queryFn
    expect(result.current.data).toBeNull();
  });

  it('does not fetch if not connected', async () => {
    const {result} = renderHook(() => useGetPaginatedArticle(false, 1), {
      wrapper: makeWrapper(),
    });

    expect(result.current.fetchStatus).toBe('idle');
  });
});
