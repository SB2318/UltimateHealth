import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import { useRequestVerification } from '@/src/hooks/auth/useResendVerification';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useRequestVerification', () => {
  afterEach(() => jest.clearAllMocks());

  it('resolves with success message', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {message: 'Verification email resent'},
    });

    const {result} = renderHook(() => useRequestVerification(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate({email: 'test@example.com'});

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBe('Verification email resent');
  });

  it('sets error state on network failure', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));

    const {result} = renderHook(() => useRequestVerification(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate({email: 'test@example.com'});

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it('posts to the correct endpoint', async () => {
    mockedAxios.post.mockResolvedValueOnce({data: {message: 'Success'}});

    const {result} = renderHook(() => useRequestVerification(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate({email: 'test@example.com'});

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('resend-verification-mail'),
      {email: 'test@example.com'},
    );
  });
});
