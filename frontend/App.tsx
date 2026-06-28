import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setAudioModeAsync } from 'expo-audio';
import * as Sentry from '@sentry/react-native';
import { StatusBar } from 'expo-status-bar';                        // ADD
import { ThemeProvider, useTheme } from '@/hooks/theme-context';    // ADD
import { logger } from './src/services/monitoring/logger';
import AppContent from './src/components/AppContent';

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { retry: 2, staleTime: 1000 * 60 } },
      })
  );

  useEffect(() => {
    let isMounted = true;
    const configureAudio = async () => {
      try {
        await setAudioModeAsync({ playsInSilentMode: true, allowsRecording: true });
      } catch (error) {
        if (!isMounted) return;
        Sentry.captureException(error, {
          tags: { feature: 'audio_playback' },
          extra: { context: 'App startup audio configuration' },
        });
        logger.error('[App] Failed to configure audio mode:', error);
      }
    };
    configureAudio();
    return () => { isMounted = false; };
  }, []);

  return (
    <ThemeProvider>                                {/* ADD wrapper */}
      <QueryClientProvider client={queryClient}>
        <ThemedStatusBar />                        {/* ADD */}
        <AppContent />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

// ADD this small helper so the status bar reads the theme
function ThemedStatusBar() {
  const { theme } = useTheme();
  return <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />;
}

export default Sentry.wrap(App);