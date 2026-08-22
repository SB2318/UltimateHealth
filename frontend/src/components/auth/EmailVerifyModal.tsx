import React from 'react';
import { Modal, StyleSheet } from 'react-native';
import { YStack, Text, Button, XStack } from 'tamagui';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

interface EmailVerifyModalProps {
  visible: boolean;
  email?: string;
  onDismiss: () => void;
  onResend: () => void;
}

export default function EmailVerifyModal({
  visible,
  email,
  onDismiss,
  onResend,
}: EmailVerifyModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <YStack
        flex={1}
        backgroundColor="rgba(0,0,0,0.5)"
        justifyContent="center"
        alignItems="center"
        padding="$4"
      >
        <YStack
          backgroundColor="white"
          width="100%"
          maxWidth={400}
          borderRadius="$6"
          padding="$5"
          alignItems="center"
          elevation={5}
        >
          <YStack
            width={64}
            height={64}
            borderRadius={32}
            backgroundColor="$blue2"
            justifyContent="center"
            alignItems="center"
            marginBottom="$4"
          >
            <Icon name="email-check-outline" size={32} color="#3b82f6" />
          </YStack>

          <Text fontSize={22} fontWeight="bold" color="$color12" marginBottom="$2">
            Check your email
          </Text>

          <Text fontSize={15} color="$gray11" textAlign="center" marginBottom="$4" lineHeight={22}>
            We've sent a verification link to{'\n'}
            <Text fontWeight="bold" color="$color12">{email || 'your email'}</Text>.{'\n\n'}
            Tap the link to verify your account, then sign in again.
          </Text>

          <YStack width="100%" gap="$3" marginTop="$2">
            <Button
              size="$5"
              backgroundColor="$blue10"
              color="white"
              borderRadius="$4"
              onPress={onDismiss}
              pressStyle={{ scale: 0.98, opacity: 0.9 }}
            >
              OK, got it
            </Button>

            <Button
              size="$5"
              backgroundColor="transparent"
              color="$blue10"
              borderWidth={1}
              borderColor="$blue5"
              borderRadius="$4"
              onPress={onResend}
              pressStyle={{ scale: 0.98, backgroundColor: '$blue2' }}
            >
              Resend email
            </Button>
          </YStack>
        </YStack>
      </YStack>
    </Modal>
  );
}
