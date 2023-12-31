import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { io } from "socket.io-client";
import ConversationsList from "../components/Chat/Conversations/ConversationsList";
import Messages from "../components/Chat/Messages";

function Chat() {
    const { loggedUser, isLoading } = useAuth();

    const socket = io("http://127.0.0.1:3000", { autoConnect: false });

    const token = localStorage.getItem("token");
    socket.auth = { token };
    socket.connect();

    useEffect(() => {
        socket.on("connect", () => {
            console.log(socket.id);
        });

        socket.on("response", (data) => {
            console.log(data);
        });

        socket.on("receiveMessage", ({ fromUser, message }) => {
            console.log(
                `Received message from user ${
                    fromUser + " " + fromUser
                }: ${message}`
            );
            console.log(message);
        });
    }, []);

    const gonder = (content: string, receiver: string) => {
        socket.emit("sendMessage", {
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
            <div className="w-5/6"><Messages /></div>
        </div>
    );
}

export default Chat;
