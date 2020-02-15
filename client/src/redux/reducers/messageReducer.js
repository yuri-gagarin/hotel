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
  messageError: null
};

const messageReducer = (state = initialState, { type = "", payload = {} }) => {
  const {
    status,
    responseMsg,
    loading,
    user,
    messageContent,
    messageError
  } = payload;
  switch (type) {
    case MESSAGE_REQUEST: {
      return {
        ...state,
        status: status,
        responseMsg: responseMsg,
        loading: loading,
        user: { ...user },
        messageContent:messageContent,
        messageError: messageError
      };
    };
    case MESSAGE_SUCCESS: {
      return {
        ...state,
        status: status,
        responseMsg: responseMsg,
        loading: loading,
        user: { ...user },
        messageContent:messageContent,
        messageError: messageError
      };
    };
    case MESSAGE_ERROR: {
      return {
        ...state,
        status: status,
        responseMsg: responseMsg,
        loading: loading,
        user: { ...user },
        messageContent:messageContent,
        messageError: messageError
      };
    };
    default: {
      return { ...state };
    }
  }
};

export default messageReducer;