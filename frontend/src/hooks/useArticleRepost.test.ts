import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import * as ReactRedux from '../../store/hooks';
import {useRepostArticle} from './useArticleRepost';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('../../store/hooks', () => ({
  useAppSelector: jest.fn(),
}));

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useRepostArticle', () => {
  afterEach(() => jest.clearAllMocks());

  it('reposts an article successfully when not guest', async () => {
    (ReactRedux.useAppSelector as unknown as jest.Mock).mockReturnValue(false);

    mockedAxios.post.mockResolvedValueOnce({
      data: {message: 'Reposted'},
    });

    const {result} = renderHook(() => useRepostArticle(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate(1);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.message).toBe('Reposted');
  });

  it('fails if user is a guest', async () => {
    (ReactRedux.useAppSelector as unknown as jest.Mock).mockReturnValue(true);

    const {result} = renderHook(() => useRepostArticle(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate(1);

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe('Guest cannot repost articles');
  });

  it('posts to the correct endpoint', async () => {
    (ReactRedux.useAppSelector as unknown as jest.Mock).mockReturnValue(false);

    mockedAxios.post.mockResolvedValueOnce({
      data: {message: 'Reposted'},
    });

    const {result} = renderHook(() => useRepostArticle(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate(2);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('repost'), 
      {articleId: 2},
    );
  });
});
