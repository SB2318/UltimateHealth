import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import { usePostArticleData } from '@/src/hooks/article/usePostArticle';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('usePostArticleData', () => {
  afterEach(() => jest.clearAllMocks());

  const mockPayload = {
    title: 'Test',
    authorName: 'John',
    authorId: '1',
    content: 'Content',
    tags: [],
    imageUtils: [],
    description: 'Desc',
    pb_recordId: 'pb1',
    allow_podcast: false,
    language: 'en',
  };

  it('posts an article successfully', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {newArticle: {id: 1, title: 'Test'}},
    });

    const {result} = renderHook(() => usePostArticleData(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate(mockPayload);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.title).toBe('Test');
  });

  it('sets error state on network failure', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));

    const {result} = renderHook(() => usePostArticleData(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate(mockPayload);

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
