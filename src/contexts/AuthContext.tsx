import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { User } from '../types/User';
import { fetchMe } from '../api/api';

interface AuthContextType {
  loggedUser: null | User;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({ loggedUser: null, isLoading: true });

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedUser, setLoggedUser] = useState<null | User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { user } = await fetchMe();
        console.log(user);
        if (user) {
          setLoggedUser(user as User);
        } else {
          setLoggedUser(null);
          // localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const values = {
    loggedUser,
    isLoading,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };