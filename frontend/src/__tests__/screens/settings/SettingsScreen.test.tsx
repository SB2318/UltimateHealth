import React from 'react';
import { render } from '@testing-library/react-native';
import SettingsScreen from '../../../screens/settings/SettingsScreen';

jest.mock('../../store/hooks', () => ({
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
    const { getByText } = render(<SettingsScreen navigation={{ getParent: jest.fn() }} />);
    expect(getByText('Settings')).toBeTruthy();
    expect(getByText('View / Edit Profile')).toBeTruthy();
    expect(getByText('Sign Out')).toBeTruthy();
  });
});
