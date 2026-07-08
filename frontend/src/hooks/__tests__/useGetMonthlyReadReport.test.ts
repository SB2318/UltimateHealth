import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { useGetAuthorMonthlyReadReport } from '../useGetMonthlyReadReport';

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

describe('useGetAuthorMonthlyReadReport', () => {
  it('renders successfully', () => {
    const { result } = renderHook(
      () =>
        useGetAuthorMonthlyReadReport({
          user_id: 'user-1',
          selectedMonth: 6,
          isConnected: true,
        }),
      {
        wrapper: makeWrapper(),
      },
    );

    expect(result.current).toBeDefined();
  });

  it('handles selectedMonth = -1', () => {
    const { result } = renderHook(
      () =>
        useGetAuthorMonthlyReadReport({
          user_id: 'user-1',
          selectedMonth: -1,
          isConnected: true,
        }),
      {
        wrapper: makeWrapper(),
      },
    );

    expect(result.current).toBeDefined();
  });
  it('returns monthly read report data', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        monthlyReads: [
          {
            date: '2026-07-01',
            value: 12,
          },
        ],
      },
    });

    const { result } = renderHook(
      () =>
        useGetAuthorMonthlyReadReport({
          user_id: 'user-1',
          selectedMonth: 7,
          isConnected: true,
        }),
      {
        wrapper: makeWrapper(),
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual([
      {
        date: '2026-07-01',
        value: 12,
      },
    ]);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
  it('does not fetch when selectedMonth is -1', () => {
    renderHook(
      () =>
        useGetAuthorMonthlyReadReport({
          user_id: 'user-1',
          selectedMonth: -1,
          isConnected: true,
        }),
      {
        wrapper: makeWrapper(),
      },
    );

    expect(mockedAxios.get).not.toHaveBeenCalled();
  });
});