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
    <header className="bg-sky-blue-200 dark:bg-sky-blue-700 px-6 py-8 z-20">
      <div className="container mx-auto flex flex-row justify-between">
        <div>
          <img
            className="block dark:hidden"
            src={Images["logo-black"]}
            height={30}
            width={73}
            alt="logo"
            onClick={() => {
              navigate("/");
            }}
          />
          <img
            className="hidden dark:block opacity-85"
            src={Images["logo"]}
            height={30}
            width={73}
            alt="logo"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div className="flex flex-row gap-4">
          {!loggedUser ? (
            <>
              <button
                title="Click to login"
                onClick={handleLoginButtonClick}
                className="link"
              >
                <IoMdLogIn size={20} />
                <span>Login</span>
              </button>
            </>
          ) : (
            <>
              <button onClick={handleCommunityButtonClick} className="link">
                <GoPeople size={20} />
                <span>Community</span>
              </button>
              <button onClick={handleMessagesButtonClick} className="link">
                <TiMessages size={20} />
                <span>Messages</span>
              </button>
              <button onClick={handleProfileButtonClick} className="link">
                <CiUser size={20} />
                <span>My Profile</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
});

export default Header;
