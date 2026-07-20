// @ts-nocheck
import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import OfflinePodcastList from '../../../screens/podcast/OfflinePodcastList';
import {readDownloadedPodcasts, deleteFromDownloads} from '../../../helper/Utils';
import {useFocusEffect} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(fn => {
    const React = require('react');
    React.useEffect(fn, []);
  }),
}));

jest.mock('../../helper/Utils', () => ({
  readDownloadedPodcasts: jest.fn(),
  deleteFromDownloads: jest.fn(),
  msToTime: jest.fn(() => '05:00'),
}));

jest.mock('react-native-snackbar', () => ({
  show: jest.fn(),
  LENGTH_SHORT: 0,
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(() => ({user_id: 'user123'})),
  useDispatch: jest.fn(() => jest.fn()),
}));

jest.mock('../../components/PodcastCard', () => {
  const React = require('react');
  const {View, Text, TouchableOpacity} = require('react-native');
  return function MockPodcastCard(props: any) {
    return (
      <View testID={`podcast-card-${props.id}`}>
        <Text>{props.title}</Text>
        <TouchableOpacity testID={`delete-btn-${props.id}`} onPress={props.downLoadAudio}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };
});

jest.mock('../../components/EmptyStates', () => {
  const React = require('react');
  const {View, Text} = require('react-native');
  return {
    NoOfflinePodcastsState: () => <View testID="empty-state"><Text>No Offline Podcasts</Text></View>,
    OfflinePodcastLoadErrorState: (props: any) => (
      <View testID="error-state">
        <Text>{props.message}</Text>
      </View>
    ),
  };
});

jest.mock('../../components/CreatePlaylist', () => {
  const React = require('react');
  const {View} = require('react-native');
  return () => <View testID="create-playlist" />;
});

describe('OfflinePodcastList', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  };

  const mockPodcasts = [
    {
      _id: 'pod1',
      title: 'First Offline Podcast',
      audio_url: 'http://example.com/audio1.mp3',
      user_id: {user_name: 'Host 1'},
      viewUsers: [],
      duration: 300000,
      tags: [],
      filePath: '/path/to/pod1.mp3',
      downloadAt: new Date(),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads and renders cached offline podcasts', async () => {
    readDownloadedPodcasts.mockResolvedValue(mockPodcasts);

    const {getByText, getByTestId} = render(
      <OfflinePodcastList navigation={mockNavigation as any} />
    );

    await waitFor(() => {
      expect(readDownloadedPodcasts).toHaveBeenCalled();
      expect(getByText('First Offline Podcast')).toBeTruthy();
      expect(getByTestId('podcast-card-pod1')).toBeTruthy();
    });
  });

  it('triggers focus effect callback to reload podcasts when screen comes into focus', async () => {
    readDownloadedPodcasts.mockResolvedValue(mockPodcasts);

    render(<OfflinePodcastList navigation={mockNavigation as any} />);

    await waitFor(() => {
      expect(useFocusEffect).toHaveBeenCalled();
      expect(readDownloadedPodcasts).toHaveBeenCalled();
    });
  });

  it('removes podcast and reloads list on delete click', async () => {
    readDownloadedPodcasts.mockResolvedValue(mockPodcasts);
    deleteFromDownloads.mockResolvedValueOnce(true);

    const {getByTestId} = render(
      <OfflinePodcastList navigation={mockNavigation as any} />
    );

    await waitFor(() => {
      expect(getByTestId('delete-btn-pod1')).toBeTruthy();
    });

    readDownloadedPodcasts.mockResolvedValue([]);
    fireEvent.press(getByTestId('delete-btn-pod1'));

    await waitFor(() => {
      expect(deleteFromDownloads).toHaveBeenCalledWith(mockPodcasts[0]);
    });
  });

  it('renders error state when reading downloaded podcasts throws an error', async () => {
    readDownloadedPodcasts.mockRejectedValue(new Error('Storage failure'));

    const {getByTestId, getByText} = render(
      <OfflinePodcastList navigation={mockNavigation as any} />
    );

    await waitFor(() => {
      expect(getByTestId('error-state')).toBeTruthy();
      expect(
        getByText('Failed to load offline podcasts. Please try again or check your device storage.')
      ).toBeTruthy();
    });
  });
});
