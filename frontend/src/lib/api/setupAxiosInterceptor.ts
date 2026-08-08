// @ts-nocheck
import axios from 'axios';
import authAxios from './authAxios';
import {Alert, Platform, ToastAndroid} from 'react-native';
import store from '../../store/ReduxStore';
import {
  setGuestMode,
  setUserHandle,
  setUserId,
  setUserToken,
} from '../../store/UserSlice';
import {
  API_REQUEST_TIMEOUT_MS,
  API_TIMEOUT_ERROR_MESSAGE,
} from './ApiTimeout';
import {KEYS, removeItem} from '../utils/Utils';
import {SECURE_KEYS, secureRemoveItem, secureRetrieveItem} from '../storage/SecureStorageUtils';
import {logApiError} from '../services/monitoring/networkLogger';

/**
 * Module-scoped flag to suppress duplicate "session expired" notifications
 * within a single session (e.g., when multiple in-flight requests all fail
 * with 401 at the same time).
 *
 * Reset this via `resetSessionExpiredNotification()` whenever a new valid
 * session starts (i.e., after a successful login).
 */
let sessionExpiredNotified = false;

/**
 * Holds the in-flight session teardown promise triggered by a 401 response.
 *
 * Two things depend on this handle:
 * 1. Concurrent 401s (several in-flight requests expiring at once) share a
 *    single teardown instead of each firing their own storage writes.
 * 2. The request interceptor awaits it before reading credentials, so a
 *    request issued mid-teardown can never observe a half-cleared session.
 *
 * It is reset to `null` once the teardown settles, so a future session that
 * expires later gets a fresh teardown.
 */
let sessionTeardownPromise: Promise<void> | null = null;

/**
 * Module-scoped interceptor IDs.
 *
 * Storing the numeric IDs returned by `.use()` lets us call `.eject()` before
 * re-registering — making `setupAxiosInterceptor()` safely idempotent even if
 * invoked multiple times (e.g. React Strict Mode double-effect, hot reloads).
 */
let _axiosReqId: number | null = null;
let _axiosResId: number | null = null;
let _authAxiosResId: number | null = null;

/**
 * Resets the session-expired notification flag.
 * Call this from your login success handler so that if the *new* session
 * later expires, the user sees the notification again.
 *
 * @example
 * // In LoginScreen onSuccess:
 * import { resetSessionExpiredNotification } from '../../lib/api/setupAxiosInterceptor';
 * resetSessionExpiredNotification();
 */
export const resetSessionExpiredNotification = (): void => {
  sessionExpiredNotified = false;
};

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
const teardownExpiredSession = (): Promise<void> => {
  if (!sessionTeardownPromise) {
    sessionTeardownPromise = clearExpiredSession().finally(() => {
      sessionTeardownPromise = null;
    });
  }
  return sessionTeardownPromise;
};

/**
 * Shared error handler used by both axios instances.
 * Logs API errors safely and handles 401 Unauthorized specifically.
 *
 * The handler is async and awaits the session teardown before rejecting, so
 * by the time a caller's `catch` block runs — and navigates to the login /
 * guest screen — secure storage and Redux are already consistent. Previously
 * the storage clears were fired without `await`, letting navigation and
 * re-renders race the deletions.
 */
const handleError = async (error: any) => {
  // Log the API error securely without exposing secrets
  logApiError(error, undefined, {handler: 'axiosInterceptor'});

  if (error?.response?.status === 401) {
    try {
      await teardownExpiredSession();
    } catch (teardownError) {
      // Never let a teardown failure replace the original API error.
      console.error('Failed to clear the expired session safely:', teardownError);
    }

    // Notify once to avoid alert/toast spam if multiple calls fail simultaneously.
    if (!sessionExpiredNotified) {
      sessionExpiredNotified = true;
      const message =
        'Your session has expired. You are now browsing as a guest.';

      if (Platform.OS === 'android') {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      } else {
        Alert.alert('Session Expired', message);
      }
    }
  }

  return Promise.reject(error);
};

/**
 * Configures axios with timeout defaults and response/request interceptors.
 *
 * Sets up:
 * - Global timeout configuration for both axios instances (default + authAxios)
 * - Request interceptor to dynamically attach the Bearer token
 * - Response interceptor for handling 401 (unauthorized) errors
 * - Automatic logout and guest mode activation on session expiry
 *
 * This function is **idempotent**: it ejects any previously registered
 * interceptors before re-registering, so it is safe to call more than once
 * (e.g. React Strict Mode double-effect, hot reloads, auth re-initialisation).
 * The previous doc-comment stated that `useEffect([])` was a sufficient guard —
 * that is only true in production; in development React Strict Mode deliberately
 * double-invokes effects, so an explicit eject guard is required.
 *
 * @example
 * ```typescript
 * // AppContent.tsx
 * useEffect(() => {
 *   setupAxiosInterceptor();
 * }, []);
 * ```
 */
export const setupAxiosInterceptor = () => {
  // --- Eject any previously registered interceptors -------------------------
  // This makes the function idempotent regardless of how many times it is
  // called. Without ejecting, each call appends a new interceptor handler,
  // leading to duplicate 401 logouts, repeated error toasts, and performance
  // degradation from stacked async handlers.
  if (_axiosReqId !== null) {
    axios.interceptors.request.eject(_axiosReqId);
  }
  if (_axiosResId !== null) {
    axios.interceptors.response.eject(_axiosResId);
  }
  if (_authAxiosResId !== null) {
    authAxios.interceptors.response.eject(_authAxiosResId);
  }
  // --------------------------------------------------------------------------

  // Ensure global axios instance has default Content-Type for JSON requests
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  // Apply shared timeout defaults so requests cannot hang indefinitely
  // on slow or stalled networks.
  axios.defaults.timeout = API_REQUEST_TIMEOUT_MS;
  axios.defaults.timeoutErrorMessage = API_TIMEOUT_ERROR_MESSAGE;
  authAxios.defaults.timeout = API_REQUEST_TIMEOUT_MS;
  authAxios.defaults.timeoutErrorMessage = API_TIMEOUT_ERROR_MESSAGE;

  // Request interceptor: dynamically attach Bearer token before every request.
  // `config.headers ??= {}` guards against the rare case where an Axios adapter
  // or custom config omits the headers object entirely.
  _axiosReqId = axios.interceptors.request.use(
    async config => {
      config.headers ??= {} as typeof config.headers;

      // If a 401 teardown is in flight, let it finish before reading any
      // credentials. Redux is cleared only at the end of the teardown, so
      // without this gate a request could fall through to secure storage,
      // read the token currently being deleted, and re-attach it — earning
      // another 401 and kicking off another teardown in a loop.
      const pendingTeardown = sessionTeardownPromise;
      if (pendingTeardown) {
        await pendingTeardown;
      }

      let token = store.getState().user.user_token;
      if (!token) {
        token = await secureRetrieveItem(SECURE_KEYS.USER_TOKEN);
      }
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        // Remove Authorization header to prevent sending "Bearer undefined/null"
        delete config.headers.Authorization;
      }
      return config;
    },
    error => Promise.reject(error),
  );

  // Attach error handler to both the global axios instance (used by existing hooks)
  // and authAxios (used by migrated code with the request interceptor).
  // Store returned IDs so we can eject on the next call.
  _axiosResId = axios.interceptors.response.use(response => response, handleError);
  _authAxiosResId = authAxios.interceptors.response.use(response => response, handleError);
};
