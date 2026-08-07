import authAxios from '../../../lib/api/authAxios';
import {LOG_WELLNESS_API} from '../../../lib/api/APIUtils';
import {renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {useLogWellness} from '@/src/hooks/wellness/useLogWellness';
import {WellnessLogPayload} from '@/src/schemas/type';

jest.mock('../../../lib/api/authAxios');
const mockedAuthAxios = authAxios as jest.Mocked<typeof authAxios>;

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
  });
  return ({children}: {children: React.ReactNode}) =>
    React.createElement(QueryClientProvider, {client: queryClient}, children);
}

describe('useLogWellness', () => {
  const validPayload: WellnessLogPayload = {
    date: '2026-08-07',
    metrics: {steps: 5000},
  };
  const mockLog = {
    userId: 'u1',
    date: '2026-08-07',
    metrics: {steps: 5000},
  };

  afterEach(() => jest.clearAllMocks());

  it('posts a valid payload and resolves successfully', async () => {
    mockedAuthAxios.post.mockResolvedValueOnce({
      data: {success: true, data: mockLog},
    });

    const {result} = renderHook(() => useLogWellness(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate(validPayload);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockedAuthAxios.post).toHaveBeenCalledWith(LOG_WELLNESS_API, validPayload);
  });

  it('rejects an invalid payload before any network call', async () => {
    const {result} = renderHook(() => useLogWellness(), {
      wrapper: makeWrapper(),
    });

    // Missing required `date` — zod parse throws before POST (D-05).
    result.current.mutate({metrics: {steps: 5000}} as WellnessLogPayload);

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(mockedAuthAxios.post).not.toHaveBeenCalled();
  });

  it('invalidates the weekly wellness query after success (D-06)', async () => {
    mockedAuthAxios.post.mockResolvedValueOnce({
      data: {success: true, data: mockLog},
    });

    const queryClient = new QueryClient({
      defaultOptions: {queries: {retry: false}, mutations: {retry: false}},
    });
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

    const {result} = renderHook(() => useLogWellness(), {
      wrapper: ({children}: {children: React.ReactNode}) =>
        React.createElement(QueryClientProvider, {client: queryClient}, children),
    });

    result.current.mutate(validPayload);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(invalidateSpy).toHaveBeenCalledWith({queryKey: ['get-weekly-wellness']});
  });
});