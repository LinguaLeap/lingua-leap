import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

interface SocketContextType {
  socket: null | Socket;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
});

function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<null | Socket>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const { loggedUser } = useAuth();

  const soc = io(import.meta.env.VITE_BACKEND_SOCKET, { autoConnect: false });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isConnected) {
      soc.auth = { token };
      soc.connect();
      setSocket(soc);
      setIsConnected(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soc, loggedUser]);

  const values = useMemo(
    () => ({
      socket,
    }),
    [socket],
  );

  return <SocketContext.Provider value={values}>{children}</SocketContext.Provider>;
}

const useSocket = () => useContext(SocketContext);

export { SocketProvider, useSocket };
