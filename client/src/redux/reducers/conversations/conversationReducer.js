// @flow 
import type { ConversationState, ConversationAction } from "./flowTypes";

const initialState: ConversationState = {
  status: 200,
  responseMsg: "",
  loading: false,
  messageSending: false,
  messengerOpen: false,
  conversationActive: true,
  adminMessengerOnline: false,
  receiverSocketId: "",
  senderSocketId: "",
  conversationId: "",
  messages: [],
  newMessages: [],
  error: null,
  errorMessages: null
};

const conversationReducer = (state: ConversationState = initialState, action: ConversationAction): ConversationState => {

  switch (action.type) {
    case "OpenClientConversation": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        messengerOpen: action.payload.messengerOpen,
        conversationId: action.payload.conversationId,
        senderSocketId: action.payload.senderSocketId,
        newMessages: action.payload.newMessages,
        messages: action.payload.messages,
        error: null
      };
    }
    case "CloseClientConversation": {
      return {
        ...state,
        messengerOpen: action.payload.messengerOpen,
        error: null
      };
    }
    case "UpdateClientConversation": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        conversationId: action.payload.conversationId,
        senderSocketId: action.payload.senderSocketId,
        messages: [ ...action.payload.messages ], 
        error: null
      };
    }
    case "DeleteClientConversation": {
      return {
        ...state,
        conversationId: action.payload.conversationId,
        receiverSocketId: action.payload.receiverSocketId,
        senderSocketId: action.payload.senderSocketId,
        messages: [ ...action.payload.messages ], 
        error: null
      };
    }
    case "SendClientMessage": {
      return {
        ...state,
        loading: action.payload.loading,
        messageSending: action.payload.messageSending,
        messages: [ ...state.messages, action.payload.newMessage ],
        error: null
      };
    }
    case "SendClientMessageSuccess": {
      return {
        ...state,
        loading: action.payload.loading,
        conversationId: action.payload.message.conversationId ? action.payload.message.conversationId : state.conversationId,
        messageSending: action.payload.messageSending,
        error: null
      }
    }
    case "ReceiveAdminMessage": {
      return {
        ...state,
        conversationId: action.payload.conversationId,
        newMessages: action.payload.newMessages,
        messages: action.payload.messages,
        error: null
      };
    }
    case "ClientConversationArchived": {
      return {
        ...state,
        conversationActive: action.payload.conversationActive,
        messages: [ ...state.messages, action.payload.newMessage ],
        error: null
      };
    }
    case "ContinueClientConversationRequest": {
      return {
        ...state,
        loading: action.payload.loading,
        error: null
      };
    }
    case "ContinueClientConversationSuccess": {
      return {
        ...state,
        loading: action.payload.loading,
        conversationActive: action.payload.conversationActive,
        messages: action.payload.updatedMessages,
        error: null
      };
    }
    case "AdminMessengerOnlineOfflineResponse": {
      return {
        ...state,
        loading: action.payload.loading,
        adminMessengerOnline: action.payload.adminMessengerOnline,
        newMessages: action.payload.newMessages,
        messages: action.payload.messages,
        error: null
      };
    }
    
    case "SetClientConversationError": {
      return {
        ...state,
        responseMsg: action.payload.responseMsg,
        loading: action.payload.loading,
        messageSending: action.payload.messageSending,
        error: action.payload.error,
        errorMessages: action.payload.errorMessages
      };
    }
    default: {
      return state;
    }
  }
};

export default conversationReducer;