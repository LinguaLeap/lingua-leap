import { useQuery } from 'react-query';
import { getConversationsList } from '../../../api/api';
import ConversationItem from './ConversationItem';
import { ConversationItemType } from '../../../types/Conversations';

type Props = {
  setConversationId: (conversationId: string) => void;
};

function ConversationsList({ setConversationId }: Props) {
  const { isLoading, error, data, isFetching } = useQuery(
    'repoData',
    getConversationsList
  );

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="flex flex-1 flex-col">
      {data.map((conversation: ConversationItemType, index) => (
        <button
          type="button"
          key={index}
          onClick={() => setConversationId(conversation.conversation._id)}
          className="transition-all duration-600 text-left text-sm font-medium text-gray-900 focus:outline-none border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4  dark:hover:bg-gray-100"
        >
          <ConversationItem conversation={conversation} />
        </button>
      ))}
    </div>
  );
}

export default ConversationsList;
