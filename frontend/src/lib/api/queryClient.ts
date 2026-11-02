import {
  QueryClient,
  QueryCache,
  MutationCache,
  onlineManager,
  InvalidateQueryFilters,
  InvalidateOptions,
} from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';

// Synchronize React Query's online status with NetInfo safely
try {
  onlineManager.setEventListener(setOnline => {
    return NetInfo.addEventListener(state => {
      const isOnline = Boolean(
        state.isConnected && state.isInternetReachable !== false,
      );
      setOnline(isOnline);
    });
  });
} catch {
  // Graceful fallback for test or non-native environments
}

export const createQueryClient = (): QueryClient => {
  const queryCache = new QueryCache({
    onError: (error, query) => {
      if (__DEV__) {
        console.warn(
          `[React Query] Query error for [${query.queryKey.join(', ')}]:`,
          error,
        );
      }
    },
  });

  const mutationCache = new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (__DEV__) {
        console.warn(`[React Query] Mutation error:`, error);
      }
    },
  });

  return new QueryClient({
    queryCache,
    mutationCache,
    defaultOptions: {
      queries: {
        // Offline-first ensures cached data is served and queries pause gracefully without crashing
        networkMode: 'offlineFirst',
        retry: (failureCount, error: any) => {
          // Do not retry when offline
          if (!onlineManager.isOnline()) return false;
          // Do not retry client 4xx errors
          const status = error?.response?.status;
          if (status && status >= 400 && status < 500) return false;
          return failureCount < 2;
        },
        staleTime: 1000 * 60 * 2, // 2 minutes
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
      },
      mutations: {
        networkMode: 'offlineFirst',
        retry: (failureCount, error: any) => {
          if (!onlineManager.isOnline()) return false;
          return failureCount < 1;
        },
      },
    },
  });
};

/**
 * Safely invalidates queries without throwing errors when offline or when a network error occurs.
 * If offline, marks queries as stale (refetchType: 'none') so they refetch automatically upon reconnect.
 */
export const safeInvalidateQueries = async (
  client: QueryClient,
  filters?: InvalidateQueryFilters,
  options?: InvalidateOptions,
): Promise<void> => {
  try {
    const isOnline = onlineManager.isOnline();
    await client.invalidateQueries(
      {
        ...filters,
        refetchType: isOnline ? (filters?.refetchType ?? 'active') : 'none',
      },
      options,
    );
  } catch (err) {
    if (__DEV__) {
      console.warn('[React Query] Safe invalidation bypassed error:', err);
    }
  }
};
