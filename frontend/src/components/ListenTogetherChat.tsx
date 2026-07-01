/**
 * ListenTogetherChat — Live chat overlay for Listen Together sessions.
 *
 * Renders a scrollable list of chat messages with a text input bar.
 * Messages show the sender's initial, handle, text, and timestamp.
 * Auto-scrolls to the newest message on arrival.
 */

import React, {useCallback, useRef, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text, XStack, YStack} from 'tamagui';
import {Ionicons} from '@expo/vector-icons';
import {ListenTogetherMessage} from '../types/ListenTogetherTypes';

interface ListenTogetherChatProps {
  messages: ListenTogetherMessage[];
  currentUserId: string;
  onSendMessage: (text: string) => void;
}

const ListenTogetherChat: React.FC<ListenTogetherChatProps> = ({
  messages,
  currentUserId,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const handleSend = useCallback(() => {
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  }, [inputText, onSendMessage]);

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    } catch {
      return '';
    }
  };

  const renderMessage = useCallback(
    ({item}: {item: ListenTogetherMessage}) => {
      const isOwnMessage = item.userId === currentUserId;

      return (
        <View
          style={[
            styles.messageBubble,
            isOwnMessage ? styles.ownMessage : styles.otherMessage,
          ]}>
          {/* Avatar + handle (for other people's messages) */}
          {!isOwnMessage && (
            <XStack alignItems="center" gap="$2" marginBottom="$1">
              <View style={styles.messageAvatar}>
                <Text color="#F1F5F9" fontSize={10} fontWeight="700">
                  {item.userHandle?.charAt(0)?.toUpperCase() || '?'}
                </Text>
              </View>
              <Text color="#60A5FA" fontSize={12} fontWeight="700">
                @{item.userHandle}
              </Text>
            </XStack>
          )}

          <Text
            color="#F1F5F9"
            fontSize={14}
            lineHeight={20}
            flexShrink={1}
            flexWrap="wrap">
            {item.text}
          </Text>

          <Text
            color="#64748B"
            fontSize={10}
            marginTop="$1"
            alignSelf={isOwnMessage ? 'flex-end' : 'flex-start'}>
            {formatTime(item.sentAt)}
          </Text>
        </View>
      );
    },
    [currentUserId],
  );

  const keyExtractor = useCallback(
    (item: ListenTogetherMessage) => item.id,
    [],
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      {/* Header */}
      <XStack
        alignItems="center"
        paddingHorizontal="$3"
        paddingVertical="$2"
        gap="$2">
        <Ionicons name="chatbubbles-outline" size={18} color="#60A5FA" />
        <Text color="#94A3B8" fontSize={13} fontWeight="700" letterSpacing={1}>
          LIVE CHAT
        </Text>
        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
        </View>
      </XStack>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => {
          flatListRef.current?.scrollToEnd({animated: true});
        }}
        ListEmptyComponent={
          <YStack
            flex={1}
            alignItems="center"
            justifyContent="center"
            padding="$4">
            <Ionicons name="chatbubble-ellipses-outline" size={40} color="#334155" />
            <Text
              color="#64748B"
              fontSize={14}
              marginTop="$2"
              textAlign="center">
              No messages yet.{'\n'}Start the conversation!
            </Text>
          </YStack>
        }
      />

      {/* Input bar */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Say something..."
          placeholderTextColor="#64748B"
          returnKeyType="send"
          onSubmitEditing={handleSend}
          maxLength={500}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            !inputText.trim() && styles.sendButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={!inputText.trim()}
          accessibilityLabel="Send message">
          <Ionicons
            name="send"
            size={18}
            color={inputText.trim() ? '#FFFFFF' : '#64748B'}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ListenTogetherChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
    overflow: 'hidden',
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF444440',
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#EF4444',
  },
  messagesList: {
    paddingHorizontal: 12,
    paddingBottom: 8,
    flexGrow: 1,
  },
  messageBubble: {
    maxWidth: '85%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    marginVertical: 3,
  },
  ownMessage: {
    backgroundColor: '#1E3A5F',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    backgroundColor: '#1E293B',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    gap: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#F1F5F9',
    fontSize: 14,
    maxHeight: 80,
  },
  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#334155',
  },
});
