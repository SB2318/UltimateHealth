import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {useUpdatePlaylist} from './useUpdatePlaylist';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useUpdatePlaylist', () => {
  afterEach(() => jest.clearAllMocks());

  it('adds podcast to playlist successfully', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {data: {_id: 1, title: 'List'}},
    });

    const {result} = renderHook(() => useUpdatePlaylist(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate({addedPodcastId: 'p1', selectedPlaylistId: 'l1'});

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?._id).toBe(1);
  });

  it('sets error state on network failure', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));

    const {result} = renderHook(() => useUpdatePlaylist(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate({addedPodcastId: 'p1', selectedPlaylistId: 'l1'});

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
