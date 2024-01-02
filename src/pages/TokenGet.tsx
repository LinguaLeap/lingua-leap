import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function TokenGet() {
  const { token } = useParams();
  const { loggedUser } = useAuth();
  const navigate = useNavigate();

  localStorage.setItem("token", "Bearer " + token);
  if (!loggedUser?.mainLanguage?.length) {
    navigate("/edit-profile");
  } else {
    navigate("/community");
  }
  return <></>;
}

export default TokenGet;
