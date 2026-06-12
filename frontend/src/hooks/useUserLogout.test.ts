import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {useUserLogout} from './useUserLogout';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useUserLogout', () => {
  afterEach(() => jest.clearAllMocks());

  it('resolves on success', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {message: 'Logout successful'},
    });

    const {result} = renderHook(() => useUserLogout(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.message).toBe('Logout successful');
  });

  it('sets error state on network failure', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));

    const {result} = renderHook(() => useUserLogout(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate();

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it('posts to the correct endpoint', async () => {
    mockedAxios.post.mockResolvedValueOnce({data: {}});

    const {result} = renderHook(() => useUserLogout(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('logout'),
      {},
    );
  });
});
