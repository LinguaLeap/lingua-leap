/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { getConversationsList } from '../../../api/api';
import ConversationItem from './ConversationItem';
import { ConversationItemType } from '../../../types/Conversations';

type Props = {
  conversationList: Array<ConversationItemType> | [];
  setConversationList: (
    conversationList: Array<ConversationItemType> | []
  ) => void;
  setConversation: (conversation: ConversationItemType) => void;
};

function ConversationsList({
  conversationList,
  setConversationList,
  setConversation,
}: Props) {
  const { isLoading, error, data } = useQuery(
    'conversationList',
    getConversationsList
  );

  useEffect(() => {
    setConversationList(data as Array<ConversationItemType>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading || !conversationList || conversationList?.length === 0)
    return 'Loading...';
  // @ts-ignore
  if (error) return `An error has occurred: ${error.message}`;

  return (
    <div className="flex flex-1 flex-col">
      {conversationList.map((conversation: ConversationItemType, index) => (
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
