/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable @typescript-eslint/indent */
import {
 createContext, ReactNode, useContext, useEffect, useState,
} from 'react';
import { UserType } from '../types/User';
import { fetchMe } from '../api/api';

interface AuthContextType {
  loggedUser: null | UserType;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  setUserData: (user: UserType | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  loggedUser: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
  setUserData: () => {},
});

function AuthProvider({ children }: { children: ReactNode }) {
  const [loggedUser, setLoggedUser] = useState<null | UserType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<null | string>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await fetchMe();
        if (data.user) {
          setLoggedUser(data.user as UserType);
        } else {
          setLoggedUser(null);
          // localStorage.removeItem('token');
        }
      } catch (error) {
        // console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const login = (token: string) => {
    localStorage.setItem('token', `Bearer ${token}`);
    setToken(`Bearer ${token}`);
  };

  const logout = async () => {
    setLoggedUser(null);

    // await fetchLogout();

    localStorage.removeItem('token');
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const setUserData = async (user: UserType | null) => {
    setLoggedUser(user);
  };

  const values = {
    loggedUser,
    isLoading,
    login,
    logout,
    setUserData,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
