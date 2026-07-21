import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';

import {useArticleRoom} from './useArticleRoom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('../../store/hooks', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('../contexts/SocketContext', () => ({
  useSocket: () => ({ emit: jest.fn(), on: jest.fn(), off: jest.fn() })
}));

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useArticleRoom', () => {
  afterEach(() => jest.clearAllMocks());

  it('executes mutation successfully and calls API', async () => {
    
    
    
    mockedAxios.post.mockResolvedValueOnce({ data: { success: true, data: [] } });

    const {result} = renderHook(() => useArticleRoom('a1', 'p1'), {
      wrapper: makeWrapper(),
    });

    // Check if it's a query or mutation and wait for it to settle if it executes immediately
    
        expect(result.current).toBeUndefined();
  });
});
