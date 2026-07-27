import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import { useGetArticleContent } from '@/src/hooks/article/useGetArticleContent';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useGetArticleContent', () => {
  afterEach(() => jest.clearAllMocks());

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
