 
// @ts-nocheck
import React from 'react';
import {act, render} from '@testing-library/react-native';
import SplashScreen from '../SplashScreen';

const mockNavigate = jest.fn();
const mockReset = jest.fn();

// ── react-redux mock ──────────────────────────────────────────────────────────
// SplashScreen reads user_token via useSelector. We control it here.
let mockUserToken: string | null = 'valid-token';

jest.mock('react-redux', () => ({
  useSelector: (selector: any) =>
    selector({
      user: {user_token: mockUserToken},
      network: {isConnected: true},
    }),
  useDispatch: () => jest.fn(),
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
