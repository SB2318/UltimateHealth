import store from '../../store/ReduxStore';
import {
  setGuestMode,
  setUserHandle,
  setUserId,
  setUserToken,
} from '../../store/UserSlice';
import {KEYS, removeItem} from '../utils/Utils';
import {SECURE_KEYS, secureRemoveItem} from '../storage/SecureStorageUtils';

/**
 * Shared session-teardown state for the 401 handling in the axios layer.
 *
 * This lives in its own module because *both* axios instances need it: the
 * global instance and `authAxios` each attach a token in their own request
 * interceptor, so both must gate on the same in-flight teardown. Keeping the
 * state here also avoids an import cycle, since `authAxios` cannot import
 * from `setupAxiosInterceptor` (which imports `authAxios`).
 */

/**
 * Holds the in-flight session teardown promise triggered by a 401 response.
 *
 * Two things depend on this handle:
 * 1. Concurrent 401s (several in-flight requests expiring at once) share a
 *    single teardown instead of each firing their own storage writes.
 * 2. Request interceptors await it before reading credentials, so a request
 *    issued mid-teardown can never observe a half-cleared session.
 *
 * It is reset to `null` once the teardown settles, so a future session that
 * expires later gets a fresh teardown.
 */
let sessionTeardownPromise: Promise<void> | null = null;

/**
 * Erases every persisted trace of the expired session and *then* flips the
 * app into guest mode.
 *
 * Ordering matters. Persisted credentials are removed before the Redux
 * dispatches so that components re-rendering in response to the state change
 * cannot read a half-cleared session (token gone from Redux but still on
 * disk, or vice versa). This mirrors `completeLocalLogout` in LogoutScreen,
 * which already awaits `clearStorage()` before dispatching and navigating.
 *
 * This function is deliberately non-throwing: the underlying helpers swallow
 * their own errors, and the extra guard here ensures a storage failure can
 * never surface as an unhandled rejection or mask the original API error.
 */
const clearExpiredSession = async (): Promise<void> => {
  try {
    await Promise.all([
      secureRemoveItem(SECURE_KEYS.USER_TOKEN),
      removeItem(KEYS.USER_TOKEN_EXPIRY_DATE),
      removeItem(KEYS.USER_ID),
      removeItem(KEYS.USER_HANDLE),
    ]);
  } catch (storageError) {
    console.error('Failed to clear auth storage safely:', storageError);
  }

  store.dispatch(setUserToken(''));
  store.dispatch(setUserId(''));
  store.dispatch(setUserHandle(''));
  store.dispatch(setGuestMode(true));
};

/**
 * Starts a session teardown, or joins the one already running.
 *
 * When a token expires it is common for several in-flight requests to fail
 * with 401 at nearly the same moment. Without this guard each of them would
 * launch its own set of concurrent storage deletions for the same keys.
 */
export const teardownExpiredSession = (): Promise<void> => {
  if (!sessionTeardownPromise) {
    sessionTeardownPromise = clearExpiredSession().finally(() => {
      sessionTeardownPromise = null;
    });
  }
  return sessionTeardownPromise;
};

/**
 * Awaited by request interceptors before they read any credentials.
 *
 * Without this gate a request issued mid-teardown could read the token that
 * is currently being deleted and re-attach it — earning another 401 and
 * kicking off another teardown in a loop. Resolves immediately when no
 * teardown is running, so the happy path is unaffected.
 */
export const awaitPendingSessionTeardown = async (): Promise<void> => {
  const pendingTeardown = sessionTeardownPromise;
  if (pendingTeardown) {
    await pendingTeardown;
  }
};
