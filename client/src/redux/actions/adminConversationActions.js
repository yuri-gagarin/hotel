// @flow 
import axios from "axios";
import { setAxiosError } from "./helpers/errorHelpers";
import { generateEmptyAdminConversationModel } from "../reducers/_helpers/emptyDataGenerators";
import store from "../../redux/store";
// types //
import type { Dispatch } from "../reducers/_helpers/createReducer";
import type { 
  AdminConversationData, AdminConversationAction, AdminConversationState, ConnectedClientData, NewClientConnection, ClientDisconnection, SetOnlineClients,
  OpenAdminConversation, CloseAdminConversation, AdminConversationAPIRequest, ToggleAdminMessengerOnlineStatus, SetAdminConversations, CreateNewAdminConveration, DeleteAdminConversation, 
  NewClientMessage, SendAdminMessage, SetAdminConversationError, ClearAdminConversationError
} from "../reducers/admin_conversations/flowTypes";
import type { MessageData } from "../reducers/conversations/flowTypes";
// socket io //
import { socket } from "../../App";
// non api actions //
const openAdminConversation = (data: { activeConversation: AdminConversationData, updatedAdminConversationsArr: Array<AdminConversationData>  }): OpenAdminConversation => {
  const { activeConversation, updatedAdminConversationsArr } = data;
  return {
    type: "OpenAdminConversation",
    payload: { activeConversation, updatedAdminConversationsArr }
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
const newClientConnection = ({ newConnectedClientData }: { newConnectedClientData: ConnectedClientData }): NewClientConnection => {
  return {
    type: "NewClientConnection",
    payload: { newConnectedClientData }
  };
};
const clientDisconnection = ({ updatedConnectedClients }: { updatedConnectedClients: Array<ConnectedClientData> }): ClientDisconnection => {
  return {
    type: "ClientDisconnection",
    payload: { updatedConnectedClients }
  };
};
const setOnlineClients = ({ onlineClientsArr }: { onlineClientsArr: Array<ConnectedClientData> }): SetOnlineClients => {
  return {
    type: "SetOnlineClients",
    payload: { onlineClientsArr }
  };
};
//
export const setAdminConversations = (data: { status: number, responseMsg: string, adminConversations: Array<AdminConversationData> }): SetAdminConversations => {
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
  if (conversationToOpen.new) {
    const updatedConversation = { ...conversationToOpen, new: false };
    const updatedAdminConversationsArr: Array<AdminConversationData> = currentAdminConvState.loadedAdminConversations.map((conversation) => {
      if (conversation.conversationId === conversationId) {
        return {
          ...conversation,
          new: false
        };
      } else {
        return conversation;
      }
    });
    dispatch(openAdminConversation({ activeConversation: updatedConversation, updatedAdminConversationsArr }));
  } else {
    dispatch(openAdminConversation({ activeConversation: { ...conversationToOpen }, updatedAdminConversationsArr: [ ...currentAdminConvState.loadedAdminConversations ] }));
  }
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
export const handleNewClientConnection = (dispatch: Dispatch<AdminConversationAction>, newConnectedClientData: ConnectedClientData): void => {
  dispatch(newClientConnection({ newConnectedClientData }));
};
export const handleClientDisconnection = (dispatch: Dispatch<AdminConversationAction>, { clientSocketId }: { clientSocketId: string }): void => {
  const adminConversationState: AdminConversationState = store.getState().adminConversationState;
  const updatedConnectedClients = adminConversationState.connectedOnlineClients.filter((clientData) => clientData.socketId !== clientSocketId);
  dispatch(clientDisconnection({ updatedConnectedClients }));
};
export const handleSetOnlineClients = (dispatch: Dispatch<AdminConversationAction>, onlineClientsArr: Array<ConnectedClientData>): void => {
  dispatch(setOnlineClients({ onlineClientsArr }));
};

export const handleNewClientMessage = (dispatch: Dispatch<AdminConversationAction>, newMessageData: MessageData): Promise<boolean> => {
  // check if conversation already exists //
  const adminConversationState: AdminConversationState = store.getState().adminConversationState;
  const conversationToUpdate = adminConversationState.loadedAdminConversations.filter((convData) => newMessageData.conversationId === convData.conversationId);
  let updatedState: AdminConversationState;
  if (conversationToUpdate.length === 1) {
    // update is on an existing conversation and currently active conversation //
    const updatedLoadedConversations = adminConversationState.loadedAdminConversations.map((convoData) => {
      if (convoData.conversationId === newMessageData.conversationId) {
        return {
          ...convoData,
          messages: [ ...convoData.messages, newMessageData ],
          newMessages: [ ...convoData.newMessages, newMessageData ]
        }
      } else {
        return convoData;
      }
    });
    //
    // update is on an existing non active conversation? //
    if (conversationToUpdate[0].conversationId === adminConversationState.activeConversation.conversationId) {
      updatedState = { 
        ...adminConversationState, 
        activeConversation: { 
          ...adminConversationState.activeConversation, 
          messages: [ ...adminConversationState.activeConversation.messages, newMessageData ],
          newMessages: [ ...adminConversationState.activeConversation.newMessages, newMessageData ]
        },
        loadedAdminConversations: updatedLoadedConversations
      };
    } else {
      const updatedLoadedConversations = adminConversationState.loadedAdminConversations.map((convoData) => {
        if (convoData.conversationId === newMessageData.conversationId) {
          return {
            ...convoData,
            messages: [ ...convoData.messages, newMessageData ],
            newMessages: [ ...convoData.newMessages, newMessageData ]
          }
        } else {
          return convoData;
        }
      });
      updatedState = {
        ...adminConversationState,
        loadedAdminConversations: updatedLoadedConversations
      };
    }
  } else {
    const newConversation: AdminConversationData = {
      archived: false,
      new: true,
      conversationId: newMessageData.conversationId,
      receiverSocketId: newMessageData.senderSocketId,
      messages: [ newMessageData ],
      newMessages: [ newMessageData ],
      createdAt: new Date().toISOString()
    };
    updatedState = {
      ...adminConversationState,
      loadedAdminConversations: [ newConversation, ...adminConversationState.loadedAdminConversations ]
    }
  }
  dispatch(newClientMessage({ status: 200, responseMsg: "", activeConversation: updatedState.activeConversation, updatedAdminConversations: updatedState.loadedAdminConversations }));
  return Promise.resolve(true);
}
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
  // deal with api later //
  /*
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
    */
  dispatch(createNewAdminConversation({ status: 200, responseMsg: "Ok", newAdminConversation: newConversationData }));
  return Promise.resolve(true);
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


export const handleNewAdminMessage = (dispatch: Dispatch<AdminConversationAction>, newMessageData: MessageData, currentAdminConversationState: AdminConversationState): Promise<boolean> => {
  const { activeConversation, loadedAdminConversations } = currentAdminConversationState;
  let updatedConversations: Array<AdminConversationData> = loadedAdminConversations.map((conversationData) => {
    if (conversationData.conversationId === newMessageData.conversationId) {
      return {
        ...conversationData,
        messages: [ ...conversationData.messages, newMessageData ]
      };
    } else {
      return conversationData;
    }
  })
  console.log(302)
  console.log(newMessageData)
  let stateUpdateData: { status: number, responseMsg: string, activeConversation: AdminConversationData, updatedAdminConversations: Array<AdminConversationData> } = {
     status: 200, 
     responseMsg: "", 
     activeConversation: { ...activeConversation, messages: [ ...activeConversation.messages, newMessageData ] }, 
     updatedAdminConversations: updatedConversations
  };
  dispatch(sendAdminMessage(stateUpdateData));
  socket.emit("newAdminMessageSent", newMessageData);
  return Promise.resolve(true);
};
export const handleSetAdminConversationError = (dispatch: Dispatch<AdminConversationAction>, error: any): void => {
  dispatch(setAdminConversationError(error));
};
