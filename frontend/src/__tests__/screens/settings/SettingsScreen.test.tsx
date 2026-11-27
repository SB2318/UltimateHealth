import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SettingsScreen from '../../../screens/settings/SettingsScreen';
import { PreferencesProvider } from '../../../contexts/PreferencesContext';
import * as SecureStore from 'expo-secure-store';

jest.mock('../../../store/hooks', () => ({
  useAppSelector: jest.fn(() => ({ isConnected: true })),
  useAppDispatch: () => jest.fn(),
}));

jest.mock('@expo/vector-icons/MaterialCommunityIcons', () => 'MaterialCommunityIcon');
jest.mock('@expo/vector-icons/MaterialIcons', () => 'MaterialIcons');
jest.mock('react-native-snackbar', () => ({
  LENGTH_SHORT: 0,
  LENGTH_LONG: 1,
  show: jest.fn(),
}));

describe('SettingsScreen', () => {
  it('renders settings options', () => {
    const { getByText } = render(
      <PreferencesProvider>
        <SettingsScreen navigation={{ getParent: jest.fn() }} />
      </PreferencesProvider>,
    );
    expect(getByText('Settings')).toBeTruthy();
    expect(getByText('View / Edit Profile')).toBeTruthy();
    expect(getByText('HIPAA Compliance & Health Privacy')).toBeTruthy();
    expect(getByText('Sign Out')).toBeTruthy();
  });

  it('renders the theme picker row (#2043)', () => {
    const { getByText } = render(
      <PreferencesProvider>
        <SettingsScreen navigation={{ getParent: jest.fn() }} />
      </PreferencesProvider>,
    );
    expect(getByText('App Theme')).toBeTruthy();
    // Default preference is System.
    expect(getByText('System')).toBeTruthy();
  });

  it('switching to High Contrast persists the preference and updates the row (#2043)', async () => {
    const { getByText, findByText } = render(
      <PreferencesProvider>
        <SettingsScreen navigation={{ getParent: jest.fn() }} />
      </PreferencesProvider>,
    );

    fireEvent.press(getByText('App Theme'));
    fireEvent.press(await findByText('High Contrast'));

    // Row sublabel follows the new preference once the modal closes.
    await waitFor(() => expect(getByText('High Contrast')).toBeTruthy());
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
      'SECURE_THEME_PREFERENCE',
      'high-contrast',
    );
  });
});
