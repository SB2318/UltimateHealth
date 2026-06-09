import { useEffect } from 'react';
import logger from '../helper/logger';
import { useSocket } from '../contexts/SocketContext';

/**
 * Hook to automatically join and leave article or podcast rooms
 * @param {string|null} articleId - The ID of the article to join
 * @param {string|null} podcastId - The ID of the podcast to join
 */
export const useArticleRoom = (articleId: string | null = null, podcastId: string | null = null) => {
    const socket = useSocket();

    useEffect(() => {
        if (!socket || (!articleId && !podcastId)) return;

        // Join the room
        logger.log(`Joining room: ${articleId ? 'article:' + articleId : 'podcast:' + podcastId}`);
        socket.emit('join-room', { articleId, podcastId });

        const handleRoomJoined = (data: any) => {
            logger.log('✅ Joined room successfully:', data.room);
        };

        socket.on('room-joined', handleRoomJoined);

        // Cleanup: Leave the room when component unmounts or IDs change
        return () => {
            logger.log(`Leaving room: ${articleId ? 'article:' + articleId : 'podcast:' + podcastId}`);
            socket.emit('leave-room', { articleId, podcastId });
            socket.off('room-joined', handleRoomJoined);
        };
    }, [socket, articleId, podcastId]);
};
