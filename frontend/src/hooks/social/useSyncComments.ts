// @ts-nocheck
import { useState, useEffect, useCallback } from 'react';
import { redisManager, CommentEvent } from '../../lib/redis/redisConfig';

export interface CommentItem {
  id: string;
  articleId: string;
  author: string;
  text: string;
  reactionsCount?: number;
  updatedAt?: number;
}

export const useSyncComments = (articleId: string, initialComments: CommentItem[] = []) => {
  const [comments, setComments] = useState<CommentItem[]>(initialComments);

  useEffect(() => {
    // Ensure Redis connection attempt
    redisManager.connect();

    // Subscribe to real-time comment events
    const unsubscribe = redisManager.subscribe((event: CommentEvent) => {
      if (event.articleId !== articleId) return;

      setComments((prevComments) => {
        switch (event.type) {
          case 'CREATE_COMMENT': {
            if (prevComments.some((c) => c.id === event.commentId)) {
              return prevComments;
            }
            return [event.payload, ...prevComments];
          }
          case 'EDIT_COMMENT': {
            return prevComments.map((c) =>
              c.id === event.commentId ? { ...c, ...event.payload, updatedAt: event.timestamp } : c
            );
          }
          case 'DELETE_COMMENT': {
            return prevComments.filter((c) => c.id !== event.commentId);
          }
          case 'ADD_REACTION': {
            return prevComments.map((c) =>
              c.id === event.commentId
                ? { ...c, reactionsCount: (c.reactionsCount || 0) + 1 }
                : c
            );
          }
          default:
            return prevComments;
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, [articleId]);

  const addComment = useCallback(
    async (comment: CommentItem) => {
      const event: CommentEvent = {
        eventId: `evt_${Date.now()}_${Math.random()}`,
        type: 'CREATE_COMMENT',
        articleId,
        commentId: comment.id,
        payload: comment,
        timestamp: Date.now(),
      };
      await redisManager.publishCommentEvent(event);
    },
    [articleId]
  );

  const editComment = useCallback(
    async (commentId: string, text: string) => {
      const event: CommentEvent = {
        eventId: `evt_${Date.now()}_${Math.random()}`,
        type: 'EDIT_COMMENT',
        articleId,
        commentId,
        payload: { text },
        timestamp: Date.now(),
      };
      await redisManager.publishCommentEvent(event);
    },
    [articleId]
  );

  const deleteComment = useCallback(
    async (commentId: string) => {
      const event: CommentEvent = {
        eventId: `evt_${Date.now()}_${Math.random()}`,
        type: 'DELETE_COMMENT',
        articleId,
        commentId,
        timestamp: Date.now(),
      };
      await redisManager.publishCommentEvent(event);
    },
    [articleId]
  );

  return {
    comments,
    addComment,
    editComment,
    deleteComment,
  };
};
