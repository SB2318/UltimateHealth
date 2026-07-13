import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import * as ReactRedux from 'react-redux';
import {useGetPlaylists} from './useGetPlaylists';

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

describe('useGetPlaylists', () => {
  afterEach(() => jest.clearAllMocks());

  it('fetches playlists successfully when not guest', async () => {
    (ReactRedux.useSelector as unknown as jest.Mock).mockReturnValue(false);

    mockedAxios.get.mockResolvedValueOnce({
      data: [{id: 1, name: 'My List'}],
    });

    const {result} = renderHook(() => useGetPlaylists(), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.[0].name).toBe('My List');
  });

  it('does not fetch if user is a guest', async () => {
    (ReactRedux.useSelector as unknown as jest.Mock).mockReturnValue(true);

    const {result} = renderHook(() => useGetPlaylists(), {
      wrapper: makeWrapper(),
    });

    expect(result.current.fetchStatus).toBe('idle');
  });
});
