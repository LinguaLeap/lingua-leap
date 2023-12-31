import { useAuth } from "../../../contexts/AuthContext";

type User = {
    _id: string;
    familyName: string;
    givenName: string;
};

type Conversation = {
    _id: string;
    participants: User[];
    createdAt: string;
    __v: number;
};

type LastMessage = {
    _id: string;
    conversationId: string;
    senderId: User;
    content: string;
    status: number;
    timestamp: string;
    __v: number;
};

type Props = {
    conversation: {
        conversation: Conversation;
        lastMessage: LastMessage;
        unseenMessageCount: number;
    };
};

const ConversationItem = (props: Props) => {
    const { loggedUser, isLoading } = useAuth();
    const sender = props.conversation.conversation.participants.find(
        (participant: User) => participant._id !== loggedUser?._id
    );
    return (
        <div className="flex p-1 border-b-2">
            <div><img src="https://picsum.photos/60" className="rounded-full" alt="" /></div>
            <div className="ml-2 m-auto">
                <div className="text-lg font-semibold">{sender?.givenName+" "+sender?.familyName}</div>
                <div>{props.conversation.lastMessage.content}</div>
            </div>
        </div>
    );
};

export default ConversationItem;
