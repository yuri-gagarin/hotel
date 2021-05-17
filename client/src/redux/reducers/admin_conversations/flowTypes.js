// @flow 
import type { MessageData } from "../conversations/flowTypes";

export type AdminConversationState = {
  status: number;
  loading: boolean;
  responseMsg: string;
  activeConversation: AdminConversationData;
  loadedAdminConversations: Array<AdminConversationData>;
  numberOfConversations: number;
  error: any | null;
  errorMessages: Array<string>;
};

export type AdminConversationData = {
  conversationId: string;
  archived: boolean;
  receiverSocketId: string;
  newMessages: Array<MessageData>;
  messages: Array<MessageData>;
  createdAt: string;
};

// //
type OpenAdminConversation = {
  +type: "OpenAdminConversation";
  +payload: {
    activeConversation: AdminConversationData;
  }
};
type CloseAdminConversation = {
  +type: "CloseAdminConversation";
  +payload: {
    activeConversation: AdminConversationData;
  }
};

type FetchAdminConversations = {
  +type: "FetchAdminConversations";
  +payload: {
    status: number;
    responseMsg: string;
    loading: boolean;
    adminConversations: Array<AdminConversationData>;
  }
};
type CreateNewAdminConveration = {
  +type: "CreateNewAdminConversation";
  +payload: {
    status: number;
    responseMsg: string;
    loading: boolean;
    newAdminConversation: AdminConversationData;
  }
};
type DeleteAdminConversation = {
  +type: "DeleteAdminConversation";
  +payload: {
    status: number;
    responseMsg: string;
    loading: boolean;
    activeConversation: AdminConversationData;
    updatedAdminConversations: Array<AdminConversationData>;
    numberOfConversations: number;
  }
};

type NewClientMessage = {
  +type: "NewClientMessage";
  +payload: {
    status: number;
    responseMsg: string;
    loading: boolean;
    activeConversation: AdminConversationData;
    updatedAdminConversations: Array<AdminConversationData>;
  }
};

type SendAdminMessage = {
  +type: "SendAdminMessage";
  +payload: {
    status: number;
    responseMsg: string;
    loading: boolean;
    activeConversation: AdminConversationData;
    updatedAdminConversations: Array<AdminConversationData>;
  }
};

type SetAdminConversationError = {
  +type: "SetAdminConversationError";
  +payload: {
    status: number;
    responseMsg: string;
    loading: boolean;
    error: any;
    errorMessages: Array<string>;
  }
};
type ClearAdminConversationError = {
  +type: "ClearAdminConversationError";
  +payload: {
    responseMsg: string;
    error: null;
    errorMessages: Array<string>;
  }
};

export type AdminConversationAction = OpenAdminConversation | CloseAdminConversation | FetchAdminConversations | CreateNewAdminConveration |
                                      CreateNewAdminConveration | DeleteAdminConversation | NewClientMessage | SendAdminMessage | SetAdminConversationError | ClearAdminConversationError;
