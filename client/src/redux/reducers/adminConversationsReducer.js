import { conversationConstants } from "../constants";
const {
  SET_ADMIN_CONVERSATIONS, HANDLE_NEW_MESSAGE,
  REMOVE_ADMIN_CONVERSATION, ADMIN_CONVERSATIONS_ERROR
} = conversationConstants

const initialState = {
  status: "",
  responseMsg: "",
  currentConversationId: "",
  loading: false,
  conversations: [],
  numberOfConversations: 0,
  error: null
};

const adminConverstionsReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case SET_ADMIN_CONVERSATIONS: {
      return {
        status: payload.status,
        responseMsg: payload.responseMsg,
        currentConversationId: payload.currentConversationId,
        loading: payload.loading,
        conversations: [...payload.conversations],
        numberOfConversations: payload.conversations.length,
        error: payload.error
      };
    }; 
    case HANDLE_NEW_MESSAGE: {
      return {
        ...state,
        status: payload.status,
        responseMsg: payload.responseMsg,
        loading: payload.loading,
        conversations: [...payload.conversations],
        error: payload.error
      };
    };
    case REMOVE_ADMIN_CONVERSATION: {
      return {
        status: payload.status,
        responseMsg: payload.responseMsg,
        currentConversationId: payload.conversations,
        loading: payload.loading,
        conversations: [...payload.conversations],
        numberOfConversations: payload.conversations.length,
        error: payload.error
      };
    };
    case ADMIN_CONVERSATIONS_ERROR: {
      return {
        ...state,
        status: payload.status,
        responseMsg: payload.responseMsg,
        loading: payload.loading,
        error: payload.error
      };
    };
    default: {
      return state;
    };
  };
};

export default adminConverstionsReducer;

