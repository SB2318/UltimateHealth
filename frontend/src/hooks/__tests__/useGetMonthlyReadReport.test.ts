import {renderHook} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';

import {useGetAuthorMonthlyReadReport} from '../useGetMonthlyReadReport';

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

describe('useGetAuthorMonthlyReadReport', () => {
  it('renders successfully', () => {
    const {result} = renderHook(
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
    const {result} = renderHook(
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
});