import React from 'react';
import {render, waitFor, act} from '@testing-library/react-native';
import {Text} from 'react-native';
import {PreferencesProvider, usePreferences} from '../PreferencesContext';

import * as SecureStore from 'expo-secure-store';

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

let capturedContext: ReturnType<typeof usePreferences> | null = null;

const TestHarness: React.FC = () => {
  const ctx = usePreferences();
   
  capturedContext = ctx;
  return <Text>{ctx.preferredLanguages.join(',')}</Text>;
};

const renderHarness = () =>
  render(
    <PreferencesProvider>
      <TestHarness />
    </PreferencesProvider>
  );

beforeEach(() => {
  Object.keys(mockStore).forEach(key => delete mockStore[key]);
  capturedContext = null;
  jest.clearAllMocks();
});

describe('PreferencesContext - lost-update race condition (#1538)', () => {
  it('keeps both languages when addLanguagePreference is fired twice without awaiting between calls', async () => {
    renderHarness();
    await waitFor(() => expect(capturedContext?.isLoading).toBe(false));

    // Fire both calls back-to-back, in the same tick, without awaiting
    // the first before starting the second — this is the exact
    // reproduction described in the issue.
    let p1: Promise<void>;
    let p2: Promise<void>;
    act(() => {
      p1 = capturedContext!.addLanguagePreference('hi-IN');
      p2 = capturedContext!.addLanguagePreference('ta-IN');
    });
    await act(async () => {
      await Promise.all([p1, p2]);
    });

    expect(capturedContext?.preferredLanguages).toEqual(
      expect.arrayContaining(['hi-IN', 'ta-IN'])
    );
    expect(capturedContext?.preferredLanguages).toHaveLength(2);

    // Persisted SecureStore record must also contain both — this is the
    // part that silently regressed before the fix even if in-memory
    // state happened to look right.
    const persisted = JSON.parse(
      mockStore['SECURE_LANGUAGE_PREFERENCES'] ?? '[]'
    );
    expect(persisted).toEqual(expect.arrayContaining(['hi-IN', 'ta-IN']));
    expect(persisted).toHaveLength(2);
  });

  it('does not drop an earlier toggle when three rapid adds interleave', async () => {
    renderHarness();
    await waitFor(() => expect(capturedContext?.isLoading).toBe(false));

    let promises: Promise<void>[] = [];
    act(() => {
      promises = [
        capturedContext!.addLanguagePreference('hi-IN'),
        capturedContext!.addLanguagePreference('ta-IN'),
        capturedContext!.addLanguagePreference('bn-IN'),
      ];
    });
    await act(async () => {
      await Promise.all(promises);
    });

    expect(capturedContext?.preferredLanguages).toEqual(
      expect.arrayContaining(['hi-IN', 'ta-IN', 'bn-IN'])
    );
    expect(capturedContext?.preferredLanguages).toHaveLength(3);

    const persisted = JSON.parse(
      mockStore['SECURE_LANGUAGE_PREFERENCES'] ?? '[]'
    );
    expect(persisted).toHaveLength(3);
  });

  it('removeLanguagePreference fired concurrently with addLanguagePreference resolves against latest state', async () => {
    renderHarness();
    await waitFor(() => expect(capturedContext?.isLoading).toBe(false));

    await act(async () => {
      await capturedContext!.addLanguagePreference('hi-IN');
    });

    let p1: Promise<void>;
    let p2: Promise<void>;
    act(() => {
      p1 = capturedContext!.addLanguagePreference('ta-IN');
      p2 = capturedContext!.removeLanguagePreference('hi-IN');
    });
    await act(async () => {
      await Promise.all([p1, p2]);
    });

    expect(capturedContext?.preferredLanguages).toEqual(['ta-IN']);

    const persisted = JSON.parse(
      mockStore['SECURE_LANGUAGE_PREFERENCES'] ?? '[]'
    );
    expect(persisted).toEqual(['ta-IN']);
  });

  it('persists writes in call order so a later-resolving I/O cannot overwrite a more recent state with a stale value', async () => {
    renderHarness();
    await waitFor(() => expect(capturedContext?.isLoading).toBe(false));

    // Make the first SecureStore write artificially slower than the
    // second, simulating an I/O timing inversion. Before the fix, this
    // alone (even with correct in-memory state) could let the slower
    // first write's persisted snapshot land after, and overwrite, the
    // second.
    const setItemAsyncMock = SecureStore.setItemAsync as jest.Mock;
    let callCount = 0;
    setItemAsyncMock.mockImplementation((key: string, value: string) => {
      callCount += 1;
      const delay = callCount === 1 ? 20 : 0;
      return new Promise(resolve =>
        setTimeout(() => {
          mockStore[key] = value;
          resolve(undefined);
        }, delay)
      );
    });

    let p1: Promise<void>;
    let p2: Promise<void>;
    act(() => {
      p1 = capturedContext!.addLanguagePreference('hi-IN');
      p2 = capturedContext!.addLanguagePreference('ta-IN');
    });
    await act(async () => {
      await Promise.all([p1, p2]);
    });

    const persisted = JSON.parse(
      mockStore['SECURE_LANGUAGE_PREFERENCES'] ?? '[]'
    );
    expect(persisted).toEqual(expect.arrayContaining(['hi-IN', 'ta-IN']));
    expect(persisted).toHaveLength(2);
  });

  it('setPreferredLanguages still accepts a plain array (non-functional callers)', async () => {
    renderHarness();
    await waitFor(() => expect(capturedContext?.isLoading).toBe(false));

    await act(async () => {
      await capturedContext!.setPreferredLanguages(['hi-IN', 'ta-IN']);
    });

    expect(capturedContext?.preferredLanguages).toEqual(['hi-IN', 'ta-IN']);
  });
});