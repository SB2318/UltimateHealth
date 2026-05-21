/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
//import {Colors} from 'react-native/Libraries/NewAppScreen';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
//import PushNotification from 'react-native-push-notification';
import {setAudioModeAsync} from 'expo-audio';

import AppContent from './src/components/AppContent';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    // Keep both audio configuration approaches from branch and main
    // 1) call the simple setAudioModeAsync (main)
    try {
      setAudioModeAsync({
        //staysActiveInBackground: true,
        playsInSilentMode: true,
        allowsRecording: true,
      });
    } catch (e) {
      // ignore synchronous errors; the async API may be preferred elsewhere
    }

    // 2) call the more detailed async Audio.setAudioModeAsync (branch)
    const configureAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          staysActiveInBackground: true,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          playsInSilentModeIOS: true,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      } catch (error) {
        console.error('Failed to configure audio mode:', error);
      }
    };

    configureAudio();
  }, []);
  return (
     <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
