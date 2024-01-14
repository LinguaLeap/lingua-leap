import {
  createContext, ReactNode, useContext, useMemo, useState,
} from 'react';

interface NotificationContextType {
  unSeen: {
    [key: string]: number;
  };
  setUnSeen: (unSeen: { [key: string]: number }) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  unSeen: {
    '': 0,
  },
  setUnSeen: () => {},
});

function NotificationProvider({ children }: { children: ReactNode }) {
  const [unSeen, setUnSeen] = useState<{ [key: string]: number }>({ '': 0 });

  const values = useMemo(
    () => ({
      unSeen,
      setUnSeen,
    }),
    [unSeen],
  );

  return (
    <NotificationContext.Provider value={values}>{children}</NotificationContext.Provider>
  );
}

const useNotification = () => useContext(NotificationContext);

export { NotificationProvider, useNotification };
