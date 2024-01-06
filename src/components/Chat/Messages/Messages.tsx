/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Key, useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import ReceivedMessageBubble from './ReceivedMessageBubble';
import SendedMessageBubble from './SendedMessageBubble';
import { getMessageList } from '../../../api/api';
import { useAuth } from '../../../contexts/AuthContext';

type Props = {
  conversationId: string;
};

function Messages({ conversationId }: Props) {
  const { loggedUser } = useAuth();
  const {
    /* fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    error, */
    isLoading,
    data,
  } = useInfiniteQuery(
    ['messages'],
    ({ pageParam = 1 }) => getMessageList({ conversationId, pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.nextPage,
      getPreviousPageParam: (firstPage) => firstPage.pageInfo.prevPage,
    },
  );

  const messageContainer = useRef(null);

  useEffect(() => {
    if (messageContainer.current && !isLoading) {
      messageContainer.current.addEventListener(
        'DOMNodeInserted',
        (event: { currentTarget: HTMLDivElement }) => {
          const { currentTarget: target } = event;
          target.scroll({
            top: target.scrollHeight,
            behavior: 'smooth',
          });
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.pages[0].messages.length]);

  if (isLoading) return 'Loading...';
  // if (error) return "An error has occurred: " + error.message;
  // console.log(data.pages[0].messages);
  return (
    <div
      ref={messageContainer}
      className="overflow-y-auto pb-5 max-h-[]"
      style={{ maxHeight: 'calc(100vh - 170px)' }}
    >
      {data.pages[0].messages.map(
        (
          message: { senderId: string | undefined },
          index: Key | null | undefined,
          // eslint-disable-next-line no-underscore-dangle
        ) => (message.senderId === loggedUser?._id ? (
          <SendedMessageBubble key={index?.toString()} />
        ) : (
          <ReceivedMessageBubble key={index?.toString()} />
        )),
      )}
    </div>
  );
}

export default Messages;
