/**
 * Listen Together — Type definitions
 *
 * Types used by the synchronized podcast listening ("Listen Together") feature.
 * These cover socket event payloads, room state, chat messages, and participants.
 */

// ---------------------------------------------------------------------------
// Socket event name constants
// ---------------------------------------------------------------------------

export const LISTEN_TOGETHER_EVENTS = {
  // Client → Server
  CREATE_ROOM: 'listen-together:create',
  JOIN_ROOM: 'listen-together:join',
  LEAVE_ROOM: 'listen-together:leave',
  END_ROOM: 'listen-together:end',
  SYNC_PLAYBACK: 'listen-together:sync',
  SEND_CHAT: 'listen-together:chat',

  // Server → Client
  ROOM_CREATED: 'listen-together:room-created',
  ROOM_JOINED: 'listen-together:room-joined',
  ROOM_ENDED: 'listen-together:room-ended',
  PARTICIPANT_JOINED: 'listen-together:participant-joined',
  PARTICIPANT_LEFT: 'listen-together:participant-left',
  SYNC_UPDATE: 'listen-together:sync-update',
  CHAT_MESSAGE: 'listen-together:chat-message',
  ERROR: 'listen-together:error',
} as const;

// ---------------------------------------------------------------------------
// Participant
// ---------------------------------------------------------------------------

export interface ListenTogetherParticipant {
  userId: string;
  userHandle: string;
  profileImage: string | null;
  joinedAt: string; // ISO timestamp
}

// ---------------------------------------------------------------------------
// Sync payload (sent with every playback action)
// ---------------------------------------------------------------------------

export type SyncAction = 'play' | 'pause' | 'seek' | 'ended';

export interface ListenTogetherSyncPayload {
  roomCode: string;
  action: SyncAction;
  position: number; // seconds
  timestamp: number; // Date.now() for clock-drift compensation
}

// ---------------------------------------------------------------------------
// Chat message
// ---------------------------------------------------------------------------

export interface ListenTogetherMessage {
  id: string;
  roomCode: string;
  userId: string;
  userHandle: string;
  profileImage: string | null;
  text: string;
  sentAt: string; // ISO timestamp
}

// ---------------------------------------------------------------------------
// Room state (maintained client-side by the hook)
// ---------------------------------------------------------------------------

export interface ListenTogetherRoom {
  roomCode: string;
  hostUserId: string;
  podcastId: string;
  audioUrl: string;
  podcastTitle: string;
  podcastCoverImage: string;
  participants: ListenTogetherParticipant[];
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Server response payloads
// ---------------------------------------------------------------------------

export interface RoomCreatedPayload {
  roomCode: string;
  room: ListenTogetherRoom;
}

export interface RoomJoinedPayload {
  room: ListenTogetherRoom;
  currentPosition: number;
  isPlaying: boolean;
}

export interface ListenTogetherError {
  code: string;
  message: string;
}
