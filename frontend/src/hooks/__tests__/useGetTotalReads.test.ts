import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';

import {useGetTotalReads} from '../useGetTotalReads';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(() => false),
}));

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {retry: false},
    },
  });

  function QueryWrapper({children}: {children: React.ReactNode}) {
    return React.createElement(
      QueryClientProvider,
      {client: queryClient},
      children,
    );
  }

  return QueryWrapper;
}

describe('useGetTotalReads', () => {
  it('renders successfully', () => {
    const {result} = renderHook(
      () =>
        useGetTotalReads({
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
  const {result} = renderHook(
    () =>
      useGetTotalReads({
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
});