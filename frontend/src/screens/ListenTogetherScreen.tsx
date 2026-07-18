/**
 * ListenTogetherScreen — Main screen for synchronized podcast listening.
 *
 * Hosts create a room; listeners join via a room code.  Both see a shared
 * podcast player (host controls) and a live chat overlay.
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Theme, XStack, YStack, Text, ScrollView} from 'tamagui';
import {Ionicons} from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
// useAudioPlayer is imported from expo-audio, ensuring standard audio playback compatibility
import {useAudioPlayer} from 'expo-audio';
import {useSelector} from 'react-redux';
import Snackbar from 'react-native-snackbar';

import {ListenTogetherScreenProp} from '../type';
import {GET_IMAGE} from '../helper/APIUtils';
import {useListenTogether} from '../hooks/useListenTogether';
import {useGetSinglePodcastDetails} from '../hooks/useGetSinglePodcastDetails';
import ListenTogetherRoomBar from '../components/ListenTogetherRoomBar';
import ListenTogetherChat from '../components/ListenTogetherChat';
import AudioWaveform from '../components/AudioWaveform';
import Loader from '../components/Loader';
import {GlassStyles} from '../styles/GlassStyles';
import {SyncAction} from '../types/ListenTogetherTypes';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const isAllowedUrl = (urlStr?: string | null): boolean => {
  if (!urlStr) return false;
  // If it starts with http/https, it must be whitelisted explicitly.
  if (urlStr.startsWith('http://') || urlStr.startsWith('https://')) {
    try {
      const match = urlStr.match(/^https?:\/\/([^/?#:]+)/i);
      if (!match) return false;
      const hostname = match[1].toLowerCase();
      return (
        hostname === 'uhsocial.in' ||
        hostname === 'localhost' ||
        hostname === '10.0.2.2'
      );
    } catch {
      return false;
    }
  }
  // For non-http/https, assume it's a path for GET_IMAGE.
  // Ensure it doesn't contain protocol separators or directory traversal attempts.
  return !urlStr.includes('://') && !urlStr.includes('..') && !urlStr.startsWith('/');
};

const getFormattedSource = (url?: string | null): string | null => {
  if (!url) return null;
  if (!isAllowedUrl(url)) {
    console.warn('Attempted to load disallowed URL:', url);
    return null;
  }
  return url.startsWith('http') ? url : `${GET_IMAGE}/${url}`;
};

const formatSecTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hours > 0) {
    return `${hours}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const SKIP_TIME = 5;

// ---------------------------------------------------------------------------
// Screen
// ---------------------------------------------------------------------------

const ListenTogetherScreen = ({navigation, route}: ListenTogetherScreenProp) => {
  const {trackId, audioUrl, roomCode: initialRoomCode, mode} = route.params;
  const {user_id} = useSelector((state: any) => state.user);
  const {isConnected} = useSelector((state: any) => state.network);

  // Podcast details
  const {data: podcast, isLoading: isPodcastLoading} =
    useGetSinglePodcastDetails(trackId);

  // Audio player
  const defaultFallback = require('../../assets/sounds/funny-cartoon-sound-397415.mp3');
  const initialSource = getFormattedSource(audioUrl) ?? defaultFallback;
  const player = useAudioPlayer(initialSource);

  // Playback state
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Listen Together hook
  const {
    room,
    roomCode,
    participants,
    messages,
    isHost,
    isInRoom,
    isSyncing,
    error,
    createRoom,
    joinRoom,
    leaveRoom,
    endRoom,
    syncPlayback,
    sendMessage,
    clearError,
    lastSyncPayload,
  } = useListenTogether();

  // Track if we've already initiated room creation/joining
  const initiatedRef = useRef(false);

  // --- Room creation / joining on mount ---
  useEffect(() => {
    if (initiatedRef.current) return;
    initiatedRef.current = true;

    if (mode === 'host') {
      const title = podcast?.title || 'Health Podcast';
      const cover = podcast?.cover_image || '';
      const audio = audioUrl || podcast?.audio_url || '';
      createRoom(trackId, audio, title, cover);
    } else if (mode === 'listener' && initialRoomCode) {
      joinRoom(initialRoomCode);
    }
  }, [mode, trackId, audioUrl, initialRoomCode, podcast, createRoom, joinRoom]);

  // --- Replace audio source when podcast data loads ---
  useEffect(() => {
    if (podcast?.audio_url) {
      const secureSource = getFormattedSource(podcast.audio_url);
      if (secureSource) {
        try {
          player.replace(secureSource);
        } catch (err) {
          console.warn('Failed to replace player source:', err);
        }
      }
    }
  }, [podcast?.audio_url, player]);

  // --- Position / duration polling ---
  useEffect(() => {
    if (!player) return;
    const interval = setInterval(() => {
      const status = player.currentStatus;
      if (status) {
        setPosition(status.currentTime || 0);
        setDuration(player.duration || status.duration || 0);
        setIsPlaying(status.playing || false);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [player]);

  // --- Apply incoming sync from host (listeners only) ---
  useEffect(() => {
    if (!lastSyncPayload || isHost || !player) return;

    const applySync = async () => {
      try {
        const {action, position: syncPos} = lastSyncPayload;

        // Compensate for network latency: adjust position by the time
        // elapsed since the host sent the sync event.
        const latencyMs = Math.max(0, Date.now() - lastSyncPayload.timestamp);
        const adjustedPos =
          action === 'play' ? syncPos + latencyMs / 1000 : syncPos;

        await player.seekTo(adjustedPos);
        setPosition(adjustedPos);

        if (action === 'play') {
          player.play();
          setIsPlaying(true);
        } else if (action === 'pause' || action === 'seek') {
          player.pause();
          setIsPlaying(false);
        } else if (action === 'ended') {
          player.pause();
          await player.seekTo(0);
          setIsPlaying(false);
          setPosition(0);
        }
      } catch (err) {
        console.warn('Failed to apply sync:', err);
      }
    };

    void applySync();
  }, [lastSyncPayload, isHost, player]);

  // --- Error display ---
  useEffect(() => {
    if (error) {
      Snackbar.show({
        text: error,
        duration: Snackbar.LENGTH_LONG,
      });
      clearError();
    }
  }, [error, clearError]);

  // --- Playback controls (host only) ---
  const handlePlay = useCallback(async () => {
    if (!player || !isHost) return;
    try {
      // Restart from beginning if the track has fully finished.
      if (duration > 0 && position >= duration - 0.5) {
        await player.seekTo(0);
        setPosition(0);
      }
      player.play();
      setIsPlaying(true);
      syncPlayback('play', player.currentTime || 0);
    } catch (err) {
      console.warn('Play error:', err);
    }
  }, [player, isHost, duration, position, syncPlayback]);

  const handlePause = useCallback(async () => {
    if (!player || !isHost) return;
    try {
      player.pause();
      setIsPlaying(false);
      syncPlayback('pause', player.currentTime || 0);
    } catch (err) {
      console.warn('Pause error:', err);
    }
  }, [player, isHost, syncPlayback]);

  const handleForward = useCallback(async () => {
    if (!player || !isHost) return;
    const next = Math.min(position + SKIP_TIME, duration);
    await player.seekTo(next);
    setPosition(next);
    syncPlayback('seek', next);
  }, [player, isHost, position, duration, syncPlayback]);

  const handleBackward = useCallback(async () => {
    if (!player || !isHost) return;
    const next = Math.max(position - SKIP_TIME, 0);
    await player.seekTo(next);
    setPosition(next);
    syncPlayback('seek', next);
  }, [player, isHost, position, syncPlayback]);

  const handleSliderComplete = useCallback(
    async (value: number) => {
      if (!player) return;
      await player.seekTo(value);
      setPosition(value);
      if (isHost) {
        syncPlayback('seek', value);
      }
    },
    [player, isHost, syncPlayback],
  );

  // --- Leave / End handlers ---
  const handleLeave = useCallback(() => {
    leaveRoom();
    try {
      player.pause();
    } catch {}
    navigation.goBack();
  }, [leaveRoom, player, navigation]);

  const handleEnd = useCallback(() => {
    endRoom();
    try {
      player.pause();
    } catch {}
    navigation.goBack();
  }, [endRoom, player, navigation]);

  // --- Room ended by host (listeners auto-navigate back) ---
  useEffect(() => {
    if (!isHost && !isInRoom && initiatedRef.current) {
      // Room was ended by host
      Snackbar.show({
        text: 'The host has ended the listening session.',
        duration: Snackbar.LENGTH_LONG,
      });
      try {
        player.pause();
      } catch {}
      // Small delay so snackbar is visible
      const timer = setTimeout(() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isInRoom, isHost, navigation, player]);

  // --- Loading state ---
  if (isPodcastLoading && !podcast) {
    return <Loader />;
  }

  // --- Waiting for room (before socket responds) ---
  if (!isInRoom && !error) {
    return (
      <Theme name="dark">
        <YStack
          flex={1}
          backgroundColor="#0F172A"
          alignItems="center"
          justifyContent="center"
          padding="$5">
          <Loader />
          <Text
            color="#94A3B8"
            fontSize={16}
            marginTop="$4"
            textAlign="center">
            {mode === 'host'
              ? 'Creating your listening room...'
              : 'Joining the listening session...'}
          </Text>
        </YStack>
      </Theme>
    );
  }

  // --- Cover image ---
  const coverImageSource = getFormattedSource(
    podcast?.cover_image,
  );

  return (
    <Theme name="dark">
      <YStack flex={1} backgroundColor="#0F172A">
        <ScrollView
          flex={1}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Safe area spacer */}
          <View style={styles.safeAreaSpacer} />

          {/* Back button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              Alert.alert(
                'Leave Session?',
                'You will leave the listening session.',
                [
                  {text: 'Stay', style: 'cancel'},
                  {
                    text: 'Leave',
                    style: 'destructive',
                    onPress: isHost ? handleEnd : handleLeave,
                  },
                ],
              );
            }}
            accessibilityLabel="Go back">
            <Ionicons name="arrow-back" size={24} color="#F1F5F9" />
          </TouchableOpacity>

          {/* Room Bar */}
          {roomCode && (
            <View style={styles.roomBarContainer}>
              <ListenTogetherRoomBar
                roomCode={roomCode}
                participants={participants}
                isHost={isHost}
                isSyncing={isSyncing}
                onLeave={handleLeave}
                onEnd={handleEnd}
              />
            </View>
          )}

          {/* Cover Image */}
          {coverImageSource && (
            <View style={[styles.coverContainer, GlassStyles.glassContainerDark]}>
              <Image
                source={{uri: coverImageSource}}
                style={styles.coverImage}
              />
            </View>
          )}

          {/* Title & Description */}
          <View style={[styles.infoContainer, GlassStyles.glassContainerDark]}>
            <XStack alignItems="center" gap="$2" marginBottom="$2">
              <Ionicons name="people" size={16} color="#60A5FA" />
              <Text color="#60A5FA" fontSize={12} fontWeight="700" letterSpacing={1}>
                LISTENING TOGETHER
              </Text>
            </XStack>
            <Text
              color="#F1F5F9"
              fontSize={24}
              fontWeight="800"
              lineHeight={30}>
              {podcast?.title || 'Health Podcast'}
            </Text>
            {podcast?.description ? (
              <Text
                color="#94A3B8"
                fontSize={14}
                marginTop="$2"
                numberOfLines={3}>
                {podcast.description}
              </Text>
            ) : null}
          </View>

          {/* Waveform */}
          <YStack alignItems="center" height={70} marginVertical="$2">
            <AudioWaveform
              isPlaying={isPlaying}
              accentColor="#3B82F6"
            />
          </YStack>

          {/* Progress Slider */}
          <View style={[styles.sliderContainer, GlassStyles.glassContainerDark]}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={duration}
              value={position}
              minimumTrackTintColor="#3B82F6"
              maximumTrackTintColor="#334155"
              thumbTintColor="#60A5FA"
              disabled={!isHost}
              onSlidingComplete={handleSliderComplete}
            />
            <XStack justifyContent="space-between" marginTop="$1" paddingHorizontal="$1">
              <Text
                color="#94A3B8"
                fontSize={13}
                fontWeight="600"
                style={{fontFamily: 'monospace'}}>
                {formatSecTime(position)}
              </Text>
              <Text
                color="#94A3B8"
                fontSize={13}
                fontWeight="600"
                style={{fontFamily: 'monospace'}}>
                {formatSecTime(duration)}
              </Text>
            </XStack>
          </View>

          {/* Playback Controls */}
          <View style={[styles.controlsContainer, GlassStyles.glassContainerDark]}>
            {!isHost && (
              <XStack
                justifyContent="center"
                alignItems="center"
                marginBottom="$2"
                gap="$2">
                <Ionicons name="lock-closed-outline" size={14} color="#F59E0B" />
                <Text color="#F59E0B" fontSize={12} fontWeight="600">
                  Host is controlling playback
                </Text>
              </XStack>
            )}

            <XStack justifyContent="center" alignItems="center" gap="$6">
              {/* Backward */}
              <TouchableOpacity
                style={[styles.controlBtn, !isHost && styles.controlBtnDisabled]}
                disabled={!isHost}
                onPress={handleBackward}
                accessibilityLabel="Skip backward 5 seconds">
                <Ionicons
                  name="play-back"
                  size={28}
                  color={isHost ? '#94A3B8' : '#475569'}
                />
              </TouchableOpacity>

              {/* Play / Pause */}
              <TouchableOpacity
                style={[styles.playBtn, !isHost && styles.playBtnDisabled]}
                disabled={!isHost}
                onPress={() => (isPlaying ? handlePause() : handlePlay())}
                accessibilityLabel={isPlaying ? 'Pause' : 'Play'}>
                <Ionicons
                  name={isPlaying ? 'pause' : 'play'}
                  size={40}
                  color="white"
                />
              </TouchableOpacity>

              {/* Forward */}
              <TouchableOpacity
                style={[styles.controlBtn, !isHost && styles.controlBtnDisabled]}
                disabled={!isHost}
                onPress={handleForward}
                accessibilityLabel="Skip forward 5 seconds">
                <Ionicons
                  name="play-forward"
                  size={28}
                  color={isHost ? '#94A3B8' : '#475569'}
                />
              </TouchableOpacity>
            </XStack>
          </View>

          {/* Chat Section */}
          <View style={styles.chatContainer}>
            <ListenTogetherChat
              messages={messages}
              currentUserId={user_id}
              onSendMessage={sendMessage}
            />
          </View>

          {/* Bottom padding */}
          <View style={{height: 30}} />
        </ScrollView>
      </YStack>
    </Theme>
  );
};

export default ListenTogetherScreen;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  safeAreaSpacer: {
    height: 50,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  roomBarContainer: {
    marginBottom: 16,
  },
  coverContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    alignItems: 'center',
    padding: 12,
  },
  coverImage: {
    width: '100%',
    height: 200,
    borderRadius: 14,
    resizeMode: 'cover',
  },
  infoContainer: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
  },
  sliderContainer: {
    borderRadius: 16,
    padding: 16,
    paddingBottom: 12,
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 36,
  },
  controlsContainer: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  controlBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#334155',
  },
  controlBtnDisabled: {
    opacity: 0.5,
  },
  playBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: {width: 0, height: 8},
    shadowRadius: 20,
    shadowOpacity: 0.5,
    elevation: 8,
  },
  playBtnDisabled: {
    backgroundColor: '#475569',
    shadowOpacity: 0,
    elevation: 0,
  },
  chatContainer: {
    height: 320,
    marginBottom: 8,
  },
});
