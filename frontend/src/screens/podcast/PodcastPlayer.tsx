/* eslint-disable @typescript-eslint/no-unused-vars */

import {useCallback, useEffect, useState} from 'react';
import {Alert, StyleSheet, useColorScheme, TouchableOpacity, Platform, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PodcastPlayerScreenProps} from '../../schemas/type';
import RNFS from 'react-native-fs';
import {useAppSelector} from '../../store/hooks';
import Snackbar from 'react-native-snackbar';

import useUploadImage from '../../hooks/media/useUploadImage';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import useUploadAudio from '../../hooks/media/useUploadAudio';
import Slider from '../../components/podcast/SliderCompat';

import {useAudioPlayer} from 'expo-audio';
import {Button, Circle, Theme, XStack, YStack, Text, useTheme} from 'tamagui';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import AudioWaveform from '../../components/podcast/AudioWaveform';
import {useUploadPodcast} from '../../hooks/podcast/useUploadPodcast';
import Loader from '../../components/common/Loader';

import FloatingSpeedSelector from '../../components/podcast/FloatingSpeedSelector';

const PodcastPlayer = ({navigation, route}: PodcastPlayerScreenProps) => {
  let insets = {top: 0, bottom: 0, left: 0, right: 0};
  try {
    insets = useSafeAreaInsets();
  } catch {}

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const bgColor = isDark ? '#0F172A' : '#F8FAFC';
  const cardBg = isDark ? '#1E293B' : '#FFFFFF';
  const textColor = isDark ? '#F1F5F9' : '#0F172A';
  const subTextColor = isDark ? '#94A3B8' : '#64748B';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0';
  const accentBlue = isDark ? '#60A5FA' : '#2563EB';
  const playBtnBg = isDark ? '#3B82F6' : '#2563EB';

  const {uploadImage, loading, error: imageError} = useUploadImage();
  const {uploadAudio, loading: audioLoading, error} = useUploadAudio();
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [isSpeedSelectorVisible, setIsSpeedSelectorVisible] = useState(false);

  const [duration, setDuration] = useState(0);
  const theme = useTheme();
  const {title, description, selectedGenres, imageUtils, filePath, episodeId} =
    route.params;

  //const [elapsedMs, setElapsedMs] = useState(0);
  const {user_token} = useAppSelector((state: any) => state.user);
  const {isConnected} = useAppSelector((state: any) => state.network);
  const [amplitudes, setAmplitudes] = useState<number[]>([]);
  //const [currentAmplitude, setCurrentAmplitude] = useState<number>(0);
  //const timerRef = useRef(null);

  const {mutate: uploadPodcast, isPending: uploadPodcastPending} =
    useUploadPodcast();

  const audioUri = filePath
    ? (filePath.startsWith('file://') ? filePath : `file://${filePath}`)
    : null;

  const player = useAudioPlayer(audioUri);

  const formatPlaybackSpeed = (playbackSpeed: number) => `${playbackSpeed}x`;

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

  // UI State: 'idle' | 'recording' | 'review' | 'playing' | 'paused' | 'uploading'
  const [uiState, setUiState] = useState<
    'idle' | 'recording' | 'review' | 'playing' | 'paused' | 'uploading'
  >('idle');

  const [uploading, setUploading] = useState(false);

  // Handle transitions

  const handlePlay = async () => {
    if (!player) return;

    // If the track has fully finished, restart from the beginning.
    // Otherwise resume from the current paused position.
    if (duration > 0 && !isNaN(duration) && position >= duration - 0.5) {
      await player.seekTo(0);
      setPosition(0);
    }

    player.play();
    setUiState('playing');
    setIsPlaying(true);
  };

  const handlePause = async () => {
    console.log('Pause called');

    if (!player) return;

    player.pause();
    setUiState('paused');
    setIsPlaying(false);
  };

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

  const unlinkFile = useCallback(async () => {
    if (filePath) {
      try {
        const exists = await RNFS.exists(filePath);

        if (exists) {
          await RNFS.unlink(filePath);
          console.log('File deleted:', filePath);
        }
      } catch (err) {
        console.warn('Error deleting file:', err);
      }
    }
  }, [filePath]);

  const handleUpload = useCallback(async () => {
    setUploading(false);
    setUiState('idle');
    setAmplitudes([]);
    await unlinkFile();
  }, [unlinkFile]);

  const stopPlay = () => {
    try {
      player.remove();
    } catch (e) {
      console.error('Error stopping playback:', e);
    }
  };

  const handlePostSubmit = async () => {
    if (!isConnected) {
      Alert.alert('Please check your internet and try again!');
      return;
    }

    if (!filePath || !imageUtils) {
      Alert.alert(
        'Error',
        'Please record a podcast and select an image before uploading.',
      );
      return;
    }

    try {
      // Show confirmation alert
      const confirmation = await showConfirmationAlert();

      if (!confirmation) {
        return;
      }

      setUploading(true);
      setUiState('uploading');

      // Resize the image and handle the upload
      const resizedImageUri = await resizeImage(imageUtils);

      let uploadedUrl = await uploadImage(resizedImageUri?.uri as string);
      let audioUrl = await uploadAudio(filePath);

      console.log('audio', audioUrl);
      console.log('Image', uploadedUrl);

      if (uploadedUrl && audioUrl) {
        uploadPodcast(
          {
            title: title,
            description: description,
            tags: selectedGenres,
            article_id: null,
            audio_url: audioUrl,
            cover_image: uploadedUrl,
            duration: player.duration as number,
            episode_id: episodeId || null,
          },
          {
            onSuccess: async data => {
              await handleUpload();

              Snackbar.show({
                text: 'Podcast submitted for review',
                duration: Snackbar.LENGTH_SHORT,
              });

              navigation.navigate('TabNavigation');
            },

            onError: async error => {
              // Handle upload error
              await handleUpload();

              Snackbar.show({
                text: 'Upload failed',
                duration: Snackbar.LENGTH_SHORT,
              });

              console.error('Upload error:', error);
            },
          },
        );
      } else {
        Alert.alert(
          'Error',
          'Could not upload the podcast. Please try again.',
        );
      }
    } catch (err) {
      console.error('Image processing failed:', err);

      Alert.alert('Error', 'Could not process the images.');

      await handleUpload();
    }
  };

  // Helper function to show confirmation alert
  const showConfirmationAlert = () => {
    return new Promise(resolve => {
      Alert.alert(
        'Create Podcast',
        'Please confirm you want to upload this podcast.',
        [
          {
            text: 'Cancel',
            onPress: () => resolve(false),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => resolve(true),
          },
        ],
        {cancelable: false},
      );
    });
  };

  // Helper function to resize an image
  const resizeImage = async (localImage: string) => {
    try {
      const resizedImageUri = await ImageResizer.createResizedImage(
        localImage,
        1000, // Width
        1000, // Height
        'JPEG', // Format
        100, // Quality
      );

      return resizedImageUri;
    } catch (err) {
      console.error('Failed to resize image:', err);
      // throw new Error('Image resizing failed');
    }
  };

  useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      const status = player.currentStatus;

      if (status) {
        setPosition(status.currentTime);
        setDuration(player.duration || status.duration || 0);

        if (status.didJustFinish || (player.duration && status.currentTime >= player.duration - 0.3)) {
          setIsPlaying(false);
          setUiState('paused');
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [player]);

  useEffect(() => {
    if (error || imageError) {
      handleUpload();
    }
  }, [error, handleUpload, imageError]);

  // if(uploadPodcastPending){
  //   return <Loader/>
  // }

  return (
    <Theme name={isDark ? 'dark' : 'light'}>
      <YStack flex={1} backgroundColor={bgColor}>
        {/* Top Header Bar with Back Button */}
        <XStack
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          paddingHorizontal="$4"
          paddingTop={Platform.OS === 'android' ? Math.max(insets.top, 12) : insets.top || 12}
          paddingBottom="$2"
          borderBottomWidth={1}
          borderBottomColor={borderColor}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#F1F5F9',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={textColor} />
          </TouchableOpacity>
          <Text color={textColor} fontSize={17} fontWeight="700">
            Podcast Preview
          </Text>
          <YStack width={38} />
        </XStack>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            padding: 20,
            justifyContent: 'space-between',
          }}>
          {/* Header Section */}
          <YStack mb="$4" width="100%" paddingHorizontal="$1">
            <Text
              color={subTextColor}
              fontSize={12}
              fontWeight="700"
              mb="$2"
              letterSpacing={1.2}>
              NOW PLAYING
            </Text>

            <Text
              color={textColor}
              fontSize={26}
              fontWeight="800"
              lineHeight={32}
              flexShrink={1}
              flexWrap="wrap"
              allowFontScaling>
              {title}
            </Text>

            {description ? (
              <Text
                color={subTextColor}
                fontSize={15}
                marginTop="$2.5"
                lineHeight={22}
                flexShrink={1}
                flexWrap="wrap"
                allowFontScaling>
                {description}
              </Text>
            ) : null}
          </YStack>

          {/* Upload Button Section */}
          <YStack alignItems="center" my="$4">
            <Circle
              size={110}
              backgroundColor={isDark ? '#1E293B' : '#EFF6FF'}
              borderWidth={2.5}
              borderColor={accentBlue}
              shadowColor={accentBlue}
              shadowOffset={{width: 0, height: 6}}
              shadowRadius={20}
              shadowOpacity={0.25}
              elevation={6}
              onPress={handlePostSubmit}
              pressStyle={{scale: 0.95}}
              alignSelf="center"
              justifyContent="center"
              accessibilityRole="button"
              accessibilityLabel="Upload podcast"
              accessibilityHint="Uploads this podcast for review">
              <AntDesign
                name="cloud-upload"
                size={46}
                color={accentBlue}
              />
            </Circle>

            <Text
              marginTop="$3"
              color={accentBlue}
              fontSize={14}
              fontWeight="800"
              textAlign="center"
              letterSpacing={0.5}>
              UPLOAD PODCAST
            </Text>
          </YStack>

          {/* Waveform Visualization */}
          <YStack alignItems="center" height={80} my="$2">
            <AudioWaveform
              isPlaying={isPlaying}
              accentColor={accentBlue}
            />
          </YStack>

          {/* Progress Slider Section */}
          <YStack
            my="$3"
            bg={cardBg}
            borderWidth={1}
            borderColor={borderColor}
            borderRadius={16}
            padding="$4"
            shadowColor="#000"
            shadowOffset={{width: 0, height: 2}}
            shadowOpacity={0.05}
            shadowRadius={6}
            elevation={2}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={duration}
              value={position}
              minimumTrackTintColor={accentBlue}
              maximumTrackTintColor={isDark ? '#334155' : '#E2E8F0'}
              thumbTintColor={accentBlue}
              onSlidingComplete={async (value: number) => {
                if (player) {
                  await player.seekTo(value);
                  setPosition(value);
                }
              }}
            />

            <XStack
              justifyContent="space-between"
              marginTop="$2">
              <Text
                color={subTextColor}
                fontSize={13}
                fontWeight="600"
                style={{fontFamily: 'monospace'}}>
                {formatSecTime(position)}
              </Text>

              <Text
                color={subTextColor}
                fontSize={13}
                fontWeight="600"
                style={{fontFamily: 'monospace'}}>
                {formatSecTime(duration)}
              </Text>
            </XStack>
          </YStack>

          {/* Playback Controls */}
          <XStack
            justifyContent="center"
            alignItems="center"
            marginTop="$4"
            marginBottom="$3"
            space="$5">
            {/* Backward Button */}
            <Circle
              size={60}
              backgroundColor={cardBg}
              borderWidth={1.5}
              borderColor={borderColor}
              pressStyle={{scale: 0.9}}
              onPress={handleBackward}
              justifyContent="center"
              alignItems="center"
              accessibilityRole="button"
              accessibilityLabel="Go back 5 seconds"
              accessibilityHint="Moves the podcast playback back by 5 seconds">
              <Ionicons
                name="play-back"
                size={26}
                color={subTextColor}
              />
            </Circle>

            {/* Play/Pause Button */}
            <Circle
              size={84}
              backgroundColor={playBtnBg}
              shadowColor={playBtnBg}
              shadowOffset={{width: 0, height: 6}}
              shadowRadius={16}
              shadowOpacity={0.4}
              elevation={8}
              pressStyle={{scale: 0.95}}
              onPress={() => {
                if (isPlaying) {
                  handlePause();
                } else {
                  handlePlay();
                }
              }}
              justifyContent="center"
              alignItems="center"
              accessibilityRole="button"
              accessibilityLabel={isPlaying ? 'Pause podcast' : 'Play podcast'}
              accessibilityHint={isPlaying ? 'Pauses the podcast' : 'Starts playing the podcast'}>
              {isPlaying ? (
                <Ionicons
                  name="pause"
                  size={40}
                  color="white"
                />
              ) : (
                <Ionicons
                  name="play"
                  size={40}
                  color="white"
                  style={{marginLeft: 3}}
                />
              )}
            </Circle>

            {/* Playback Speed Button */}
            <Button
              height={40}
              minWidth={60}
              paddingHorizontal="$2.5"
              borderRadius="$10"
              backgroundColor={cardBg}
              borderWidth={1}
              borderColor={borderColor}
              pressStyle={{scale: 0.94}}
              onPress={() => setIsSpeedSelectorVisible(true)}
              accessibilityRole="button"
              accessibilityLabel={`Playback speed ${formatPlaybackSpeed(speed)}`}
              accessibilityHint="Opens playback speed options">
              <Text
                color={textColor}
                fontSize={13}
                fontWeight="800">
                {formatPlaybackSpeed(speed)}
              </Text>
            </Button>

            {/* Forward Button */}
            <Circle
              size={60}
              backgroundColor={cardBg}
              borderWidth={1.5}
              borderColor={borderColor}
              pressStyle={{scale: 0.9}}
              onPress={handleForward}
              justifyContent="center"
              alignItems="center"
              accessibilityRole="button"
              accessibilityLabel="Go forward 5 seconds"
              accessibilityHint="Moves the podcast playback forward by 5 seconds">
              <Ionicons
                name="play-forward"
                size={26}
                color={subTextColor}
              />
            </Circle>
          </XStack>

          {/* Footer Info */}
          <Text
            marginTop="$3"
            marginBottom="$2"
            textAlign="center"
            color={subTextColor}
            fontSize={11}
            numberOfLines={1}
            ellipsizeMode="middle">
            {filePath}
          </Text>
        </ScrollView>

        <FloatingSpeedSelector
          currentSpeed={speed}
          onSpeedSelect={(selectedSpeed) => {
            if (player) {
              player.setPlaybackRate(selectedSpeed, 'high');
              setSpeed(selectedSpeed);
            }
          }}
          visible={isSpeedSelectorVisible}
          onClose={() => setIsSpeedSelectorVisible(false)}
        />
      </YStack>
    </Theme>
  );
};

export default PodcastPlayer;

const styles = StyleSheet.create({
  slider: {
    width: '100%',
    height: 36,
    marginTop: 6,
    marginBottom: 2,
  },

  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: 12,
  },

  time: {
    fontSize: 13,
    color: '#777',
  },
});