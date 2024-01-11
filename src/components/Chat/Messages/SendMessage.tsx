/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-underscore-dangle */
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useSocket } from '../../../contexts/SocketIO';
import { ConversationItemType, Message } from '../../../types/Conversations';

type Props = {
  conversationList: Array<ConversationItemType> | [];
  setConversationList: (conversationList: Array<ConversationItemType> | []) => void;
  conversation: ConversationItemType;
  messages: Array<Message>;
  setMessages: (messages: Array<Message>) => void;
};

function SendMessage({
  conversationList,
  setConversationList,
  conversation,
  messages,
  setMessages,
}: Props) {
  const { socket } = useSocket();
  const { loggedUser } = useAuth();
  const targetUser = conversation.conversation.participants.find(
    (participant) => participant._id !== loggedUser?._id,
  );

  useEffect(() => {
    if (socket) {
      socket?.on('receiveMessage', ({ fromUser, message }) => {
        // @ts-expect-error
        setMessages((prevMessages) => [
          {
            content: message.content,
            conversationId: conversation.conversation._id,
            senderId: {
              _id: fromUser._id,
              familyName: targetUser?.familyName,
              givenName: targetUser?.givenName,
            },
            status: 2,
            timestamp: message.timestamp,
          },
          ...prevMessages,
        ]);
        // console.log(messages[0])
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const sendMessage = (message: string) => {
    socket?.emit('sendMessage', {
      toUserId: targetUser?._id,
      message,
    });

    setMessages([
      {
        content: message,
        conversationId: conversation.conversation._id,
        senderId: {
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          _id: loggedUser?._id!,
          familyName: '',
          givenName: '',
        },
        status: 0,
        // @ts-ignore
        timestamp: Date.now(),
      },
      ...messages,
    ]);

    const conversationIndex = conversationList?.findIndex(
      (conv) => conv.conversation._id === conversation.conversation._id,
    );
    if (conversationList.length !== 0 && conversationIndex) {
      const updatedConversationList = [...conversationList];
      // @ts-ignore
      updatedConversationList[conversationIndex].lastMessage.senderId._id = loggedUser?._id;
      updatedConversationList[conversationIndex].lastMessage.content = message;

      if (conversationIndex > 0) {
        updatedConversationList.unshift(
          updatedConversationList.splice(conversationIndex, 1)[0],
        );
        setConversationList(updatedConversationList);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values) => {
      try {
        sendMessage(values.message);
        formik.setValues({ message: '' });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
  });

  return (
    <div className="w-full">
      <form onSubmit={formik.handleSubmit} className="flex">
        <input
          type="text"
          name="message"
          autoComplete="off"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.message}
          className="mx-2 shadow appearance-none border flex flex-auto rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
          <span className="sr-only">Icon description</span>
        </button>
      </form>
    </div>
  );
}

export default SendMessage;
