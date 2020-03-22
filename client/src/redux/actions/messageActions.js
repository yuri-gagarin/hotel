import axios from "axios";
import { conversationSuccess } from "./conversationActions";
import { messageConstants } from "../constants";
import { socket } from "../../App";
// action constants //
const {
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  MESSAGE_REQUEST,
  MESSAGE_SUCCESS,
  MESSAGE_ERROR
} = messageConstants;

export const messageRequest = () => {
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

export const messageSuccess = ({ status, responseMsg, newMessage }) => {
  return {
    type: MESSAGE_SUCCESS,
    payload: {
      status: status,
      responseMsg: responseMsg,
      loading: false,
      messageContent: newMessage,
      messageError: null
    }
  };
};

export const messageError = ({ status, responseMsg, messageContent }) => {
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

export const reveiveMessage = (socketId, messageData) => {
  dispatch(conversationSuccess())
  return {
    type: RECEIVE_MESSAGE,
    payload: {
      loading: false,

    }
  };
};

export const sendClientMessage = (dispatch, { user, conversationId, clientSocketId, messageData }) => {
  const requestOptions = {
    method: "post",
    url: "/api/sendClientMessage",
    data: {
      user: user,
      conversationId: conversationId,
      messageData: messageData
    }
  };
  dispatch(messageRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, conversationId, newMessage } = data;

      socket.emit("clientMessageSent", { conversationId: conversationId, newMessage: newMessage });
      dispatch(conversationSuccess(conversationId, [newMessage]));
      dispatch(messageSuccess({ status, responseMsg, newMessage }));
      return true;
    })
    .catch((error) => {
      dispatch(messageError(error));
      return false;
    })
}

export const sendMessageRequest = (dispatch, { user,  conversationId, clientSocketId,  messageData }) => {
  const requestOptions = {
    method: "post",
    url: "/api/sendAdminMessage",
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
      const messageData = {
        clientSocketId: clientSocketId,
        newMessage: newMessage
      };
      socket.emit("adminResponseSent",  messageData);
      dispatch(conversationSuccess(conversationId, [newMessage]));
      dispatch(messageSuccess({ status, responseMsg, newMessage}));
      return true;
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response);
      const { status, response } = error;
      dispatch(messageError({ status, response }));
      return false;
    });
};

