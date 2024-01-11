/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import ConversationsList from '../components/Chat/Conversations/ConversationsList';
import Messages from '../components/Chat/Messages/Messages';
import { useSocket } from '../contexts/SocketIO';
import SendMessage from '../components/Chat/Messages/SendMessage';
import UnSelectedConversationPage from '../components/Chat/Messages/UnSelectedConversationPage';
import { ConversationItemType, Message } from '../types/Conversations';

function Chat() {
  const [conversation, setConversation] = useState<ConversationItemType | null>(null);
  const [conversationList, setConversationList] = useState<
  Array<ConversationItemType> | []
  >([]);
  const [messages, setMessages] = useState<Array<Message>>([]);
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log(socket.id);
      });

      socket?.on('receiveMessage', ({ fromUser, message }) => {
        console.log(
          `Received message fromqweqwe user ${`${fromUser} ${fromUser}`}: ${message}`,
        );
      });
    }
  }, [socket]);

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 w-1/6 border-r-2 bg-blue-50">
        <ConversationsList
          setConversationList={setConversationList}
          conversationList={conversationList}
          setConversation={setConversation}
        />
      </div>
      <div className="w-5/6 flex flex-2">
        {conversation ? (
          <div className="flex-1 p-2 bg-gray-50">
            <Messages
              key={conversation?.conversation._id}
              setMessages={setMessages}
              messages={messages}
              conversation={conversation}
            />
            <div className="flex">
              <SendMessage
                key={conversation?.conversation._id}
                setConversationList={setConversationList}
                conversationList={conversationList}
                conversation={conversation}
                setMessages={setMessages}
                messages={messages}
              />
            </div>
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
