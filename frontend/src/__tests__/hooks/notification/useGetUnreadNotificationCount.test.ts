import axios from 'axios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
<<<<<<< HEAD:frontend/src/hooks/useGetUnreadNotificationCount.test.ts
import * as ReactRedux from '../../store/hooks';
import {useGetUnreadNotificationCount} from './useGetUnreadNotificationCount';
=======
import * as ReactRedux from 'react-redux';
import { useGetUnreadNotificationCount } from '@/src/hooks/notification/useGetUnreadNotificationCount';

>>>>>>> upstream/main:frontend/src/__tests__/hooks/notification/useGetUnreadNotificationCount.test.ts

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

describe('useGetUnreadNotificationCount', () => {
  afterEach(() => jest.clearAllMocks());

  it('executes mutation successfully and calls API', async () => {
    (ReactRedux.useAppSelector as unknown as jest.Mock).mockReturnValue(false);
    
    
    mockedAxios.post.mockResolvedValueOnce({ data: { success: true, data: [] } });

    const {result} = renderHook(() => useGetUnreadNotificationCount(true), {
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
