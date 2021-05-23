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
  _id: string;
  conversationId: string;
  receiverSocketId: string | Array<string>;
  sender: "client" | "admin";
  senderSocketId: string;
  messageContent: string;
  sentAt: string;
};

// action types //
export type ClientConversationAPIRequest = {
  +type: "ClientConversationAPIRequest";
  payload: {
    loading: boolean;
    error: null;
  }
};
export type OpenClientConversation = {
  +type: "OpenClientConversation";
  payload: {
    status: number;
    loading: boolean;
    messengerOpen: boolean;
    conversationId: string;
    senderSocketId: string;
    messages: Array<MessageData>;
  }
};
export type CloseClientConversation = {
  +type: "CloseClientConversation";
  payload: {
    messengerOpen: boolean;
  }
};
export type UpdateClientConversation = {
  +type: "UpdateClientConversation";
  payload: {
    status: number;
    loading: boolean;
    conversationId: string;
    senderSocketId: string;
    messages: Array<MessageData>;
  }
};
export type DeleteClientConversation = {
  +type: "DeleteClientConversation";
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
export type SendClientMessage = {
  +type: "SendClientMessage";
  payload: {
    loading: boolean;
    messageSending: boolean;
    newMessage: MessageData;
  }
};
export type SendClientMessageSuccess = {
  +type: "SendClientMessageSuccess";
  payload: {
    loading: boolean;
    messageSending: boolean;
    message: MessageData;
  }
};
export type ReceiveAdminMessage = {
  +type: "ReceiveAdminMessage";
  payload: {
    conversationId: string;
    senderSocketId: string;
    message: MessageData;
  }
};
export type AdminMessengerOfflineResponse = {
  +type: "AdminMessengerOfflineResponse";
  payload: {
    loading: boolean;
    newMessage: MessageData;
  }
};
// error handling //
export type SetClientConversationError = {
  +type: "SetClientConversationError";
  payload: {
    status: number;
    loading: boolean;
    messageSending: boolean;
    responseMsg: string;
    error: any;
    errorMessages: Array<string>;
  }
};


export type ConversationAction =  ClientConversationAPIRequest | OpenClientConversation | CloseClientConversation | UpdateClientConversation | DeleteClientConversation |
                                 SendClientMessage | SendClientMessageSuccess | ReceiveAdminMessage | AdminMessengerOfflineResponse | SetClientConversationError;
