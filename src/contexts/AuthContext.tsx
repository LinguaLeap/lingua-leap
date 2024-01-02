import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserType } from "../types/User";
import { fetchMe } from "../api/api";

interface AuthContextType {
  loggedUser: null | UserType;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  loggedUser: null,
  isLoading: true,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedUser, setLoggedUser] = useState<null | UserType>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { user } = await fetchMe();
        if (user) {
          setLoggedUser(user as UserType);
        } else {
          setLoggedUser(null);
          // localStorage.removeItem('token');
        }
      } catch (error) {
        //console.error("Error fetching data:", error);
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
