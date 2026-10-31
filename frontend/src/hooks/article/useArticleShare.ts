// @ts-nocheck
import { useRef, useState, useCallback } from 'react';
import { Share, Platform, Alert, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';

interface UseArticleShareReturn {
  /** Attach to the ArticleShareCard's cardRef prop */
  cardRef: React.RefObject<View>;
  /** True while the capture + share flow is in progress */
  isCapturing: boolean;
  /** Call this to trigger capture → share sheet */
  shareArticleCard: (articleTitle?: string, shareUrl?: string) => Promise<void>;
}

export function useArticleShare(): UseArticleShareReturn {
  const cardRef = useRef<View>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const shareArticleCard = useCallback(
    async (articleTitle?: string, shareUrl?: string) => {
      if (!cardRef.current) {
        Alert.alert('Share', 'Unable to generate preview card.');
        return;
      }

      setIsCapturing(true);

      try {
        const uri = await captureRef(cardRef, {
          format: 'png',
          quality: 1,
          result: 'tmpfile',
          snapshotContentContainer: false,
        });

        const baseMessage = articleTitle
          ? `Check out this article on UltimateHealth: "${articleTitle}"`
          : 'Check out this article on UltimateHealth!';
        const fullMessage = shareUrl
          ? `${baseMessage}\n${shareUrl}`
          : baseMessage;

        const shareContent =
          Platform.OS === 'android'
            ? {
                title: articleTitle ?? 'UltimateHealth Article',
                url: uri,
                message: fullMessage,
              }
            : {
                url: uri,
                message: fullMessage,
              };

        await Share.share(shareContent, {
          dialogTitle: 'Share Article',
          subject: articleTitle ?? 'UltimateHealth Article',
        });
      } catch (error: unknown) {
        if (
          error instanceof Error &&
          error.message !== 'User did not share'
        ) {
          console.warn('[useArticleShare] Share error:', error);
          Alert.alert(
            'Share failed',
            'Could not generate the preview card. Please try again.',
          );
        }
      } finally {
        setIsCapturing(false);
      }
    },
    [],
  );

  return { cardRef, isCapturing, shareArticleCard };
}
