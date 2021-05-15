// @flow 
export type ConversationState = {
  status: number;
  responseMsg: string;
  loading: boolean;
  messageSending: boolean;
  messengerOpen: boolean;
  senderSocketId: string;
  conversationId: string;
  messages: Array<MessageData>;
  error: any;
  errorMessages: Array<string> | null;
};

export type MessageData = {
  conversationId: string;
  receiverSocketId: string | Array<string>;
  sender: "client" | "admin";
  content: string;
  senderSocketId: string;
  messageContent: string;
  sentAt: string;
};

// action types //
export type ConversationAPIRequest = {
  +type: "ConversationAPIRequest";
  payload: {
    loading: boolean;
    error: null;
  }
};
export type OpenConversation = {
  +type: "OpenConversation";
  payload: {
    status: number;
    loading: boolean;
    messengerOpen: boolean;
    conversationId: string;
    senderSocketId: string;
    messages: Array<MessageData>;
  }
};
export type CloseConversation = {
  +type: "CloseConversation";
  payload: {
    messengerOpen: boolean;
  }
};
export type UpdateConversation = {
  +type: "UpdateConversation";
  payload: {
    status: number;
    loading: boolean;
    conversationId: string;
    senderSocketId: string;
    messages: Array<MessageData>;
  }
};
export type DeleteConversation = {
  +type: "DeleteConversation";
  payload: {
    status: number;
    loading: boolean;
    conversationId: string;
    senderSocketId: string;
    receiverSocketId: string;
    messages: Array<MessageData>;
  }
};
// messages //
export type SendMessage = {
  +type: "SendMessage";
  payload: {
    loading: boolean;
    messageSending: boolean;
  }
};
export type SendMessageSuccess = {
  +type: "SendMessageSuccess";
  payload: {
    loading: boolean;
    messageSending: boolean;
    message: MessageData;
  }
};
export type ReceiveMessage = {
  +type: "ReceiveMessage";
  payload: {
    conversationId: string;
    senderSocketId: string;
    message: MessageData;
  }
};
// error handling //
export type SetConversationError = {
  +type: "SetConversationError";
  payload: {
    status: number;
    responseMsg: string;
    error: any;
    errorMessages: Array<string>;
  }
};


export type ConversationAction =  ConversationAPIRequest | OpenConversation | CloseConversation | UpdateConversation | DeleteConversation |
                                 SendMessage | SendMessageSuccess | ReceiveMessage | SetConversationError;
