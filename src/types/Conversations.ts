export interface Participant {
    _id: string;
    familyName?: string;
    givenName?: string;
    displayName?: string;
}

export interface LastMessage {
    _id: string;
    conversationId: string;
    senderId: Participant;
    content: string;
    status: number;
    timestamp: string;
    __v: number;
}

export interface Conversation {
    _id: string;
    participants: Participant[];
    createdAt: string;
    __v: number;
}

export interface ConversationItemType {
    conversation: Conversation;
    lastMessage: LastMessage;
    unseenMessageCount: number;
}
