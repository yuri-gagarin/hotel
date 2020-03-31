import { conversationConstants } from "../constants";
const {
  OPEN_CONVERASTION,
  CLOSE_CONVERSATION,
  CLEAR_CONVERSATION_STATE,
  DELETE_CONVERSATION,
  UPDATE_CONVERSATION,
  CONVERSATION_SUCCESS
} = conversationConstants;
// initial state //
const initialState = {
  status: null,
  responseMsg: "",
  loading: false,
  userMessaging: false,
  clientSocketId: "",
  adminSocketId: "",
  conversationId: null,
  messages: [],
  conversationError: null
};

const conversationReducer = (state = initialState, { type, payload = {} }) => {
  const {
    status,
    responseMsg,
    loading,
    userMessaging,
    clientSocketId,
    adminSocketId,
    conversationId,
    messages = [],
    error
  } = payload;

  switch (type) {
    case OPEN_CONVERASTION: {
      return {
        ...state,
        status: status,
        responseMsg: responseMsg,
        loading: loading,
        conversationId: conversationId,
        clientSocketId: clientSocketId,
        messages: [...messages],
        error: error
      };
    };
    case  CLOSE_CONVERSATION: {
      return {
        ...state,
        loading: loading,
        conversationId: conversationId,
        messages: [...messages]
      };
    };
    case UPDATE_CONVERSATION: {
      return {
        ...state,
        loading: loading,
        userMessaging: userMessaging,
        conversationId: conversationId,
        clientSocketId: clientSocketId || state.clientSocketId,
        adminSocketId: adminSocketId || state.adminSocketId,
        messages: [...state.messages, ...messages],
        error: error
      };
    };
    case CONVERSATION_SUCCESS: {
      //console.log(payload.conversationId);
      return {
        ...state,
        loading: loading,
        userMessaging: userMessaging,
        conversationId: conversationId,
        messages: [...state.messages, ...messages]
      };
    };
    case CLEAR_CONVERSATION_STATE: {
      return {
        status: status,
        responseMsg: responseMsg,
        loading: false,
        userMessaging: userMessaging,
        clientSocketId: clientSocketId,
        adminSocketId: adminSocketId,
        conversationId: conversationId,
        messages: [...messages],
        error: error
      }
    }
    case DELETE_CONVERSATION: {
      return {
        ...state,
        loading: loading,
        conversationId: conversationId,
      };
    };
    default: {
      return state;
    }
  }
};

export default conversationReducer;