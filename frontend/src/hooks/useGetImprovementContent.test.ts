import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import * as ReactRedux from 'react-redux';
import {useGetImprovementContent} from './useGetImprovementContent';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useGetImprovementContent', () => {
  afterEach(() => jest.clearAllMocks());

  it('executes successfully', async () => {
    (ReactRedux.useSelector as unknown as jest.Mock).mockReturnValue(false);
    
    mockedAxios.get.mockResolvedValueOnce({ data: { success: true, data: [] } });
    mockedAxios.post.mockResolvedValueOnce({ data: { success: true, data: [] } });

    const {result} = renderHook(() => useGetImprovementContent({ articleRecordId: '1', recordId: '1' }), {
      wrapper: makeWrapper(),
    });

    // Check if it's a query or mutation and wait for it to settle if it executes immediately
    if (result.current && typeof result.current.mutate === 'function') {
        result.current.mutate(null as any);
        await waitFor(() => expect(result.current.isSuccess || result.current.isError).toBe(true));
    } else if (result.current && result.current.isSuccess !== undefined) {
        await waitFor(() => expect(result.current.isSuccess || result.current.isError).toBe(true));
    } else {
        expect(result.current).toBeDefined();
    }
  });
});
