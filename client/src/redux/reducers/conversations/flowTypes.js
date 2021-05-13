// @flow 
export type ConversationState = {
  status: number;
  responseMsg: string;
  loading: boolean;
  userMessaging: boolean;
  senderSocketId: string;
  receiverSocketId: string;
  conversationId: string;
  messages: Array<string>;
  conversationError: any;
};

// action types //
export type OpenConversation = {
  +type: "OpenConversation";
  payload: {
    conversationId: string;
    senderSocketId: string;
    receiverSocketId: string;
    messages: Array<string>;
  }
};
export type CloseConversation = {
  +type: "CloseConversation";
  payload: {
    conversationId: string;
    senderSocketId: string;
    receiverSocketId: string;
    messages: Array<string>;
  }
};
export type UpdateConversation = {
  +type: "UpdateConversation";
  payload: {
    conversationId: string;
    senderSocketId: string;
    receiverSocketId: string;
    messages: Array<string>;
  }
};
export type DeleteConversation = {
  +type: "DeleteConversation";
  payload: {
    conversationId: string;
    senderSocketId: string;
    receiverSocketId: string;
    messages: Array<string>;
  }
};
// messages //
export type SendMessage = {
  +type: "SendMessage";
  payload: {
    conversationId: string;
    senderSocketId: string;
    receiverSocketId: string;
    message: string;
  }
};
export type ReceiveMessage = {
  +type: "ReceiveMessage";
  payload: {
    conversationId: string;
    senderSocketId: string;
    receiverSocketId: string;
    message: string;
  }
};


export type ConversationAction = OpenConversation | CloseConversation | UpdateConversation | DeleteConversation |
                                 SendMessage | ReceiveMessage;
