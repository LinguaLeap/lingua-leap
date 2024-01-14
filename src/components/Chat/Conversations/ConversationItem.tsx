/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { ConversationItemType } from '../../../types/Conversations';
import { useNotification } from '../../../contexts/NotificationContext';

type Props = {
  conversation: ConversationItemType;
};

function ConversationItem({ conversation }: Props) {
  const { loggedUser } = useAuth();
  const { unSeen, setUnSeen } = useNotification();
  const sender = conversation.conversation.participants.find(
    (participant) => participant._id !== loggedUser?._id,
  );

  useEffect(() => {
    setUnSeen({
      ...unSeen,
      [conversation.conversation._id]: conversation.unseenMessageCount,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation.unseenMessageCount]);

  return (
    <div className="flex p-1 border-b-2">
      <div>
        <img src="https://picsum.photos/60" className="rounded-full" alt="" />
      </div>
      <div className="ml-2 m-auto">
        <div className="text-lg font-semibold">
          {`${sender?.givenName} ${sender?.familyName}`}
        </div>
        <div>
          {conversation.lastMessage?.senderId?._id === loggedUser?._id
            ? `You: ${conversation.lastMessage.content.slice(0, 20)}${
              conversation.lastMessage.content.length > 20 && '...'
            }`
            : `${conversation.lastMessage.content.slice(0, 20)}${
              conversation.lastMessage.content.length > 20 && '...'
            }`}
        </div>
      </div>
      {unSeen[conversation.conversation._id]
      && unSeen[conversation.conversation._id] !== 0 ? (
        <div className="flex my-auto ">
          <span className="flex items-center justify-center w-5 h-5 ms-2 text-xs font-semibold text-white bg-red-800 rounded-full">
            {unSeen[conversation.conversation._id]}
          </span>
        </div>
        ) : (
          <span />
        )}
    </div>
  );
}

export default ConversationItem;
