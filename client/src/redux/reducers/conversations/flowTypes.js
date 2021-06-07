// @flow 
export type ConversationState = {
  status: number;
  responseMsg: string;
  loading: boolean;
  messageSending: boolean;
  messengerOpen: boolean;
  conversationActive: boolean;
  senderSocketId: string;
  conversationId: string;
  messages: Array<MessageData>;
  newMessages: Array<MessageData>;
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
// TODO //
// data could be trimmed down ? //
export type OpenClientConversation = {
  +type: "OpenClientConversation";
  payload: {
    status: number;
    loading: boolean;
    messengerOpen: boolean;
    conversationId: string;
    senderSocketId: string;
    newMessages: Array<MessageData>;
    messages: Array<MessageData>;
  }
};
export type CloseClientConversation = {
  +type: "CloseClientConversation";
  payload: {
    messengerOpen: boolean;
  };
};
export type ClientConversationArchived = {|
  +type: "ClientConversationArchived";
  +payload: {
    conversationActive: boolean;
    newMessage: MessageData;
  };
|};
export type ContinueClientConversationRequest = {|
  +type: "ContinueClientConversationRequest";
  +payload: { loading: boolean };
|};
export type ContinueClientConversationSuccess = {|
  +type: "ContinueClientConversationSuccess";
  +payload: {
    loading: boolean;
    conversationActive: boolean;
    updatedMessages: Array<MessageData>;
  };
|};
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
    newMessages: Array<MessageData>;
    messages: Array<MessageData>;
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


export type ConversationAction = ClientConversationAPIRequest | OpenClientConversation | CloseClientConversation | UpdateClientConversation | DeleteClientConversation |
                                 ClientConversationArchived | ContinueClientConversationRequest | ContinueClientConversationSuccess | SendClientMessage | SendClientMessageSuccess | ReceiveAdminMessage | AdminMessengerOfflineResponse | SetClientConversationError;
