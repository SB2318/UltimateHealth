import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {useGetArticleDetails} from '../../../hooks/article/useGetArticleDetail';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useGetArticleDetails', () => {
  afterEach(() => jest.clearAllMocks());

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
