import axios from 'axios';
import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useGoogleLoginMutation } from '@/src/hooks/auth/useGoogleLogin';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
}

describe('useGoogleLoginMutation', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns user and session token on successful Google authentication', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        user: { id: 101, user_name: 'Google User', email: 'googleuser@example.com' },
        token: 'google_session_jwt_token',
      },
    });

    const { result } = renderHook(() => useGoogleLoginMutation(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate({ idToken: 'valid_google_id_token' });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.user?.user_name).toBe('Google User');
    expect(result.current.data?.token).toBe('google_session_jwt_token');
  });

  it('sets error state on invalid ID token or network failure', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Invalid Google ID Token'));

    const { result } = renderHook(() => useGoogleLoginMutation(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate({ idToken: 'invalid_token' });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe('Invalid Google ID Token');
  });

  it('posts to /auth/google endpoint with idToken and headers', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { user: {} } });

    const { result } = renderHook(() => useGoogleLoginMutation(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate({ idToken: 'test_token_123', fcmToken: 'fcm_456' });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('/auth/google'),
      { idToken: 'test_token_123', fcmToken: 'fcm_456' },
      { headers: { 'x-client-type': 'mobile' } }
    );
  });
});
