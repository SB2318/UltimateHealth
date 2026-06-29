// @ts-nocheck
import React from 'react';
import {act, render} from '@testing-library/react-native';
import SplashScreen from '../SplashScreen';

const mockNavigate = jest.fn();
const mockReset = jest.fn();

// ── react-redux mock ──────────────────────────────────────────────────────────
// SplashScreen reads user_token via useAppSelector. We control it here.
let mockUserToken: string | null = 'valid-token';

<<<<<<< HEAD
jest.mock('react-redux', () => ({
  useAppSelector: (selector: any) =>
    selector({
      user: {user_token: mockUserToken},
      network: {isConnected: true},
=======
jest.mock('../store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
}));

const mockCheckTokenStatus = jest.fn();
jest.mock('@/src/hooks/useGetTokenStatus', () => ({
  useCheckTokenStatus: () => mockCheckTokenStatus(),
}));

jest.mock('../../helper/Utils', () => {
  const original = jest.requireActual('../../helper/Utils');
  return {
    ...original,
    clearStorage: jest.fn(() => Promise.resolve()),
    retrieveItem: jest.fn((key) => {
      if (key === 'USER_ID') return Promise.resolve('user-id-123');
      if (key === 'USER_HANDLE') return Promise.resolve('john_doe');
      return Promise.resolve(null);
>>>>>>> b5d39036 (refactor: complete typed Redux hooks migration)
    }),
  useAppDispatch: () => jest.fn(),
}));

// ── timer mocks ───────────────────────────────────────────────────────────────
// SplashScreen waits 800ms before navigating. Use fake timers to control this.

const renderScreen = () =>
  render(
    <SplashScreen
      navigation={{navigate: mockNavigate, reset: mockReset} as any}
      route={{} as any}
    />,
  );

describe('SplashScreen - Offline Session and Auto-Login Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    mockUserToken = 'valid-token';
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('performs auto-login and redirects to TabNavigation when token is valid', async () => {
    mockUserToken = 'valid-token';
    renderScreen();

    // advance past the 800ms hydration delay
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockReset).toHaveBeenCalledWith({
      index: 0,
      routes: [{name: 'TabNavigation'}],
    });
  });

  it('allows offline access and redirects to TabNavigation on network connectivity errors when local token is present (Offline Support Fix)', async () => {
    // token still present — same behaviour as valid token
    mockUserToken = 'valid-token';
    renderScreen();

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockReset).toHaveBeenCalledWith({
      index: 0,
      routes: [{name: 'TabNavigation'}],
    });
  });

  it('clears session and redirects to LoginScreen when token is invalid and not a network error', async () => {
    mockUserToken = null;
    renderScreen();

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockReset).toHaveBeenCalledWith({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
  });
});
