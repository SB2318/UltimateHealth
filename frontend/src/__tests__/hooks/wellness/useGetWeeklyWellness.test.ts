import authAxios from '../../../lib/api/authAxios';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {useGetWeeklyWellness} from '@/src/hooks/wellness/useGetWeeklyWellness';

jest.mock('../../../lib/api/authAxios');
const mockedAuthAxios = authAxios as jest.Mocked<typeof authAxios>;

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useGetWeeklyWellness', () => {
  afterEach(() => jest.clearAllMocks());

  it('fetches weekly wellness logs successfully', async () => {
    const mockLog = {
      userId: 'u1',
      date: '2026-08-06',
      metrics: {steps: 8450, waterMl: 1800},
    };
    mockedAuthAxios.get.mockResolvedValueOnce({
      data: {success: true, data: [mockLog]},
    });

    const {result} = renderHook(() => useGetWeeklyWellness(true), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([mockLog]);
  });

  it('defaults to an empty array when the envelope has no data', async () => {
    mockedAuthAxios.get.mockResolvedValueOnce({
      data: {success: true, data: undefined},
    });

    const {result} = renderHook(() => useGetWeeklyWellness(true), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([]);
  });

  it('sets error state on network failure', async () => {
    mockedAuthAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    const {result} = renderHook(() => useGetWeeklyWellness(true), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it('does not fetch if not connected', async () => {
    const {result} = renderHook(() => useGetWeeklyWellness(false), {
      wrapper: makeWrapper(),
    });

    expect(result.current.fetchStatus).toBe('idle');
  });
});
