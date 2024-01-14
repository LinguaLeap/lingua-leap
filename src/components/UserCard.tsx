/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
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
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { UserType } from '../types/User';
import NoPhoto from './common/NoPhoto';
import countries from '../static/decodeCountry.json';
import { useSocket } from '../contexts/SocketIO';

function UserCard({ user }: { user: UserType }) {
  const decodeCountry: Record<string, string> = countries;
  const navigate = useNavigate();
  const { socket } = useSocket();
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const cancelButtonRef = useRef(null);

  const handleOpenProfile = (id: string) => {
    navigate(`/user/${id}`);
  };

  function getFlagEmoji(countryCode: string = 'US') {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values) => {
      try {
        if (values.message !== '') {
          socket?.emit('sendMessage', {
            toUserId: user._id,
            message: values.message,
          });
          formik.setValues({ message: '' });
          setOpen(false);
          setOpenSuccess(true);
          setTimeout(() => {
            setOpenSuccess(false);
          }, 1000);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
  });

  return (
    <div className=" bg-white dark:border-sky-blue-750  dark:bg-sky-blue-750 shadow-md min-w-80 max-w-3xl m-3 py-4 px-4 cursor-default">
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white">
                    <div className="sm:flex sm:items-start">
                      <div className=" text-center  sm:text-left">
                        <form onSubmit={formik.handleSubmit}>
                          <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                            <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                              <label htmlFor="comment" className="sr-only">
                                Your comment
                              </label>
                              <textarea
                                id="comment"
                                rows={4}
                                cols={200}
                                name="message"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.message}
                                className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                placeholder="Write a message..."
                                required
                              />
                            </div>
                            <div className="flex items-center justify-start px-3 py-2 border-t dark:border-gray-600">
                              <button
                                type="submit"
                                className="button inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4"
                              >
                                Send
                              </button>
                              <button
                                type="button"
                                className="inline-flex items-start py-2.5 px-4 ml-2 text-xs font-medium text-center text-gray-900 shadow-sm bg-white rounded-lg  hover:bg-gray-50"
                                onClick={() => setOpen(false)}
                                ref={cancelButtonRef}
                              >
                                Cancel
                              </button>
                              <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                                <button
                                  type="button"
                                  disabled
                                  className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 12 20"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                                    />
                                  </svg>
                                  <span className="sr-only">Attach file</span>
                                </button>
                                <button
                                  type="button"
                                  disabled
                                  className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 16 20"
                                  >
                                    <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                  </svg>
                                  <span className="sr-only">Set location</span>
                                </button>
                                <button
                                  type="button"
                                  disabled
                                  className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 18"
                                  >
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                  </svg>
                                  <span className="sr-only">Upload image</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <Transition.Root show={openSuccess} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpenSuccess}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <CheckCircleIcon
                          className="h-6 w-6 text-black-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Success
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Your message has been delivered successfully.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
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
              onClick={() => setOpen(true)}
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
