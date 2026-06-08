/**
 * Token Refresh Hook - React hook for token refresh management
 */

import { useEffect, useCallback } from 'react';
import { tokenRefreshService } from '../services/TokenRefreshService';
import store from '../store/ReduxStore';
import { selectIsGuestMode } from '../store/UserSlice';

/**
 * Hook to manage token refresh lifecycle
 * Automatically refreshes tokens when needed and handles session expiry
 */
export const useTokenRefresh = () => {
  // Check if user is authenticated (not in guest mode)
  const isAuthenticated = !selectIsGuestMode(store.getState());

  useEffect(() => {
    if (isAuthenticated) {
      // Initialize token refresh service
      tokenRefreshService.initialize();

      // Cleanup on unmount or when user logs out
      return () => {
        tokenRefreshService.cleanup();
      };
    } else {
      // Clean up if in guest mode
      tokenRefreshService.cleanup();
    }
  }, [isAuthenticated]);

  /**
   * Force refresh the access token
   */
  const forceRefresh = useCallback(async () => {
    if (!isAuthenticated) {
      return;
    }

    try {
      await tokenRefreshService.refreshToken();
      return true;
    } catch (error) {
      console.error('Force refresh failed:', error);
      return false;
    }
  }, [isAuthenticated]);

  /**
   * Check if token is still valid
   */
  const checkTokenValidity = useCallback(async () => {
    return tokenRefreshService.isTokenValid();
  }, []);

  return {
    forceRefresh,
    checkTokenValidity,
  };
};

export default useTokenRefresh;