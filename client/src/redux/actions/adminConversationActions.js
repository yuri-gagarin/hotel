// @flow 
import axios from "axios";
import { setAxiosError } from "./helpers/errorHelpers";
import store from "../../redux/store";
// types //
import type { Dispatch } from "../reducers/_helpers/createReducer";
import type { 
  AdminConversationData, AdminConversationAction, AdminConversationState, ConnectedClientData, NewClientConnection, ClientDisconnection, SetOnlineClients,
  OpenAdminConversation, CloseAdminConversation, UpdateAdminConversationName, AdminConversationAPIRequest, ToggleAdminMessengerOnlineStatus, SetAdminConversations, CreateNewAdminConveration, DeleteAdminConversation, 
  FetchDefaultMessages, CreateDefaultMessage, UpdateDefaultMessage, DeleteDefaultMessage,
  ArchiveAdminConversation, ToggleArchivedAdminConversations, NewClientMessage, SendAdminMessage, SetAdminConversationError, ClearAdminConversationError
} from "../reducers/admin_conversations/flowTypes";
import type { MessageData } from "../reducers/conversations/flowTypes";
// socket io //
import { socket } from "../../App";
// helpers //
import { generateEmptyAdminConversationModel } from "../reducers/_helpers/emptyDataGenerators";
import { generateMockConversations } from "../../components/helpers/mockData";

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
const updateAdminConversationName = (data: { updatedActiveConversation: AdminConversationData, updatedLoadedConversations: Array<AdminConversationData> }): UpdateAdminConversationName => {
  const { updatedActiveConversation, updatedLoadedConversations } = data;
  return {
    type: "UpdateAdminConversationName",
    payload: { updatedActiveConversation, updatedLoadedConversations }
  };
};
// API related actions //
const adminConversationAPIRequest = (): AdminConversationAPIRequest => {
  return {
    type: "AdminConversationAPIRequest",
    payload: { loading: true }
  };
};
const archiveAdminConversation = (data: { updatedActiveConversation: AdminConversationData, updatedLoadedAdminConversations: Array<AdminConversationData> }): ArchiveAdminConversation => {
  const { updatedActiveConversation, updatedLoadedAdminConversations } = data;
  return {
    type: "ArchiveAdminConversation",
    payload: { updatedActiveConversation, updatedLoadedAdminConversations }
  };
};
const toggleArchivedAdminConversations = (data: { viewingArchived: boolean, updatedActiveConversation: AdminConversationData, updatedLoadedAdminConversations: Array<AdminConversationData> }): ToggleArchivedAdminConversations => {
  const { viewingArchived, updatedActiveConversation, updatedLoadedAdminConversations } = data;
  return {
    type: "ToggleArchivedAdminConversations",
    payload: { viewingArchived, updatedActiveConversation, updatedLoadedAdminConversations }
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
// message defaaults //
const fetchDefaultMessages = (data: { status: number, responseMsg: string, defaultMessages: Array<MessageData> }): FetchDefaultMessages => {
  const { status, responseMsg, defaultMessages } = data;
  return {
    type: "FetchDefaultMessages",
    payload: { loading: false, status, responseMsg, defaultMessages }
  };
};
const createDefaultMessage = (data: { status: number, responseMsg: string, createdMessage: MessageData }): CreateDefaultMessage => {
  const { status, responseMsg, createdMessage } = data;
  return {
    type: "CreateDefaultMessage",
    payload: { loading: false, status, responseMsg, createdMessage }
  };
};
const updateDefaultMessage = (data: { status: number, responseMsg: string, updatedDefaultMessages: Array<MessageData> }): UpdateDefaultMessage => {
  const { status, responseMsg, updatedDefaultMessages } = data;
  return {
    type: "UpdateDefaultMessage",
    payload: { loading: false, status, responseMsg, updatedDefaultMessages }
  };
};
const deleteDefaultMessages = (data: { status: number, responseMsg: string, updatedDefaultMessages: Array<MessageData> }): DeleteDefaultMessage => {
  const { status, responseMsg, updatedDefaultMessages } = data;
  return {
    type: "DeleteDefaultMessage",
    payload: { loading: false, status, responseMsg, updatedDefaultMessages }
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
  // TODO //
  // could be optimized ? //
  // if no new messages no reason to recopy? //
  const updatedConversation: AdminConversationData = { ...conversationToOpen, newConversation: false, newMessages: [], messages: [ ...conversationToOpen.messages, ...conversationToOpen.newMessages ]};
  const updatedAdminConversationsArr: Array<AdminConversationData> = currentAdminConvState.loadedAdminConversations.map((conversation) => {
    if (conversation.conversationId === conversationId) {
      return { ...updatedConversation };
    } else {
      return conversation;
    }
  });
  dispatch(openAdminConversation({ activeConversation: updatedConversation, updatedAdminConversationsArr }));

};
export const handleCloseAdminConversation = (dispatch: Dispatch<AdminConversationAction>): void => {
  dispatch(closeAdminConversation({ activeConversation: generateEmptyAdminConversationModel() } ));
};
export const handleUpdateAdminConversationName = (dispatch: Dispatch<AdminConversationAction>, newName: string, conversationId: string, currentAdminConvState: AdminConversationState): void => {
  const conversationToUpdate: AdminConversationData = currentAdminConvState.loadedAdminConversations.filter((convData) => convData.conversationId === conversationId)[0];
  let updatedActiveConversation: ?AdminConversationData;
  let updatedLoadedConversations: Array<AdminConversationData>;
  if (!conversationToUpdate) return;
  else {
    if (conversationToUpdate.conversationId === currentAdminConvState.activeConversation.conversationId) {
      // update current conversation plus loaded conversations //
      updatedActiveConversation = { ...currentAdminConvState.activeConversation, conversationName: newName };
      updatedLoadedConversations = currentAdminConvState.loadedAdminConversations.map((convData) => {
        if (convData.conversationId === conversationToUpdate.conversationId) {
          return { ...conversationToUpdate, conversationName: newName };
        } else {
          return convData;
        }
      });
    } else {
      // update only loaded conversations //
      updatedLoadedConversations = currentAdminConvState.loadedAdminConversations.map((convData) => {
        if (convData.conversationId === conversationToUpdate.conversationId) {
          return { ...conversationToUpdate, conversationName: newName };
        } else {
          return convData;
        }
      });
    }
    return dispatch(updateAdminConversationName({ 
      updatedActiveConversation: updatedActiveConversation ? updatedActiveConversation : currentAdminConvState.activeConversation,
      updatedLoadedConversations: updatedLoadedConversations
    }));
  }
}
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
  const adminConversationState: AdminConversationState = store.getState().adminConversationState;
  const conversationToUpdate = adminConversationState.loadedAdminConversations.filter((convData) => newMessageData.conversationId === convData.conversationId)[0];
  let updatedActiveConversation: ?AdminConversationData;
  let updatedLoadedConversations: Array<AdminConversationData>;
  // check if conversation already exists //
  if (conversationToUpdate) {
    // update is on an existing conversation and currently active conversation ? //
    if (conversationToUpdate.conversationId === adminConversationState.activeConversation.conversationId) {
      updatedLoadedConversations = adminConversationState.loadedAdminConversations.map((convoData) => {
        if (convoData.conversationId === newMessageData.conversationId) {
          updatedActiveConversation = { ...convoData, messages: [ ...convoData.messages, newMessageData ]};
          return { ...convoData, messages: [ ...convoData.messages, newMessageData ] };
        } else {
          return convoData;
        }
      });
    } else {
      // update is on an existing non active conversation //
      updatedActiveConversation = { ...adminConversationState.activeConversation };
      updatedLoadedConversations = adminConversationState.loadedAdminConversations.map((convoData) => {
        if (convoData.conversationId === newMessageData.conversationId) {
          return { ...convoData, newMessages: [ ...convoData.newMessages, newMessageData ] };
        } else {
          return convoData;
        }
      });
    }
  } else {
    // create a new conversation in local state //
    const newConversation: AdminConversationData = {
      archived: false,
      newConversation: true,
      conversationId: newMessageData.conversationId,
      receiverSocketId: newMessageData.senderSocketId,
      messages: [],
      newMessages: [ newMessageData ],
      createdAt: new Date().toISOString()
    };
    updatedLoadedConversations = [ newConversation, ...adminConversationState.loadedAdminConversations ];
    updatedActiveConversation = { ...adminConversationState.activeConversation };
  }
  dispatch(newClientMessage({ 
    status: 200, 
    responseMsg: "",
     activeConversation: updatedActiveConversation ? updatedActiveConversation : { ...adminConversationState.activeConversation },
    updatedAdminConversations: updatedLoadedConversations 
  }));
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

export const handleArchiveAdminConversation = (dispatch: Dispatch<AdminConversationAction>, conversationData: AdminConversationData, currentAdminConvState: AdminConversationState): Promise<boolean> => {
  const { conversationId } = conversationData;
  const axiosOpts = {
    method: "POST",
    url: "/api/conversations/archive",
    data: {
      conversation: conversationData,
    }
  };
  dispatch(adminConversationAPIRequest());
  return axios(axiosOpts)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, archivedConversation }: { responseMsg: string, archivedConversation: AdminConversationData } = data;
      const updatedLoadedAdminConversations = currentAdminConvState.loadedAdminConversations.filter((convData) => convData.conversationId !== archivedConversation.conversationId);
      const updatedActiveConversation = generateEmptyAdminConversationModel();
      dispatch(archiveAdminConversation({ updatedActiveConversation, updatedLoadedAdminConversations }));
      // 
      const receiverSocketId = conversationId.split("_")[1];
      socket.emit("conversationArchived", { conversationId, receiverSocketId });
      return true;
    })
    .catch((error) => {
      dispatch(setAdminConversationError(error));
      return false;
    });
};

export const handleToggleArchivedAdminConversations = (dispatch: Dispatch<AdminConversationAction>, options: { viewArchived?: boolean, viewActive?: boolean }): Promise<boolean> => {
  const { viewArchived, viewActive } = options;
  if (viewArchived) {
    // fetch archived conversations from the DB //
    const axiosOpts = {
      method: "GET",
      url: "/api/conversations"
    };
    return axios(axiosOpts)
      .then((response) => {
        const { status, data } = response;
        const { responseMsg, adminConversations }: { responseMsg: string, adminConversations: Array<AdminConversationData> } = data;
        dispatch(toggleArchivedAdminConversations({ 
          viewingArchived: true, 
          updatedActiveConversation: generateEmptyAdminConversationModel(),
          updatedLoadedAdminConversations: adminConversations
        }));
        return Promise.resolve(true);
      })
      .catch((error) => {
        dispatch(setAdminConversationError(error));
        return Promise.resolve(false);
      });
  } else {
    // return the active conversations from redis?? //
    return Promise.resolve(true);
  }
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
  // TODO //
  // API call later to delete possible archived convo //
  /*
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
  */
  const udpdatedLoadedConversations: Array<AdminConversationData> = currentAdminConversationState.loadedAdminConversations.filter((convData) => convData.conversationId !== conversationIdToDelete);
  dispatch(deleteAdminConversation({ 
    status: 200, 
    responseMsg: "Ok", 
    updatedActiveConversation: generateEmptyAdminConversationModel(),
    updatedAdminConversations: udpdatedLoadedConversations
  }));
  // shoud dispatch delete conversation to redis servers //
  socket.emit("adminDeletedConversation", conversationIdToDelete);
  return Promise.resolve(true);
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

export const handleFetchDefaultMessages = (dispatch: Dispatch<AdminConversationAction>): Promise<boolean> => {
  const axiosReqOpts = {
    method: "GET",
    url: "/api/messages"
  };

  dispatch(adminConversationAPIRequest());
  return axios(axiosReqOpts)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, defaultMessages }: { responseMsg: string, defaultMessages: Array<MessageData> } = data;
      dispatch(fetchDefaultMessages({ status, responseMsg, defaultMessages }));
      return true;
    })
    .catch((error) => {
      dispatch(setAdminConversationError(error));
      return false;
    });
};
export const handleCreateDefaultMessage = (dispatch: Dispatch<AdminConversationAction>, message: MessageData): Promise<boolean> => {
  console.log(message);
  const axiosReqOpts = {
    method: "POST",
    url: "/api/messages/create",
    data: { 
      messageData: message
    }
  };
  dispatch(adminConversationAPIRequest());
  return axios(axiosReqOpts)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, createdMessage }: { responseMsg: string, createdMessage: MessageData } = data;
      dispatch(createDefaultMessage({ status, responseMsg, createdMessage }));
      return true;
    })
    .catch((error) => {
      console.log(error);
      dispatch(setAdminConversationError(error));
      return false;
    });
};
export const handleUpdateDefaultMessage = (dispatch: Dispatch<AdminConversationAction>, messageData: MessageData, currentAdminConvState: AdminConversationState): Promise<boolean> => {
  const { _id: messageId } = messageData;
  if (!messageId) {
    dispatch(setAdminConversationError(new Error("Couldn't resolve message data")));
    return Promise.resolve(false);
  }
  const axiosReqOpts = {
    method: "PATCH",
    url: `/api/messages/update/${messageId}`,
    data: { messageData }
  };

  dispatch(adminConversationAPIRequest());
  return axios(axiosReqOpts)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, updatedMessage }: { responseMsg: string, updatedMessage: MessageData } = data;
      const updatedDefaultMessages = currentAdminConvState.conversationMessageDefaults.map((message) => {
        if (message._id === updatedMessage._id) {
          return updatedMessage;
        } else {
          return message;
        }
      });
      dispatch(updateDefaultMessage({ status, responseMsg, updatedDefaultMessages }));
      return true;
    })
    .catch((error) => {
      dispatch(setAdminConversationError(error));
      return false;
    });
};
export const handleDeleteDefaultMessage = (dispatch: Dispatch<AdminConversationAction>, messageId: string, currentAdminConvState: AdminConversationState): Promise<boolean> => {
  const axiosReqOpts = {
    method: "DELETE",
    url: `/api/messages/delete/${messageId}`,
  };

  dispatch(adminConversationAPIRequest());
  return axios(axiosReqOpts)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, deletedMessage } = data;
      const updatedDefaultMessages = currentAdminConvState.conversationMessageDefaults.filter((message) => message._id !== deletedMessage._id);
      dispatch(deleteDefaultMessages({ status, responseMsg, updatedDefaultMessages }));
      return true;
    })
    .catch((error) => {
      dispatch(setAdminConversationError(error));
      return false;
    });
};
