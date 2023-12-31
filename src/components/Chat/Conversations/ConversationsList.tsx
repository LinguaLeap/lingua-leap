import { useQuery } from "react-query";
import { getConversationsList } from "../../../api/api";
import ConversationItem from "./ConversationItem";
import { ConversationItemType } from "../../../types/Conversations";

function ConversationsList() {
    const { isLoading, error, data, isFetching } = useQuery(
        "repoData",
        getConversationsList
    );

    if (isLoading) return "Loading...";
    if (error) return "An error has occurred: " + error.message;
    
    return (
        <div>
            {data.map((conversation: ConversationItemType, index) => (
                <ConversationItem key={index} conversation={conversation} />
            ))}
        </div>
    );
}

export default ConversationsList;
