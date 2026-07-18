import React from 'react';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import {PreferencesProvider, usePreferences} from '../../contexts/PreferencesContext';
import {LanguagePreferenceSelector} from '../LanguagePreferenceSelector';

const mockStore: Record<string, string> = {};

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn((key: string) =>
    Promise.resolve(mockStore[key] ?? null)
  ),
  setItemAsync: jest.fn((key: string, value: string) => {
    mockStore[key] = value;
    return Promise.resolve();
  }),
  deleteItemAsync: jest.fn((key: string) => {
    delete mockStore[key];
    return Promise.resolve();
  }),
}));

jest.mock('@expo/vector-icons/MaterialIcons', () => {
  const ReactLib = require('react');
  const {Text} = require('react-native');
  const MockIcon = ({name}: {name: string}) =>
    ReactLib.createElement(Text, null, name);
  MockIcon.displayName = 'MaterialIcons';
  return MockIcon;
});

let capturedContext: ReturnType<typeof usePreferences> | null = null;

const ContextSpy: React.FC = () => {
  capturedContext = usePreferences();
  return null;
};

const renderSelector = () =>
  render(
    <PreferencesProvider>
      <ContextSpy />
      <LanguagePreferenceSelector />
    </PreferencesProvider>
  );

beforeEach(() => {
  Object.keys(mockStore).forEach(key => delete mockStore[key]);
  capturedContext = null;
});

describe('LanguagePreferenceSelector - lost-update race condition (#1538)', () => {
  it('keeps both chips selected when two different language chips are tapped in rapid succession', async () => {
    const {getByText} = renderSelector();
    await waitFor(() => expect(capturedContext?.isLoading).toBe(false));

    const hindiChip = getByText('Hindi');
    const tamilChip = getByText('Tamil');

    // Simulate rapid double-tap on two different chips within the same
    // tick, before either toggle's state update has committed — the
    // exact reproduction from the issue.
    act(() => {
      fireEvent.press(hindiChip);
      fireEvent.press(tamilChip);
    });

    await waitFor(() => {
      expect(capturedContext?.preferredLanguages).toEqual(
        expect.arrayContaining(['hi-IN', 'ta-IN'])
      );
      expect(capturedContext?.preferredLanguages).toHaveLength(2);
    });

    const persisted = JSON.parse(
      mockStore['SECURE_LANGUAGE_PREFERENCES'] ?? '[]'
    );
    expect(persisted).toEqual(expect.arrayContaining(['hi-IN', 'ta-IN']));
    expect(persisted).toHaveLength(2);
  });

  it('does not drop a selection when three chips are tapped back-to-back', async () => {
    const {getByText} = renderSelector();
    await waitFor(() => expect(capturedContext?.isLoading).toBe(false));

    act(() => {
      fireEvent.press(getByText('Hindi'));
      fireEvent.press(getByText('Tamil'));
      fireEvent.press(getByText('Bengali'));
    });

    await waitFor(() => {
      expect(capturedContext?.preferredLanguages).toHaveLength(3);
    });
    expect(capturedContext?.preferredLanguages).toEqual(
      expect.arrayContaining(['hi-IN', 'ta-IN', 'bn-IN'])
    );
  });
});