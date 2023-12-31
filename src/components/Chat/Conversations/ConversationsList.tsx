import { useQuery } from "react-query";
import { getConversationsList } from "../../../api/api";
import ConversationItem from "./ConversationItem";

function ConversationsList() {
    const { isLoading, error, data, isFetching } = useQuery(
        "repoData",
        getConversationsList
    );

    if (isLoading) return "Loading...";
        console.log(data)
    if (error) return "An error has occurred: " + error.message;
  return (
    <div>
        {
            data.map((conversation, index) => (
                <ConversationItem key={index} conversation={conversation} />
            ))
        }
    </div>
  )
}

export default ConversationsList