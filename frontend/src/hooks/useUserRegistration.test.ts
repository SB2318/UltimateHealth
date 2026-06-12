import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {useRegdMutation} from './useUserRegistration';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useRegdMutation', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns token on success', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {token: 'dummy-token'},
    });

    const {result} = renderHook(() => useRegdMutation(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate({
      user_name: 'Test',
      user_handle: 'test_user',
      email: 'test@example.com',
      password: 'password123',
      isDoctor: false,
      Profile_image: null,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBe('dummy-token');
  });

  it('sets error state on network failure', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));

    const {result} = renderHook(() => useRegdMutation(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate({
      user_name: 'Test',
      user_handle: 'test_user',
      email: 'test@example.com',
      password: 'password123',
      isDoctor: false,
      Profile_image: null,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it('posts to the correct endpoint', async () => {
    mockedAxios.post.mockResolvedValueOnce({data: {token: 'dummy-token'}});

    const {result} = renderHook(() => useRegdMutation(), {
      wrapper: makeWrapper(),
    });

    const reqData = {
      user_name: 'Test',
      user_handle: 'test_user',
      email: 'test@example.com',
      password: 'password123',
      isDoctor: false,
      Profile_image: null,
    };

    result.current.mutate(reqData);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('register'),
      reqData,
    );
  });
});
