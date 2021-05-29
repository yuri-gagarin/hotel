// @flow 
import { generateEmptyAdminConversationModel } from "../_helpers/emptyDataGenerators";
import type { AdminConversationState, AdminConversationAction } from "./flowTypes";
const initialState: AdminConversationState = {
  status: 200,
  responseMsg: "",
  loading: false,
  messengerOnline: false,
  activeConversation: generateEmptyAdminConversationModel(),
  loadedAdminConversations: [],
  numberOfConversations: 0,
  connectedOnlineClients: [],
  error: null,
  errorMessages: []
};

const adminConverstionsReducer = (state: AdminConversationState = initialState, action: AdminConversationAction): AdminConversationState => {
  switch (action.type) {
    case "OpenAdminConversation": {
      return {
        ...state,
        activeConversation: action.payload.activeConversation,
        error: null
      };
    }
    case "CloseAdminConversation": {
      return {
        ...state,
        activeConversation: action.payload.activeConversation,
        error: null
      };
    }
    case "ToggleAdminMessengerOnlineStatus": {
      return {
        ...state,
        loading: action.payload.loading,
        messengerOnline: action.payload.messengerOnline,
      };
    }
    case "NewClientConnection": {
      return {
        ...state,
        connectedOnlineClients: [ ...state.connectedOnlineClients, action.payload.newConnectedClientData ]
      };
    }
    case "ClientDisconnection": {
      return {
        ...state,
        connectedOnlineClients: [ ...action.payload.updatedConnectedClients ]
      };
    }
    case "SetAdminConversations": {
      return {
        ...state,
        status: action.payload.status,
        responseMsg: action.payload.responseMsg,
        loading: action.payload.loading,
        loadedAdminConversations: action.payload.adminConversations,
        error: null
      };
    }
    case "CreateNewAdminConversation": {
      return {
        ...state,
        status: action.payload.status,
        responseMsg: action.payload.responseMsg,
        loading: action.payload.loading,
        loadedAdminConversations: [ action.payload.newAdminConversation, ...state.loadedAdminConversations ],
        numberOfConversations: (state.loadedAdminConversations.length + 1),
        error: null
      };
    }
    case "DeleteAdminConversation": {
      return {
        ...state,
        status: action.payload.status,
        responseMsg: action.payload.responseMsg,
        loading: action.payload.loading,
        activeConversation: action.payload.updatedActiveConversation,
        loadedAdminConversations: action.payload.updatedAdminConversations,
        numberOfConversations: action.payload.numberOfConversations,
        error: null
      }
    }
    case "NewClientMessage": {
      return {
        ...state,
        status: action.payload.status,
        responseMsg: action.payload.responseMsg,
        loading: action.payload.loading,
        activeConversation: action.payload.activeConversation,
        loadedAdminConversations: action.payload.updatedAdminConversations,
        error: null
      };
    }
    case "SendAdminMessage": {
      return {
        ...state,
        status: action.payload.status,
        responseMsg: action.payload.responseMsg,
        loading: action.payload.loading,
        activeConversation: action.payload.activeConversation,
        loadedAdminConversations: action.payload.updatedAdminConversations,
        error: null
      };
    }
    case "SetAdminConversationError": {
      return {
        ...state,
        status: action.payload.status,
        responseMsg: action.payload.responseMsg,
        loading: action.payload.loading,
        error: action.payload.error,
        errorMessages: action.payload.errorMessages
      };
    }
    case "ClearAdminConversationError": {
      return {
        ...state,
        responseMsg: action.payload.responseMsg,
        error: action.payload.error,
        errorMessages: action.payload.errorMessages
      };
    }
    default: {
      return state;
    }
  }
};

export default adminConverstionsReducer;

