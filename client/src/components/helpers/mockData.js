// @flow 
import faker from "faker";
import ObjectID from "bson-objectid";
import type { AdminConversationData } from "../../redux/reducers/admin_conversations/flowTypes";
import type { MessageData } from "../../redux/reducers/conversations/flowTypes";


export const generateMockConversation = (numOfmessages?: number): AdminConversationData  => {
  const totalMessages = numOfmessages ? numOfmessages : Math.ceil(Math.random() * 10);
  const conversationId = `CONVERSATION_${ObjectID().toHexString()}`;

  const newConversation: AdminConversationData = {
    conversationId: conversationId,
    archived: false,
    newConversation: false,
    conversationName: faker.lorem.word(),
    receiverSocketId: "",
    messages: [],
    newMessages: [],
    createdAt: new Date().toISOString()
  };
  for (let i = 0; i < totalMessages; i++) {
    const newMessage: MessageData = {
      _id: ObjectID().toHexString(),
      conversationId: conversationId,
      messageContent: faker.lorem.words(),
      receiverSocketId: "",
      senderSocketId: "",
      sender: (i % 2 === 0 ? "admin" : "client"),
      sentAt: new Date().toISOString()
    };
    newConversation.messages.push(newMessage);
  }
  return newConversation;   
};

export const generateMockConversations = (numOfConversations: number): Array<AdminConversationData> => {
  const conversations: Array<AdminConversationData> = [];
  for (let i = 0; i < numOfConversations; i++) { 
    conversations.push(generateMockConversation());
  }
  return conversations;
}