import type {Socket} from 'socket.io-client';

export const emitFollowNotification = (
  socket: Pick<Socket, 'emit'> | null,
  followedUserId: string,
  followerHandle?: string,
) => {
  socket?.emit('notification', {
    type: 'userFollow',
    userId: followedUserId,
    message: {
      title: `${followerHandle || 'Someone'} has followed you`,
      body: '',
    },
  });
};
