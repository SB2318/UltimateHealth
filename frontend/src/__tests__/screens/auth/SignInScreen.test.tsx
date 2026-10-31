import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import SignInScreen from '../../../screens/auth/SignInScreen';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const mockDispatch = jest.fn();
const mockReset = jest.fn();
const mockNavigate = jest.fn();
const mockMutateGoogleAuth = jest.fn();
const mockMutateResendVerification = jest.fn();

jest.mock('../../../store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
}));

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn().mockResolvedValue(true),
    signIn: jest.fn(),
    signOut: jest.fn().mockResolvedValue(null),
  },
  statusCodes: {
    SIGN_IN_CANCELLED: 'SIGN_IN_CANCELLED',
    IN_PROGRESS: 'IN_PROGRESS',
    PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE',
  },
}));

jest.mock('@react-native-firebase/messaging', () => () => ({
  getToken: jest.fn().mockResolvedValue('test-fcm-token'),
}));

jest.mock('../../../hooks/auth/useGoogleAuth', () => ({
  useGoogleAuthMutation: () => ({
    mutateAsync: mockMutateGoogleAuth,
    isPending: false,
  }),
}));

jest.mock('../../../hooks/auth/useResendVerification', () => ({
  useRequestVerification: () => ({
    mutate: mockMutateResendVerification,
    isPending: false,
  }),
}));

jest.mock('../../../lib/storage/SecureStorageUtils', () => ({
  SECURE_KEYS: {
    USER_TOKEN: 'USER_TOKEN',
    REFRESH_TOKEN: 'REFRESH_TOKEN',
  },
  secureStoreItem: jest.fn().mockResolvedValue(null),
}));

jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      WEB_CLIENT_ID: 'test-client-id',
    },
  },
}));

const mockProps: any = {
  navigation: {
    reset: mockReset,
    navigate: mockNavigate,
  },
  route: {
    params: {
      role: 'General User',
    },
  },
};

describe('SignInScreen - Two-Step Onboarding Flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Step 1 with Join UltimateHealth branding, role options, and Continue button', () => {
    const { getByText } = render(<SignInScreen {...mockProps} />);

    expect(getByText('Join UltimateHealth')).toBeTruthy();
    expect(getByText('General User')).toBeTruthy();
    expect(getByText('Doctor')).toBeTruthy();
    expect(getByText('Continue')).toBeTruthy();
    expect(getByText("I'll just browse as a Guest")).toBeTruthy();
  });

  it('allows 1-click guest access from Step 1 without account friction', () => {
    const { getByText } = render(<SignInScreen {...mockProps} />);

    const guestBtn = getByText("I'll just browse as a Guest");
    fireEvent.press(guestBtn);

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'user/setGuestMode', payload: true }),
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'user/setUserToken', payload: '' }),
    );
    expect(mockReset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: 'TabNavigation' }],
    });
  });

  it('allows role selection and proceeds to Step 2 with Google Sign-In', () => {
    const { getByText } = render(<SignInScreen {...mockProps} />);

    // Select Doctor role
    const doctorCard = getByText('Doctor');
    fireEvent.press(doctorCard);

    // Press Continue to go to Step 2
    const continueBtn = getByText('Continue');
    fireEvent.press(continueBtn);

    // Verify Step 2 content
    expect(getByText('Sign in as Doctor')).toBeTruthy();
    expect(getByText('Continue with Google')).toBeTruthy();
  });

  it('handles Google Sign-In in Step 2 and navigates to TabNavigation', async () => {
    (GoogleSignin.signIn as jest.Mock).mockResolvedValueOnce({
      data: {
        idToken: 'mock-google-id-token',
        user: {
          id: 'user-123',
          email: 'test@example.com',
          name: 'Jane Doe',
          photo: 'https://example.com/photo.jpg',
        },
      },
    });

    mockMutateGoogleAuth.mockResolvedValueOnce({
      token: 'jwt-auth-token-123',
      refreshToken: 'refresh-token-456',
      user: {
        _id: 'user-db-id',
        user_name: 'Jane Doe',
        user_handle: 'janedoe',
      },
    });

    const { getByText } = render(<SignInScreen {...mockProps} />);

    const googleBtn = getByText('Continue with Google');
    fireEvent.press(googleBtn);

    await waitFor(() => {
      expect(mockReset).toHaveBeenCalledWith({
        index: 0,
        routes: [{ name: 'TabNavigation' }],
      });
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'user/setUserToken',
        payload: 'refresh-token-456',
      }),
    );
  });
});
