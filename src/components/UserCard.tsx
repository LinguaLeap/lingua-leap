import { UserType } from "../types/User";
import NoPhoto from "../components/common/NoPhoto";
import countries from "../static/decodeCountry.json";
import languages from "../static/decodeLanguage.json";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }: { user: UserType }) => {
  const decodeCountry: Record<string, string> = countries;
  const decodeLanguage: Record<string, string> = languages;
  const navigate = useNavigate();

  const handleOpenProfile = (id: string) => {
    console.log("You cliked on Open Profile Button " + id);
    navigate(`/user/${id}`);
  };
  const handleStartConversation = () => {
    console.log("You click on Write Message Button");
  };

  return (
    <div className="bg-yellow-300 w-1/3 m-3 py-6 px-4 box-content">
      <div className="flex flex-row gap-x-4">
        <div>
          {user?.photos[0]?.value ? (
            <img src={user.photos[0].value}></img>
          ) : (
            <NoPhoto size="small" />
          )}
        </div>
        <div className="flex flex-col gap-y-3">
          <div>
            {user.givenName} {user.familyName}
          </div>
          <div>{decodeCountry[user.country]}</div>
        </div>
      </div>
      <div>
        <div>I speak:</div>
        <div>
          {user.mainLanguage.map((language, index) => (
            <span key={index}>{decodeLanguage[language]}</span>
          ))}
        </div>
      </div>
      <div>
        <div>I want to learn:</div>
        <div>
          {user.otherLanguages.map((language, index) => (
            <span key={index}>{decodeLanguage[language.language]}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-row gap-x-3">
        <button className="pr-btn" onClick={() => handleOpenProfile(user._id)}>
          Open Profile
        </button>
        <button className="pr-btn" onClick={handleStartConversation}>
          Write Message
        </button>
      </div>
    </div>
  );
};
export default UserCard;
