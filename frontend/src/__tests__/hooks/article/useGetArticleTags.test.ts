import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import { useGetCategories } from '@/src/hooks/article/useGetArticleTags';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useGetCategories', () => {
  afterEach(() => jest.clearAllMocks());

  it('fetches categories successfully', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [{id: 1, name: 'Health'}],
    });

    const {result} = renderHook(() => useGetCategories(true), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.length).toBe(1);
    expect(result.current.data?.[0].name).toBe('Health');
  });

  it('sets error state on network failure', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    const {result} = renderHook(() => useGetCategories(true), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it('does not fetch if not connected', async () => {
    const {result} = renderHook(() => useGetCategories(false), {
      wrapper: makeWrapper(),
    });

    expect(result.current.fetchStatus).toBe('idle');
  });
});
