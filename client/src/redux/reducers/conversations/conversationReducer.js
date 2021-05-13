// @flow 
import type { ConversationState, ConversationAction } from "./flowTypes";

const initialState: ConversationState = {
  status: 200,
  responseMsg: "",
  loading: false,
  userMessaging: false,
  receiverSocketId: "",
  senderSocketId: "",
  conversationId: "",
  messages: [],
  conversationError: null
};

const conversationReducer = (state: ConversationState = initialState, action: ConversationAction): ConversationState => {

  switch (action.type) {
    case "OpenConversation": {
      return {
        ...state,
        conversationId: action.payload.conversationId,
        receiverSocketId: action.payload.receiverSocketId,
        senderSocketId: action.payload.senderSocketId,
        messages: [ ...action.payload.messages ],
        error: null
      };
    }
    case "CloseConversation": {
      return {
        ...state,
        conversationId: action.payload.conversationId,
        receiverSocketId: action.payload.receiverSocketId,
        senderSocketId: action.payload.senderSocketId,
        messages: [...action.payload.messages ],
        error: null
      };
    }
    case "UpdateConversation": {
      return {
        ...state,
        conversationId: action.payload.conversationId,
        receiverSocketId: action.payload.receiverSocketId,
        senderSocketId: action.payload.senderSocketId,
        messages: [...action.payload.messages ], 
        error: null
      };
    }
    case "DeleteConversation": {
      return {
        ...state,
        conversationId: action.payload.conversationId,
        receiverSocketId: action.payload.receiverSocketId,
        senderSocketId: action.payload.senderSocketId,
        messages: [...action.payload.messages ], 
        error: null
      };
    }
    case "SendMessage": {
      return {
        ...state,
        conversationId: action.payload.conversationId,
        receiverSocketId: action.payload.receiverSocketId,
        senderSocketId: action.payload.senderSocketId,
        messages: [ ...state.messages, action.payload.message ], 
        error: null
      };
    }
    case "ReceiveMessage": {
      return {
        ...state,
        conversationId: action.payload.conversationId,
        receiverSocketId: action.payload.receiverSocketId,
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