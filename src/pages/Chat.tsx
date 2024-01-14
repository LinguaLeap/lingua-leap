/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import ConversationsList from '../components/Chat/Conversations/ConversationsList';
import Messages from '../components/Chat/Messages/Messages';
import { useSocket } from '../contexts/SocketIO';
import UnSelectedConversationPage from '../components/Chat/Messages/UnSelectedConversationPage';
import { ConversationItemType, Message } from '../types/Conversations';
import { useAuth } from '../contexts/AuthContext';

function Chat() {
  /* const { id } = useParams(); */
  const [conversation, setConversation] = useState<ConversationItemType | null>(null);
  const [messages, setMessages] = useState<Array<Message>>([]);
  const { socket } = useSocket();
  const { loggedUser } = useAuth();

  const targetUser = conversation?.conversation.participants.find(
    (participant) => participant._id !== loggedUser?._id,
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    if (socket && conversation) {
      console.log(conversation?.conversation._id);
      socket?.on('receiveMessage', ({ fromUser, receivedMessage }) => {
        if (conversation?.conversation._id === receivedMessage.conversationId) {
          console.log(conversation?.conversation._id, receivedMessage.conversationId);
          // @ts-expect-error
          setMessages((prevMessages) => [
            {
              content: receivedMessage.content,
              conversationId: receivedMessage.conversationId,
              senderId: {
                _id: fromUser._id,
                familyName: targetUser?.familyName,
                givenName: targetUser?.givenName,
              },
              status: 2,
              timestamp: receivedMessage.timestamp,
            },
            ...prevMessages,
          ]);
        }
        queryClient.refetchQueries(['conversationList']);
        // console.log(messages[0])
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, conversation]);

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 w-1/6 min-w-[300px] border-r-2 bg-blue-50">
        <ConversationsList setConversation={setConversation} /* id={id} */ />
      </div>
      <div className="w-5/6 flex flex-2">
        {conversation !== null ? (
          <div className="flex-1 p-2 bg-gray-50">
            <Messages
              key={conversation?.conversation._id}
              setMessages={setMessages}
              messages={messages}
              conversation={conversation}
            />
          </div>
        ) : (
          <div className="flex flex-1 bg-gray-50 justify-center items-center">
            <UnSelectedConversationPage />
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
