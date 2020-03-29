import { messageConstants } from "../constants";
// constants imports //
const {
  MESSAGE_REQUEST,
  MESSAGE_SUCCESS,
  MESSAGE_READ,
  MESSAGE_ERROR
} = messageConstants;
const initialState = {
  status: null,
  responseMsg: "",
  loading: false,
  user: {},
  messageContent: "",
  error: null
};

const messageReducer = (state = initialState, { type = "", payload = {} }) => {
  const {
    status,
    responseMsg,
    loading,
    messageContent,
    error
  } = payload;
  switch (type) {
    case MESSAGE_REQUEST: {
      return {
        ...state,
        status: status,
        responseMsg: responseMsg,
        loading: loading,
        messageContent: messageContent,
        error: error
      };
    };
    case MESSAGE_SUCCESS: {
      return {
        ...state,
        status: status,
        responseMsg: responseMsg,
        loading: loading,
        messageContent: messageContent,
        error: error
      };
    };
    case MESSAGE_ERROR: {
      return {
        ...state,
        status: status,
        responseMsg: responseMsg,
        loading: loading,
        messageContent: messageContent,
        error: error
      };
    };
    default: {
      return { ...state };
    }
  }
};

export default messageReducer;