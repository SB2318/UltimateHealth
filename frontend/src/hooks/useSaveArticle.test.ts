import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {useSaveArticle} from './useSaveArticle';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useSaveArticle', () => {
  afterEach(() => jest.clearAllMocks());

  it('saves an article successfully', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {message: 'Saved'},
    });

    const {result} = renderHook(() => useSaveArticle(1), {
      wrapper: makeWrapper(),
    });

    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.message).toBe('Saved');
  });

  it('sets error state on network failure', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));

    const {result} = renderHook(() => useSaveArticle(1), {
      wrapper: makeWrapper(),
    });

    result.current.mutate();

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it('posts to the correct endpoint', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {message: 'Saved'},
    });

    const {result} = renderHook(() => useSaveArticle(3), {
      wrapper: makeWrapper(),
    });

    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('saveArticle'), 
      {article_id: 3},
    );
  });
});
