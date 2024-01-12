/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useNavigate } from 'react-router-dom';
import { AiOutlineMessage } from 'react-icons/ai';
import { UserType } from '../types/User';
import NoPhoto from './common/NoPhoto';
import countries from '../static/decodeCountry.json';

function UserCard({ user }: { user: UserType }) {
  const decodeCountry: Record<string, string> = countries;
  const navigate = useNavigate();

  const handleOpenProfile = (id: string) => {
    navigate(`/user/${id}`);
  };
  const handleStartConversation = () => {
    console.log('You click on Write Message Button');
  };

  function getFlagEmoji(countryCode: string = 'US') {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

  return (
    <div className=" bg-white dark:border-sky-blue-750  dark:bg-sky-blue-750 shadow-md min-w-80 max-w-3xl m-3 py-4 px-4 cursor-default">
      <div className="flex flex-row gap-x-4">
        <div
          className="hover:cursor-pointer"
          onClick={() => {
            handleOpenProfile(user._id);
          }}
        >
          {user?.photos[0]?.value ? (
            <img src={user?.photos[0]?.value} className="rounded-md border-white z-10" />
          ) : (
            <NoPhoto size="small" />
          )}
        </div>
        <div className="flex flex-col gap-y-3 flex-1">
          <div className="truncate flex flex-row gap-x-3">
            <div
              className="font-medium tracking-wide text-deep-navy-blue dark:text-white dark:text-opcaity-65 cursor-pointer hover:text-cyan-700 hover:cursor-pointer"
              onClick={() => {
                handleOpenProfile(user._id);
              }}
            >
              {user?.givenName}
              {user?.familyName}
            </div>
            <div title={decodeCountry[user?.country]}>{getFlagEmoji(user?.country)}</div>
          </div>

          <div className="grow basis-1 flex flex-row justify-start items-center gap-x-2">
            <div className="font-medium tracking-wide text-deep-navy-blue cursor-pointer dark:text-white dark:text-opacity-85">
              Speak:
            </div>
            <div className="text-deep-navy-blue dark:text-white">
              {user?.mainLanguage.join(', ')}
            </div>
          </div>
          <div className="grow basis-1 flex flex-row justify-start items-center gap-x-2">
            <div className="font-medium tracking-wide text-deep-navy-blue cursor-pointer dark:text-white dark:text-opacity-85">
              Learn:
            </div>
            <div className="flex flex-row flex-wrap text-deep-navy-blue dark:text-white">
              {user?.otherLanguages.map((lang) => lang.language).join(', ')}
            </div>
          </div>
          <div className="flex flex-row gap-x-3 ">
            <button
              title="message"
              className="button min-w-20 text-center z-10"
              onClick={handleStartConversation}
            >
              <span className="flex flex-row justify-center items-center gap-x-2 dark:text-white dark:text-opcaity-65">
                <AiOutlineMessage />
                Message
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserCard;
