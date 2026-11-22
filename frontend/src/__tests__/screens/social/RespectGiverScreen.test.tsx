import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
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

jest.mock('react-native-webview', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    WebView: ({ ...props }: any) => React.createElement(View, { testID: 'tribute-webview', ...props }),
  };
});

describe('RespectGiverScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders without crashing with Webview tribute tab active by default', () => {
    const { getByText, getByTestId } = render(
      <RespectGiverScreen navigation={{ goBack: jest.fn() }} />
    );
    expect(getByText('Respect Giver')).toBeTruthy();
    expect(getByText('Living Memorial')).toBeTruthy();
    expect(getByText('Dr. Moumita Tribute')).toBeTruthy();
    expect(getByTestId('tribute-webview')).toBeTruthy();
  });

  it('switches between Living Memorial and Dr. Moumita Tribute tabs', () => {
    const { getByText, queryByText } = render(
      <RespectGiverScreen navigation={{ goBack: jest.fn() }} />
    );

    // Initially in Web tab, Dr. Moumita hero text is in dedication tab
    expect(queryByText('Dr. Moumita Debnath')).toBeNull();

    // Switch to Dedication tab
    fireEvent.press(getByText('Dr. Moumita Tribute'));
    expect(getByText('Dr. Moumita Debnath')).toBeTruthy();
    expect(getByText('A Circle of Care')).toBeTruthy();
    expect(getByText('Living Memorial Series')).toBeTruthy();

    // Switch back to Web tab
    fireEvent.press(getByText('Living Memorial'));
    expect(queryByText('Dr. Moumita Debnath')).toBeNull();
  });
});
