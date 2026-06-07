import React, { useEffect } from 'react';
import { Linking, ActivityIndicator, View, StyleSheet, Platform } from 'react-native';
import { YStack, Text } from 'tamagui';
import { hp } from '../helper/Metric';

const PRIVACY_POLICY_URL =
  'https://www.freeprivacypolicy.com/live/0b40215e-e456-48cc-a549-424216da1e01';

const PrivacyPolicyScreen = () => {
  useEffect(() => {
    const openPrivacyPolicy = async () => {
      try {
        if (Platform.OS === 'web') {
          // On web, open in a new tab
          window.open(PRIVACY_POLICY_URL, '_blank', 'noopener,noreferrer');
        } else {
          // On mobile (Android/iOS), open in default browser
          const supported = await Linking.canOpenURL(PRIVACY_POLICY_URL);
          if (supported) {
            await Linking.openURL(PRIVACY_POLICY_URL);
          } else {
            console.error('Cannot open URL:', PRIVACY_POLICY_URL);
          }
        }
      } catch (err) {
        console.error('Failed to open Privacy Policy URL:', err);
      }
    };

    openPrivacyPolicy();
  }, []);

  return (
    <View style={styles.container}>
      <YStack alignItems="center" justifyContent="center" space="$3">
        <ActivityIndicator size="large" />
        <Text color="$gray10" fontSize="$4" marginTop={hp(2)}>
          Opening Privacy Policy...
        </Text>
      </YStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PrivacyPolicyScreen;