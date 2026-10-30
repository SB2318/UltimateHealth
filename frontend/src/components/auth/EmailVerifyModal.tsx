import React from 'react';
import { Modal, StyleSheet, useColorScheme } from 'react-native';
import { YStack, Text, Button, XStack, Spinner } from 'tamagui';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

interface EmailVerifyModalProps {
  visible: boolean;
  email?: string;
  onDismiss: () => void;
  onResend: () => void;
  isResending?: boolean;
}

export default function EmailVerifyModal({
  visible,
  email,
  onDismiss,
  onResend,
  isResending = false,
}: EmailVerifyModalProps) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <YStack
        flex={1}
        backgroundColor="rgba(0,0,0,0.65)"
        justifyContent="center"
        alignItems="center"
        padding="$4"
      >
        <YStack
          backgroundColor={isDarkMode ? '#1e293b' : 'white'}
          borderColor={isDarkMode ? '#334155' : '#e2e8f0'}
          borderWidth={1}
          width="100%"
          maxWidth={420}
          borderRadius="$6"
          padding="$5"
          alignItems="center"
          elevation={8}
          shadowColor="#000"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.25}
          shadowRadius={12}
        >
          {/* Email Icon with Badge */}
          <YStack
            width={72}
            height={72}
            borderRadius={36}
            backgroundColor={isDarkMode ? 'rgba(59, 130, 246, 0.2)' : '#eff6ff'}
            justifyContent="center"
            alignItems="center"
            marginBottom="$3"
          >
            <Icon name="email-check-outline" size={38} color="#3b82f6" />
          </YStack>

          {/* Status Badge */}
          <YStack
            backgroundColor={isDarkMode ? 'rgba(34, 197, 94, 0.2)' : '#dcfce7'}
            borderColor={isDarkMode ? '#22c55e' : '#86efac'}
            borderWidth={1}
            paddingHorizontal="$3"
            paddingVertical="$1"
            borderRadius="$10"
            marginBottom="$3"
          >
            <Text
              fontSize={12}
              fontWeight="700"
              color={isDarkMode ? '#4ade80' : '#15803d'}
              letterSpacing={0.5}
            >
              VERIFICATION MAIL SENT
            </Text>
          </YStack>

          <Text
            fontSize={22}
            fontWeight="800"
            color={isDarkMode ? 'white' : '#0f172a'}
            marginBottom="$2"
            textAlign="center"
          >
            Please Verify Your Email
          </Text>

          <Text
            fontSize={14.5}
            color={isDarkMode ? '#94a3b8' : '#475569'}
            textAlign="center"
            marginBottom="$3"
            lineHeight={22}
          >
            We've sent a verification link to your email address:{'\n'}
            <Text
              fontWeight="800"
              color={isDarkMode ? '#60a5fa' : '#2563eb'}
            >
              {email || 'your email'}
            </Text>
          </Text>

          <YStack
            backgroundColor={isDarkMode ? 'rgba(234, 179, 8, 0.12)' : '#fef9c3'}
            borderColor={isDarkMode ? '#ca8a04' : '#fde047'}
            borderWidth={1}
            borderRadius="$4"
            paddingHorizontal="$3.5"
            paddingVertical="$2.5"
            marginBottom="$4"
            width="100%"
          >
            <XStack alignItems="center" gap="$2">
              <Icon name="information-outline" size={18} color={isDarkMode ? '#facc15' : '#a16207'} />
              <Text
                fontSize={12.5}
                color={isDarkMode ? '#fde047' : '#854d0e'}
                fontWeight="600"
                flex={1}
                lineHeight={18}
              >
                Please verify your email before continuing. You cannot access the app dashboard until your email is verified.
              </Text>
            </XStack>
          </YStack>

          <YStack width="100%" gap="$3">
            <Button
              size="$5"
              backgroundColor="$blue10"
              color="white"
              borderRadius="$4"
              onPress={onDismiss}
              pressStyle={{ scale: 0.98, opacity: 0.9 }}
            >
              <Text color="white" fontWeight="700" fontSize={15}>
                OK, Got It
              </Text>
            </Button>

            <Button
              size="$5"
              backgroundColor="transparent"
              color="$blue10"
              borderWidth={1.5}
              borderColor={isDarkMode ? '#3b82f6' : '$blue6'}
              borderRadius="$4"
              onPress={onResend}
              disabled={isResending}
              pressStyle={{ scale: 0.98, opacity: 0.7 }}
              icon={isResending ? <Spinner size="small" color="#3b82f6" /> : undefined}
            >
              <Text color={isDarkMode ? '#60a5fa' : '$blue10'} fontWeight="700" fontSize={14}>
                {isResending ? 'Sending...' : 'Resend Verification Email'}
              </Text>
            </Button>
          </YStack>
        </YStack>
      </YStack>
    </Modal>
  );
}
