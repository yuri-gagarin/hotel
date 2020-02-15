import axios from "axios";
import { conversationSuccess } from "./conversationActions";
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
  console.log("dispatching request");
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
  console.log("dispatching success");
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
  console.log("dispatching error");
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

export const sendMessageRequest = (dispatch, { user,  conversationId, messageData }) => {
  const requestOptions = {
    method: "post",
    url: "/api/sendMessage",
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
      console.log(error.response);
      const { status, response } = error;
      dispatch(messageError(user, { status, response }));
    });
};

