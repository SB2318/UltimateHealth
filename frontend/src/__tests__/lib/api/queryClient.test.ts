import { createQueryClient, safeInvalidateQueries } from '../../../lib/api/queryClient';
import { onlineManager, QueryClient } from '@tanstack/react-query';

describe('queryClient configuration & offline fallbacks', () => {
  let client: QueryClient;

  beforeEach(() => {
    client = createQueryClient();
  });

  afterEach(() => {
    client.clear();
  });

  it('initializes with offlineFirst networkMode and safe default options', () => {
    const defaultOptions = client.getDefaultOptions();
    expect(defaultOptions.queries?.networkMode).toBe('offlineFirst');
    expect(defaultOptions.mutations?.networkMode).toBe('offlineFirst');
    expect(defaultOptions.queries?.refetchOnReconnect).toBe(true);
    expect(defaultOptions.queries?.refetchOnWindowFocus).toBe(false);
  });

  it('retry logic bypasses retry when offline or on 4xx errors', () => {
    const defaultOptions = client.getDefaultOptions();
    const retryFn = defaultOptions.queries?.retry as (
      failureCount: number,
      error: any,
    ) => boolean;

    // Simulate online
    jest.spyOn(onlineManager, 'isOnline').mockReturnValue(true);

    // 404 error should not retry
    expect(retryFn(0, { response: { status: 404 } })).toBe(false);
    // 401 error should not retry
    expect(retryFn(0, { response: { status: 401 } })).toBe(false);
    // 500 error can retry once
    expect(retryFn(0, { response: { status: 500 } })).toBe(true);
    expect(retryFn(2, { response: { status: 500 } })).toBe(false);

    // Simulate offline
    jest.spyOn(onlineManager, 'isOnline').mockReturnValue(false);
    expect(retryFn(0, new Error('Network Error'))).toBe(false);
  });

  it('safeInvalidateQueries does not throw and skips active refetch when offline', async () => {
    jest.spyOn(onlineManager, 'isOnline').mockReturnValue(false);
    const invalidateSpy = jest.spyOn(client, 'invalidateQueries');

    await expect(
      safeInvalidateQueries(client, { queryKey: ['test-offline-key'] }),
    ).resolves.not.toThrow();

    expect(invalidateSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['test-offline-key'],
        refetchType: 'none',
      }),
      undefined,
    );
  });

  it('safeInvalidateQueries triggers active refetch when online', async () => {
    jest.spyOn(onlineManager, 'isOnline').mockReturnValue(true);
    const invalidateSpy = jest.spyOn(client, 'invalidateQueries');

    await safeInvalidateQueries(client, { queryKey: ['test-online-key'] });

    expect(invalidateSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['test-online-key'],
        refetchType: 'active',
      }),
      undefined,
    );
  });
});
