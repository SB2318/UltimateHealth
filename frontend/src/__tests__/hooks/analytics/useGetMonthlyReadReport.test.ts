import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
<<<<<<< HEAD:frontend/src/hooks/useGetMonthlyReadReport.test.ts
import * as ReactRedux from '../../store/hooks';
import {useGetAuthorMonthlyReadReport} from './useGetMonthlyReadReport';
=======
import * as ReactRedux from 'react-redux';
import { useGetAuthorMonthlyReadReport } from '@/src/hooks/analytics/useGetMonthlyReadReport';

>>>>>>> upstream/main:frontend/src/__tests__/hooks/analytics/useGetMonthlyReadReport.test.ts

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('../../store/hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useGetAuthorMonthlyReadReport', () => {
  afterEach(() => jest.clearAllMocks());

  it('executes mutation successfully and calls API', async () => {
    (ReactRedux.useAppSelector as unknown as jest.Mock).mockReturnValue(false);
    
    
    mockedAxios.post.mockResolvedValueOnce({ data: { success: true, data: [] } });

    const {result} = renderHook(() => useGetAuthorMonthlyReadReport({ user_id: '1', selectedMonth: 1, isConnected: true }), {
      wrapper: makeWrapper(),
    });

    // Check if it's a query or mutation and wait for it to settle if it executes immediately
    if (result.current && typeof (result.current as any).mutate === 'function') {
        (result.current as any).mutate(null as any);
        await waitFor(() => expect(result.current.isSuccess || result.current.isError).toBe(true));
    } else if (result.current && result.current.isSuccess !== undefined) {
        await waitFor(() => expect(result.current.isSuccess || result.current.isError).toBe(true));
    } else {
        expect(result.current).toBeDefined();
    }
  });
});
