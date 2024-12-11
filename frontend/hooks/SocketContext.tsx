import React, {createContext, useContext, useState, ReactNode} from 'react';
import {io, Socket} from 'socket.io-client';

// Create a context for the socket
const SocketContext = createContext<Socket | null>(null);

// Create a provider component
export const SocketProvider = ({children}: {children: ReactNode}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  // Initialize socket connection
  const handleSocket = () => {
    const newSocket = io('http://51.20.1.81:8081'); // Your server URL
    setSocket(newSocket);
  };

  React.useEffect(() => {
    handleSocket();

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

// Custom hook to use the socket
export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error('Socket is not available in context!');
  }
  return socket;
};
