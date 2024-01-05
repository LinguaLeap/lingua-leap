import { useInfiniteQuery } from "react-query";
import ReceivedMessageBubble from "./ReceivedMessageBubble";
import SendedMessageBubble from "./SendedMessageBubble";
import { getMessageList } from "../../../api/api";
import { useAuth } from "../../../contexts/AuthContext";

type Props = {
    conversationId: string;
};

function Messages({ conversationId }: Props) {
    const { loggedUser } = useAuth();
    const {
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
        isFetchingNextPage,
        isFetchingPreviousPage,
        isLoading,
        error,
        data,
        ...result
    } = useInfiniteQuery(
        ["messages"],
        ({ pageParam = 1 }) => getMessageList({ conversationId, pageParam }),
        {
            getNextPageParam: (lastPage, allPages) =>
                lastPage.pageInfo.nextPage,
            getPreviousPageParam: (firstPage, allPages) =>
                firstPage.pageInfo.prevPage,
        }
    );

    if (isLoading) return "Loading...";
    //if (error) return "An error has occurred: " + error.message;
    console.log(data.pages[0].messages);
    return (
        <div>
            {data.pages[0].messages.map((message, index) => {
                return message.senderId === loggedUser?._id ? (
                    <SendedMessageBubble key={index} />
                ) : (
                    <ReceivedMessageBubble key={index} />
                );
            })}
        </div>
    );
}

export default Messages;
