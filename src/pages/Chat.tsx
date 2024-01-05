import { useEffect, useState } from "react";
import ConversationsList from "../components/Chat/Conversations/ConversationsList";
import Messages from "../components/Chat/Messages/Messages";
import { useSocket } from "../contexts/SocketIO";
import SendMessage from "../components/Chat/Messages/SendMessage";
import UnSelectedConversationPage from "../components/Chat/Messages/UnSelectedConversationPage";

function Chat() {
    const [conversationId, setConversationId] = useState<string>("");
    const { socket } = useSocket();

    useEffect(() => {
        socket?.on("connect", () => {
            console.log(socket.id);
        });

        socket?.on("receiveMessage", ({ fromUser, message }) => {
            console.log(
                `Received message from user ${
                    fromUser + " " + fromUser
                }: ${message}`
            );
        });
    }, [socket]);

    /* const gonder = (content: string, receiver: string) => {
        socket?.emit("sendMessage", {
            toUserId: receiver,
            message: content,
        });
    }; */

    //gonder("asdasd", "6590aaef2d279701e91a4fee")

    return (
        <div className="flex flex-1">
            <div className="flex flex-1 w-1/6 border-r-2 bg-blue-50">
                <ConversationsList setConversationId={setConversationId} />
            </div>
            <div className="w-5/6 flex flex-2">
                {conversationId !== "" ? (
                    <>
                        <div className="flex-1 p-3 bg-gray-50 ">
                            <div className="flex-1 max-h-screen overflow-y-auto ">
                                <Messages conversationId={conversationId} />
                            </div>
                            <div className="flex">
                                <SendMessage conversationId={conversationId} />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-1 bg-gray-50 justify-center items-center">
                        <UnSelectedConversationPage />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Chat;
