// @flow 
import type { ConversationState, ConversationAction } from "./flowTypes";

const initialState: ConversationState = {
  status: 200,
  responseMsg: "",
  loading: false,
  messageSending: false,
  messengerOpen: false,
  receiverSocketId: "",
  senderSocketId: "",
  conversationId: "",
  messages: [],
  error: null,
  errorMessages: null
};

const conversationReducer = (state: ConversationState = initialState, action: ConversationAction): ConversationState => {

  switch (action.type) {
    case "OpenConversation": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        messengerOpen: action.payload.messengerOpen,
        conversationId: action.payload.conversationId,
        senderSocketId: action.payload.senderSocketId,
        messages: [ ...action.payload.messages ],
        error: null
      };
    }
    case "CloseConversation": {
      return {
        ...state,
        messengerOpen: action.payload.messengerOpen,
        error: null
      };
    }
    case "UpdateConversation": {
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
    case "DeleteConversation": {
      return {
        ...state,
        conversationId: action.payload.conversationId,
        receiverSocketId: action.payload.receiverSocketId,
        senderSocketId: action.payload.senderSocketId,
        messages: [ ...action.payload.messages ], 
        error: null
      };
    }
    case "SendMessage": {
      return {
        ...state,
        loading: action.payload.loading,
        messageSending: action.payload.messageSending,
        messages: [ ...state.messages, action.payload.newMessage ],
        error: null
      };
    }
    case "SendMessageSuccess": {
      return {
        ...state,
        loading: action.payload.loading,
        messageSending: action.payload.messageSending,
        messages: [ ...state.messages, action.payload.message ],
        error: null
      }
    }
    case "ReceiveMessage": {
      return {
        ...state,
        conversationId: action.payload.conversationId,
        senderSocketId: action.payload.senderSocketId,
        messages: [ ...state.messages, action.payload.message ], 
        error: null
      };
    }

    default: {
      return state;
    }
  }
};

export default conversationReducer;