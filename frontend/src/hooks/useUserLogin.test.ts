import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {useLoginMutation} from './useUserLogin';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useLoginMutation', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns user profile data on success', async () => {
    // The hook unwraps: responseData = res.data?.data ?? res.data
    // So mock with a top-level user object (no extra data envelope)
    mockedAxios.post.mockResolvedValueOnce({
      data: {user: {id: 1, user_name: 'Test User', email: 'test@example.com'}},
    });

    const {result} = renderHook(() => useLoginMutation(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate({email: 'test@example.com', password: 'password', fcmToken: 'token'});

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    // The hook returns LoginResponse which has a `user` field, not name at top level
    expect(result.current.data?.user?.user_name).toBe('Test User');
  });

  it('sets error state on network failure', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));

    const {result} = renderHook(() => useLoginMutation(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate({email: 'test@example.com', password: 'password', fcmToken: 'token'});

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it('posts to the correct endpoint with the provided credentials', async () => {
    mockedAxios.post.mockResolvedValueOnce({data: {user: {}}});

    const {result} = renderHook(() => useLoginMutation(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate({email: 'check@example.com', password: 'pass', fcmToken: 'token'});

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // The hook passes a headers object as a third argument to axios.post
    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('login'),
      {email: 'check@example.com', password: 'pass', fcmToken: 'token'},
      {headers: {'x-client-type': 'mobile'}},
    );
  });
});
