import axios from "axios";
import { messageConstants } from "../constants";
// action constants //
const {
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  MESSAGE_REQUEST,
  MESSAGE_SUCCESS,
  MESSAGE_ERROR
} = messageConstants;

export const messageRequest = (user) => {
  return {
    type: MESSAGE_REQUEST,
    payload: {
      status: null,
      responseMsg: null,
      loading: true,
      user: { ...user },
      messageContent: "",
      messageError: null
    }
  };
};

export const messageSuccess = (user, { status, responseMsg, messageContent }) => {
  return {
    type: MESSAGE_SUCCESS,
    payload: {
      status: status,
      responseMsg: responseMsg,
      loading: false,
      user: { ...user },
      messageContent: messageContent,
      messageError: null
    }
  };
};

export const messageError = (user, { status, responseMsg, messageContent }) => {
  return {
    type: MESSAGE_ERROR,
    payload: {
      status: status,
      responseMsg: responseMsg,
      loading: false,
      user: { ...user },
      messageContent: messageContent,
      messageError: null
    }
  };
};

export const sendMessageRequest = (dispatch, user, { conversationId, messageData }) => {
  const requestOptions = {
    method: "post",
    url: "/api/messages",
    data: {
      user: user,
      messageData: messageData,
      conversationId: conversationId
    }
  };
  dispatch(messageRequest(user));
  return axios(requestOptions) 
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, conversationId, newMessage } = data;
      dispatch(messageSuccess(user, { status, responseMsg, conversationId, newMessage}))
    })
    .catch((error) => {
      const { status, response } = error;
      dispatch(messageError(user, { status, response }));
    });
};

