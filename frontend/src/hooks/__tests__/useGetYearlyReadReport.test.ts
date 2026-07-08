import {renderHook} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';

import {useGetAuthorYearlyReadReport} from '../useGetYearlyReadReport';

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

describe('useGetAuthorYearlyReadReport', () => {
  it('renders successfully', () => {
    const {result} = renderHook(
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
    const {result} = renderHook(
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
});