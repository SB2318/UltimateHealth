import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { useGetTotalLikeViewStatus } from '../useGetTotalLikeViewStatus';

import axios from 'axios';
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  mockedAxios.get.mockClear();
});



jest.mock('axios', () => ({
  get: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(() => false),
}));

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  function QueryWrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(
      QueryClientProvider,
      { client: queryClient },
      children,
    );
  }

  return QueryWrapper;
}

describe('useGetTotalLikeViewStatus', () => {
  it('renders successfully', () => {
    const { result } = renderHook(
      () =>
        useGetTotalLikeViewStatus({
          user_id: 'user-1',
          isConnected: true,
        }),
      {
        wrapper: makeWrapper(),
      },
    );

    expect(result.current).toBeDefined();
  });

  it('returns a query result object', async () => {
    const { result } = renderHook(
      () =>
        useGetTotalLikeViewStatus({
          user_id: 'user-1',
          isConnected: true,
        }),
      {
        wrapper: makeWrapper(),
      },
    );

    await waitFor(() => {
      expect(result.current.status).toBeDefined();
    });
  });
  it('returns data from the API', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        totalLikes: 10,
        totalViews: 100,
        likeProgress: 25,
        viewProgress: 50,
      },
    });

    const { result } = renderHook(
      () =>
        useGetTotalLikeViewStatus({
          user_id: 'user-1',
          isConnected: true,
        }),
      { wrapper: makeWrapper() },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual({
      totalLikes: 10,
      totalViews: 100,
      likeProgress: 25,
      viewProgress: 50,
    });

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
  it('does not fetch when disconnected', () => {
    renderHook(
      () =>
        useGetTotalLikeViewStatus({
          user_id: 'user-1',
          isConnected: false,
        }),
      { wrapper: makeWrapper() },
    );

    expect(mockedAxios.get).not.toHaveBeenCalled();
  });
});