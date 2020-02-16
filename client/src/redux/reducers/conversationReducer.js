import { conversationConstants } from "../constants";
const {
  OPEN_CONVERASTION,
  CLOSE_CONVERSATION,
  DELETE_CONVERSATION,
  CONVERSATION_SUCCESS
} = conversationConstants;
// initial state //
const initialState = {
  status: null,
  responseMsg: "",
  loading: false,
  userMessaging: false,
  conversationId: null,
  messages: []
};

const conversationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case OPEN_CONVERASTION: {
      return {
        ...state,
        loading: payload.loading,
        conversationId: payload.conversationId,
        messages: [...payload.messages]
      };
    };
    case  CLOSE_CONVERSATION: {
      return {
        ...state,
        loading: payload.loading,
        conversationId: payload.conversationId,
        messages: [...payload.messages]
      };
    };
    case CONVERSATION_SUCCESS: {
      //console.log(payload.conversationId);
      return {
        ...state,
        loading: payload.loading,
        userMessaging: payload.userMessaging,
        conversationId: payload.conversationId,
        messages: [...state.messages, payload.message]
      };
    };
    case DELETE_CONVERSATION: {
      return {
        ...state,
        loading: payload.loading,
        conversationId: payload.conversationId,
      }
    }
    default: {
      return { ...state };
    }
  }
};

export default conversationReducer;