/**
 * JoinListenTogetherScreen — Room code entry screen.
 *
 * Users enter a 6-character room code to join an existing Listen Together
 * session.  Supports auto-fill from deep links (roomCode route param).
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {Theme, XStack, YStack, Text} from 'tamagui';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import {JoinListenTogetherScreenProp} from '../type';

const CODE_LENGTH = 6;

const JoinListenTogetherScreen = ({
  navigation,
  route,
}: JoinListenTogetherScreenProp) => {
  const prefillCode = route.params?.roomCode || '';
  const [code, setCode] = useState(prefillCode.toUpperCase());
  const [isJoining, setIsJoining] = useState(false);
  const inputRef = useRef<TextInput>(null);

  // Auto-focus input on mount
  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleCodeChange = useCallback((text: string) => {
    // Only allow alphanumeric, max 6 chars
    const sanitized = text.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, CODE_LENGTH);
    setCode(sanitized);
  }, []);

  const handleJoin = useCallback(() => {
    if (code.length !== CODE_LENGTH) return;

    Keyboard.dismiss();
    setIsJoining(true);

    // Navigate to ListenTogetherScreen in listener mode
    // The actual socket join happens inside that screen via the hook
    navigation.replace('ListenTogetherScreen', {
      trackId: '', // Will be populated from the room data received via socket
      audioUrl: null,
      roomCode: code,
      mode: 'listener',
    });
  }, [code, navigation]);

  const isCodeValid = code.length === CODE_LENGTH;

  return (
    <Theme name="dark">
      <YStack
        flex={1}
        backgroundColor="#0F172A"
        padding="$5"
        justifyContent="center"
        alignItems="center">
        {/* Back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back">
          <Ionicons name="arrow-back" size={24} color="#F1F5F9" />
        </TouchableOpacity>

        {/* Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name="people" size={48} color="#3B82F6" />
        </View>

        {/* Title */}
        <Text
          color="#F1F5F9"
          fontSize={28}
          fontWeight="800"
          textAlign="center"
          marginTop="$4">
          Join Listening Session
        </Text>
        <Text
          color="#94A3B8"
          fontSize={15}
          textAlign="center"
          marginTop="$2"
          lineHeight={22}>
          Enter the 6-character room code{'\n'}shared by your friend.
        </Text>

        {/* Code Input */}
        <View style={styles.codeInputWrapper}>
          <XStack gap="$2" justifyContent="center">
            {Array.from({length: CODE_LENGTH}).map((_, i) => {
              const char = code[i] || '';
              const isFocused = code.length === i;

              return (
                <View
                  key={i}
                  style={[
                    styles.codeBox,
                    char ? styles.codeBoxFilled : null,
                    isFocused ? styles.codeBoxFocused : null,
                  ]}>
                  <Text
                    color="#F1F5F9"
                    fontSize={28}
                    fontWeight="800"
                    textAlign="center">
                    {char}
                  </Text>
                </View>
              );
            })}
          </XStack>

          {/* Hidden TextInput for keyboard capture */}
          <TextInput
            ref={inputRef}
            style={styles.hiddenInput}
            value={code}
            onChangeText={handleCodeChange}
            maxLength={CODE_LENGTH}
            autoCapitalize="characters"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="join"
            onSubmitEditing={handleJoin}
          />

          {/* Tap overlay to re-focus */}
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => inputRef.current?.focus()}
          />
        </View>

        {/* Join Button */}
        <TouchableOpacity
          style={[styles.joinButton, !isCodeValid && styles.joinButtonDisabled]}
          disabled={!isCodeValid || isJoining}
          onPress={handleJoin}
          accessibilityLabel="Join listening session">
          {isJoining ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <XStack alignItems="center" gap="$2">
              <MaterialIcons name="headset" size={22} color="#FFFFFF" />
              <Text color="#FFFFFF" fontSize={17} fontWeight="800">
                Join Session
              </Text>
            </XStack>
          )}
        </TouchableOpacity>

        {/* Hint */}
        <XStack
          alignItems="center"
          gap="$2"
          marginTop="$6"
          opacity={0.6}>
          <Ionicons name="information-circle-outline" size={18} color="#94A3B8" />
          <Text color="#94A3B8" fontSize={13}>
            Ask the host for the room code
          </Text>
        </XStack>
      </YStack>
    </Theme>
  );
};

export default JoinListenTogetherScreen;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    zIndex: 10,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: {width: 0, height: 8},
    shadowRadius: 24,
    shadowOpacity: 0.3,
    elevation: 8,
  },
  codeInputWrapper: {
    marginTop: 40,
    marginBottom: 32,
    position: 'relative',
  },
  codeBox: {
    width: 48,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#1E293B',
    borderWidth: 2,
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeBoxFilled: {
    borderColor: '#3B82F6',
    backgroundColor: '#1E3A5F',
  },
  codeBoxFocused: {
    borderColor: '#60A5FA',
    shadowColor: '#3B82F6',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    shadowOpacity: 0.4,
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  joinButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#3B82F6',
    shadowOffset: {width: 0, height: 8},
    shadowRadius: 20,
    shadowOpacity: 0.4,
    elevation: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  joinButtonDisabled: {
    backgroundColor: '#334155',
    shadowOpacity: 0,
    elevation: 0,
  },
});
