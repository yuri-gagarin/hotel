// @flow 
import { generateEmptyAdminConversationModel } from "../_helpers/emptyDataGenerators";
import type { AdminConversationState, AdminConversationAction } from "./flowTypes";
const initialState: AdminConversationState = {
  status: 200,
  responseMsg: "",
  loading: false,
  messengerOnline: false,
  viewingArchived: false,
  activeConversation: generateEmptyAdminConversationModel(),
  loadedAdminConversations: [],
  numberOfConversations: 0,
  connectedOnlineClients: [],
  conversationMessageDefaults: [],
  error: null,
  errorMessages: []
};

const adminConverstionsReducer = (state: AdminConversationState = initialState, action: AdminConversationAction): AdminConversationState => {
  switch (action.type) {
    case "OpenAdminConversation": {
      return {
        ...state,
        activeConversation: action.payload.activeConversation,
        loadedAdminConversations: action.payload.updatedAdminConversationsArr,
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
    case "UpdateAdminConversationName": {
      return {
        ...state,
        activeConversation: action.payload.updatedActiveConversation,
        loadedAdminConversations: action.payload.updatedLoadedConversations,
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
    case "SetOnlineClients": {
      return {
        ...state,
        connectedOnlineClients: [ ...action.payload.onlineClientsArr ]
      };
    }
    case "SetAdminConversations": {
      return {
        ...state,
        status: action.payload.status,
        responseMsg: action.payload.responseMsg,
        loading: action.payload.loading,
        viewingArchived: action.payload.viewingArchived,
        activeConversation: action.payload.updatedActiveConversation,
        loadedAdminConversations: action.payload.updatedLoadedAdminConversations,
        error: null
      };
    }
    case "CreateNewAdminConversation": {
      return {
        ...state,
        status: action.payload.status,
        responseMsg: action.payload.responseMsg,
        loading: action.payload.loading,
        activeConversation: { ...action.payload.newAdminConversation },
        loadedAdminConversations: [ action.payload.newAdminConversation, ...state.loadedAdminConversations ],
        numberOfConversations: (state.loadedAdminConversations.length + 1),
        error: null
      };
    }
    case "ArchiveAdminConversation": {
      return {
        ...state,
        activeConversation: action.payload.updatedActiveConversation,
        loadedAdminConversations: action.payload.updatedLoadedAdminConversations,
        error: null
      };
    }
    case "ContinueAdminConversation": {
      return {
        ...state,
        loadedAdminConversations: action.payload.updatedLoadedAdminConversations,
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
    case "FetchDefaultMessages": {
      return {
        ...state,
        status: action.payload.status,
        responseMsg: action.payload.responseMsg,
        loading: action.payload.loading,
        conversationMessageDefaults: action.payload.defaultMessages,
        error: null
      };
    }
    case "CreateDefaultMessage": {
      return {
        ...state,
        status: action.payload.status,
        responseMsg: action.payload.responseMsg,
        loading: action.payload.loading,
        conversationMessageDefaults: [ ...state.conversationMessageDefaults, action.payload.createdMessage ],
        error: null
      };
    }
    case "UpdateDefaultMessage": {
      return {
        ...state,
        status: action.payload.status,
        responseMsg: action.payload.responseMsg,
        loading: action.payload.loading,
        conversationMessageDefaults: action.payload.updatedDefaultMessages,
        error: null
      };
    }
    case "DeleteDefaultMessage": {
      return {
        ...state,
        status: action.payload.status,
        responseMsg: action.payload.responseMsg,
        loading: action.payload.loading,
        conversationMessageDefaults: action.payload.updatedDefaultMessages,
        error: null
      };
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

