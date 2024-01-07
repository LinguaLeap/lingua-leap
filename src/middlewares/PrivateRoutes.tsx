import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoutes = () => {
  const { loggedUser, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!loggedUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (
    !loggedUser.birthDate ||
    !loggedUser.country ||
    !loggedUser.givenName ||
    !loggedUser.familyName ||
    !loggedUser.gender ||
    !loggedUser.givenName ||
    !loggedUser.mainLanguage.length ||
    !loggedUser.otherLanguages.length
  ) {
    return <Navigate to="/setup-profile" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default PrivateRoutes;
