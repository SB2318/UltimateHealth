import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {useCreatePlaylist} from './useCreatePlaylist';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useCreatePlaylist', () => {
  afterEach(() => jest.clearAllMocks());

  it('creates playlist successfully', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {data: {id: 1, name: 'New List'}},
    });

    const {result} = renderHook(() => useCreatePlaylist(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate({inputValue: 'New List', addedPodcastId: 'p1'});

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.name).toBe('New List');
  });

  it('sets error state on network failure', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));

    const {result} = renderHook(() => useCreatePlaylist(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate({inputValue: 'List', addedPodcastId: 'p2'});

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
