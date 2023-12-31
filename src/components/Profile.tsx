import { useAuth } from "../contexts/AuthContext";
import { MdModeEditOutline } from "react-icons/md";
import { LanguageCardNum } from "../types/types";
import LanguageCard from "./common/LanguageCard";
import { LanguageLevel } from "../types/User";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { GenderEnum } from "../enums";
import decodeCountry from "../static/decodeCountry.json";

const Profile = () => {
  const { loggedUser } = useAuth();
  const navigate = useNavigate();
  const decode: Record<string, string> = decodeCountry;

  const handleEditProfileButtonClick = useCallback(() => {
    navigate("/edit-profile");
  }, [navigate]);

  const ageFromDateOfBirthday = (dateOfBirth: Date): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <div className="content-wrapper bg-slate-500 p-9 box-border">
      <div className="flex flex-row items-start gap-x-6">
        <div>
          <div className="relative w-40 h-40 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 flex justify-center items-center">
            <svg
              className="absolute w-32 h-32 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
        <div className="flex flex-row gap-x-3 items-center">
          <div>{`${loggedUser?.givenName} ${loggedUser?.familyName}`}</div>
          <button className="pr-btn" onClick={handleEditProfileButtonClick}>
            <MdModeEditOutline /> Edit Profile
          </button>
        </div>
        <div className="flex flex-row">
          {loggedUser?.birthDate && (
            <div className="flex flex-col">
              <div>Age</div>
              <div>{ageFromDateOfBirthday(loggedUser.birthDate)}</div>
            </div>
          )}

          {loggedUser?.gender && (
            <div className="flex flex-col">
              <div>{GenderEnum[loggedUser.gender]}</div>
              <div>Gender</div>
            </div>
          )}

          {loggedUser?.country && (
            <div className="flex flex-col">
              <div>{decode[loggedUser.country]}</div>
              <div>Country</div>
            </div>
          )}
        </div>
      </div>
      <div>
        <div>
          <h2>{LanguageCardNum.MAIN}</h2>
          {loggedUser?.mainLanguage.map((language: string, index) => {
            return (
              <LanguageCard
                key={`${language}-${index}`}
                language={language}
                type={LanguageCardNum.MAIN}
              />
            );
          })}
        </div>
        <div>
          <h2>{LanguageCardNum.STUDY}</h2>
          <div>
            {loggedUser?.otherLanguages.map((language: LanguageLevel) => {
              return (
                <LanguageCard
                  key={`${language.language}-${language.level}`}
                  language={language.language}
                  level={language.level}
                  type={LanguageCardNum.STUDY}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
