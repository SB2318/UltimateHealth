/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
 
import { ErrorBoundary } from '../../components/common/ErrorBoundary';
import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  View,
  Image,
  useWindowDimensions,
  useColorScheme,
  DeviceEventEmitter,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import {PodcastDetailScreenProp} from '../../schemas/type';
import {PRIMARY_COLOR} from '../../lib/ui/Theme';
import Slider from '../../components/podcast/SliderCompat';
import {GlassStyles} from '../../styles/GlassStyles';

import {useAudioPlayer, type AudioPlayer, setAudioModeAsync} from 'expo-audio';

// GET_IMAGE is defined as `${PROD_URL}/getfile` (resolves to absolute URL: https://ultimatehealth.blog/api/getfile).
// This absolute, securely-configured endpoint ensures that relative resource paths cannot access local device files via traversal.
import {GET_IMAGE} from '../../lib/api/APIUtils';
import {useAppSelector} from '../../store/hooks';

import {downloadAudio, formatCount, msToTime, StatusEnum} from '../../lib/utils/Utils';
import {generatePodcastShareUrl} from '../../lib/utils/shareUtils';
import Snackbar from 'react-native-snackbar';
import AntDesign from '@expo/vector-icons/AntDesign';
import Share from 'react-native-share';
import {fp} from '../../lib/ui/Metric';
import {useSocket} from '../../contexts/SocketContext';
import {Feather} from '@expo/vector-icons';
import Loader from '../../components/common/Loader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import PodcastDetailSkeleton from '../../components/podcast/PodcastDetailSkeleton';
import {Theme, XStack, YStack, Text, ScrollView} from 'tamagui';
import LottieView from 'lottie-react-native';
import AudioWaveform from '../../components/podcast/AudioWaveform';
import {useGetSinglePodcastDetails} from '../../hooks/podcast/useGetSinglePodcastDetails';
import {useLikePodcast} from '../../hooks/podcast/useLikePodcast';
import {useGetEpisodePodcasts} from '../../hooks/podcast/useGetEpisodePodcasts';
import {useGetAllPodcasts} from '../../hooks/podcast/useGetAllPodcasts';
import StructuredPodcastCard from '../../components/podcast/StructuredPodcastCard';
import {getPlaybackPosition, savePlaybackPosition} from '../../lib/platform/PlaybackManager';

const isAllowedUrl = (urlStr?: string | null): boolean => {
  if (!urlStr) return false;
  if (!urlStr.startsWith('http://') && !urlStr.startsWith('https://')) {
    // allow ONLY relative paths
    if (urlStr.includes('://')) return false;
    return true;
  }
  try {
    const match = urlStr.match(/^https?:\/\/([^/?#:]+)/i);
    if (!match) return false;
    const hostname = match[1].toLowerCase();
    return (
      hostname === 'ultimatehealth.blog' ||
      hostname === 'localhost' ||
      hostname === '10.0.2.2'
    );
  } catch (e) {
    return false;
  }
};

const PLAYBACK_SPEEDS = [1.0, 1.25, 1.5, 2.0];

const PodcastDetail = ({navigation, route}: PodcastDetailScreenProp) => {
  let insets = {top: 0, bottom: 0, left: 0, right: 0};
try {
  insets = useSafeAreaInsets();
} catch (_e) {}
  const isDark = useColorScheme() === 'dark';
  const {trackId, audioUrl} = route.params;
 
  const {width, height} = useWindowDimensions();
  const isLandscape = width > height;
  const isTablet = width >= 768;
  const useSplitLayout = isLandscape || isTablet;

  const [playing, setIsPlaying] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const socket = useSocket();
  const {user_token, user_id, user_handle, isGuest} = useAppSelector(
    (state: any) => state.user,
  );
  const {isConnected} = useAppSelector((state: any) => state.network);
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  useEffect(() => {
    const sub = DeviceEventEmitter.addListener(
      'podcast-download-progress',
      (event: any) => {
        if (event && event.podcastId === trackId) {
          if (event.status === 'starting' || event.status === 'downloading') {
            setIsDownloading(true);
            setDownloadProgress(typeof event.progress === 'number' ? event.progress : 0);
          } else {
            setIsDownloading(false);
            setDownloadProgress(null);
          }
        }
      },
    );
    return () => sub.remove();
  }, [trackId]);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [networkPaused, setNetworkPaused] = useState(false);
  const [isWaitingForNetwork, setIsWaitingForNetwork] = useState(false);
  const [resumePosition, setResumePosition] = useState<number | null>(null);
  const resumeAttemptedRef = useRef(false);

  const [isLike, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [speed, setSpeed] = useState(1.0);
  const cardStyle = isDark ? GlassStyles.glassContainerDark : styles.cardLight;
  const bgColor = isDark ? '#0B1425' : '#F8FAFC';
  const actionIconColor = isDark ? '#FFFFFF' : '#334155';

  const {data: podcast, refetch, isLoading: isPodcastLoading, isError: isPodcastError, error: podcastError} = useGetSinglePodcastDetails(trackId);
  const {mutate: likePodcast, isPending: likePodcastPending} = useLikePodcast();

  const episodeId = podcast?.episode_id
    ? (typeof podcast.episode_id === 'string'
        ? podcast.episode_id
        : (podcast.episode_id as any)?._id || (podcast.episode_id as any)?.id)
    : (podcast as any)?.episodeId;

  const {data: episodePodcasts = []} = useGetEpisodePodcasts(episodeId || undefined);

  const relatedSeriesEpisodes = (episodePodcasts || []).filter(
    (ep: PodcastData) => ep._id !== trackId && ep._id !== podcast?._id
  );

  const defaultFallback = require('../../../assets/sounds/funny-cartoon-sound-397415.mp3');

  const getFormattedSource = (url?: string | null) => {
    if (!url) return null;
    if (!isAllowedUrl(url)) {
      console.warn('Blocked untrusted media URL:', url);
      return null;
    }
    return url.startsWith('http') ? url : `${GET_IMAGE}/${url}`;
  };

  const initialSource = getFormattedSource(audioUrl) ?? defaultFallback;
  const [loadedSource, setLoadedSource] = useState<string | number>(initialSource);

  const isRemoteSource =
    typeof loadedSource === 'string' && loadedSource.startsWith('http');

  // only initialize once a valid uri exists
  const player = useAudioPlayer(initialSource) as AudioPlayer & {
    setRateAsync: (rate: number, shouldPlay: boolean, pitchCorrectionQuality: string) => Promise<void>;
  };

  useEffect(() => {
    if (podcast?.audio_url) {
      const secureSource = getFormattedSource(podcast.audio_url);
      if (secureSource && secureSource !== loadedSource) {
        try {
          player.replace(secureSource);
          setLoadedSource(secureSource);
        } catch (err) {
          console.warn('Failed to replace player source:', err);
        }
      }
    }
  }, [podcast?.audio_url, player, loadedSource]);

  const saveCurrentPlaybackPosition = () => {
    const currentTime =
      player?.currentTime ?? player?.currentStatus?.currentTime ?? position;
    setResumePosition(currentTime);
    return currentTime;
  };

  const pauseForNetworkLoss = async () => {
    if (!player) return;
    saveCurrentPlaybackPosition();

    try {
      player.pause();
    } catch (err) {
      console.warn('Error pausing playback on network loss:', err);
    }

    setIsPlaying(false);
    setNetworkPaused(true);
    setIsWaitingForNetwork(true);
    resumeAttemptedRef.current = false;
  };

  const handlePlaybackError = async (error: unknown) => {
    const message =
      error instanceof Error ? error.message : String(error ?? 'Unknown error');
    const isNetworkError =
      !isConnected || /network|timeout|offline|connection|unreachable/i.test(message);

    if (isNetworkError && player?.playing && isRemoteSource) {
      await pauseForNetworkLoss();
      Snackbar.show({
        text: 'Playback paused because network was lost. Waiting for reconnection.',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }

    console.error('Playback error:', error);
    Snackbar.show({
      text: 'Playback error. Please try again.',
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  const restorePlaybackPosition = async (currentTime: number) => {
    if (!player || currentTime <= 0) return;
    try {
      await player.seekTo(currentTime);
      setPosition(currentTime);
    } catch (err) {
      console.warn('Failed to restore playback position after reconnect:', err);
    }
  };

  const attemptAutoResume = async () => {
    if (!player || !networkPaused || !isConnected || resumeAttemptedRef.current) return;
    resumeAttemptedRef.current = true;

    const resumeAt = resumePosition ?? player.currentTime ?? player.currentStatus?.currentTime ?? 0;
    await restorePlaybackPosition(resumeAt);

    try {
      await player.play();
      setIsPlaying(true);
      setNetworkPaused(false);
      setIsWaitingForNetwork(false);
    } catch (err) {
      console.warn('Auto-resume playback failed after reconnect:', err);
    }
  };

useEffect(() => {
  if (!player) return;

  if (!isConnected && player.playing && isRemoteSource) {
    void pauseForNetworkLoss();
    return;
  }

  if (isConnected && networkPaused && !resumeAttemptedRef.current) {
    void attemptAutoResume();
    return;
  }

  if (isConnected && isWaitingForNetwork && !networkPaused) {
    setIsWaitingForNetwork(false);
  }
}, [
  isConnected,
  networkPaused,
  player,
  isRemoteSource,
  isWaitingForNetwork,
]);

// Listen to native player status updates if available
useEffect(() => {
  if (!player || typeof (player as any).addListener !== 'function') return;

  let subscription: any;
  try {
    subscription = (player as any).addListener('playbackStatusUpdate', (status: any) => {
      if (!status) return;

      if (typeof status.currentTime === 'number') {
        setPosition(status.currentTime);
      }
      if (typeof status.duration === 'number' && status.duration > 0) {
        setDuration(status.duration);
      }

      const isFinished =
        status.didJustFinish === true ||
        (status.duration > 1 && status.currentTime >= status.duration - 0.3);

      if (isFinished) {
        setIsPlaying(false);
        savePlaybackPosition(trackId, 0, status.duration || 1);
      } else if (typeof status.playing === 'boolean') {
        setIsPlaying(status.playing);
      }
    });
  } catch (err) {
    console.warn('Failed to add playbackStatusUpdate listener:', err);
  }

  return () => {
    if (subscription && typeof subscription.remove === 'function') {
      subscription.remove();
    }
  };
}, [player, trackId]);

useEffect(() => {
  let lastSaveTime = 0;

  const interval = setInterval(() => {
    if (!player) return;

    const status = player.currentStatus;
    const currentPos = player.currentTime ?? status?.currentTime;
    const totalDur = player.duration ?? status?.duration;

    if (typeof totalDur === 'number' && totalDur > 0) {
      setDuration(totalDur);
    }
    if (typeof currentPos === 'number') {
      setPosition(currentPos);
    }

    // Check if podcast playback finished / is over
    const isFinished =
      status?.didJustFinish === true ||
      (typeof totalDur === 'number' &&
        typeof currentPos === 'number' &&
        totalDur > 1 &&
        currentPos >= totalDur - 0.3);

    if (isFinished) {
      setIsPlaying(false);
      savePlaybackPosition(trackId, 0, totalDur || 1);
      return;
    }

    // Save playback position every 5 seconds while playing
    if (playing || player.playing || status?.playing) {
      const now = Date.now();

      if (now - lastSaveTime > 5000 && typeof currentPos === 'number') {
        savePlaybackPosition(trackId, currentPos, totalDur || 0);
        lastSaveTime = now;
      }
    }
  }, 250);

  return () => clearInterval(interval);
}, [player, trackId, playing]);

// Check for saved position on mount
useEffect(() => {
  if (!player) return;

  let isCancelled = false;

  const checkResume = async () => {
    const saved = await getPlaybackPosition(trackId);

    if (!isCancelled && saved && saved.position > 5) {
      Alert.alert(
        'Resume Podcast',
        `Do you want to resume from ${formatSecTime(saved.position)}?`,
        [
          {
            text: 'Start Over',
            style: 'cancel',
            onPress: async () => {
              await player.seekTo(0);
              setPosition(0);
            },
          },
          {
            text: 'Resume',
            onPress: async () => {
              await player.seekTo(saved.position);
              setPosition(saved.position);
              player.play();
              setIsPlaying(true);
            },
          },
        ]
      );
    }
  };

  const timeout = setTimeout(() => {
    void checkResume();
  }, 500);

  return () => {
    isCancelled = true;
    clearTimeout(timeout);
  };
}, [player, trackId]);

  useEffect(()=>{

    if(podcast){
      setLike(podcast.likedUsers.includes(user_id));
      setLikeCount(podcast.likedUsers.length);
    }
  }, [podcast, user_id])

  const handleSpeedChange = React.useCallback(async () => {
    if (!player) return;

    const currentIndex = PLAYBACK_SPEEDS.indexOf(speed);
    const nextIndex = (currentIndex + 1) % PLAYBACK_SPEEDS.length;
    const nextSpeed = PLAYBACK_SPEEDS[nextIndex];

    try {
      await player.setRateAsync(nextSpeed, playing, 'high');
      setSpeed(nextSpeed);
    } catch (err) {
      console.warn('Failed to set playback rate:', err);
      Snackbar.show({
        text: 'Failed to change playback speed. Please try again.',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }, [player, playing, speed]);

  const SKIP_TIME = 5; // seconds

  const handleForward = async () => {
    if (!player) return;

    let next = position + SKIP_TIME;

    if (next > duration) {
      next = duration;
    }

    await player.seekTo(next);
    setPosition(next);
  };

  const handleBackward = async () => {
    if (!player) return;

    let next = position - SKIP_TIME;

    if (next < 0) {
      next = 0;
    }

    await player.seekTo(next);
    setPosition(next);
  };

  const formatSecTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${mins < 10 ? '0' : ''}${mins}:${
        secs < 10 ? '0' : ''
      }${secs}`;
    } else {
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
  };
  // For position update (removed redundant interval)

  const handleShare = async () => {
    try {
      const url = generatePodcastShareUrl(
         podcast?._id ?? '',
         podcast?.audio_url ?? '',
      );
      await Share.open({
        title: podcast?.title,
        message: `${podcast?.title} : Check out this awesome podcast on UltimateHealth app!`,
        // Most Recent APK: 0.7.4
        url: url,
        subject: 'Podcast Sharing',
      });
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while sharing.');

      // dispatch(
      //   showAlert({
      //     title: 'Error!',
      //     message: 'Something went wrong while sharing.',
      //   }),
      // );
    }
  };

  const handlePlay = async () => {
    if (!player || !isConnected) {
      return;
    }

    if (!isConnected && isRemoteSource) {
      setIsWaitingForNetwork(true);
      Snackbar.show({
        text: 'Waiting for network to resume playback.',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }

    try {
      const current = player.currentTime ?? player.currentStatus?.currentTime ?? position;
      const total = player.duration ?? player.currentStatus?.duration ?? duration;
      if (total > 1 && current >= total - 0.5) {
        await player.seekTo(0);
        setPosition(0);
      }

      await player.play();
      setIsPlaying(true);
      setNetworkPaused(false);
      setIsWaitingForNetwork(false);
      resumeAttemptedRef.current = false;
    } catch (err) {
      await handlePlaybackError(err);
    }
  };

 const handlePause = async () => {
  if (!player) return;

  try {
    player.pause();

    // Save exact playback position when user pauses
    await savePlaybackPosition(
      trackId,
      player.currentTime || 0,
      player.duration || 1
    );
  } catch (err) {
    console.warn('Error pausing playback:', err);
  }

  setIsPlaying(false);
  setNetworkPaused(false);
  setIsWaitingForNetwork(false);
  resumeAttemptedRef.current = false;
};
  
 if (isPodcastLoading) {
    return <Loader />;
  }

  if (isPodcastError || !podcast) {
    return (
      <View
        testID="podcast-detail-error"
        style={[styles.errorContainer, { backgroundColor: isDark ? '#0B1425' : '#F8FAFC' }]}>
        <TouchableOpacity
          testID="podcast-screen-back-button"
          accessibilityRole="button"
          accessibilityLabel="Go back"
          accessibilityHint="Navigates back to the previous screen"
          onPress={() => navigation.goBack()}
          style={[
            styles.screenBackButton,
            isDark ? styles.screenBackButtonDark : styles.screenBackButtonLight,
            { alignSelf: 'flex-start', marginBottom: 20 },
          ]}>
          <Ionicons name="arrow-back" size={22} color={isDark ? '#F1F5F9' : '#0F172A'} />
        </TouchableOpacity>
        <Text color={isDark ? '#F1F5F9' : '#0F172A'} fontSize={18} fontWeight="700">
          Unable to load podcast details.
        </Text>
        <Text color={isDark ? '#94A3B8' : '#64748B'} fontSize={14} marginTop="$2">
          {podcastError instanceof Error ? podcastError.message : 'Please try again later.'}
        </Text>

        <TouchableOpacity
          testID="podcast-detail-retry-button"
          accessibilityLabel="Retry loading podcast details"
          accessibilityRole="button"
          accessibilityHint="Attempts to load the podcast details again"
          style={styles.retryButton}
          onPress={() => {
            refetch();
          }}>
          <Text color="#0B1425" fontSize={16} fontWeight="800">
            Retry
          </Text>
        </TouchableOpacity>
      </View>
    );
  }


  const coverImageEl = (
    <Image
      testID="podcast-cover-image"
      source={{
        uri: getFormattedSource(podcast.cover_image) ?? undefined,
      }}
      style={useSplitLayout ? styles.coverImageLandscape : styles.coverImage}
      accessible={true}
      accessibilityLabel={`Podcast cover image for ${podcast?.title}`}
    />
  );

  const topBarEl = (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal="$2"
      paddingBottom="$2"
      width="100%">
      <TouchableOpacity
        testID="podcast-screen-back-button"
        accessibilityRole="button"
        accessibilityLabel="Go back"
        accessibilityHint="Navigates back to the previous screen"
        onPress={() => navigation.goBack()}
        style={[
          styles.screenBackButton,
          isDark ? styles.screenBackButtonDark : styles.screenBackButtonLight,
        ]}>
        <Ionicons name="arrow-back" size={22} color={isDark ? '#F1F5F9' : '#0F172A'} />
      </TouchableOpacity>

      <Text
        color={isDark ? '#F1F5F9' : '#0F172A'}
        fontSize={16}
        fontWeight="700"
        numberOfLines={1}
        flex={1}
        textAlign="center"
        marginHorizontal="$3">
        Podcast Details
      </Text>

      <View style={{ width: 40 }} />
    </XStack>
  );

  const titleEl = (
    <Text
      color={isDark ? '#F1F5F9' : '#0F172A'}
      fontSize={isTablet ? 26 : 22}
      lineHeight={isTablet ? 32 : 28}
      fontWeight="800"
      style={{ flexShrink: 1 }}>
      {podcast?.title}
    </Text>
  );

  const description = podcast?.description || '';
  const shouldTruncate = description.length > 180;
  const displayDescription = (shouldTruncate && !isDescriptionExpanded)
    ? `${description.slice(0, 180)}...`
    : description;

  const descriptionEl = (
    <YStack>
      <Text
        color={isDark ? '#CBD5E1' : '#475569'}
        fontSize={isTablet ? 15 : 14}
        lineHeight={20}
        marginTop="$2"
        style={{ flexShrink: 1 }}>
        {displayDescription}
      </Text>
      {shouldTruncate && (
        <TouchableOpacity
          testID="description-toggle-button"
          accessibilityLabel={isDescriptionExpanded ? "Read Less" : "Read More"}
          accessibilityRole="button"
          accessibilityHint="Toggles between expanding and collapsing the full podcast description text"
          accessibilityState={{expanded: isDescriptionExpanded}}
          onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
          style={styles.readMoreButton}
        >
          <Text color={PRIMARY_COLOR} fontSize={14} fontWeight="700">
            {isDescriptionExpanded ? 'Read Less' : 'Read More'}
          </Text>
        </TouchableOpacity>
      )}
    </YStack>
  );

  const visualizerEl = (
    <YStack alignItems="center" width="100%">
      <View
        accessible={true}
        accessibilityLabel="Audio waveform visualizer"
        accessibilityHint={playing ? "Currently animating, audio is playing" : "Currently paused"}
        style={[
          styles.visualizerContainer,
          cardStyle,
        ]}>
        <AudioWaveform isPlaying={playing} accentColor="#4F46E5" />
      </View>
    </YStack>
  );


  const offlineBannerEl = !isConnected && (
    <View style={styles.offlineBanner}>
      <Text color="#FFFFFF" fontSize={14} fontWeight="600">
        You are offline. Audio playback unavailable.
      </Text>

      <TouchableOpacity
        style={styles.retryAudioButton}
        accessibilityRole="button"
        accessibilityLabel="Retry audio playback"
        accessibilityHint="Attempts to reconnect and reload the podcast"
        onPress={() => {
          refetch();
        }}>
        <Text color="#0B1425" fontWeight="700">
          Retry
        </Text>
      </TouchableOpacity>
    </View>
  );

  const sliderEl = (
    <View
      style={[styles.sliderContainer, cardStyle]}>
      <Slider
        testID="podcast-progress-slider"
        accessibilityLabel="Podcast playback progress"
        accessibilityHint="Adjusts the current playback position"
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        minimumTrackTintColor={PRIMARY_COLOR}
        maximumTrackTintColor={isDark ? '#475569' : '#CBD5E1'}
        thumbTintColor={PRIMARY_COLOR}
        onSlidingComplete={async v => {
          if (player) {
            await player.seekTo(v);
            setPosition(v);
          }
        }}
      />

      <XStack
        justifyContent="space-between"
        marginTop="$1.5"
        paddingHorizontal="$2">
        <Text color={isDark ? '#C0C9DA' : '#64748B'} fontSize={13} fontWeight="600">
          {formatSecTime(position)}
        </Text>
        <Text color={isDark ? '#C0C9DA' : '#64748B'} fontSize={13} fontWeight="600">
          {formatSecTime(duration)}
        </Text>
      </XStack>
    </View>
  );

  const controlsEl = (
    <View
      style={[styles.controlsContainer, cardStyle]}>
      <XStack justifyContent="space-around" alignItems="center" width="100%">
        <TouchableOpacity
          testID="podcast-back-button"
          accessibilityLabel="Rewind 5 seconds"
          accessibilityRole="button"
          accessibilityHint="Moves playback backward by 5 seconds"
          disabled={!isConnected}
          onPress={handleBackward}
          style={[styles.controlButton, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#F1F5F9' }]}>
          <Ionicons name="play-back" size={isTablet ? 30 : 24} color={isDark ? '#9BB3C8' : '#475569'} />
        </TouchableOpacity>

        <TouchableOpacity
          testID="podcast-play-pause-button"
          accessibilityLabel={playing ? "Pause podcast" : "Play podcast"}
          accessibilityRole="button"
          accessibilityHint={playing ? "Pauses the podcast" : "Starts playing the podcast"}
          accessibilityState={{disabled: !isConnected}}
          disabled={!isConnected}
          onPress={() => (playing ? handlePause() : handlePlay())}
          style={[styles.mainPlayButton, !isConnected && { opacity: 0.6 }]}>
          {playing ? (
            <Ionicons name="pause" size={isTablet ? 36 : 30} color="white" />
          ) : (
            <Ionicons name="play" size={isTablet ? 36 : 30} color="white" style={{ marginLeft: 3 }} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          testID="podcast-forward-button"
          accessibilityLabel="Forward 5 seconds"
          accessibilityRole="button"
          accessibilityHint="Moves playback forward by 5 seconds"
          disabled={!isConnected}
          onPress={handleForward}
          style={[styles.controlButton, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#F1F5F9' }]}>
          <Ionicons name="play-forward" size={isTablet ? 30 : 24} color={isDark ? '#9BB3C8' : '#475569'} />
        </TouchableOpacity>

        <TouchableOpacity
          testID="podcast-speed-button"
          accessibilityLabel={`Playback speed: ${speed}x`}
          accessibilityRole="button"
          accessibilityHint="Changes the podcast playback speed"
          onPress={handleSpeedChange}
          style={{ marginLeft: 4 }}>
          <XStack
            backgroundColor={isDark ? 'rgba(255,255,255,0.1)' : '#E2E8F0'}
            paddingHorizontal="$2.5"
            paddingVertical="$1.5"
            borderRadius="$4"
            alignItems="center"
            justifyContent="center">
            <Text color={isDark ? '#F1F5F9' : '#0F172A'} fontSize={13} fontWeight="800">
              {speed}x
            </Text>
          </XStack>
        </TouchableOpacity>
      </XStack>
    </View>
  );

  const downloadProgressBarEl = isDownloading && downloadProgress !== null ? (
    <View
      style={[
        styles.downloadCard,
        {
          backgroundColor: isDark ? '#111C38' : '#EFF6FF',
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#BFDBFE',
        },
      ]}>
      <XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
        <XStack alignItems="center" gap="$2">
          <Ionicons name="cloud-download-outline" size={18} color={PRIMARY_COLOR} />
          <Text color={isDark ? '#F1F5F9' : '#1E40AF'} fontSize={13} fontWeight="700">
            Downloading for offline listening...
          </Text>
        </XStack>
        <Text color={isDark ? '#60A5FA' : '#2563EB'} fontSize={13} fontWeight="800">
          {`${Math.round(downloadProgress * 100)}%`}
        </Text>
      </XStack>
      <View style={styles.downloadTrack}>
        <View
          style={[
            styles.downloadFill,
            {
              width: `${Math.max(5, Math.round(downloadProgress * 100))}%`,
              backgroundColor: PRIMARY_COLOR,
            },
          ]}
        />
      </View>
    </View>
  ) : null;

  const actionsEl = podcast && podcast.status === StatusEnum.PUBLISHED ? (
    <View
      style={[styles.actionsContainer, cardStyle]}>
      <XStack alignItems="center" justifyContent="space-around" width="100%">
        {/* LIKE */}
        {likePodcastPending ? (
          <LoadingSpinner size="small" />
        ) : (
          <TouchableOpacity
            style={styles.actionButton}
            accessibilityRole="button"
            accessibilityLabel={isLike ? `Unlike podcast${likeCount > 0 ? `, ${formatCount(likeCount)} likes` : ''}` : `Like podcast${likeCount > 0 ? `, ${formatCount(likeCount)} likes` : ''}`}
            accessibilityHint={isGuest ? "Requires sign in to like this podcast" : "Likes or unlikes this podcast"}
            accessibilityState={{selected: isLike}}
            onPress={() => {
              if (isGuest) {
                navigation.navigate('GuestPlaceholderScreen', {
                  title: 'Sign In Required',
                  description: 'Please sign in or sign up to like this podcast.',
                  iconName: 'heart',
                });
                return;
              }
              likePodcast(trackId, {
                onSuccess: data => {
                  if (data?.likeStatus && podcast) {
                    if (socket) {
                      socket.emit('notification', {
                        type: 'likePost',
                        userId: user_id,
                        articleId: null,
                        podcastId: podcast._id,
                        articleRecordId: null,
                        title: `${user_handle} liked your post`,
                        message: podcast.title,
                      });
                    }
                  }
                  refetch();
                },
                onError: err => {
                  console.log('Update like count err', err);
                  Snackbar.show({
                    text: 'Something went wrong!',
                    duration: Snackbar.LENGTH_SHORT,
                  });
                },
              });
            }}>
            {isLike ? (
              <AntDesign name="heart" size={24} color={PRIMARY_COLOR} />
            ) : (
              <Feather name="heart" size={24} color={actionIconColor} />
            )}
            <Text style={[styles.actionText, { color: actionIconColor }]}>
              {likeCount > 0 ? formatCount(likeCount) : ''}
            </Text>
          </TouchableOpacity>
        )}

        {/* DOWNLOAD */}
        {downloadLoading || isDownloading ? (
          <LoadingSpinner size="small" />
        ) : (
          <TouchableOpacity
            style={styles.actionButton}
            accessibilityRole="button"
            accessibilityLabel="Download podcast"
            accessibilityHint={isGuest ? "Requires sign in to download this podcast" : "Downloads this podcast for offline listening"}
            onPress={async () => {
              if (isGuest) {
                navigation.navigate('GuestPlaceholderScreen', {
                  title: 'Sign In Required',
                  description: 'Please sign in or sign up to download podcasts.',
                  iconName: 'download',
                });
                return;
              }
              if (!podcast) {
                Snackbar.show({
                  text: 'Something went wrong! try again',
                  duration: Snackbar.LENGTH_SHORT,
                });
                return;
              }

              setDownloadLoading(true);
              const res = await downloadAudio(podcast);
              setDownloadLoading(false);

              Snackbar.show({
                text: res?.message ?? 'Audio downloaded successfully!',
                duration: Snackbar.LENGTH_SHORT,
              });
            }}>
            <Ionicons name="download-outline" size={24} color={actionIconColor} />
          </TouchableOpacity>
        )}

        {/* COMMENTS */}
        <TouchableOpacity
          style={styles.actionButton}
          accessibilityRole="button"
          accessibilityLabel={`Podcast comments${podcast?.commentCount ? `, ${formatCount(podcast.commentCount)} comments` : ''}`}
          accessibilityHint={isGuest ? "Requires sign in to view and post comments" : "Opens the podcast comments"}
          onPress={() => {
            if (isGuest) {
              navigation.navigate('GuestPlaceholderScreen', {
                title: 'Sign In Required',
                description: 'Please sign in or sign up to view and post comments.',
                iconName: 'comment',
              });
              return;
            }
            if (!isConnected) {
              Snackbar.show({
                text: 'You are currently offline',
                duration: Snackbar.LENGTH_SHORT,
              });
              return;
            }

            if (podcast) {
              navigation.navigate('PodcastDiscussion', {
                podcastId: podcast._id,
                mentionedUsers: podcast.mentionedUsers || [],
              });
            }
          }}>
          <Ionicons name="chatbubble-outline" size={24} color={actionIconColor} />
          <Text style={[styles.actionText, { color: actionIconColor }]}>
            {podcast?.commentCount
              ? formatCount(podcast.commentCount)
              : 0}
          </Text>
        </TouchableOpacity>

        {/* SHARE */}
        <TouchableOpacity
          style={styles.actionButton}
          accessibilityRole="button"
          accessibilityLabel="Share podcast"
          accessibilityHint="Opens sharing options for this podcast"
          onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color={actionIconColor} />
        </TouchableOpacity>
      </XStack>
    </View>
  ) : (
    <XStack></XStack>
  );

  const seriesName = podcast?.episode_id && typeof podcast.episode_id === 'object'
    ? (podcast.episode_id as any)?.name
    : null;

  const relatedEpisodesEl = relatedSeriesEpisodes.length > 0 ? (
    <YStack marginTop="$4" marginBottom="$4">
      <XStack justifyContent="space-between" alignItems="center" marginBottom="$2.5" paddingHorizontal="$1">
        <Text color={isDark ? '#F1F5F9' : '#0F172A'} fontSize={16} fontWeight="700">
          {seriesName ? `More from ${seriesName}` : 'Episodes in this Series'}
        </Text>
        <Text color={PRIMARY_COLOR} fontSize={13} fontWeight="600">
          {relatedSeriesEpisodes.length} more
        </Text>
      </XStack>

      <YStack gap="$2">
        {relatedSeriesEpisodes.map((ep: PodcastData) => (
          <TouchableOpacity
            key={ep._id}
            onPress={() => {
              navigation.replace('PodcastDetail', {
                trackId: ep._id,
                audioUrl: ep.audio_url,
              });
            }}
            style={[
              styles.relatedEpisodeCard,
              cardStyle,
            ]}>
            <XStack alignItems="center" gap="$3">
              <Image
                source={{
                  uri: ep.cover_image
                    ? (ep.cover_image.startsWith('http') ? ep.cover_image : `${GET_IMAGE}/${ep.cover_image}`)
                    : 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                }}
                style={styles.relatedEpisodeThumb}
              />
              <YStack flex={1}>
                {ep.episode_number ? (
                  <Text color={PRIMARY_COLOR} fontSize={11} fontWeight="700">
                    EPISODE {ep.episode_number}
                  </Text>
                ) : null}
                <Text color={isDark ? '#F1F5F9' : '#0F172A'} fontSize={14} fontWeight="700" numberOfLines={1}>
                  {ep.title}
                </Text>
                <Text color={isDark ? '#94A3B8' : '#64748B'} fontSize={12} numberOfLines={1}>
                  {ep.duration ? msToTime(ep.duration) : 'Audio'} • {ep.user_id?.user_name || 'Host'}
                </Text>
              </YStack>
              <View style={styles.relatedPlayIcon}>
                <Ionicons name="play" size={14} color="white" style={{marginLeft: 2}} />
              </View>
            </XStack>
          </TouchableOpacity>
        ))}
      </YStack>
    </YStack>
  ) : null;

  const content = useSplitLayout ? (
    <XStack gap="$4" flex={1} paddingHorizontal="$2">
      {/* Left Column: Artwork Image and Visualizer */}
      <YStack width={isTablet ? 340 : '42%'} gap="$4">
        <View style={[styles.titleContainer, cardStyle]}>
          {coverImageEl}
        </View>
        {visualizerEl}
      </YStack>

      {/* Right Column: Text Information, Slider, Controls, Actions */}
      <YStack flex={1} gap="$3">
        <View style={[styles.titleContainer, cardStyle]}>
          <YStack>
            <Text
              color={isDark ? '#94A3B8' : '#64748B'}
              fontSize={12}
              fontWeight="700"
              marginBottom="$1.5"
              letterSpacing={1.2}>
              NOW PLAYING
            </Text>
            {titleEl}
            {descriptionEl}
          </YStack>
        </View>
        {offlineBannerEl}
        {sliderEl}
        {controlsEl}
        {actionsEl}
        {relatedEpisodesEl}
      </YStack>
    </XStack>
  ) : (
    <YStack flexGrow={1} gap="$3">
      {/* TITLE with Glass / Card Effect */}
      <View style={[styles.titleContainer, cardStyle]}>
        {coverImageEl}
        <YStack>
          <Text
            color={isDark ? '#94A3B8' : '#64748B'}
            fontSize={12}
            fontWeight="700"
            marginBottom="$1.5"
            letterSpacing={1.2}>
            NOW PLAYING
          </Text>
          {titleEl}
          {descriptionEl}
        </YStack>
      </View>

      {visualizerEl}

      {offlineBannerEl}

      {/* SLIDER + TIME */}
      <YStack>
        {sliderEl}
      </YStack>

      {/* PLAYER BUTTONS */}
      {controlsEl}

      {/* FOOTER OPTIONS */}
      {actionsEl}

      {/* RELATED EPISODES IN SERIES */}
      {relatedEpisodesEl}
    </YStack>
  );

  return (
  <ErrorBoundary onRetry={() => refetch()}>
    <ScrollView
      backgroundColor={bgColor}
      contentContainerStyle={{ flexGrow: 1 } as any}
      showsVerticalScrollIndicator={false}
    >
      <Theme name={isDark ? 'dark' : 'light'}>
        <YStack
          flexGrow={1}
          backgroundColor={bgColor}
          paddingHorizontal="$3"
          paddingTop={Platform.OS === 'android' ? Math.max(insets.top, 10) : insets.top || 10}
          paddingBottom={Math.max(insets.bottom, 24)}
          gap="$2.5">
          {topBarEl}
          {isWaitingForNetwork && (
            <YStack
              backgroundColor={isDark ? '#1F2937' : '#FEF3C7'}
              borderColor={isDark ? '#374151' : '#FDE68A'}
              borderWidth={1}
              borderRadius="$6"
              padding="$3"
              marginBottom="$2"
              gap="$1">
              <Text color={isDark ? '#FBBF24' : '#D97706'} fontWeight="700">
                Waiting for network connection
              </Text>
              <Text color={isDark ? '#CBD5E1' : '#92400E'} fontSize={13}>
                Playback was paused because connectivity was lost. It will resume as soon as the network returns.
              </Text>
            </YStack>
          )}
          {content}
        </YStack>
      </Theme>
    </ScrollView>
  </ErrorBoundary>
  );
};

export default PodcastDetail;

const styles = StyleSheet.create({
  downloadCard: {
    width: '100%',
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginTop: 6,
  },
  downloadTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.08)',
    overflow: 'hidden',
    width: '100%',
  },
  downloadFill: {
    height: '100%',
    borderRadius: 3,
  },
  titleContainer: {
    padding: 16,
    borderRadius: 20,
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
  },
  waveContainer: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  visualizerContainer: {
    width: '100%',
    maxWidth: '100%',
    borderRadius: 20,
    padding: 10,
    overflow: 'hidden',
  },
  sliderContainer: {
    padding: 16,
    borderRadius: 20,
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
  },
  controlsContainer: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 24,
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainPlayButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#4ACDFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4ACDFF',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  actionsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 20,
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    flexDirection: 'row',
  },
  actionText: {
    fontSize: 13,
    marginStart: 4,
    fontWeight: '600',
  },
  cardLight: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  screenBackButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenBackButtonDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  screenBackButtonLight: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  container: {
    paddingHorizontal: 12,
    paddingTop: Platform.OS === 'android' ? 12 : 0,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  coverImage: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    marginBottom: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverImageLandscape: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
  },
  offlineBanner: {
    backgroundColor: '#7F1D1D',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    width: '100%',
  },
  retryAudioButton: {
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: PRIMARY_COLOR,
  },
  readMoreButton: {
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    minWidth: 100,
    minHeight: 44,
    justifyContent: 'center',
  },
  relatedEpisodeCard: {
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  relatedEpisodeThumb: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
  },
  relatedPlayIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
});