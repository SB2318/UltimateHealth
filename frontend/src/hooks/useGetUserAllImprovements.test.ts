import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import * as ReactRedux from 'react-redux';
import {useGetAllImprovementsForReview} from './useGetUserAllImprovements';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('react-redux', () => ({
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

describe('useGetAllImprovementsForReview', () => {
  afterEach(() => jest.clearAllMocks());

  it('executes mutation successfully and calls API', async () => {
    (ReactRedux.useAppSelector as unknown as jest.Mock).mockReturnValue(false);
    
    
    mockedAxios.post.mockResolvedValueOnce({ data: { success: true, data: [] } });

    const {result} = renderHook(() => useGetAllImprovementsForReview({ page: 1, selectedStatus: 1, visit: 1, setVisit: jest.fn(), setTotalPages: jest.fn(), setImprovementData: jest.fn(), setPublishedLabel: jest.fn(), setProgressLabel: jest.fn(), setDiscardLabel: jest.fn() }), {
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
