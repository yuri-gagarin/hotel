// @flow 
import axios from "axios";
import { setAxiosError } from "./helpers/errorHelpers";
import { generateEmptyAdminConversationModel } from "../reducers/_helpers/emptyDataGenerators";
// types //
import type { Dispatch } from "../reducers/_helpers/createReducer";
import type { 
  AdminConversationData, AdminConversationAction, AdminConversationState, 
  OpenAdminConversation, CloseAdminConversation, AdminConversationAPIRequest, ToggleAdminMessengerOnlineStatus, SetAdminConversations, CreateNewAdminConveration, DeleteAdminConversation, 
  NewClientMessage, SendAdminMessage, SetAdminConversationError, ClearAdminConversationError
} from "../reducers/admin_conversations/flowTypes";
import type { MessageData } from "../reducers/conversations/flowTypes";
// socket io //
import { socket } from "../../App";
// non api actions //
const openAdminConversation = (data: { activeConversation: AdminConversationData }): OpenAdminConversation => {
  const { activeConversation } = data;
  return {
    type: "OpenAdminConversation",
    payload: { activeConversation }
  };
};
const closeAdminConversation = (data: { activeConversation: AdminConversationData }): CloseAdminConversation => {
  const { activeConversation } = data;
  return {
    type: "CloseAdminConversation",
    payload: { activeConversation }
  };
};
// API related actions //
const adminConversationAPIRequest = (): AdminConversationAPIRequest => {
  return {
    type: "AdminConversationAPIRequest",
    payload: { loading: true }
  };
};
const toggleAdminMessengerOnlineStatus = ({ messengerOnline }: { messengerOnline: boolean }): ToggleAdminMessengerOnlineStatus => {
  return {
    type: "ToggleAdminMessengerOnlineStatus",
    payload: { loading: false, messengerOnline }
  };
};
const setAdminConversations = (data: { status: number, responseMsg: string, adminConversations: Array<AdminConversationData> }): SetAdminConversations => {
  const { status, responseMsg, adminConversations } = data;
  return {
    type: "SetAdminConversations",
    payload: { loading: false, status, responseMsg, adminConversations }
  };
};
const createNewAdminConversation = (data: { status: number, responseMsg: string, newAdminConversation: AdminConversationData }): CreateNewAdminConveration => {
  const { status, responseMsg, newAdminConversation } = data;
  return {
    type: "CreateNewAdminConversation",
    payload: { loading: false, status, responseMsg, newAdminConversation }
  };
};
const deleteAdminConversation = (data: { status: number, responseMsg: string, updatedActiveConversation: AdminConversationData, updatedAdminConversations: Array<AdminConversationData> }): DeleteAdminConversation => {
  const { status, responseMsg, updatedActiveConversation, updatedAdminConversations } = data;
  return {
    type: "DeleteAdminConversation",
    payload: { loading: false, status, responseMsg, updatedActiveConversation, updatedAdminConversations, numberOfConversations: updatedAdminConversations.length }
  };
};
// messaging //
const newClientMessage = (data: { status: number, responseMsg: string, activeConversation: AdminConversationData, updatedAdminConversations: Array<AdminConversationData> }): NewClientMessage => {
  const { status, responseMsg, activeConversation, updatedAdminConversations } = data;
  return {
    type: "NewClientMessage",
    payload: { loading: false, status, responseMsg, activeConversation, updatedAdminConversations }
  };
};
const sendAdminMessage = (data: { status: number, responseMsg: string, activeConversation: AdminConversationData, updatedAdminConversations: Array<AdminConversationData> }): SendAdminMessage => {
  const { status, responseMsg, activeConversation, updatedAdminConversations } = data;
  return {
    type: "SendAdminMessage",
    payload: { loading: false, status, responseMsg, activeConversation, updatedAdminConversations }
  };
};
// error handling //
const setAdminConversationError = (err: any): SetAdminConversationError => {
  const { status, responseMsg, error, errorMessages } = setAxiosError(err);
  return {
    type: "SetAdminConversationError",
    payload: { status, loading: false, responseMsg, error, errorMessages }
  };
};
const clearAdminConversationError = (): ClearAdminConversationError => {
  return {
    type: "ClearAdminConversationError",
    payload: { responseMsg: "", error: null, errorMessages: [] }
  };
};



// exported actions to the components //
export const handleOpenAdminConversation = (dispatch: Dispatch<AdminConversationAction>, conversationId: string, currentAdminConvState: AdminConversationState): void => {
  const conversationToOpen: AdminConversationData = currentAdminConvState.loadedAdminConversations.filter((convData) => convData.conversationId === conversationId)[0];
  dispatch(openAdminConversation({ activeConversation: { ...conversationToOpen } } ));
};
export const handleCloseAdminConversation = (dispatch: Dispatch<AdminConversationAction>): void => {
  dispatch(closeAdminConversation({ activeConversation: generateEmptyAdminConversationModel() } ));
};
// exported API related actions //
export const handleToggleAdminMessengerOnlineStatus = (dispatch: Dispatch<AdminConversationAction>, { messengerOnline }: { messengerOnline: boolean }): void => {
  dispatch(adminConversationAPIRequest());
  socket.emit("toggleAdminOnlineStatus", { messengerOnline });
};
export const handleSetAdminMessengerOnlineStatus = (dispatch: Dispatch<AdminConversationAction>, { messengerOnline }: { messengerOnline: boolean }): void => {
  dispatch(toggleAdminMessengerOnlineStatus({ messengerOnline }));
};
export const handleFetchAdminConversations = (dispatch: Dispatch<AdminConversationAction>): Promise<boolean> => {
  const axiosOpts = {
    method: "GET",
    url: "/api/conversations"
  };

  return axios(axiosOpts)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, adminConversations = [] }: { responseMsg: string, adminConversations: Array<AdminConversationData> } = data;
      const stateUpdateData = { status, responseMsg, adminConversations };
      dispatch(setAdminConversations(stateUpdateData));
      return Promise.resolve(true);
    })
    .catch((err) => {
      dispatch(setAdminConversationError(err));
      return Promise.resolve(false);
    });
};
export const handleCreateNewAdminConversation = (dispatch: Dispatch<AdminConversationAction>, newConversationData: AdminConversationData): Promise<boolean> => {
  const axiosOpts = {
    method: "POST",
    url: "/api/conversation",
    data: newConversationData
  };

  return axios(axiosOpts)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, newAdminConversation }: { responseMsg: string, newAdminConversation: AdminConversationData } = data;
      dispatch(createNewAdminConversation({ status, responseMsg, newAdminConversation }));
      return Promise.resolve(true);
    })
    .catch((err) => {
      dispatch(setAdminConversationError(err));
      return Promise.resolve(false);
    });
};
export const handleDeleteAdminConversation = (dispatch: Dispatch<AdminConversationAction>, conversationIdToDelete: string, currentAdminConversationState: AdminConversationState): Promise<boolean> => {
  const { activeConversation, loadedAdminConversations, numberOfConversations } = currentAdminConversationState;
  const axiosOpts = {
    method: "DELETE",
    url: "/api/conversations/:conversationId"
  };

  return axios(axiosOpts) 
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, deletedAdminConversation }: { responseMsg: string, deletedAdminConversation: AdminConversationData } = data;
      const updatedAdminConversations = loadedAdminConversations.filter((convData) => convData.conversationId !== deletedAdminConversation.conversationId);
      const updatedActiveConversation = deletedAdminConversation.conversationId === activeConversation.conversationId ? generateEmptyAdminConversationModel() : { ...activeConversation };
      dispatch(deleteAdminConversation({ status, responseMsg, updatedActiveConversation, updatedAdminConversations }));
      return Promise.resolve(true);
    })
    .catch((err) => {
      dispatch(setAdminConversationError(err));
      return Promise.resolve(false);
    });
};

export const handleNewMessage = (dispatch: Dispatch<AdminConversationAction>, newMessageData: MessageData, currentAdminConversationState: AdminConversationState): Promise<boolean> => {
  const { activeConversation, loadedAdminConversations } = currentAdminConversationState;
  const { conversationId, sender } = newMessageData;
  // 
  let stateUpdateData: { status: number, responseMsg: string, activeConversation: AdminConversationData, updatedAdminConversations: Array<AdminConversationData> } = { status: 200, responseMsg: "", activeConversation: { ...activeConversation }, updatedAdminConversations: [] };
  if (conversationId === activeConversation.conversationId) { 
    stateUpdateData.activeConversation.messages = [ ...activeConversation.messages, newMessageData ];
    stateUpdateData.updatedAdminConversations = loadedAdminConversations.map((conversationData) => {
      if (conversationData.conversationId === conversationId) {
        return { ...conversationData, messages: [ ...conversationData.messages, newMessageData ]};
      } else {
        return conversationData;
      }
    });
  } else {
    stateUpdateData.updatedAdminConversations = loadedAdminConversations.map((conversationData) => {
      if (conversationData.conversationId === conversationId) {
        return { ...conversationData, messages: [ ...conversationData.messages, newMessageData ]};
      } else {
        return conversationData;
      }
    })
  }
  sender === "admin" ? dispatch(sendAdminMessage(stateUpdateData)) : dispatch(newClientMessage(stateUpdateData));
  return Promise.resolve(true);
};

export const handleSetAdminConversationError = (dispatch: Dispatch<AdminConversationAction>, error: any): void => {
  dispatch(setAdminConversationError(error));
};
