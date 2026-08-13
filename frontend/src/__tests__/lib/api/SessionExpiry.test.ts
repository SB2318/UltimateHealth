import axios from 'axios';
import {Alert} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import authAxios from '../../../lib/api/authAxios';
import store from '../../../store/ReduxStore';
import {
  setGuestMode,
  setUserHandle,
  setUserId,
  setUserToken,
} from '../../../store/UserSlice';
import {SECURE_KEYS} from '../../../lib/storage/SecureStorageUtils';
import {
  resetSessionExpiredNotification,
  setupAxiosInterceptor,
} from '../../../lib/api/setupAxiosInterceptor';

/**
 * Regression tests for the 401 session teardown race (#1392).
 *
 * The interceptor used to fire `secureRemoveItem()` / `removeItem()` without
 * awaiting them, so the rejection reached the caller — which then navigates to
 * the login / guest screen — while the token deletions were still in flight.
 */

/** In-memory stand-in for the device secure store so deletions are observable. */
let secureStoreData: Record<string, string> = {};

/** Lets a test hold a deletion open to reproduce the mid-teardown window. */
let deleteGate: Promise<void> | null = null;

const unauthorizedError = () => ({response: {status: 401}});

const unauthorizedErrorFor = (url: string) => ({
  response: {status: 401},
  config: {url},
});

const flushMicrotasks = () => new Promise(resolve => setImmediate(resolve));

const getResponseErrorHandler = () => {
  const handlers = (axios.interceptors.response as any).handlers;
  const handler = handlers.find((h: any) => h && h.rejected);
  expect(handler).toBeDefined();
  return handler.rejected;
};

const getRequestHandler = () => {
  const handlers = (axios.interceptors.request as any).handlers;
  const handler = handlers.find((h: any) => h && h.fulfilled);
  expect(handler).toBeDefined();
  return handler.fulfilled;
};

describe('401 session teardown', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (axios.interceptors.request as any).handlers = [];
    (axios.interceptors.response as any).handlers = [];

    secureStoreData = {};
    deleteGate = null;
    resetSessionExpiredNotification();

    (SecureStore.getItemAsync as jest.Mock).mockImplementation(
      async (key: string) => secureStoreData[key] ?? null,
    );
    (SecureStore.deleteItemAsync as jest.Mock).mockImplementation(
      async (key: string) => {
        if (deleteGate) {
          await deleteGate;
        }
        delete secureStoreData[key];
      },
    );

    jest.spyOn(Alert, 'alert').mockImplementation(() => {});

    // Start each test from a signed-in session.
    secureStoreData[SECURE_KEYS.USER_TOKEN] = 'stale-token';
    store.dispatch(setUserToken('stale-token'));
    store.dispatch(setUserId('user-1'));
    store.dispatch(setUserHandle('@user'));
    store.dispatch(setGuestMode(false));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('does not reject to the caller until secure storage deletion resolves', async () => {
    let releaseDeletion: () => void = () => {};
    deleteGate = new Promise<void>(resolve => {
      releaseDeletion = resolve;
    });

    setupAxiosInterceptor();
    const onError = getResponseErrorHandler();

    let rejected = false;
    const rejection = onError(unauthorizedError()).catch(() => {
      rejected = true;
    });

    await flushMicrotasks();

    // The deletion is still pending, so the caller must not have been told to
    // navigate away yet. This is the exact ordering the bug violated.
    expect(rejected).toBe(false);

    releaseDeletion();
    await rejection;

    expect(rejected).toBe(true);
    expect(secureStoreData[SECURE_KEYS.USER_TOKEN]).toBeUndefined();
  });

  it('clears the persisted token and switches Redux to guest mode', async () => {
    setupAxiosInterceptor();
    const onError = getResponseErrorHandler();

    await expect(onError(unauthorizedError())).rejects.toBeDefined();

    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(
      SECURE_KEYS.USER_TOKEN,
    );

    const state = store.getState().user;
    expect(state.user_token).toBe('');
    expect(state.user_id).toBe('');
    expect(state.user_handle).toBe('');
    expect(state.isGuest).toBe(true);
  });

  it('never re-attaches the stale token to a request issued mid-teardown', async () => {
    let releaseDeletion: () => void = () => {};
    deleteGate = new Promise<void>(resolve => {
      releaseDeletion = resolve;
    });

    setupAxiosInterceptor();
    const onError = getResponseErrorHandler();
    const onRequest = getRequestHandler();

    const rejection = onError(unauthorizedError()).catch(() => {});

    // Fired while the teardown is still deleting the token. Before the fix the
    // interceptor read the not-yet-cleared credentials and re-attached the dead
    // token, producing another 401 and another teardown in a loop.
    const configPromise = onRequest({headers: {} as any});

    releaseDeletion();
    await rejection;

    const config = await configPromise;
    expect(config.headers.Authorization).toBeUndefined();
  });

  it('gates the authAxios request interceptor on an in-flight teardown', async () => {
    let releaseDeletion: () => void = () => {};
    deleteGate = new Promise<void>(resolve => {
      releaseDeletion = resolve;
    });

    setupAxiosInterceptor();
    const onError = getResponseErrorHandler();

    // authAxios registers its own request interceptor at module load and reads
    // the token straight from secure storage, so it needs the same gate as the
    // global instance.
    const authHandlers = (authAxios.interceptors.request as any).handlers;
    const authRequest = authHandlers.find((h: any) => h && h.fulfilled);
    expect(authRequest).toBeDefined();

    const rejection = onError(unauthorizedError()).catch(() => {});
    const configPromise = authRequest.fulfilled({headers: {} as any});

    releaseDeletion();
    await rejection;

    const config = await configPromise;
    expect(config.headers.Authorization).toBeUndefined();
  });

  it('tears down once when several requests fail with 401 together', async () => {
    setupAxiosInterceptor();
    const onError = getResponseErrorHandler();

    await Promise.all([
      onError(unauthorizedError()).catch(() => {}),
      onError(unauthorizedError()).catch(() => {}),
      onError(unauthorizedError()).catch(() => {}),
    ]);

    expect(
      (SecureStore.deleteItemAsync as jest.Mock).mock.calls.filter(
        ([key]) => key === SECURE_KEYS.USER_TOKEN,
      ),
    ).toHaveLength(1);
  });

  it('propagates the original error even if storage cleanup fails', async () => {
    (SecureStore.deleteItemAsync as jest.Mock).mockRejectedValue(
      new Error('keystore busy'),
    );
    jest.spyOn(console, 'error').mockImplementation(() => {});

    setupAxiosInterceptor();
    const onError = getResponseErrorHandler();

    const error = unauthorizedError();
    await expect(onError(error)).rejects.toBe(error);

    // A storage failure must still leave the app in guest mode rather than
    // stranding it in a half-authenticated state.
    expect(store.getState().user.isGuest).toBe(true);
  });

  it('leaves non-401 errors untouched', async () => {
    setupAxiosInterceptor();
    const onError = getResponseErrorHandler();

    const error = {response: {status: 500}};
    await expect(onError(error)).rejects.toBe(error);

    expect(SecureStore.deleteItemAsync).not.toHaveBeenCalled();
    expect(store.getState().user.user_token).toBe('stale-token');
  });

  describe('auth-attempt 401 (#2366)', () => {
    const authAttemptUrls = [
      '/api/user/login',
      '/api/user/register',
      '/api/user/forgotpassword',
      '/api/user/verifyOtp',
      '/api/user/verifypassword',
      '/api/user/update-password',
      '/api/user/verifyEmail',
      '/api/user/resend-verification-mail',
    ];

    it.each(authAttemptUrls)(
      'does NOT tear down the session when %s rejects with 401',
      async url => {
        setupAxiosInterceptor();
        const onError = getResponseErrorHandler();

        const error = unauthorizedErrorFor(url);
        await expect(onError(error)).rejects.toBe(error);

        expect(SecureStore.deleteItemAsync).not.toHaveBeenCalled();
        const state = store.getState().user;
        expect(state.user_token).toBe('stale-token');
        expect(state.isGuest).toBe(false);
      },
    );

    it('tears down for a 401 on a protected resource (getprofile)', async () => {
      setupAxiosInterceptor();
      const onError = getResponseErrorHandler();

      await expect(
        onError(unauthorizedErrorFor('/api/user/getprofile')),
      ).rejects.toBeDefined();

      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(
        SECURE_KEYS.USER_TOKEN,
      );
      expect(store.getState().user.isGuest).toBe(true);
    });
  });
});
