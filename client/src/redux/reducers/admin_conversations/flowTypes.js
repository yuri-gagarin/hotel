// @flow 
import type { MessageData } from "../conversations/flowTypes";

export type AdminConversationState = {|
  status: number;
  loading: boolean;
  responseMsg: string;
  activeConversation: AdminConversationData;
  loadedAdminConversations: Array<AdminConversationData>;
  numberOfConversations: number;
  error: any | null;
  errorMessages: Array<string>;
|};

export type AdminConversationData = {|
  conversationId: string;
  archived: boolean;
  receiverSocketId: string;
  newMessages: Array<MessageData>;
  messages: Array<MessageData>;
  createdAt: string;
|};

// //
export type OpenAdminConversation = {|
  +type: "OpenAdminConversation";
  +payload: {
    activeConversation: AdminConversationData;
  }
|};
export type CloseAdminConversation = {|
  +type: "CloseAdminConversation";
  +payload: {
    activeConversation: AdminConversationData;
  }
|};
//
export type AdminConversationAPIRequest = {|
  +type: "AdminConversationAPIRequest";
  +payload: {
    loading: boolean;
  }
|};
 export type SetAdminConversations = {|
  +type: "SetAdminConversations";
  +payload: {
    status: number;
    responseMsg: string;
    loading: boolean;
    adminConversations: Array<AdminConversationData>;
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

export type AdminConversationAction = OpenAdminConversation | CloseAdminConversation | AdminConversationAPIRequest | SetAdminConversations | CreateNewAdminConveration |
                                      CreateNewAdminConveration | DeleteAdminConversation | NewClientMessage | SendAdminMessage | SetAdminConversationError | ClearAdminConversationError;
