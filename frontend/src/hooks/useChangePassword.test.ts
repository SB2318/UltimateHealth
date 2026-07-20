import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {useChangePasswordMutation} from './useChangePassword';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useChangePasswordMutation', () => {
  afterEach(() => jest.clearAllMocks());

  it('resolves on success', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {message: 'Password changed successfully'},
    });

    const {result} = renderHook(() => useChangePasswordMutation(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate({email: 'test@example.com', newPassword: 'newPassword123', resetToken: 'token'});

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.message).toBe('Password changed successfully');
  });

  it('sets error state on network failure', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));

    const {result} = renderHook(() => useChangePasswordMutation(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate({email: 'test@example.com', newPassword: 'newPassword123', resetToken: 'token'});

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it('posts to the correct endpoint', async () => {
    mockedAxios.post.mockResolvedValueOnce({data: {message: 'Success'}});

    const {result} = renderHook(() => useChangePasswordMutation(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate({email: 'test@example.com', newPassword: 'newPassword123', resetToken: 'token'});

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('verifypassword'),
      {email: 'test@example.com', newPassword: 'newPassword123', resetToken: 'token'},
    );
  });
});
