import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {useUpdatePassword} from './useUpdatePassword';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useUpdatePassword', () => {
  afterEach(() => jest.clearAllMocks());

  it('resolves on success', async () => {
    mockedAxios.put.mockResolvedValueOnce({
      data: {message: 'Password updated'},
    });

    const {result} = renderHook(() => useUpdatePassword(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate({old_password: 'oldPassword', new_password: 'newPassword'});

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.message).toBe('Password updated');
  });

  it('sets error state on network failure', async () => {
    mockedAxios.put.mockRejectedValueOnce(new Error('Network Error'));

    const {result} = renderHook(() => useUpdatePassword(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate({old_password: 'oldPassword', new_password: 'newPassword'});

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it('puts to the correct endpoint', async () => {
    mockedAxios.put.mockResolvedValueOnce({data: {message: 'Success'}});

    const {result} = renderHook(() => useUpdatePassword(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate({old_password: 'oldPassword', new_password: 'newPassword'});

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedAxios.put).toHaveBeenCalledWith(
      expect.stringContaining('update-password'),
      {old_password: 'oldPassword', new_password: 'newPassword'},
    );
  });
});
