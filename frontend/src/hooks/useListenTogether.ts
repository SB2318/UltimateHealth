/**
 * useListenTogether — Core hook for the synchronized podcast listening feature.
 *
 * Manages room creation/joining, playback synchronisation via Socket.IO,
 * and live chat messaging.  The hook is designed so that only the **host**
 * (room creator) can issue playback commands; listeners receive sync updates
 * and apply them to their local AudioPlayer instance.
 */

import {useCallback, useEffect, useRef, useState} from 'react';
import {useSocket} from '../contexts/SocketContext';
import {useSelector} from 'react-redux';
import {
  LISTEN_TOGETHER_EVENTS,
  ListenTogetherMessage,
  ListenTogetherParticipant,
  ListenTogetherRoom,
  ListenTogetherSyncPayload,
  RoomCreatedPayload,
  RoomJoinedPayload,
  ListenTogetherError,
  SyncAction,
} from '../types/ListenTogetherTypes';

// ---------------------------------------------------------------------------
// Hook return type
// ---------------------------------------------------------------------------

export interface UseListenTogetherReturn {
  // State
  room: ListenTogetherRoom | null;
  roomCode: string | null;
  participants: ListenTogetherParticipant[];
  messages: ListenTogetherMessage[];
  isHost: boolean;
  isInRoom: boolean;
  isSyncing: boolean;
  error: string | null;

  // Actions
  createRoom: (podcastId: string, audioUrl: string, podcastTitle: string, podcastCoverImage: string) => void;
  joinRoom: (roomCode: string) => void;
  leaveRoom: () => void;
  endRoom: () => void;
  syncPlayback: (action: SyncAction, position: number) => void;
  sendMessage: (text: string) => void;
  clearError: () => void;

  // Incoming sync (listeners apply this to their player)
  lastSyncPayload: ListenTogetherSyncPayload | null;
}

// ---------------------------------------------------------------------------
// Hook implementation
// ---------------------------------------------------------------------------

export const useListenTogether = (): UseListenTogetherReturn => {
  const socket = useSocket();
  const {user_id, user_handle} = useSelector((state: any) => state.user);
  const profileImage = useSelector((state: any) => state.user.profile_image ?? null);

  // --- State ---------------------------------------------------------------
  const [room, setRoom] = useState<ListenTogetherRoom | null>(null);
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [participants, setParticipants] = useState<ListenTogetherParticipant[]>([]);
  const [messages, setMessages] = useState<ListenTogetherMessage[]>([]);
  const [isHost, setIsHost] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSyncPayload, setLastSyncPayload] = useState<ListenTogetherSyncPayload | null>(null);

  // Keep a ref to roomCode so event callbacks always see the latest value.
  const roomCodeRef = useRef<string | null>(null);
  roomCodeRef.current = roomCode;

  const isInRoom = room !== null;

  // --- Helpers -------------------------------------------------------------

  const clearError = useCallback(() => setError(null), []);

  const generateMessageId = () =>
    `msg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  // --- Actions (emitters) --------------------------------------------------

  const createRoom = useCallback(
    (podcastId: string, audioUrl: string, podcastTitle: string, podcastCoverImage: string) => {
      if (!socket) {
        setError('Socket not connected');
        return;
      }
      socket.emit(LISTEN_TOGETHER_EVENTS.CREATE_ROOM, {
        podcastId,
        audioUrl,
        podcastTitle,
        podcastCoverImage,
        userId: user_id,
        userHandle: user_handle,
        profileImage,
      });
    },
    [socket, user_id, user_handle, profileImage],
  );

  const joinRoom = useCallback(
    (code: string) => {
      if (!socket) {
        setError('Socket not connected');
        return;
      }
      setIsSyncing(true);
      socket.emit(LISTEN_TOGETHER_EVENTS.JOIN_ROOM, {
        roomCode: code.toUpperCase(),
        userId: user_id,
        userHandle: user_handle,
        profileImage,
      });
    },
    [socket, user_id, user_handle, profileImage],
  );

  const leaveRoom = useCallback(() => {
    if (!socket || !roomCodeRef.current) return;
    socket.emit(LISTEN_TOGETHER_EVENTS.LEAVE_ROOM, {
      roomCode: roomCodeRef.current,
      userId: user_id,
    });
    // Optimistic local cleanup
    setRoom(null);
    setRoomCode(null);
    setParticipants([]);
    setMessages([]);
    setIsHost(false);
    setLastSyncPayload(null);
  }, [socket, user_id]);

  const endRoom = useCallback(() => {
    if (!socket || !roomCodeRef.current) return;
    socket.emit(LISTEN_TOGETHER_EVENTS.END_ROOM, {
      roomCode: roomCodeRef.current,
      userId: user_id,
    });
    // Optimistic local cleanup
    setRoom(null);
    setRoomCode(null);
    setParticipants([]);
    setMessages([]);
    setIsHost(false);
    setLastSyncPayload(null);
  }, [socket, user_id]);

  const syncPlayback = useCallback(
    (action: SyncAction, position: number) => {
      if (!socket || !roomCodeRef.current) return;
      const payload: ListenTogetherSyncPayload = {
        roomCode: roomCodeRef.current,
        action,
        position,
        timestamp: Date.now(),
      };
      socket.emit(LISTEN_TOGETHER_EVENTS.SYNC_PLAYBACK, payload);
    },
    [socket],
  );

  const sendMessage = useCallback(
    (text: string) => {
      if (!socket || !roomCodeRef.current || !text.trim()) return;
      const message: ListenTogetherMessage = {
        id: generateMessageId(),
        roomCode: roomCodeRef.current,
        userId: user_id,
        userHandle: user_handle,
        profileImage,
        text: text.trim(),
        sentAt: new Date().toISOString(),
      };
      socket.emit(LISTEN_TOGETHER_EVENTS.SEND_CHAT, message);
      // Optimistic: add locally immediately
      setMessages(prev => [...prev, message]);
    },
    [socket, user_id, user_handle, profileImage],
  );

  // --- Listeners (incoming events) -----------------------------------------

  useEffect(() => {
    if (!socket) return;

    // Room created (host receives this)
    const onRoomCreated = (payload: RoomCreatedPayload) => {
      setRoom(payload.room);
      setRoomCode(payload.roomCode);
      setParticipants(payload.room.participants);
      setIsHost(true);
      setIsSyncing(false);
      setError(null);
    };

    // Room joined (listener receives this)
    const onRoomJoined = (payload: RoomJoinedPayload) => {
      setRoom(payload.room);
      setRoomCode(payload.room.roomCode);
      setParticipants(payload.room.participants);
      setIsHost(false);
      setIsSyncing(false);
      setError(null);

      // Create an initial sync payload so the listener can seek to the correct position
      setLastSyncPayload({
        roomCode: payload.room.roomCode,
        action: payload.isPlaying ? 'play' : 'pause',
        position: payload.currentPosition,
        timestamp: Date.now(),
      });
    };

    // A new participant joined
    const onParticipantJoined = (participant: ListenTogetherParticipant) => {
      setParticipants(prev => {
        if (prev.some(p => p.userId === participant.userId)) return prev;
        return [...prev, participant];
      });
    };

    // A participant left
    const onParticipantLeft = (data: {userId: string}) => {
      setParticipants(prev => prev.filter(p => p.userId !== data.userId));
    };

    // Room ended by host
    const onRoomEnded = () => {
      setRoom(null);
      setRoomCode(null);
      setParticipants([]);
      setMessages([]);
      setIsHost(false);
      setLastSyncPayload(null);
    };

    // Sync update from host
    const onSyncUpdate = (payload: ListenTogetherSyncPayload) => {
      setIsSyncing(true);
      setLastSyncPayload(payload);
      // Mark synced after a short delay (UI indicator)
      setTimeout(() => setIsSyncing(false), 500);
    };

    // Incoming chat message
    const onChatMessage = (message: ListenTogetherMessage) => {
      setMessages(prev => {
        // Deduplicate (in case our own optimistic message already exists)
        if (prev.some(m => m.id === message.id)) return prev;
        return [...prev, message];
      });
    };

    // Error
    const onError = (err: ListenTogetherError) => {
      setError(err.message);
      setIsSyncing(false);
    };

    socket.on(LISTEN_TOGETHER_EVENTS.ROOM_CREATED, onRoomCreated);
    socket.on(LISTEN_TOGETHER_EVENTS.ROOM_JOINED, onRoomJoined);
    socket.on(LISTEN_TOGETHER_EVENTS.PARTICIPANT_JOINED, onParticipantJoined);
    socket.on(LISTEN_TOGETHER_EVENTS.PARTICIPANT_LEFT, onParticipantLeft);
    socket.on(LISTEN_TOGETHER_EVENTS.ROOM_ENDED, onRoomEnded);
    socket.on(LISTEN_TOGETHER_EVENTS.SYNC_UPDATE, onSyncUpdate);
    socket.on(LISTEN_TOGETHER_EVENTS.CHAT_MESSAGE, onChatMessage);
    socket.on(LISTEN_TOGETHER_EVENTS.ERROR, onError);

    return () => {
      socket.off(LISTEN_TOGETHER_EVENTS.ROOM_CREATED, onRoomCreated);
      socket.off(LISTEN_TOGETHER_EVENTS.ROOM_JOINED, onRoomJoined);
      socket.off(LISTEN_TOGETHER_EVENTS.PARTICIPANT_JOINED, onParticipantJoined);
      socket.off(LISTEN_TOGETHER_EVENTS.PARTICIPANT_LEFT, onParticipantLeft);
      socket.off(LISTEN_TOGETHER_EVENTS.ROOM_ENDED, onRoomEnded);
      socket.off(LISTEN_TOGETHER_EVENTS.SYNC_UPDATE, onSyncUpdate);
      socket.off(LISTEN_TOGETHER_EVENTS.CHAT_MESSAGE, onChatMessage);
      socket.off(LISTEN_TOGETHER_EVENTS.ERROR, onError);
    };
  }, [socket]);

  // --- Cleanup on unmount (leave room automatically) -----------------------

  useEffect(() => {
    return () => {
      if (roomCodeRef.current && socket) {
        socket.emit(LISTEN_TOGETHER_EVENTS.LEAVE_ROOM, {
          roomCode: roomCodeRef.current,
          userId: user_id,
        });
      }
    };
  }, [socket, user_id]);

  return {
    room,
    roomCode,
    participants,
    messages,
    isHost,
    isInRoom,
    isSyncing,
    error,
    createRoom,
    joinRoom,
    leaveRoom,
    endRoom,
    syncPlayback,
    sendMessage,
    clearError,
    lastSyncPayload,
  };
};
