/* eslint-disable @typescript-eslint/no-unused-vars */
 
 
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, Alert, AppState, AppStateStatus, useColorScheme, TouchableOpacity, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';

import {PodcastRecorderScreenProps} from '../../schemas/type';
import RNFS from 'react-native-fs';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';

//const {AudioModule} = NativeModules;
//const AudioModule = NativeModules.AudioModule;
//const emitter = new NativeEventEmitter(AudioModule);

import {
  useAudioRecorder,
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorderState,
} from 'expo-audio';

import {useFocusEffect} from '@react-navigation/native';
import {Circle, Theme, XStack, YStack, Text} from 'tamagui';
import LottieView from 'lottie-react-native';
//import {useAppDispatch} from '../../store/hooks';
import {requestStoragePermissions} from '../../lib/utils/Utils';
 type AppStateStatusType = 'active' | 'background' | 'inactive' | 'unknown' | 'extension';


//const AudioModule = requireNativeModule('AudioModule');

const PodcastRecorder = ({navigation, route}: PodcastRecorderScreenProps) => {
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

  const [recording, setRecording] = useState(false);
  // const dispatch = useAppDispatch();

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder, 500);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const {title, description, selectedGenres, imageUtils, episodeId} = route.params;
  const [filePath, setFilePath] = useState<string | null>(null);

  const [amplitudes, setAmplitudes] = useState<number[]>([]);

  const timerRef = useRef<number | null>(null);
  const recordStartTimeRef = useRef<number | null>(null);
  const isRecordingRef = useRef(false);

  // Stores the latest native duration for use in AppState listener and other effects, preventing stale closures.
  const durationMillisRef = useRef<number>(0);

  useEffect(() => {
    if (recorderState?.durationMillis !== undefined) {
      durationMillisRef.current = recorderState.durationMillis;
    }
  }, [recorderState?.durationMillis]);

  useEffect(() => {
    if (
      recording &&
      recorderState?.durationMillis &&
      recorderState.durationMillis > 0
    ) {
      recordStartTimeRef.current =
        Date.now() - recorderState.durationMillis;
      setRecordTime(formatTime(recorderState.durationMillis));
    }
  }, [recorderState?.durationMillis, recording]);

useEffect(() => {
  const subscription = AppState.addEventListener(
    'change',
    (nextState: AppStateStatusType) => {
      if (nextState === 'active' && recording) {
        // Re-sync timer immediately on app foreground using actual tracked duration
        if (durationMillisRef.current > 0) {
          recordStartTimeRef.current =
            Date.now() - durationMillisRef.current;
          setRecordTime(formatTime(durationMillisRef.current));
        } else if (recordStartTimeRef.current) {
          // Fallback to JS-based calculation if native duration hasn't been reported yet
          const elapsed = Date.now() - recordStartTimeRef.current;
          setRecordTime(formatTime(elapsed));
        }
      }
    },
  );

  return () => subscription.remove();
}, [recording]);

 const record = async () => {
  try {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();

    isRecordingRef.current = true;
    startTimer();
  } catch (error) {
    console.warn('Failed to start recording:', error);

    isRecordingRef.current = false;
    stopTimer();
  }
};

const stopRecording = async () => {
  try {
    await audioRecorder.stop();
  } catch (error) {
    console.warn('Failed to stop recording:', error);
  }

  isRecordingRef.current = false;
  setRecording(false);
  stopTimer();
  setFilePath(audioRecorder.uri);
};

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert('Permission to access microphone was denied');
      }

      const storageGranted = await requestStoragePermissions();
      if (!storageGranted) {
        return;
      }

      setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    })();
  }, []);

  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSec / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSec % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const startTimer = () => {
    recordStartTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      if (!recordStartTimeRef.current) return;

      const elapsed = Date.now() - recordStartTimeRef.current;
      setRecordTime(formatTime(elapsed));
    }, 1000) as any;
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    recordStartTimeRef.current = null;
  };

  // const startRecording = async () => {
  //   if (Platform.OS === 'android') {
  //     ]);
  //     if (
  //     ) {
  //       return;
  //     }
  //   }

  //   try {
  //     const path: string = await AudioModule.startRecording();
  //     console.log('File path', path);
  //     setFilePath(path);
  //     setRecording(true);
  //     //setElapsedMs(0);
  //     startTimer();
  //   } catch (e) {
  //     console.error('Failed to start recording:', e);
  //   }
  // };

  // UI State: 'idle' | 'recording' | 'review' | 'playing' | 'paused' | 'uploading'

  const [uiState, setUiState] = useState<
    'idle' | 'recording' | 'review' | 'playing' | 'paused' | 'uploading'
  >('idle');
  const [uploading, setUploading] = useState(false);

  // Handle transitions
  const handleStartRecording = async () => {
    await record();
    setUiState('recording');
    setRecording(true);
  };

  const handleStopRecording = async () => {
    await stopRecording();
    setUiState('review');
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

  /**
   * Returns the screen to its empty state.
   *
   * `deleteFile` must be false when the take is already gone from disk —
   * otherwise this would try to unlink a path that no longer exists.
   */
  const resetRecording = useCallback(
    async ({deleteFile}: {deleteFile: boolean}) => {
      if (deleteFile) {
        await unlinkFile();
      }
      setUploading(false);
      setUiState('idle');
      setFilePath(null);
      setAmplitudes([]);
      setRecordTime('00:00:00');
    },
    [unlinkFile],
  );

  // RETRY: the user explicitly wants to throw this take away.
  const handleReRecord = useCallback(
    () => resetRecording({deleteFile: true}),
    [resetRecording],
  );

  useFocusEffect(
    useCallback(() => {
      // Previewing a take navigates to PodcastPlayer, so coming back here is a
      // normal part of the flow and must NOT discard the recording. The only
      // reason to clear on focus is that the file is genuinely gone — the
      // player unlinks it after a successful upload — in which case the review
      // controls would be pointing at a path that no longer exists.
      let cancelled = false;

      if (filePath) {
        RNFS.exists(filePath)
          .then(exists => {
            if (!cancelled && !exists) {
              resetRecording({deleteFile: false});
            }
          })
          .catch(err =>
            console.warn('Could not verify the recording still exists:', err),
          );
      }

      return () => {
        cancelled = true;
        stopTimer();

        if (isRecordingRef.current) {
          audioRecorder
            .stop()
            .catch(err =>
              console.warn('Error stopping recorder on screen exit:', err),
            );

          isRecordingRef.current = false;
        }
      };
    }, [audioRecorder, filePath, resetRecording]),
  );

  // useEffect(() => {
  //   // const stopSub = AudioModule.addListener('recStop', (data:any) => {
  //   //   console.log('File saved at:', data.filePath);
  //   //   setFilePath(data.filePath);
  //   //   setRecording(false);
  //   // });

  //   const updateSub = DeviceEventEmitter.addListener('recUpdate', data => {
  //     //setElapsedMs(Math.floor(data.elapsedMs / 1000));
  //   });

  //   const audioWaveSubscription = AudioModule.addListener(
  //     'onAudioWaveform',
  //     event => {
  //       /*
  //       const amplitude = event.amplitude;
  //       // setCurrentAmplitude(amplitude);
  //       //console.log('event',event);
  //       const scaled = Math.min(1, amplitude * 6);
  //       if (scaled >= 1) {
  //         setAmplitudes(prev => {
  //           const updated = [...prev, scaled];
  //           if (updated.length > 100) {
  //             // To maintained wave array length 100
  //             updated.shift();
  //           }
  //           return updated;
  //         });
  //       }
  //         */
  //       //console.log('amplitudes', amplitudes);
  //     },
  //   );

  //   return () => {

  //     updateSub.remove();
  //     audioWaveSubscription.remove();
  //   };
  // }, []);


  return (
    <Theme name={isDark ? 'dark' : 'light'}>
      <YStack flex={1} bg={bgColor}>
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
            onPress={() => {
              if (recording) {
                Alert.alert('Recording in Progress', 'Do you want to discard this recording and leave?', [
                  {text: 'Cancel', style: 'cancel'},
                  {
                    text: 'Discard & Leave',
                    style: 'destructive',
                    onPress: async () => {
                      await resetRecording();
                      navigation.goBack();
                    },
                  },
                ]);
              } else {
                navigation.goBack();
              }
            }}>
            <Ionicons name="arrow-back" size={22} color={textColor} />
          </TouchableOpacity>
          <Text color={textColor} fontSize={17} fontWeight="700">
            Podcast Studio
          </Text>
          <YStack width={38} />
        </XStack>

        <YStack flex={1} ai="center" jc="center" px="$4" space="$3">
          {/* Header Section */}
          <YStack ai="center" space="$1.5" mb="$3">
            <Text
              color={textColor}
              fontSize={28}
              fontWeight="800"
              letterSpacing={0.5}>
              Record Audio
            </Text>
            <Text color={subTextColor} fontSize={14} fontWeight="500">
              Record your voice with studio quality
            </Text>
          </YStack>

          {/* Microphone Icon with Animation */}
          <YStack ai="center" jc="center" space="$3" my="$3">
            <YStack
              w={130}
              h={130}
              bg={recording ? (isDark ? '#3B82F6' : '#2563EB') : cardBg}
              ai="center"
              jc="center"
              borderRadius={65}
              borderWidth={recording ? 4 : 1.5}
              borderColor={recording ? '#60A5FA' : borderColor}
              shadowColor={recording ? '#3B82F6' : '#000'}
              shadowOffset={{width: 0, height: recording ? 8 : 2}}
              shadowOpacity={recording ? 0.4 : 0.08}
              shadowRadius={recording ? 20 : 6}
              elevation={recording ? 8 : 3}>
              <Icon
                name="microphone"
                size={54}
                color={recording ? '#FFFFFF' : accentBlue}
              />
            </YStack>
          </YStack>

          {/* Timer Display */}
          <YStack
            alignItems="center"
            bg={cardBg}
            borderWidth={1}
            borderColor={borderColor}
            px="$6"
            py="$3.5"
            borderRadius={16}
            shadowColor="#000"
            shadowOffset={{width: 0, height: 2}}
            shadowOpacity={0.05}
            shadowRadius={6}
            elevation={2}
            mb="$1">
            <Text
              fontSize={44}
              color={recording ? '#EF4444' : accentBlue}
              fontWeight="800"
              letterSpacing={3}
              fontFamily={'monospace' as any}>
              {recordTime}
            </Text>
            <Text color={subTextColor} fontSize={12} fontWeight="600" mt="$1">
              {uiState === 'recording'
                ? 'RECORDING IN PROGRESS'
                : uiState === 'review'
                  ? 'RECORDING COMPLETE'
                  : 'READY TO RECORD'}
            </Text>
          </YStack>

          {/* Waveform Animation */}
          {recording && (
            <YStack ai="center" my="$2">
              <LottieView
                source={require('../../assets/LottieAnimation/sound-voice-waves.json')}
                autoPlay
                loop
                style={{
                  width: 180,
                  height: 80,
                }}
              />
            </YStack>
          )}

          {/* Action Controls */}
          <XStack jc="center" ai="center" space="$5" mt="$4">
            {/* Play Preview Button */}
            {uiState === 'review' && (
              <YStack ai="center" space="$2">
                <Circle
                  size={64}
                  bg={cardBg}
                  ai="center"
                  jc="center"
                  borderWidth={2}
                  borderColor={accentBlue}
                  pressStyle={{scale: 0.95}}
                  onPress={() =>
                    navigation.navigate('PodcastPlayer', {
                      title,
                      description,
                      imageUtils,
                      selectedGenres,
                      filePath: audioRecorder.uri || '',
                      episodeId: episodeId || null,
                    })
                  }>
                  <Icon name="play" size={32} color={accentBlue} />
                </Circle>
                <Text color={subTextColor} fontSize={12} fontWeight="600">
                  PLAY
                </Text>
              </YStack>
            )}

            {/* Main Record/Stop Button */}
            <YStack ai="center" space="$2">
              <Circle
                size={110}
                ai="center"
                jc="center"
                bg="transparent"
                borderWidth={5}
                borderColor={uiState === 'recording' ? '#EF4444' : (isDark ? '#3B82F6' : '#2563EB')}
                pressStyle={{scale: 0.95}}
                shadowColor={uiState === 'recording' ? '#EF4444' : '#2563EB'}
                shadowOffset={{width: 0, height: 4}}
                shadowOpacity={0.4}
                shadowRadius={10}
                elevation={6}
                onPress={
                  uiState === 'idle' || uiState === 'review'
                    ? handleStartRecording
                    : handleStopRecording
                }>
                <Circle
                  size={80}
                  bg={uiState === 'recording' ? '#EF4444' : (isDark ? '#3B82F6' : '#2563EB')}
                  ai="center"
                  jc="center">
                  <Icon
                    name={uiState === 'recording' ? 'stop' : 'record-circle'}
                    size={44}
                    color="white"
                  />
                </Circle>
              </Circle>
              <Text color={subTextColor} fontSize={12} fontWeight="600">
                {uiState === 'recording' ? 'STOP' : 'RECORD'}
              </Text>
            </YStack>

            {/* Re-record Button */}
            {uiState === 'review' && (
              <YStack ai="center" space="$2">
                <Circle
                  size={64}
                  bg={cardBg}
                  ai="center"
                  jc="center"
                  borderWidth={2}
                  borderColor="#F59E0B"
                  pressStyle={{scale: 0.95}}
                  onPress={handleReRecord}>
                  <Icon name="refresh" size={32} color="#F59E0B" />
                </Circle>
                <Text color={subTextColor} fontSize={12} fontWeight="600">
                  RETRY
                </Text>
              </YStack>
            )}
          </XStack>

          {/* Podcast Title Display */}
          <YStack
            ai="center"
            mt="$5"
            px="$4"
            py="$3"
            bg={cardBg}
            borderWidth={1}
            borderColor={borderColor}
            borderRadius={12}
            maxWidth="92%"
            shadowColor="#000"
            shadowOffset={{width: 0, height: 1}}
            shadowOpacity={0.04}
            shadowRadius={4}
            elevation={1}>
            <Text color={subTextColor} fontSize={11} fontWeight="700" mb="$1" letterSpacing={0.8}>
              PODCAST TITLE
            </Text>
            <Text
              color={textColor}
              fontSize={15}
              fontWeight="700"
              textAlign="center"
              flexWrap="wrap"
              flexShrink={1}
              allowFontScaling>
              {title}
            </Text>
          </YStack>
        </YStack>
      </YStack>
    </Theme>
  );
};

export default PodcastRecorder;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0f172a',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 24,
//   },
//   title: {
//     fontSize: 28,
//     color: '#f8fafc',
//     marginBottom: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   timer: {
//     fontSize: 42,
//     color: '#38bdf8',
//     marginVertical: 20,
//     fontVariant: ['tabular-nums'],
//     letterSpacing: 1,
//   },
//   waveContainer: {
//     height: 80,
//     width: '100%',
//     alignSelf: 'center',
//     marginVertical: 16,
//   },
//   actionRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     gap: 16,
//     marginTop: 24,
//   },

//   // Shared circular style
//   circularButton: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },

//   // Rectangular style for stop/pause
//   rectButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 14,
//     paddingHorizontal: 28,
//     borderRadius: 12,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },

//   // Colors
//   record: {backgroundColor: '#16a34a'},
//   stop: {backgroundColor: '#dc2626'},
//   play: {backgroundColor: '#3b82f6'},
//   pause: {backgroundColor: '#f59e0b'},
//   rerecord: {backgroundColor: '#0284c7'},
//   upload: {backgroundColor: '#7c3aed'},

//   buttonText: {
//     color: '#f8fafc',
//     fontSize: 12,
//     fontWeight: '600',
//     textAlign: 'center',
//     marginTop: 4,
//   },

//   pathText: {
//     marginTop: 20,
//     fontSize: 14,
//     color: '#cbd5e1',
//     textAlign: 'center',
//   },

//   // Mic styles
//   iconContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 16,
//   },
//   micButton: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: '#1e293b',
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 6,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 4},
//     shadowOpacity: 0.25,
//     shadowRadius: 6,
//   },
//   micButtonActive: {
//     backgroundColor: '#38bdf8',
//   },
//   micOuterCircle: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: '#334155',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   micInnerCircle: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#f8fafc',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   micBody: {
//     width: 18,
//     height: 28,
//     borderRadius: 9,
//     backgroundColor: '#38bdf8',
//     marginBottom: 2,
//   },
//   micStem: {
//     width: 4,
//     height: 10,
//     borderRadius: 2,
//     backgroundColor: '#38bdf8',
//     marginTop: 2,
//   },
//   micPulse: {
//     position: 'absolute',
//     top: -15,
//     left: -15,
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     borderWidth: 2,
//     borderColor: '#38bdf8',
//     opacity: 0.4,
//   },

//   actionButtonText: {
//     color: '#f8fafc',
//     fontSize: 10,
//     fontWeight: '600',
//     textAlign: 'center',
//     //marginTop: 2,
//     letterSpacing: 0.5,
//   },

//   slider: {
//     width: '100%',
//     height: 36,
//     marginTop: 6,
//     marginBottom: 2,
//   },

//   timeRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 4,
//     marginBottom: 12,
//   },
//   time: {
//     fontSize: 13,
//     color: '#777',
//   },
// });


