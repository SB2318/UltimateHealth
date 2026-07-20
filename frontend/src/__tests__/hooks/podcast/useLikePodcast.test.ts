import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import * as ReactRedux from 'react-redux';
import { useLikePodcast } from '@/src/hooks/podcast/useLikePodcast';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useLikePodcast', () => {
  afterEach(() => jest.clearAllMocks());

  it('likes a podcast successfully when not guest', async () => {
    (ReactRedux.useSelector as unknown as jest.Mock).mockReturnValue(false);

    mockedAxios.post.mockResolvedValueOnce({
      data: {likeStatus: true},
    });

    const {result} = renderHook(() => useLikePodcast(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate('p1');

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.likeStatus).toBe(true);
  });

  it('fails if user is a guest', async () => {
    (ReactRedux.useSelector as unknown as jest.Mock).mockReturnValue(true);

    const {result} = renderHook(() => useLikePodcast(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate('p1');

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe('Guest cannot like podcasts');
  });

  it('posts to the correct endpoint', async () => {
    (ReactRedux.useSelector as unknown as jest.Mock).mockReturnValue(false);

    mockedAxios.post.mockResolvedValueOnce({
      data: {likeStatus: true},
    });

    const {result} = renderHook(() => useLikePodcast(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate('p2');

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('like'),
      {podcast_id: 'p2'},
    );
  });
});
