import { useAuth } from "../contexts/AuthContext";
import { MdModeEditOutline } from "react-icons/md";
import { LanguageCardNum } from "../types/Types";
import LanguageCard from "./common/LanguageCard";
import { LanguageLevel, UserType } from "../types/User";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { GenderEnum } from "../enums";
import decodeCountry from "../static/decodeCountry.json";
import NoPhoto from "./common/NoPhoto";
import { getUser } from "../api/api";

const Profile = () => {
  const { id } = useParams();
  const { loggedUser } = useAuth();
  const navigate = useNavigate();
  const decode: Record<string, string> = decodeCountry;
  const [user, setUser] = useState<UserType>();

  const fetchData = async (id: string) => {
    const data = await getUser(id);
    setUser(data);
  };

  useEffect(() => {
    if (loggedUser !== null && !id) {
      setUser(loggedUser);
    } else if (id) {
      fetchData(id);
    }
  }, [id, loggedUser]);

  const handleEditProfileButtonClick = useCallback(() => {
    navigate("/edit-profile");
  }, [navigate]);

  const handleWriteMassage = useCallback(() => {
    console.log("You clicked on Write Massage button");
  }, []);

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
          <NoPhoto size="big" />
        </div>
        <div className="flex flex-row gap-x-3 items-center">
          <div>{`${user?.givenName} ${user?.familyName}`}</div>
          {!id ? (
            <button className="pr-btn" onClick={handleEditProfileButtonClick}>
              <MdModeEditOutline /> Edit Profile
            </button>
          ) : (
            <button className="pr-btn" onClick={handleWriteMassage}>
              <MdModeEditOutline /> Write Message
            </button>
          )}
        </div>
        <div className="flex flex-row">
          {user?.birthDate && (
            <div className="flex flex-col">
              <div>Age</div>
              <div>{ageFromDateOfBirthday(user.birthDate)}</div>
            </div>
          )}

          {user?.gender && (
            <div className="flex flex-col">
              <div>{GenderEnum[user.gender]}</div>
              <div>Gender</div>
            </div>
          )}

          {user?.country && (
            <div className="flex flex-col">
              <div>{decode[user.country]}</div>
              <div>Country</div>
            </div>
          )}
        </div>
      </div>
      <div>
        <div>
          <h2>{LanguageCardNum.MAIN}</h2>
          {user?.mainLanguage.map((language: string, index) => {
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
            {user?.otherLanguages.map(
              (language: LanguageLevel, index: number) => {
                return (
                  <LanguageCard
                    key={`${language.language}-${language.level}-${index}`}
                    language={language.language}
                    level={language.level}
                    type={LanguageCardNum.STUDY}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
