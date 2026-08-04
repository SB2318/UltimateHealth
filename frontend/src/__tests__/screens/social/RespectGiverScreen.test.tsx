import React from 'react';
import { render } from '@testing-library/react-native';
import RespectGiverScreen from '../../../screens/social/RespectGiverScreen';

jest.mock('@expo/vector-icons/MaterialCommunityIcons', () => 'MaterialCommunityIcon');
jest.mock('@expo/vector-icons/MaterialIcons', () => 'MaterialIcons');

jest.mock('expo-linear-gradient', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    LinearGradient: ({ children, ...props }: any) =>
      React.createElement(View, props, children),
  };
});

jest.mock('expo-status-bar', () => ({
  StatusBar: () => null,
}));

describe('RespectGiverScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders without crashing', () => {
    const { getByText } = render(<RespectGiverScreen navigation={{ goBack: jest.fn() }} />);
    expect(getByText('Respect Giver')).toBeTruthy();
  });
});
