import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  Platform,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Slider from '@react-native-community/slider';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import {PRIMARY_COLOR} from '../helper/Theme'; // Custom theme color
import Tts, {type TtsEvent} from 'react-native-tts'; // Text-to-Speech library

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const getSpeechSegmentFromPosition = (
  sourceText: string,
  totalDuration: number,
  position: number,
) => {
  if (!sourceText.trim()) {
    return {charOffset: 0, segmentText: ''};
  }

  const safePosition = clamp(position, 0, totalDuration);
  const targetChar =
    totalDuration > 0
      ? Math.floor((safePosition / totalDuration) * sourceText.length)
      : 0;

  const wordMatches = [...sourceText.matchAll(/\S+/g)];
  const wordStart = wordMatches.reduce((latestStart, match) => {
    const index = match.index ?? 0;
    return index <= targetChar ? index : latestStart;
  }, 0);

  const rawSegment = sourceText.slice(wordStart);
  const trimmedSegment = rawSegment.trimStart();
  const trimOffset = rawSegment.length - trimmedSegment.length;

  return {
    charOffset: wordStart + trimOffset,
    segmentText: trimmedSegment,
  };
};

const getPositionFromTtsProgress = (
  event: TtsEvent<'tts-progress'>,
  segmentStartOffset: number,
  sourceTextLength: number,
  totalDuration: number,
) => {
  if (!sourceTextLength || !totalDuration) {
    return 0;
  }

  const eventOffset = (event.location ?? 0) + (event.length ?? 0);
  const absoluteOffset = clamp(
    segmentStartOffset + eventOffset,
    0,
    sourceTextLength,
  );

  return (absoluteOffset / sourceTextLength) * totalDuration;
}

const PodcastPlayer = ({}) => {
  // State variables
  const [isLiked, setisLiked] = useState(false); // Track if the podcast is liked
  const [isPlaying, setisPlaying] = useState(false); // Track if the podcast is playing
  const [duration, setDuration] = useState(0); // Store the total duration of the podcast
  const [currentPosition, setCurrentPosition] = useState(0); // Store the current playback position
  const durationRef = useRef(0);
  const segmentStartOffsetRef = useRef(0);
  const stopReasonRef = useRef<'pause' | 'seek' | null>(null);

  // Text content of the podcast
  const text = `You're seeking new ways to diversify your portfolio, but it's not always easy to find new reliable investment opportunities. Each week, our financial expert with four decades of successful investing experience will help you discover opportunities outside of your current strategy that you've probably never considered before. If you want to learn about ways to diversify your portfolio in ways that have various levels of risk, this show is for you.`;

  // Rate at which text is spoken (different for iOS and Android)
  const rateAtTextSpoken = Platform.OS === 'ios' ? 1.1 : 0.9;
  const defaultrate = Platform.OS === 'ios' ? 0.4 : 0.6;

  // Function to initialize Text-to-Speech (TTS) settings and calculate the estimated duration of the text
  const initTts = async () => {
    const totalDuration = estimateTTSDuration(text); // Calculate total duration based on text
    durationRef.current = totalDuration;
    setDuration(totalDuration); // Set the duration state

    const voices = await Tts.voices(); // Get available TTS voices
    const availableVoices = voices
      .filter(
        v =>
          !v.networkConnectionRequired &&
          !v.notInstalled &&
          (v.language === 'en-IN' || v.language === 'en-US'),
      )
      .map(v => {
        return {id: v.id, name: v.name, language: v.language}; // Map relevant voice properties
      });

    // If there are available voices, set the default language and voice
    if (availableVoices && availableVoices.length > 0) {
      try {
        await Tts.setDefaultLanguage(availableVoices[0].language);
      } catch (err) {
        //console.log(`setDefaultLanguage error `, err);
      }
      await Tts.setDefaultVoice(availableVoices[0].id); // Set default voice
      Tts.setDefaultRate(defaultrate, true); // Set default speech rate
      Tts.setDefaultPitch(1.5); // Set default pitch
      Tts.setDucking(true); // Enable ducking (lower other audio)
      Tts.setIgnoreSilentSwitch('ignore'); // Ignore silent switch on iOS
    } else {
      ('Error playing the audio');
      setisPlaying(false);
    }
  };

  // Function to estimate TTS duration based on text length and speaking rate
  const estimateTTSDuration = (text: string) => {
    const wordsPerMinute = 130; // Average speaking rate at normal speed 1.1
    const adjustedWordsPerMinute = wordsPerMinute * rateAtTextSpoken; // Adjust based on the speech rate
    const words = text.split(' ').length; // Calculate number of words in the text
    return (words / adjustedWordsPerMinute) * 60 * 1000; // Duration in milliseconds
  };

  // useEffect hook to initialize TTS and set up event listeners
  useEffect(() => {
    Tts.getInitStatus().then(initTts); // Initialize TTS when component mounts

    const handleProgress = (event: TtsEvent<'tts-progress'>) => {
      const nextPosition = getPositionFromTtsProgress(
        event,
        segmentStartOffsetRef.current,
        text.length,
        durationRef.current,
      );
      setCurrentPosition(nextPosition);
    };

    const handleFinish = () => {
      segmentStartOffsetRef.current = 0;
      stopReasonRef.current = null;
      setCurrentPosition(0);
      setisPlaying(false);
    };

    const handleCancel = () => {
      if (stopReasonRef.current === 'pause') {
        setisPlaying(false);
      }
      stopReasonRef.current = null;
    };

    Tts.addEventListener('tts-progress', handleProgress);
    Tts.addEventListener('tts-finish', handleFinish);
    Tts.addEventListener('tts-cancel', handleCancel);

    return () => {
      Tts.removeEventListener('tts-progress', handleProgress);
      Tts.removeEventListener('tts-finish', handleFinish);
      Tts.removeEventListener('tts-cancel', handleCancel);
      Tts.stop();
    };
  }, []);

  // Handle the 'like' button press
  const handleLike = () => {
    setisLiked(!isLiked);
  };

  // Function to handle play/pause actions
  const speakFromPosition = (position: number) => {
    const safePosition = clamp(position, 0, durationRef.current);
    const {charOffset, segmentText} = getSpeechSegmentFromPosition(
      text,
      durationRef.current,
      safePosition,
    );

    if (!segmentText) {
      segmentStartOffsetRef.current = 0;
      setCurrentPosition(0);
      setisPlaying(false);
      return;
    }

    segmentStartOffsetRef.current = charOffset;
    setCurrentPosition(safePosition);
    setisPlaying(true);
    Tts.speak(segmentText);
  };

  const handlePlay = async () => {
    if (isPlaying) {
      stopReasonRef.current = 'pause';
      await Tts.stop(); // Stop the text-to-speech
      setisPlaying(false);
    } else {
      await Tts.stop(); // Ensure TTS is stopped before starting new speech
      speakFromPosition(currentPosition);
    }
  };

  // Function to handle slider changes
  const handleSliderChange = async (value: number) => {
    // Calculate the position in milliseconds based on slider value
    const seekPosition = value * duration;

    // Update the current position
    setCurrentPosition(seekPosition);

    // Stop any ongoing speech
    stopReasonRef.current = 'seek';
    await Tts.stop();

    // Resume from the nearest word boundary for a cleaner seek.
    speakFromPosition(seekPosition);
  };

  // Handle forward button press (implementation needed)
  const handleForward = () => {};

  // Handle backward button press (implementation needed)
  const handleBackward = () => {};

  // Handle download button press (implementation needed)
  const handleDownload = () => {};

  // Handle share button press (implementation needed)
  const handleShare = () => {};

  // Render the podcast player UI
  return (
    <>
      <Text style={styles.podcast}>Feel Better. Live More</Text>
      <Text style={styles.podcastname}>
        8 Hidden Habits To Live Your Healthiest, Happiest and Most Fulfilled
        Life with Robin Sharma
      </Text>

      <View style={styles.postedByContainer}>
        <View style={styles.postedByContent}>
          <Image
            source={{
              uri: 'https://www.telegraph.co.uk/content/dam/health-fitness/2023/01/06/TELEMMGLPICT000181626250_trans_NvBQzQNjv4BqqB8Yzl3cNKHqhd5OnaUTT5j2A7wJtvm8wQOgknmsfZY.jpeg',
            }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.postedByText}>Posted by</Text>
            <Text style={styles.postedByName}>Dr Rangan Chatterjee</Text>
          </View>
        </View>
      </View>

      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate
        augue erat, congue lacinia turpis pellentesque aliquam. Quisque eu
        tellus varius, eleifend dui sed, luctus nibh. Duis et dolor eu ligula
        ultrices dictum. Class aptent taciti sociosqu ad litora torquent per
        conubia nostra, per inceptos himenaeos.
      </Text>

      <View style={styles.actionsContainer}>
        <View style={styles.actionsContent}>
          <View style={styles.likeContainer}>
            <TouchableOpacity onPress={handleLike}>
              {isLiked ? (
                <Ionicons name="heart-sharp" color={'white'} size={30} />
              ) : (
                <Ionicons name="heart-outline" color={'white'} size={30} />
              )}
            </TouchableOpacity>
            <Text style={styles.likeText}>30</Text>
          </View>
          <TouchableOpacity onPress={handleDownload}>
            <Entypo name="download" color={'white'} size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <EvilIcons name="sc-telegram" color={'white'} size={30} />
          </TouchableOpacity>
        </View>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={currentPosition / duration} // Slider value is based on the current position
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onSlidingComplete={handleSliderChange} // Seek to the new position when slider changes
      />

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          {Math.floor(currentPosition / 1000 / 60)}:
          {Math.floor((currentPosition / 1000) % 60)
            .toString()
            .padStart(2, '0')}
        </Text>
        <Text style={styles.timeText}>
          -{Math.floor((duration - currentPosition) / 1000 / 60)}:
          {Math.floor(((duration - currentPosition) / 1000) % 60)
            .toString()
            .padStart(2, '0')}
        </Text>
      </View>

      <View style={styles.controlContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={handleBackward}>
          <Feather size={30} color={'white'} name="skip-back" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
          {isPlaying ? (
            <FontAwesome6 size={15} color={PRIMARY_COLOR} name="pause" />
          ) : (
            <FontAwesome6 size={15} color={PRIMARY_COLOR} name="play" />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={handleForward}>
          <Feather size={30} color={'white'} name="skip-forward" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PodcastPlayer;

// Styles for PodcastPlayer component
const styles = StyleSheet.create({
  podcast: {
    fontSize: 15,
    fontWeight: 'normal',
    color: 'white',
    marginTop: 10,
  },
  podcastname: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  postedByContainer: {
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  postedByContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  postedByText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '300',
  },
  postedByName: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  description: {
    color: 'white',
    fontSize: 13,
    textAlign: 'justify',
    marginBottom: 15,
  },
  actionsContainer: {
    alignItems: 'flex-end',
    marginBottom: 0,
  },
  actionsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  likeText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
  slider: {
    width: '100%',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: -5,
  },
  timeText: {
    color: 'white',
    fontSize: 14,
  },
  controlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    marginHorizontal: 20,
  },
  playButton: {
    backgroundColor: 'white',
    height: 40,
    width: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
