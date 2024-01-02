import { useAuth } from "../../../contexts/AuthContext";
import { ConversationItemType } from "../../../types/Conversations";

type Props = {
    conversation: ConversationItemType;
};

const ConversationItem = ({ conversation }: Props) => {
    const { loggedUser, isLoading } = useAuth();
    const sender = conversation.conversation.participants.find(
        (participant) => participant._id !== loggedUser?._id
    );
    return (
        <div className="flex p-1 border-b-2">
            <div>
                <img
                    src="https://picsum.photos/60"
                    className="rounded-full"
                    alt=""
                />
            </div>
            <div className="ml-2 m-auto">
                <div className="text-lg font-semibold">
                    {sender?.givenName + " " + sender?.familyName}
                </div>
                <div>{conversation.lastMessage.content}</div>
            </div>
        </div>
    );
};

export default ConversationItem;
