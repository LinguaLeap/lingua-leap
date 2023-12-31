import Images from "../../images/Images";
import { IoMdLogIn } from "react-icons/io";
import { useAuth } from "../../contexts/AuthContext";
import { GoPeople } from "react-icons/go";
import { TiMessages } from "react-icons/ti";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { memo, useCallback } from "react";

const Header = memo(() => {
  const { loggedUser } = useAuth();
  const navigate = useNavigate();

  const handleLoginButtonClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const handleSingUpButtonClick = useCallback(() => {
    navigate("/registration");
  }, [navigate]);

  const handleCommunityButtonClick = useCallback(() => {
    navigate("/community");
  }, [navigate]);

  const handleMessagesButtonClick = useCallback(() => {
    navigate("/messages");
  }, [navigate]);

  const handleProfileButtonClick = useCallback(() => {
    navigate("/my-profile");
  }, [navigate]);

  return (
    <header className="bg-slate-900 px-6 py-8 flex flex-row justify-between">
      <div>
        <img src={Images.logo} height={30} width={73} alt="logo" />
      </div>
      <div className="flex flex-row gap-4">
        {!loggedUser ? (
          <>
            <button
              title="Click to login"
              onClick={handleLoginButtonClick}
              className="pr-btn"
            >
              <IoMdLogIn color="white" size={20} />
              <span className="text-white">Login</span>
            </button>
            <button
              title="Click to Registration"
              onClick={handleSingUpButtonClick}
              className="pr-btn"
            >
              <IoMdLogIn color="white" size={20} />
              <span className="text-white">Sing Up</span>
            </button>
          </>
        ) : (
          <>
            <button onClick={handleCommunityButtonClick} className="pr-btn">
              <GoPeople color="white" size={20} />
              <span className="text-white">Community</span>
            </button>
            <button onClick={handleMessagesButtonClick} className="pr-btn">
              <TiMessages color="white" size={20} />
              <span className="text-white">Messages</span>
            </button>
            <button onClick={handleProfileButtonClick} className="pr-btn">
              <CiUser color="white" size={20} />
              <span className="text-white">My Profile</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
});

export default Header;
