/**
 * useNetworkRecovery.ts
 * 
 * Custom hook to handle automatic podcast playback recovery after network interruptions.
 * 
 * This hook:
 * 1. Detects network connectivity changes (loss/restoration)
 * 2. Saves playback position before pausing on network loss
 * 3. Automatically restores position and resumes playback on reconnection
 * 4. Prevents duplicate resume attempts during rapid reconnect events
 * 5. Distinguishes between network-related and other playback errors
 * 
 * Usage:
 * const { isRecovering, handleNetworkError } = useNetworkRecovery(
 *   player,
 *   isConnected,
 *   currentPosition,
 *   wasPlaying
 * );
 */

import * as Sentry from '@sentry/react-native';
import { useEffect, useRef, useState } from 'react';
import { logger } from '../services/monitoring/logger';

interface NetworkRecoveryState {
  isRecovering: boolean;
  savedPosition: number;
  wasPlayingBeforeLoss: boolean;
}

interface UseNetworkRecoveryReturn {
  isRecovering: boolean;
  handleNetworkError: (error: Error, isNetworkRelated: boolean) => void;
}

/**
 * Hook for managing podcast playback recovery during network interruptions.
 * 
 * @param player - expo-audio player instance
 * @param isConnected - current network connection status from Redux
 * @param currentPosition - current playback position in seconds
 * @param wasPlaying - whether podcast was playing before network loss
 * @returns Object with recovery state and error handler
 */
export const useNetworkRecovery = (
  player: any,
  isConnected: boolean,
  currentPosition: number,
  wasPlaying: boolean,
): UseNetworkRecoveryReturn => {
  const [recoveryState, setRecoveryState] = useState<NetworkRecoveryState>({
    isRecovering: false,
    savedPosition: 0,
    wasPlayingBeforeLoss: false,
  });

  // Track whether we've attempted resume to prevent duplicates
  const isResumeAttemptedRef = useRef(false);
  
  // Track previous connection state to detect transitions
  const previousConnectionRef = useRef(isConnected);
  
  // Debounce timer for rapid reconnects
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Handle network loss: pause playback and save state
   */
  const handleNetworkLoss = async () => {
    if (!player) return;

    logger.log('[NetworkRecovery] Network loss detected, saving state and pausing playback');

    try {
      // Save current state before pausing
      const position = player.currentTime || 0;
      const isCurrentlyPlaying = player.playing || false;

      setRecoveryState({
        isRecovering: true,
        savedPosition: position,
        wasPlayingBeforeLoss: isCurrentlyPlaying,
      });

      // Pause the player gracefully
      if (isCurrentlyPlaying) {
        await player.pause();
        logger.log('[NetworkRecovery] Playback paused, position saved', {
          position,
          timestamp: new Date().toISOString(),
        });
      }

      // Reset resume attempt flag when network loss occurs
      isResumeAttemptedRef.current = false;

      // Log to Sentry for offline analytics
      Sentry.captureMessage('Podcast playback paused due to network loss', 'info');
    } catch (error) {
      logger.error('[NetworkRecovery] Error during network loss handling:', error);
      Sentry.captureException(error, {
        tags: { context: 'network_loss_pause' },
      });
    }
  };

  /**
   * Handle network restoration: restore position and resume playback
   */
  const handleNetworkRestoration = async () => {
    if (!player) {
      logger.warn('[NetworkRecovery] Network restored but player not available');
      return;
    }

    // Prevent duplicate resume attempts during rapid reconnect events
    if (isResumeAttemptedRef.current) {
      logger.log('[NetworkRecovery] Resume already attempted for this session, skipping duplicate');
      return;
    }

    // Mark that we're attempting resume
    isResumeAttemptedRef.current = true;

    logger.log('[NetworkRecovery] Network restored, attempting playback recovery');

    try {
      // Small delay to ensure network is stable before resuming
      await new Promise((resolve: () => void) => setTimeout(resolve, 500));

      // Check network is still available (double-check)
      if (!isConnected) {
        logger.warn('[NetworkRecovery] Network connectivity lost again during recovery');
        isResumeAttemptedRef.current = false;
        return;
      }

      // Restore playback position
      if (recoveryState.savedPosition > 0) {
        await player.seekTo(recoveryState.savedPosition);
        logger.log('[NetworkRecovery] Playback position restored');
      }

      // Resume playback only if it was playing before network loss
      if (recoveryState.wasPlayingBeforeLoss) {
        await player.play();
        logger.log('[NetworkRecovery] Playback resumed after network recovery');
      }

      // Clear recovery state and UI banner
      setRecoveryState({
        isRecovering: false,
        savedPosition: 0,
        wasPlayingBeforeLoss: false,
      });

      // Log successful recovery
      Sentry.captureMessage('Podcast playback successfully recovered after network loss', 'info');
    } catch (error) {
      logger.error('[NetworkRecovery] Error during playback recovery:', error);

      // Reset resume flag on error to allow retry
      isResumeAttemptedRef.current = false;

      // Distinguish network errors from other errors
      const isNetworkError = error instanceof Error && (
        error.message.toLowerCase().indexOf('network') !== -1 ||
        error.message.toLowerCase().indexOf('timeout') !== -1 ||
        error.message.toLowerCase().indexOf('fetch') !== -1 ||
        error.message.toLowerCase().indexOf('offline') !== -1
      );

      Sentry.captureException(error, {
        tags: {
          context: 'network_restoration_recovery',
          errorType: isNetworkError ? 'network' : 'playback',
        },
      });

      // If it's still a network error, keep recovery banner visible
      if (!isNetworkError) {
        setRecoveryState((prev: NetworkRecoveryState) => ({
          ...prev,
          isRecovering: false,
        }));
      }
    }
  };

  /**
   * Public error handler for player errors
   */
  const handleNetworkError = (error: Error, isNetworkRelated: boolean = false) => {
    if (isNetworkRelated) {
      logger.warn('[NetworkRecovery] Network-related playback error detected:', error.message);
      handleNetworkLoss();
    } else {
      logger.error('[NetworkRecovery] Non-network playback error:', error.message);
      // Non-network errors should be handled by caller
    }
  };

  /**
   * Watch for network state changes and handle accordingly
   */
  useEffect(() => {
    // Detect transition from connected to disconnected
    if (previousConnectionRef.current && !isConnected) {
      logger.log('[NetworkRecovery] Network connection lost');
      handleNetworkLoss();
    }
    // Detect transition from disconnected to connected
    else if (!previousConnectionRef.current && isConnected) {
      logger.log('[NetworkRecovery] Network connection restored');

      // Debounce rapid reconnect attempts (ignore within 1 second)
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        void handleNetworkRestoration();
      }, 1000); // Wait 1 second for network to stabilize
    }

    previousConnectionRef.current = isConnected;

    // Cleanup debounce timer on unmount
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [isConnected]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      isResumeAttemptedRef.current = false;
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    isRecovering: recoveryState.isRecovering,
    handleNetworkError,
  };
};
