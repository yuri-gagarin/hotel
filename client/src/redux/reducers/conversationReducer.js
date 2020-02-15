import { conversationConstants } from "../constants";
const {
  OPEN_CONVERASTION,
  CLOSE_CONVERSATION,
  DELETE_CONVERSATION,
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  MARK_READ,
} = conversationConstants;
// initial state //
const initialState = {
  loading: false,
  userMessaging: false,
  user: {},
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
    }
    case  CLOSE_CONVERSATION: {
      return {
        ...state,
        loading: payload.loading,
        conversationId: payload.conversationId,
        messages: [...payload.messages]
      };
    }
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