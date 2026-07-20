import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { useGetAuthorYearlyReadReport } from '../useGetYearlyReadReport';

import axios from 'axios';

const mockedAxios = axios as unknown as jest.Mocked<typeof axios>;

beforeEach(() => {
  mockedAxios.get.mockClear();
});

jest.mock('axios', () => ({
  get: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useAppSelector: jest.fn(() => false),
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

describe('useGetAuthorYearlyReadReport', () => {
  it('renders successfully', () => {
    const { result } = renderHook(
      () =>
        useGetAuthorYearlyReadReport({
          user_id: 'user-1',
          selectedYear: 2023,
          isConnected: true,
        }),
      {
        wrapper: makeWrapper(),
      },
    );

    expect(result.current).toBeDefined();
  });

  it('handles selectedYear = -1', () => {
    const { result } = renderHook(
      () =>
        useGetAuthorYearlyReadReport({
          user_id: 'user-1',
          selectedYear: -1,
          isConnected: true,
        }),
      {
        wrapper: makeWrapper(),
      },
    );

    expect(result.current).toBeDefined();
  });
  it('returns yearly read report data', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        yearlyReads: [
          {
            month: 'January',
            value: 25,
          },
        ],
      },
    });

    const { result } = renderHook(
      () =>
        useGetAuthorYearlyReadReport({
          user_id: 'user-1',
          selectedYear: 2026,
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
        month: 'January',
        value: 25,
      },
    ]);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
  it('does not fetch when selectedYear is -1', () => {
    renderHook(
      () =>
        useGetAuthorYearlyReadReport({
          user_id: 'user-1',
          selectedYear: -1,
          isConnected: true,
        }),
      {
        wrapper: makeWrapper(),
      },
    );

    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  it('does not fetch when disconnected', () => {
    renderHook(
      () =>
        useGetAuthorYearlyReadReport({
          user_id: 'user-1',
          selectedYear: 2026,
          isConnected: false,
        }),
      {
        wrapper: makeWrapper(),
      },
    );

    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

});