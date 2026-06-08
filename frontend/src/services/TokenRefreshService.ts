/**
 * Token Refresh Service - Handles access token refresh with rotation
 * 
 * Features:
 * - Automatic token refresh before expiry
 * - Token rotation support
 * - Secure storage of refresh token
 * - Error handling for expired refresh tokens
 */

import authAxios from '../helper/authAxios';
import { SECURE_KEYS, secureStoreItem, secureRetrieveItem, secureRemoveItem } from '../helper/SecureStorageUtils';
import { storeItem, KEYS, removeItem } from '../helper/Utils';
import store from '../store/ReduxStore';
import { setUserToken, setUserId, setUserHandle, setGuestMode } from '../store/UserSlice';
import { resetSessionExpiredNotification } from '../helper/setupAxiosInterceptor';
import { Alert, Platform, ToastAndroid } from 'react-native';

const REFRESH_TOKEN_ENDPOINT = '/auth/refresh-token';
const ACCESS_TOKEN_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes
const REFRESH_BUFFER_MS = 60 * 1000; // Refresh 1 minute before expiry

class TokenRefreshService {
  private refreshPromise: Promise<string> | null = null;
  private tokenCheckInterval: NodeJS.Timeout | null = null;

  /**
   * Initialize the token refresh service
   * Starts periodic token validity checks
   */
  initialize() {
    // Check token validity every minute
    this.tokenCheckInterval = setInterval(() => {
      this.checkAndRefreshToken();
    }, 60000);

    // Initial check after 30 seconds
    setTimeout(() => {
      this.checkAndRefreshToken();
    }, 30000);
  }

  /**
   * Cleanup the token refresh service
   */
  cleanup() {
    if (this.tokenCheckInterval) {
      clearInterval(this.tokenCheckInterval);
      this.tokenCheckInterval = null;
    }
    this.refreshPromise = null;
  }

  /**
   * Check if token needs refresh and refresh if needed
   */
  private async checkAndRefreshToken() {
    const expiryDate = await storeItem(KEYS.USER_TOKEN_EXPIRY_DATE);
    
    if (!expiryDate) {
      return; // No token to check
    }

    const expiry = new Date(expiryDate).getTime();
    const now = Date.now();
    const timeUntilExpiry = expiry - now;

    // Refresh if within buffer period
    if (timeUntilExpiry < REFRESH_BUFFER_MS && timeUntilExpiry > 0) {
      await this.refreshToken();
    }
  }

  /**
   * Refresh the access token using refresh token
   * Implements token rotation - old refresh token is invalidated
   * @returns The new access token
   */
  async refreshToken(): Promise<string> {
    // If a refresh is already in progress, wait for it
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this._doRefreshToken();
    
    try {
      const newToken = await this.refreshPromise;
      return newToken;
    } finally {
      this.refreshPromise = null;
    }
  }

  /**
   * Internal token refresh logic
   */
  private async _doRefreshToken(): Promise<string> {
    try {
      // Get refresh token from secure storage
      const refreshToken = await secureRetrieveItem(SECURE_KEYS.USER_TOKEN);

      if (!refreshToken) {
        console.warn('No refresh token available');
        this.handleTokenExpiry();
        throw new Error('No refresh token');
      }

      // Call refresh endpoint
      const response = await authAxios.post(REFRESH_TOKEN_ENDPOINT, {
        refreshToken,
      });

      if (response.data.success && response.data.data) {
        const { accessToken, refreshToken: newRefreshToken } = response.data.data;

        // Store new tokens
        await secureStoreItem(SECURE_KEYS.USER_TOKEN, newRefreshToken);
        await storeItem(
          KEYS.USER_TOKEN_EXPIRY_DATE,
          new Date(Date.now() + 15 * 60 * 1000).toISOString()
        );

        // Update Redux state
        store.dispatch(setUserToken(accessToken));

        // Reset the session expired notification flag
        resetSessionExpiredNotification();

        console.log('Token refreshed successfully');
        return accessToken;
      } else {
        throw new Error(response.data.message || 'Token refresh failed');
      }
    } catch (error: any) {
      console.error('Token refresh error:', error);

      // Handle specific error cases
      if (error.response?.status === 401) {
        const message = error.response?.data?.message;
        
        if (message?.includes('security') || message?.includes('terminated')) {
          // Token reuse detected or security concern
          this.handleSecurityEvent();
        } else {
          this.handleTokenExpiry();
        }
      } else {
        // Network or other error - might be temporary
        console.log('Token refresh failed, will retry on next check');
      }

      throw error;
    }
  }

  /**
   * Handle token expiry - clear state and notify user
   */
  private handleTokenExpiry() {
    // Clear tokens
    secureRemoveItem(SECURE_KEYS.USER_TOKEN);
    removeItem(KEYS.USER_TOKEN_EXPIRY_DATE);
    removeItem(KEYS.USER_ID);
    removeItem(KEYS.USER_HANDLE);

    // Update Redux state
    store.dispatch(setUserToken(''));
    store.dispatch(setUserId(''));
    store.dispatch(setUserHandle(''));
    store.dispatch(setGuestMode(true));

    // Notify user
    const message = 'Your session has expired. Please login again.';

    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('Session Expired', message);
    }
  }

  /**
   * Handle security event (token reuse detected)
   */
  private handleSecurityEvent() {
    // Clear all tokens and session data
    secureRemoveItem(SECURE_KEYS.USER_TOKEN);
    removeItem(KEYS.USER_TOKEN_EXPIRY_DATE);
    removeItem(KEYS.USER_ID);
    removeItem(KEYS.USER_HANDLE);

    // Update Redux state
    store.dispatch(setUserToken(''));
    store.dispatch(setUserId(''));
    store.dispatch(setUserHandle(''));
    store.dispatch(setGuestMode(true));

    // Notify user with security message
    const message = 'Your session was terminated for security. Please login again.';

    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('Security Alert', message);
    }
  }

  /**
   * Store new tokens after login
   * @param accessToken The access token
   * @param refreshToken The refresh token
   */
  async storeTokens(accessToken: string, refreshToken: string) {
    // Store refresh token securely
    await secureStoreItem(SECURE_KEYS.USER_TOKEN, refreshToken);
    
    // Store access token expiry date
    await storeItem(
      KEYS.USER_TOKEN_EXPIRY_DATE,
      new Date(Date.now() + ACCESS_TOKEN_EXPIRY_MS).toISOString()
    );

    // Update Redux with access token
    store.dispatch(setUserToken(accessToken));

    // Reset notification flag
    resetSessionExpiredNotification();
  }

  /**
   * Clear all tokens (logout)
   */
  async clearTokens() {
    this.cleanup();
    await secureRemoveItem(SECURE_KEYS.USER_TOKEN);
    removeItem(KEYS.USER_TOKEN_EXPIRY_DATE);
    removeItem(KEYS.USER_ID);
    removeItem(KEYS.USER_HANDLE);
  }

  /**
   * Get current access token validity status
   */
  async isTokenValid(): Promise<boolean> {
    const expiryDate = await storeItem(KEYS.USER_TOKEN_EXPIRY_DATE);
    
    if (!expiryDate) {
      return false;
    }

    const expiry = new Date(expiryDate).getTime();
    return Date.now() < expiry;
  }
}

// Export singleton instance
export const tokenRefreshService = new TokenRefreshService();
export default tokenRefreshService;