/**
 * ListenTogetherRoomBar — Top bar for a Listen Together session.
 *
 * Shows the room code (tap to copy), participant avatars, sync status,
 * a share button, and a leave/end button.
 */

import React, {useCallback} from 'react';
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {XStack, YStack, Text} from 'tamagui';
import {Ionicons, Feather, MaterialIcons} from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import Share from 'react-native-share';
import Snackbar from 'react-native-snackbar';
import {ListenTogetherParticipant} from '../types/ListenTogetherTypes';
import {SHARE_BASE_URL} from '../helper/APIUtils';

interface ListenTogetherRoomBarProps {
  roomCode: string;
  participants: ListenTogetherParticipant[];
  isHost: boolean;
  isSyncing: boolean;
  onLeave: () => void;
  onEnd: () => void;
}

const ListenTogetherRoomBar: React.FC<ListenTogetherRoomBarProps> = ({
  roomCode,
  participants,
  isHost,
  isSyncing,
  onLeave,
  onEnd,
}) => {
  const handleCopyCode = useCallback(() => {
    Clipboard.setStringAsync(roomCode);
    Snackbar.show({
      text: `Room code copied: ${roomCode}`,
      duration: Snackbar.LENGTH_SHORT,
    });
  }, [roomCode]);

  const handleShare = useCallback(async () => {
    try {
      const url = `${SHARE_BASE_URL}/listen-together?code=${roomCode}`;
      await Share.open({
        title: 'Listen Together',
        message: `Join my Listen Together session on UltimateHealth! Room code: ${roomCode}`,
        url,
        subject: 'Listen Together Invite',
      });
    } catch {
      // User cancelled share sheet — no action needed
    }
  }, [roomCode]);

  const handleLeaveOrEnd = useCallback(() => {
    const title = isHost ? 'End Session' : 'Leave Session';
    const message = isHost
      ? 'Ending the session will disconnect all listeners. Are you sure?'
      : 'Are you sure you want to leave this listening session?';

    Alert.alert(title, message, [
      {text: 'Cancel', style: 'cancel'},
      {
        text: isHost ? 'End' : 'Leave',
        style: 'destructive',
        onPress: isHost ? onEnd : onLeave,
      },
    ]);
  }, [isHost, onEnd, onLeave]);

  // Max 3 avatars shown, rest as "+N"
  const displayParticipants = participants.slice(0, 3);
  const extraCount = Math.max(0, participants.length - 3);

  return (
    <View style={styles.container}>
      {/* Left: Room code */}
      <TouchableOpacity
        style={styles.codeContainer}
        onPress={handleCopyCode}
        accessibilityLabel="Copy room code"
        accessibilityHint="Tap to copy the room code">
        <MaterialIcons name="meeting-room" size={16} color="#60A5FA" />
        <Text
          color="#F1F5F9"
          fontSize={14}
          fontWeight="800"
          letterSpacing={2}
          marginLeft="$1">
          {roomCode}
        </Text>
        <Feather
          name="copy"
          size={14}
          color="#94A3B8"
          style={styles.copyIcon}
        />
      </TouchableOpacity>

      {/* Center: Participants + sync status */}
      <XStack alignItems="center" gap="$2">
        {/* Participant avatars (stacked) */}
        <XStack>
          {displayParticipants.map((p, index) => (
            <View
              key={p.userId}
              style={[
                styles.avatarCircle,
                {marginLeft: index > 0 ? -10 : 0, zIndex: 10 - index},
              ]}>
              <Text color="#F1F5F9" fontSize={11} fontWeight="700">
                {p.userHandle?.charAt(0)?.toUpperCase() || '?'}
              </Text>
            </View>
          ))}
          {extraCount > 0 && (
            <View style={[styles.avatarCircle, {marginLeft: -10, zIndex: 0}]}>
              <Text color="#94A3B8" fontSize={10} fontWeight="700">
                +{extraCount}
              </Text>
            </View>
          )}
        </XStack>

        {/* Sync status pill */}
        <View
          style={[
            styles.syncPill,
            {backgroundColor: isSyncing ? '#F59E0B20' : '#10B98120'},
          ]}>
          <View
            style={[
              styles.syncDot,
              {backgroundColor: isSyncing ? '#F59E0B' : '#10B981'},
            ]}
          />
          <Text
            color={isSyncing ? '#F59E0B' : '#10B981'}
            fontSize={11}
            fontWeight="700">
            {isSyncing ? 'Syncing' : 'In Sync'}
          </Text>
        </View>
      </XStack>

      {/* Right: Share + Leave/End */}
      <XStack gap="$2">
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleShare}
          accessibilityLabel="Share room invite">
          <Ionicons name="share-outline" size={20} color="#60A5FA" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconButton, styles.leaveButton]}
          onPress={handleLeaveOrEnd}
          accessibilityLabel={isHost ? 'End session' : 'Leave session'}>
          <Ionicons
            name={isHost ? 'close-circle-outline' : 'exit-outline'}
            size={20}
            color="#EF4444"
          />
        </TouchableOpacity>
      </XStack>
    </View>
  );
};

export default ListenTogetherRoomBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  copyIcon: {
    marginLeft: 6,
  },
  avatarCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#1E293B',
  },
  syncPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
  },
  syncDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaveButton: {
    backgroundColor: '#EF444420',
  },
});
