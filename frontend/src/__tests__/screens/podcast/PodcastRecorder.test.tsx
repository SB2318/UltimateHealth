// @ts-nocheck
import React from 'react';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import RNFS from 'react-native-fs';

import PodcastRecorder from '../../../screens/podcast/PodcastRecorder';

// Drive focus manually so a "return to this screen" can be simulated. Jest only
// allows `mock`-prefixed names to be referenced from a mock factory.
let mockFocusCallback: (() => void | (() => void)) | null = null;

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(cb => {
    const React = require('react');
    mockFocusCallback = cb;
    // The real hook runs the callback on focus and its return value on blur,
    // and re-runs whenever the callback identity changes.
    React.useEffect(cb, [cb]);
  }),
}));

const RECORDED_URI = '/mock/caches/take-1.m4a';

const mockRecorder = {
  prepareToRecordAsync: jest.fn(() => Promise.resolve()),
  record: jest.fn(),
  stop: jest.fn(() => Promise.resolve()),
  uri: RECORDED_URI,
};

jest.mock('expo-audio', () => ({
  useAudioRecorder: jest.fn(() => mockRecorder),
  useAudioRecorderState: jest.fn(() => ({durationMillis: 0})),
  setAudioModeAsync: jest.fn(),
  RecordingPresets: {HIGH_QUALITY: {}},
  AudioModule: {
    requestRecordingPermissionsAsync: jest.fn(() =>
      Promise.resolve({granted: true}),
    ),
  },
}));

jest.mock('@/modules/audio-module', () => ({}));

jest.mock('../../../lib/utils/Utils', () => ({
  requestStoragePermissions: jest.fn(() => Promise.resolve(true)),
}));

jest.mock('lottie-react-native', () => 'LottieView');

jest.mock('@expo/vector-icons/MaterialCommunityIcons', () => {
  const React = require('react');
  const {Text} = require('react-native');
  return ({name}: any) => React.createElement(Text, null, name);
});

jest.mock('tamagui', () => {
  const React = require('react');
  const {View, Text: RNText} = require('react-native');
  const passthrough =
    (Comp: any) =>
    ({children, onPress, ...rest}: any) =>
      React.createElement(
        Comp,
        {onPress, accessible: true, ...(onPress ? {onStartShouldSetResponder: () => true} : {})},
        children,
      );
  return {
    Theme: passthrough(View),
    XStack: passthrough(View),
    YStack: passthrough(View),
    Circle: passthrough(View),
    Text: ({children}: any) => React.createElement(RNText, null, children),
  };
});

const route = {
  params: {
    title: 'Sleep hygiene',
    description: 'A short episode',
    selectedGenres: [],
    imageUtils: null,
  },
};

const navigation = {navigate: jest.fn(), goBack: jest.fn()};

const renderScreen = () =>
  render(<PodcastRecorder navigation={navigation} route={route} />);

// The visible labels ("RECORD", "PLAY", ...) are siblings of the pressable
// circles, not children, so presses have to target the icon inside each circle.
// The Icon mock renders the icon name as text.
const ICON = {
  record: 'record-circle',
  stop: 'stop',
  play: 'play',
  retry: 'refresh',
};

const press = async (screen: any, icon: string) => {
  await act(async () => {
    fireEvent.press(screen.getByText(icon));
  });
};

/** Records a take so the screen sits in its "review" state. */
const recordATake = async (screen: any) => {
  await press(screen, ICON.record);
  await press(screen, ICON.stop);
};

describe('PodcastRecorder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFocusCallback = null;
    RNFS.exists.mockResolvedValue(true);
    RNFS.unlink.mockResolvedValue(undefined);
  });

  it('reaches the review state after recording and stopping', async () => {
    const screen = renderScreen();
    await recordATake(screen);

    // PLAY and RETRY only exist in the review state.
    await waitFor(() => expect(screen.getByText('PLAY')).toBeTruthy());
    expect(screen.getByText('RETRY')).toBeTruthy();
  });

  // The regression this file exists for: previewing a take used to destroy it.
  it('keeps the recording when the screen is refocused after previewing', async () => {
    const screen = renderScreen();
    await recordATake(screen);
    await waitFor(() => expect(screen.getByText('PLAY')).toBeTruthy());

    // Preview it, which navigates away…
    await press(screen, ICON.play);
    expect(navigation.navigate).toHaveBeenCalledWith(
      'PodcastPlayer',
      expect.objectContaining({filePath: RECORDED_URI}),
    );

    RNFS.unlink.mockClear();

    // …and come back. The file is still on disk.
    await act(async () => {
      mockFocusCallback?.();
    });

    // The take survives and is not deleted.
    await waitFor(() => expect(screen.getByText('PLAY')).toBeTruthy());
    expect(screen.getByText('RETRY')).toBeTruthy();
    expect(RNFS.unlink).not.toHaveBeenCalled();
  });

  it('clears the review state when the take is gone from disk', async () => {
    const screen = renderScreen();
    await recordATake(screen);
    await waitFor(() => expect(screen.getByText('PLAY')).toBeTruthy());

    // The player unlinks the file after a successful upload, so on return the
    // review controls would point at a path that no longer exists.
    RNFS.exists.mockResolvedValue(false);

    await act(async () => {
      mockFocusCallback?.();
    });

    await waitFor(() => expect(screen.queryByText('PLAY')).toBeNull());
    expect(screen.queryByText('RETRY')).toBeNull();
  });

  it('discards the take when the user presses RETRY', async () => {
    const screen = renderScreen();
    await recordATake(screen);
    await waitFor(() => expect(screen.getByText('RETRY')).toBeTruthy());

    await press(screen, ICON.retry);

    await waitFor(() => expect(RNFS.unlink).toHaveBeenCalledWith(RECORDED_URI));
    expect(screen.queryByText('PLAY')).toBeNull();
  });
});
