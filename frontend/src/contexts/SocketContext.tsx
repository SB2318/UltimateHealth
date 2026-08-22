 
 
import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

import { useAppSelector } from '../store/hooks';
import { Socket } from 'socket.io-client';
import { initializeSocket, disconnectSocket } from '../lib/platform/socket';


interface SocketContextType {
    socket: Socket | null;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextType | null>(null);

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }: SocketProviderProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    // Get token and user info from Redux
    const { user_token, user_id } = useAppSelector((state: any) => state.user);

    useEffect(() => {
        // Only initialize if we have a valid token
        if (!user_token) {
            if (__DEV__) console.log('Socket Context: No valid token present, skipping connection');
            // Authentication removed: ensure we tear down the singleton.
            disconnectSocket();
            setSocket(null);
            setIsConnected(false);
            return;
        }

        // Initialize socket with authentication token.
        const socketInstance = initializeSocket(user_token);
        setSocket(socketInstance);

        // Connection listeners
        const onConnect = () => {
            setIsConnected(true);
            if (__DEV__) console.log('Socket Context: Connected');
            
        };

        const onDisconnect = () => {
            setIsConnected(false);
            if (__DEV__) console.log('Socket Context: Disconnected');
        };

        socketInstance.on('connect', onConnect);
        socketInstance.on('disconnect', onDisconnect);
        // ARCHITECTURAL NOTE: Socket survives React remounts. 
        // We only forcefully disconnect if the user fully closes the browser tab.
        const handleAppClose = () => {
            disconnectSocket();
        };
        // `window` only exists on web; guard so RN doesn't throw at runtime or typecheck time.
        const w = typeof window !== 'undefined' ? (window as Window & typeof globalThis) : null;
        if (w) {
            w.addEventListener('beforeunload', handleAppClose);
        }
        return () => {
            socketInstance.off('connect', onConnect);
            socketInstance.off('disconnect', onDisconnect);
            if (w) {
                w.removeEventListener('beforeunload', handleAppClose);
            }
            setIsConnected(false);
        };
    }, [user_token]); // Re-initialize only when token changes


    useEffect(() => {
        if (!socket || !user_id) return;

        // Ensure we never accumulate duplicate listeners.
        const joinUserNotifications = () => {
            socket.emit('join-user-notifications', { userId: user_id });
        };

        // Emit once immediately for the current socket.
        joinUserNotifications();

        // Defensive: remove then re-add.
        socket.off('connect', joinUserNotifications);
        socket.on('connect', joinUserNotifications);

        return () => {
            socket.off('connect', joinUserNotifications);
        };
    }, [socket, user_id]);


    const value = useMemo(
        () => ({
            socket,
            isConnected,
        }),
        [socket, isConnected],
    );


    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};

/**
 * Hook to access socket instance
 * @returns {Socket | null} Socket instance
 */
export const useSocket = () => {
    const context = useContext(SocketContext);

    if (!context) {
        throw new Error('useSocket must be used within SocketProvider');
    }
    return context.socket;
};

/**
 * Hook to check socket connection status
 * @returns {boolean} Connection status
 */
export const useSocketConnection = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocketConnection must be used within SocketProvider');
    }
    return context.isConnected;
};

