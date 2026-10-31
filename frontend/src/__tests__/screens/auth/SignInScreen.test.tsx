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

describe('SignInScreen - Smooth Onboarding Flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders smoothly with branding, role selector, and 1-click actions', () => {
    const { getByText } = render(<SignInScreen {...mockProps} />);

    expect(getByText('UltimateHealth')).toBeTruthy();
    expect(getByText('Empowering wellness through knowledge')).toBeTruthy();
    expect(getByText('Patient / User')).toBeTruthy();
    expect(getByText('Medical Doctor')).toBeTruthy();
    expect(getByText('Continue with Google')).toBeTruthy();
    expect(getByText('Browse as Guest')).toBeTruthy();
  });

  it('allows 1-click guest access without account friction', () => {
    const { getByText } = render(<SignInScreen {...mockProps} />);

    const guestBtn = getByText('Browse as Guest');
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

  it('allows seamless role toggle between Patient and Medical Doctor', () => {
    const { getByText } = render(<SignInScreen {...mockProps} />);

    const doctorOption = getByText('Medical Doctor');
    fireEvent.press(doctorOption);

    expect(getByText('One click to sign up or sign in as Doctor')).toBeTruthy();

    const patientOption = getByText('Patient / User');
    fireEvent.press(patientOption);

    expect(getByText('One click to sign up or sign in as Patient')).toBeTruthy();
  });

  it('handles Google Sign-In with 1-click authentication and navigates to TabNavigation', async () => {
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

  it('navigates to CommunityGuidelinesScreen on guidelines link press', () => {
    const { getByText } = render(<SignInScreen {...mockProps} />);

    const guidelinesLink = getByText('Terms & Community Guidelines');
    fireEvent.press(guidelinesLink);

    expect(mockNavigate).toHaveBeenCalledWith('CommunityGuidelinesScreen');
  });
});
