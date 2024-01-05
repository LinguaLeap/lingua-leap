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

  function getFlagEmoji(countryCode: string = "US") {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

  return (
    <div className="bg-white shadow-md w-96 m-3 py-4 px-4 cursor-default">
      <div className="flex flex-row gap-x-4">
        <div className="">
          {user?.photos[0]?.value ? (
            <img
              src={user?.photos[0]?.value}
              className="rounded-full border-white z-10"
            ></img>
          ) : (
            <NoPhoto size="small" />
          )}
        </div>
        <div className="flex flex-col gap-y-3">
          <div className="truncate flex flex-row gap-x-3">
            <div
              className="font-medium tracking-wide text-slate-900 cursor-pointer hover:text-cyan-700"
              onClick={() => handleOpenProfile(user._id)}
            >
              {user?.givenName} {user?.familyName}
            </div>
            <div title={decodeCountry[user?.country]}>
              {getFlagEmoji(user?.country)}
            </div>
          </div>
          <div className="flex flex-row gap-x-3">
            <button
              type="button"
              onClick={() => handleOpenProfile(user._id)}
              className="orage-button-with-border min-w-20"
              title="See Profile"
            >
              <span className="inner-orange-button flex flex-row gap-x-2 justify-center">
                <span className=" orange-text">Profile</span>
              </span>
            </button>

            <button
              title="Write a Message"
              className="orage-button min-w-20 text-center"
              onClick={handleStartConversation}
            >
              <span className="flex flex-row gap-x-2 ">Message</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-x-2">
        <div className="grow basis-1 p-3">
          <div className="font-medium tracking-wide text-slate-900 cursor-pointer">
            I speak:
          </div>
          <ul>
            {user?.mainLanguage.map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        </div>
        <div className="grow basis-1 p-3">
          <div className="font-medium tracking-wide text-slate-900 cursor-pointer">
            I want to learn:
          </div>
          <div className="flex flex-row flex-wrap">
            {user?.otherLanguages.map((language, index) => {
              let customClass = "px-1 m-1 text-white";
              {
                switch (language?.level) {
                  case 1:
                    customClass += ` bg-level-1`;
                    break;
                  case 2:
                    customClass += ` bg-level-2`;
                    break;
                  case 3:
                    customClass += ` bg-level-3`;
                    break;
                  case 4:
                    customClass += ` bg-level-4`;
                    break;
                  case 5:
                    customClass += ` bg-level-5`;
                    break;
                  case 6:
                    customClass += ` bg-level-6`;
                    break;
                }
              }
              return (
                <span
                  className={customClass}
                  key={index}
                  title={decodeLanguage[language?.language]}
                >
                  {language?.language}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
