import axios from "axios";
import { conversationSuccess } from "./conversationActions";
import { messageConstants } from "../constants";
import { socket } from "../../App";
import { setAppError } from "./appGeneralActions";
import { setAxiosError } from "./helpers/errorHelpers";
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
      error: null
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
      error: null
    }
  };
};

export const messageError = ({ status, responseMsg, errorMessages, error }) => {
  return {
    type: MESSAGE_ERROR,
    payload: {
      status: status,
      responseMsg: responseMsg,
      loading: false,
      messageContent: null,
      error: error
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
/**
 * Sends a message from the client 
 * @param {function} dispatch - Redux  dispatch function
 * @param {string} conversationId - Optional ObjectId of an existing conversation\
 * @param {string} messageContent - New message content
 * @param {Object} user - A user object
 * @returns {Promise<boolean>} - A Promise which resolve to true or false
 */
export const sendClientMessage = (dispatch, conversationId, messageContent, user) => {
  const requestOptions = {
    method: "post",
    url: "/api/sendClientMessage",
    data: {
      conversationId: conversationId || "",
      messageContent: messageContent,
      user: user
    }
  };
  dispatch(messageRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, conversationId, newMessage } = data;
      //socket.emit("clientMessageSent", { conversationId: conversationId, newMessage: newMessage });
      dispatch(conversationSuccess(conversationId, [newMessage]));
      dispatch(messageSuccess({ status, responseMsg, newMessage }));
      return true;
    })
    .catch((error) => {
      const errorInfo = setAxiosError(error)
      dispatch(messageError(errorInfo));
      //dispatch(setAppError(errorInfo));
      return false;
    })
}

export const sendAdminMessage = (dispatch, { user, conversationId, clientSocketId,  messageData }) => {
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

