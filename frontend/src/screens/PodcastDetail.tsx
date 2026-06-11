import React, {
  useEffect,
  useState,
  useMemo,
} from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import {Feather} from '@expo/vector-icons';

import {
  Theme,
  XStack,
  YStack,
  Text,
  ScrollView,
} from 'tamagui';

import Slider from '@react-native-community/slider';

import * as Snackbar from 'react-native-snackbar';

import Share from 'react-native-share';

import LottieView from 'lottie-react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {useSelector} from 'react-redux';

import {useAudioPlayer} from 'expo-audio';

import {PodcastDetailScreenProp} from '../type';

import {PRIMARY_COLOR} from '../helper/Theme';

import {GlassStyles} from '../styles/GlassStyles';

import {GET_IMAGE} from '../helper/APIUtils';

import {
  downloadAudio,
  formatCount,
  StatusEnum,
} from '../helper/Utils';

import {fp} from '../helper/Metric';

import {useSocket} from '../contexts/SocketContext';

import LoadingSpinner from '../components/LoadingSpinner';

import PodcastDetailSkeleton from '../components/PodcastDetailSkeleton';

import {useGetSinglePodcastDetails} from '../hooks/useGetSinglePodcastDetails';

import {useLikePodcast} from '../hooks/useLikePodcast';

const isAllowedUrl = (
  urlStr?: string | null,
): boolean => {
  if (!urlStr) return false;

  if (
    !urlStr.startsWith('http://') &&
    !urlStr.startsWith('https://')
  ) {
    if (urlStr.includes('://')) return false;

    return true;
  }

  try {
    const match = urlStr.match(
      /^https?:\/\/([^/?#:]+)/i,
    );

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
};

const PodcastDetail = ({
  navigation,
  route,
}: PodcastDetailScreenProp) => {
  const {trackId, audioUrl} = route.params;

  const {width, height} =
    useWindowDimensions();

  const isLandscape = width > height;
  const isTablet = width >= 768;

  const useSplitLayout =
    isLandscape || isTablet;

  const socket = useSocket();

  const {user_id, user_handle, isGuest} =
    useSelector((state: any) => state.user);

  const {isConnected} = useSelector(
    (state: any) => state.network,
  );

  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    useState(false);

  const [isLoading, setLoading] =
    useState(false);

  const [duration, setDuration] =
    useState(0);

  const [position, setPosition] =
    useState(0);

  const [isLike, setLike] =
    useState(false);

  const [likeCount, setLikeCount] =
    useState(0);

  const {
    data: podcast,
    refetch,
    isLoading: isPodcastLoading,
    isError: isPodcastError,
  } = useGetSinglePodcastDetails(trackId);

  const {
    mutate: likePodcast,
    isPending: likePodcastPending,
  } = useLikePodcast();

  const defaultFallback = require('../../assets/sounds/funny-cartoon-sound-397415.mp3');

  const getFormattedSource = (
    url?: string | null,
  ) => {
    if (!url) return null;

    if (!isAllowedUrl(url)) {
      console.warn(
        'Blocked untrusted media URL:',
        url,
      );

      return null;
    }

    return url.startsWith('http')
      ? url
      : `${GET_IMAGE}/${url}`;
  };

  const initialSource =
    getFormattedSource(audioUrl) ??
    defaultFallback;

  const [loadedSource, setLoadedSource] =
    useState<string | number>(
      initialSource,
    );

  const player =
    useAudioPlayer(initialSource);

  const isPlaying =
    player?.currentStatus?.playing ??
    false;

  const formattedCoverImage =
    useMemo(() => {
      return getFormattedSource(
        podcast?.cover_image,
      );
    }, [podcast?.cover_image]);

  useEffect(() => {
    if (podcast?.audio_url) {
      const secureSource =
        getFormattedSource(
          podcast.audio_url,
        );

      if (
        secureSource &&
        secureSource !== loadedSource
      ) {
        try {
          player.replace(
            secureSource,
          );

          setLoadedSource(
            secureSource,
          );
        } catch (error) {
          console.log(
            'Audio replace error:',
            error,
          );
        }
      }
    }
  }, [
    podcast?.audio_url,
    loadedSource,
    player,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (player) {
        const status =
          player.currentStatus;

        if (status?.isLoaded) {
          setPosition(
            status.currentTime || 0,
          );

          setDuration(
            status.duration || 0,
          );
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [player]);

  useEffect(() => {
    return () => {
      try {
        player.pause();
      } catch (e) {
        console.log(
          'Cleanup error:',
          e,
        );
      }
    };
  }, [player]);

  useEffect(() => {
    if (podcast) {
      setLike(
        podcast.likedUsers.includes(
          user_id,
        ),
      );

      setLikeCount(
        podcast.likedUsers.length,
      );
    }
  }, [podcast, user_id]);

  const SKIP_TIME = 5;

  const handleForward = async () => {
    let next = position + SKIP_TIME;

    if (next > duration) {
      next = duration;
    }

    await player.seekTo(next);

    setPosition(next);
  };

  const handleBackward =
    async () => {
      let next =
        position - SKIP_TIME;

      if (next < 0) {
        next = 0;
      }

      await player.seekTo(next);

      setPosition(next);
    };

  const handlePlay = async () => {
    try {
      player.play();
    } catch (error) {
      console.log(
        'Play error:',
        error,
      );
    }
  };

  const handlePause =
    async () => {
      try {
        player.pause();
      } catch (error) {
        console.log(
          'Pause error:',
          error,
        );
      }
    };

  const formatSecTime = (
    seconds: number,
  ) => {
    const mins = Math.floor(
      seconds / 60,
    );

    const secs = Math.floor(
      seconds % 60,
    );

    return `${mins}:${
      secs < 10 ? '0' : ''
    }${secs}`;
  };

  const handleShare = async () => {
    try {
      const url = `https://uhsocial.in/api/share/podcast?trackId=${podcast?._id}&audioUrl=${podcast?.audio_url}`;

      await Share.open({
        title: podcast?.title,
        message: `${podcast?.title} : Check out this awesome podcast on UltimateHealth app!`,
        url,
        subject: 'Podcast Sharing',
      });
    } catch {
      Alert.alert(
        'Error',
        'Something went wrong while sharing.',
      );
    }
  };

  if (isPodcastLoading) {
    return (
      <PodcastDetailSkeleton />
    );
  }

  if (isPodcastError || !podcast) {
    return (
      <View style={styles.errorContainer}>
        <Text color="white">
          Unable to load podcast.
        </Text>
      </View>
    );
  }

  const description =
    podcast?.description || '';

  const shouldTruncate =
    description.length > 180;

  const displayDescription =
    shouldTruncate &&
    !isDescriptionExpanded
      ? `${description.slice(
          0,
          180,
        )}...`
      : description;

  return (
    <SafeAreaView
      style={styles.safeArea}>
      <ScrollView
        backgroundColor="#0B1425"
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={
          false
        }>

        <Theme name="dark">
          <YStack
            padding="$4"
            gap="$4">

            <View
              style={[
                styles.titleContainer,
                GlassStyles.glassContainerDark,
              ]}>

              <Image
                source={{
                  uri:
                    formattedCoverImage ??
                    undefined,
                }}
                style={
                  useSplitLayout
                    ? styles.coverImageLandscape
                    : styles.coverImage
                }
              />

              <Text
                color="#94A3B8"
                fontSize={13}
                fontWeight="600"
                marginTop="$3">
                NOW PLAYING
              </Text>

              <Text
                color="white"
                fontSize={28}
                fontWeight="800"
                marginTop="$2">

                {podcast.title}
              </Text>

              <Text
                color="#94A3B8"
                marginTop="$3">

                {displayDescription}
              </Text>

              {shouldTruncate && (
                <TouchableOpacity
                  onPress={() =>
                    setIsDescriptionExpanded(
                      !isDescriptionExpanded,
                    )
                  }
                  style={
                    styles.readMoreButton
                  }>

                  <Text
                    color={
                      PRIMARY_COLOR
                    }>
                    {isDescriptionExpanded
                      ? 'Read Less'
                      : 'Read More'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {isPlaying && (
              <View
                style={[
                  styles.visualizerContainer,
                  GlassStyles.glassContainerDark,
                ]}>

                <LottieView
                  source={require('../assets/LottieAnimation/sound-voice-waves.json')}
                  autoPlay
                  loop
                  style={{
                    width: '100%',
                    height: 140,
                  }}
                />
              </View>
            )}

            <View
              style={[
                styles.sliderContainer,
                GlassStyles.glassContainerDark,
              ]}>

              <Slider
                minimumValue={0}
                maximumValue={duration}
                value={position}
                minimumTrackTintColor={
                  PRIMARY_COLOR
                }
                maximumTrackTintColor="#ccc"
                thumbTintColor={
                  PRIMARY_COLOR
                }
                onSlidingComplete={async v => {
                  await player.seekTo(v);

                  setPosition(v);
                }}
              />

              <XStack
                justifyContent="space-between">

                <Text color="white">
                  {formatSecTime(
                    position,
                  )}
                </Text>

                <Text color="white">
                  {formatSecTime(
                    duration,
                  )}
                </Text>
              </XStack>
            </View>

            <View
              style={[
                styles.controlsContainer,
                GlassStyles.glassContainerDark,
              ]}>

              <XStack
                justifyContent="space-around"
                alignItems="center">

                <TouchableOpacity
                  onPress={
                    handleBackward
                  }>

                  <Ionicons
                    name="play-back"
                    size={32}
                    color="white"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    styles.mainPlayButton
                  }
                  onPress={() =>
                    isPlaying
                      ? handlePause()
                      : handlePlay()
                  }>

                  <Ionicons
                    name={
                      isPlaying
                        ? 'pause'
                        : 'play'
                    }
                    size={40}
                    color="white"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={
                    handleForward
                  }>

                  <Ionicons
                    name="play-forward"
                    size={32}
                    color="white"
                  />
                </TouchableOpacity>
              </XStack>
            </View>

            {podcast.status ===
              StatusEnum.PUBLISHED && (
              <View
                style={[
                  styles.actionsContainer,
                  GlassStyles.glassContainerDark,
                ]}>

                <XStack
                  justifyContent="space-evenly">

                  {likePodcastPending ? (
                    <LoadingSpinner size="small" />
                  ) : (
                    <TouchableOpacity
                      style={
                        styles.actionButton
                      }
                      onPress={() => {
                        likePodcast(
                          trackId,
                          {
                            onSuccess:
                              () => {
                                refetch();
                              },
                          },
                        );
                      }}>

                      {isLike ? (
                        <AntDesign
                          name="heart"
                          size={24}
                          color={
                            PRIMARY_COLOR
                          }
                        />
                      ) : (
                        <Feather
                          name="heart"
                          size={24}
                          color="white"
                        />
                      )}

                      <Text
                        style={
                          styles.actionText
                        }>
                        {formatCount(
                          likeCount,
                        )}
                      </Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={
                      styles.actionButton
                    }
                    onPress={
                      handleShare
                    }>

                    <Ionicons
                      name="share-outline"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                </XStack>
              </View>
            )}
          </YStack>
        </Theme>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PodcastDetail;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B1425',
  },

  titleContainer: {
    padding: 20,
    borderRadius: 20,
  },

  visualizerContainer: {
    width: '100%',
    borderRadius: 20,
    padding: 10,
    overflow: 'hidden',
  },

  sliderContainer: {
    padding: 20,
    borderRadius: 20,
  },

  controlsContainer: {
    padding: 20,
    borderRadius: 30,
  },

  mainPlayButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#4ACDFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionsContainer: {
    padding: 20,
    borderRadius: 25,
    marginBottom: 20,
  },

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  actionText: {
    fontSize: fp(4),
    color: 'white',
  },

  coverImage: {
    width: '100%',
    height: 220,
    borderRadius: 16,
  },

  coverImageLandscape: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
  },

  readMoreButton: {
    marginTop: 10,
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B1425',
  },
});