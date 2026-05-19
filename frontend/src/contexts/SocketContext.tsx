import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { initializeSocket, disconnectSocket } from '../helper/socket';

interface SocketContextType {
    socket: Socket | null;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextType | null>(null);

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    
    // Get token and user info from Redux
    const { user_token, user_id } = useSelector((state: any) => state.user);

    useEffect(() => {
        // Only initialize if we have a valid token
        if (!user_token) {
            console.log('Socket Context: No valid token present, skipping connection');
            setSocket(null);
            setIsConnected(false);
            // Important: do not disconnect here unless token is actually removed.
            disconnectSocket();
            return;
        }

        // Initialize socket with authentication token.
        // Note: socket creation depends only on token (not user_id).
        const socketInstance = initializeSocket(user_token);
        setSocket(socketInstance);

        // Connection listeners
        const onConnect = () => {
            setIsConnected(true);
            console.log('Socket Context: Connected');
        };

        const onDisconnect = () => {
            setIsConnected(false);
            console.log('Socket Context: Disconnected');
        };

        socketInstance.on('connect', onConnect);
        socketInstance.on('disconnect', onDisconnect);

        // Cleanup on unmount or token change
        return () => {
            socketInstance.off('connect', onConnect);
            socketInstance.off('disconnect', onDisconnect);
            // Preserve singleton socket stability; only disconnect is handled when token is removed.
            setIsConnected(false);
        };
    }, [user_token]);

    // Join notifications room whenever we have a socket + user_id.
    useEffect(() => {
        if (!socket || !user_id) return;
        socket.emit('join-user-notifications', { userId: user_id });
    }, [socket, user_id]);

    const value = {

        socket,
        isConnected,
    };

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
