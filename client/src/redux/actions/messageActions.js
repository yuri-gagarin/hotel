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

export const messageRequest = () => {
  console.log("dispatching request");
  return {
    type: MESSAGE_REQUEST,
    payload: {
      status: null,
      responseMsg: null,
      loading: true,
      messageContent: "",
      messageError: null
    }
  };
};

export const messageSuccess = ({ status, responseMsg, messageContent }) => {
  console.log("dispatching success");
  return {
    type: MESSAGE_SUCCESS,
    payload: {
      status: status,
      responseMsg: responseMsg,
      loading: false,
      messageContent: messageContent,
      messageError: null
    }
  };
};

export const messageError = ({ status, responseMsg, messageContent }) => {
  console.log("dispatching error");
  return {
    type: MESSAGE_ERROR,
    payload: {
      status: status,
      responseMsg: responseMsg,
      loading: false,
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
  dispatch(messageRequest());
  return axios(requestOptions) 
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, conversationId, newMessage } = data;
      dispatch(conversationSuccess(conversationId, newMessage));
      dispatch(messageSuccess({ status, responseMsg, newMessage}))
    })
    .catch((error) => {
      console.log(error.response);
      const { status, response } = error;
      dispatch(messageError({ status, response }));
    });
};

