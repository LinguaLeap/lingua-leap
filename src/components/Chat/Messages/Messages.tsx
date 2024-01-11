/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-underscore-dangle */
import {
  Key, useEffect, useRef, useState,
} from 'react';
import { useInfiniteQuery } from 'react-query';
// @ts-expect-error
import InfiniteScroll from 'react-infinite-scroller';
import ReceivedMessageBubble from './ReceivedMessageBubble';
import SendedMessageBubble from './SendedMessageBubble';
import { getMessageList } from '../../../api/api';
import { useAuth } from '../../../contexts/AuthContext';
import { ConversationItemType, Message } from '../../../types/Conversations';

type Props = {
  conversation: ConversationItemType;
  messages: Array<Message>;
  setMessages: (messages: Array<Message>) => void;
};

function Messages({ conversation, messages, setMessages }: Props) {
  const { loggedUser } = useAuth();
  const [lastHeight, setLastHeight] = useState(null);
  const conversationId = conversation.conversation._id;

  const {
    fetchNextPage,
    hasNextPage,
    /* error, */
    isLoading,
    data,
  } = useInfiniteQuery(
    ['messages', conversationId],
    ({ pageParam = 1 }) => getMessageList({ conversationId, pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.nextPage,
      getPreviousPageParam: (firstPage) => firstPage.pageInfo.nextPage,
    },
  );

  const messageContainer = useRef(null);

  useEffect(() => {
    // @ts-ignore
    setMessages(data?.pages.flatMap((page) => page.messages) || []);
  }, [data?.pages.length]);

  useEffect(() => {
    if (messageContainer.current && !isLoading) {
      const { scrollTop, scrollHeight, clientHeight } = messageContainer.current;

      if (scrollTop + clientHeight >= scrollHeight - 100) {
        // @ts-ignore
        messageContainer.current.scrollTop = scrollHeight;
        setLastHeight(scrollHeight);
      }

      if (messages.length < 62) {
        // @ts-ignore
        messageContainer.current.scrollTop = scrollHeight;
      }

      if (!lastHeight) {
        // @ts-ignore
        messageContainer.current.scrollTop = scrollHeight;
      }
    }
  }, [messages.length, lastHeight]);

  if (isLoading) return 'Loading...';

  // if (error) return "An error has occurred: " + error.message;
  // console.log(data.pages[0].messages);
  return (
    <div
      ref={messageContainer}
      className="overflow-y-auto pb-5"
      style={{ maxHeight: 'calc(100vh - 170px)' }}
    >
      <InfiniteScroll
        style={{ margin: '10px' }}
        pageStart={1}
        useWindow={false}
        isReverse
        loadMore={fetchNextPage}
        hasMore={hasNextPage}
        loader={(
          <div className="loader" key={0}>
            Loading ...
          </div>
        )}
      >
        {messages
          .slice()
          .reverse()
          .map(
            (
              message: Message,
              index: Key | null | undefined,
              // eslint-disable-next-line no-underscore-dangle
            ) => (message.senderId._id === loggedUser?._id ? (
              <SendedMessageBubble message={message} key={index?.toString()} />
            ) : (
              <ReceivedMessageBubble message={message} key={index?.toString()} />
            )),
          )}
      </InfiniteScroll>
    </div>
  );
}

export default Messages;
