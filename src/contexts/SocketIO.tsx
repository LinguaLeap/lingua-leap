import { createContext, ReactNode, useContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: null | Socket;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
});

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket = io("http://127.0.0.1:3000", { autoConnect: false });

  useEffect(() => {
    const token = localStorage.getItem("token");
    socket.auth = { token };
    socket.connect();
  }, [socket]);

  const values = {
    socket,
  };

  return (
    <SocketContext.Provider value={values}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
