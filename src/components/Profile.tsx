/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { MdModeEditOutline } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LanguageCardNum, StudyLanguages } from '../types/types';
import LanguageCard from './common/LanguageCard';
import { UserType } from '../types/User';
import { GenderEnum } from '../enums';
import decodeCountry from '../static/decodeCountry.json';
import NoPhoto from './common/NoPhoto';
import { getUser } from '../api/api';

function Profile() {
  const { id } = useParams();
  const { loggedUser, logout } = useAuth();
  const navigate = useNavigate();
  const decode: Record<string, string> = decodeCountry;
  const [user, setUser] = useState<UserType>();

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const fetchData = async (id: string) => {
    const data = await getUser(id);
    setUser(data);
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    } else if (loggedUser !== null && !id) {
      setUser(loggedUser);
    }
  }, [id, loggedUser]);

  const handleEditProfileButtonClick = useCallback(() => {
    navigate('/edit-profile');
  }, [navigate]);

  const handleWriteMassage = useCallback(() => {
    console.log('You clicked on Write Massage button');
  }, []);

  const ageFromDateOfBirthday = (dateOfBirth: Date): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age -= 1;
    }

    return age;
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="flex flex-col gap-y-2 justify-center items-center mb-8">
        <div className="relative">
          {!id && (
            // eslint-disable-next-line react/button-has-type
            <button
              className="absolute z-10 bg-deep-navy-blue hover:bg-teal-700 dark:bg-sky-blue-700 dark:hover:bg-teal-700  rounded-full p-2 right-2 top-2"
              onClick={handleEditProfileButtonClick}
              title="Edit Profile"
            >
              <MdModeEditOutline size={20} className="z-20 text-white" />
            </button>
          )}
          <NoPhoto size="big" />
        </div>
        <h1 className="text-3xl font-semibold text-teal-700 dark:text-white dark:text-opacity-85">{`${user?.givenName} ${user?.familyName}`}</h1>
      </div>
      {!id ? (
        <div className="flex flex-row gap-x-2 justify-center">
          <button className="button" title="Logout" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-row justify-center items-center mb-8">
          <button
            className="button flex flex-row items-center justify-center gap-3"
            onClick={handleWriteMassage}
          >
            <MdModeEditOutline />
            Message
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row items-stretch gap-8 my-4">
        {user?.birthDate && (
          <div className="flex flex-1 flex-col items-center p-4 bg-white dark:bg-sky-blue-800 border  dark:border-sky-blue-800  rounded-md">
            <div className="text-lg font-semibold text-teal-700 dark:text-white dark:text-opacity-85">
              {ageFromDateOfBirthday(user.birthDate)}
            </div>
            <div className="text-gray-600 dark:text-white dark:text-opacity-65">Age</div>
          </div>
        )}

        {user?.gender && (
          <div className="flex flex-1 flex-col items-center p-4 bg-white dark:bg-sky-blue-800 border  dark:border-sky-blue-800 rounded-md">
            <div className="text-lg font-semibold text-teal-700 dark:text-white dark:text-opacity-85">
              {GenderEnum[user.gender]}
            </div>
            <div className="text-gray-600 dark:text-white dark:text-opacity-65">
              Gender
            </div>
          </div>
        )}

        {user?.country && (
          <div className="flex flex-1 flex-col items-center p-4 bg-white dark:bg-sky-blue-800 border  dark:border-sky-blue-800 rounded-md">
            <div className="text-lg font-semibold text-teal-700 dark:text-white dark:text-opacity-85">
              {decode[user.country]}
            </div>
            <div className="text-gray-600 dark:text-white dark:text-opacity-65">
              Country
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-2 bg-white dark:bg-sky-blue-800 border  dark:border-sky-blue-800  rounded-md py-4 px-6">
        <h2 className="text-2xl font-semibold text-teal-700 dark:text-white dark:opacity-85 mb-4">
          Languages
        </h2>
        <div className="flex flex-wrap gap-8">
          {user?.mainLanguage.map((language: string, index) => (
            <LanguageCard
              key={`${language}-${index}`}
              language={language}
              type={LanguageCardNum.MAIN}
            />
          ))}
          {user?.otherLanguages.map((language: StudyLanguages, index: number) => (
            <LanguageCard
              key={`${language.language}-${language.level}-${index}`}
              language={language.language}
              level={language.level}
              type={LanguageCardNum.STUDY}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Profile;
