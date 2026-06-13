/**
 * NetworkRecoveringBanner.tsx
 * 
 * UI banner component displayed when podcast playback is waiting for network recovery.
 * Shows a reconnecting message with animated spinner to give user visual feedback
 * that the app is attempting to restore playback.
 */

import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Text, XStack, YStack } from 'tamagui';

interface NetworkRecoveringBannerProps {
  isVisible: boolean;
}

/**
 * Banner displayed when podcast is recovering from network loss.
 * Animated spinner indicates waiting for network restoration.
 */
const NetworkRecoveringBanner: React.FC<NetworkRecoveringBannerProps> = ({
  isVisible,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <YStack
        width="100%"
        padding="$3"
        backgroundColor="#FFA500"
        borderRadius="$3"
        justifyContent="center"
        alignItems="center"
      >
        <XStack
          gap="$2"
          alignItems="center"
          justifyContent="center"
        >
          <ActivityIndicator 
            size="small" 
            color="#FFFFFF"
            testID="network-recovering-spinner"
          />
          <XStack gap="$1" alignItems="center">
            <Ionicons 
              name="cloud-offline-outline" 
              size={16} 
              color="#FFFFFF"
              testID="network-recovering-icon"
            />
            <Text
              fontSize={14}
              fontWeight="600"
              color="#FFFFFF"
              testID="network-recovering-text"
            >
              Network interrupted. Reconnecting...
            </Text>
          </XStack>
        </XStack>
      </YStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default NetworkRecoveringBanner;
