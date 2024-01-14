/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Key } from 'react';
import { useQuery } from 'react-query';
import { getConversationsList } from '../../../api/api';
import ConversationItem from './ConversationItem';
import { ConversationItemType } from '../../../types/Conversations';
import Loading from '../Loading';

type Props = {
  setConversation: (conversation: ConversationItemType) => void;
  // id: string | undefined;
};

function ConversationsList({ setConversation /* , id */ }: Props) {
  const { isLoading, error, data } = useQuery('conversationList', getConversationsList);

  if (isLoading) {
    return <Loading />;
  }
  /* if (id) {
    setConversation(
      data.find(
        (item: {
          conversation: {
            participants: [
              {
                _id: string;
              },
            ];
          };
        }) => item.conversation.participants.find(
          // eslint-disable-next-line no-underscore-dangle
          (participant: { _id: string }) => participant._id === id,
        ),
      ),
    );
  } */
  // @ts-ignore
  if (error) return `An error has occurred: ${error.message}`;

  return (
    <div className="flex flex-1 flex-col">
      {data.map((conversation: ConversationItemType, index: Key) => (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button
          type="button"
          // eslint-disable-next-line react/no-array-index-key
          key={index.toString()}
          onClick={() => setConversation(conversation)}
          className="transition-all duration-600 text-left text-sm font-medium text-gray-900 focus:outline-none border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4  dark:hover:bg-gray-100"
        >
          <ConversationItem conversation={conversation} />
        </button>
      ))}
    </div>
  );
}

export default ConversationsList;
