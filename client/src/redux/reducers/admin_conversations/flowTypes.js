// @flow 
import type { MessageData } from "../conversations/flowTypes";

export type AdminConversationState = {|
  status: number;
  loading: boolean;
  responseMsg: string;
  messengerOnline: boolean;
  viewingArchived: boolean;
  activeConversation: AdminConversationData;
  loadedAdminConversations: Array<AdminConversationData>;
  numberOfConversations: number;
  connectedOnlineClients: Array<ConnectedClientData>;
  conversationMessageDefaults: Array<MessageData>; // these are default responses, greetings set by admin //
  error: any | null;
  errorMessages: Array<string>;
|};

export type AdminConversationData = {|
  conversationId: string;
  conversationName?: string;
  archived: boolean;
  newConversation: boolean;
  receiverSocketId: string;
  newMessages: Array<MessageData>;
  messages: Array<MessageData>;
  createdAt: string;
|};
export type ConnectedClientData = {|
  _id: string;
  email: string;
  name: string;
  socketId: string;
|};

export type MessengerOnlineToggleArgs = {
  messengerOnline: boolean;
  numberOfConnectedClients?: number;
  visibleClientsSocketIds?: Array<string | number>;
  clientsDataArr?: Array<string>
};

// //
export type ToggleAdminMessengerOnlineStatus = {|
  +type: "ToggleAdminMessengerOnlineStatus";
  +payload: {
    loading: boolean;
    messengerOnline: boolean;
  }
|};
export type NewClientConnection = {|
  +type: "NewClientConnection";
  +payload: {
    newConnectedClientData: ConnectedClientData;
  }
|};
export type ClientDisconnection = {|
  +type: "ClientDisconnection";
  +payload: {
    updatedConnectedClients: Array<ConnectedClientData>;
  }
|};
export type SetOnlineClients = {|
  +type: "SetOnlineClients";
  +payload: {
    onlineClientsArr: Array<ConnectedClientData>;
  }
|};
export type OpenAdminConversation = {|
  +type: "OpenAdminConversation";
  +payload: {
    activeConversation: AdminConversationData;
    updatedAdminConversationsArr: Array<AdminConversationData>;
  }
|};
export type CloseAdminConversation = {|
  +type: "CloseAdminConversation";
  +payload: {
    activeConversation: AdminConversationData;
  }
|};
export type UpdateAdminConversationName = {|
  +type: "UpdateAdminConversationName";
  +payload: {
    updatedActiveConversation: AdminConversationData;
    updatedLoadedConversations: Array<AdminConversationData>;
  }
|};
//
export type AdminConversationAPIRequest = {|
  +type: "AdminConversationAPIRequest";
  +payload: {
    loading: boolean;
  }
|};
export type ArchiveAdminConversation = {|
  +type: "ArchiveAdminConversation";
  +payload: {
    updatedActiveConversation: AdminConversationData;
    updatedLoadedAdminConversations: Array<AdminConversationData>;
  }
|};
export type ContinueAdminConversation = {|
  +type: "ContinueAdminConversation";
  +payload: {
    updatedLoadedAdminConversations: Array<AdminConversationData>;
  }
|};
export type SetAdminConversations = {|
  +type: "SetAdminConversations";
  +payload: {
    status: number;
    responseMsg: string;
    loading: boolean;
    viewingArchived: boolean;
    updatedActiveConversation: AdminConversationData;
    updatedLoadedAdminConversations: Array<AdminConversationData>;
  }
|};
export type CreateNewAdminConveration = {|
  +type: "CreateNewAdminConversation";
  +payload: {
    status: number;
    responseMsg: string;
    loading: boolean;
    newAdminConversation: AdminConversationData;
  }
|};
export type DeleteAdminConversation = {
  +type: "DeleteAdminConversation";
  +payload: {
    status: number;
    responseMsg: string;
    loading: boolean;
    updatedActiveConversation: AdminConversationData;
    updatedAdminConversations: Array<AdminConversationData>;
    numberOfConversations: number;
  }
};
// message defaults //
// messages defaults //
export type FetchDefaultMessages = {|
  +type: "FetchDefaultMessages";
  +payload: {
    status: number;
    loading: boolean;
    responseMsg: string;
    defaultMessages: Array<MessageData>;
  }
|};
export type CreateDefaultMessage = {|
  +type: "CreateDefaultMessage";
  +payload: {
    status: number;
    loading: boolean;
    responseMsg: string;
    createdMessage: MessageData;
  }
|};
export type UpdateDefaultMessage = {|
  +type: "UpdateDefaultMessage";
  +payload: {
    status: number;
    loading: boolean;
    responseMsg: string;
    updatedDefaultMessages: Array<MessageData>;
  }
|};
export type DeleteDefaultMessage = {|
  +type: "DeleteDefaultMessage";
  +payload: {
    status: number;
    loading: boolean;
    responseMsg: string;
    updatedDefaultMessages: Array<MessageData>;
  }
|};

export type NewClientMessage = {
  +type: "NewClientMessage";
  +payload: {
    status: number;
    responseMsg: string;
    loading: boolean;
    activeConversation: AdminConversationData;
    updatedAdminConversations: Array<AdminConversationData>;
  }
};

export type SendAdminMessage = {
  +type: "SendAdminMessage";
  +payload: {
    status: number;
    responseMsg: string;
    loading: boolean;
    activeConversation: AdminConversationData;
    updatedAdminConversations: Array<AdminConversationData>;
  }
};

export type SetAdminConversationError = {
  +type: "SetAdminConversationError";
  +payload: {
    status: number;
    responseMsg: string;
    loading: boolean;
    error: any;
    errorMessages: Array<string>;
  }
};
export type ClearAdminConversationError = {
  +type: "ClearAdminConversationError";
  +payload: {
    responseMsg: string;
    error: null;
    errorMessages: Array<string>;
  }
};

export type AdminConversationAction = OpenAdminConversation | CloseAdminConversation | UpdateAdminConversationName | AdminConversationAPIRequest | ToggleAdminMessengerOnlineStatus | NewClientConnection | ClientDisconnection | SetOnlineClients | SetAdminConversations | CreateNewAdminConveration |
                                      FetchDefaultMessages | CreateDefaultMessage | UpdateDefaultMessage | DeleteDefaultMessage |
                                      CreateNewAdminConveration | DeleteAdminConversation | ArchiveAdminConversation | ContinueAdminConversation | NewClientMessage | SendAdminMessage | SetAdminConversationError | ClearAdminConversationError;
