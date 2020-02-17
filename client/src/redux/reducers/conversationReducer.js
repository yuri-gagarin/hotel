import { conversationConstants } from "../constants";
const {
  OPEN_CONVERASTION,
  CLOSE_CONVERSATION,
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
    messages,
    conversationError
  } = payload;

  switch (type) {
    case OPEN_CONVERASTION: {
      return {
        ...state,
        status: status,
        responseMsg: responseMsg,
        loading: loading,
        conversationId: conversationId,
        messages: [...state.messages, ...messages],
        conversationError: conversationError
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
        conversationError: conversationError
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
    case DELETE_CONVERSATION: {
      return {
        ...state,
        loading: loading,
        conversationId: onversationId,
      };
    };
    default: {
      return { ...state };
    }
  }
};

export default conversationReducer;