import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import ConversationsList from "../components/Chat/Conversations/ConversationsList";
import Messages from "../components/Chat/Messages/Messages";
import { useSocket } from "../contexts/SocketIO";

function Chat() {
    const { loggedUser, isLoading } = useAuth();
    const { socket } = useSocket();

    useEffect(() => {
        socket?.on("receiveMessage", ({ fromUser, message }) => {
            console.log(
                `Received message from user ${
                    fromUser + " " + fromUser
                }: ${message}`
            );
            console.log(message);
        });
    }, []);

    const gonder = (content: string, receiver: string) => {
        socket?.emit("sendMessage", {
            toUserId: receiver,
            message: content,
        });
    };

    if (isLoading) {
        return <>Loading...</>;
    }
    return (
        <div className="flex">
            <div className="w-1/6">
                <ConversationsList />
            </div>
            <div className="w-5/6">
                <Messages />
            </div>
        </div>
    );
}

export default Chat;
