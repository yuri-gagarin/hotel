import axios from "axios";
import { conversationConstants } from "../constants";
const {
  CONVERSATION_REQUEST,
  CONVERSATION_ERROR,
  OPEN_CONVERASTION,
  CLOSE_CONVERSATION
} = conversationConstants;

export const conversationRequest = () => {
  return {
    type: CONVERSATION_REQUEST,
    payload: {
      loading: true
    }
  };
};

export const conversationError = (error) => {
  return {
    type: CONVERSATION_ERROR,
    payload: {
      loading: false,
      error: error
    }
  };
};

export const openConversation = ({ conversationId, }) => {
  return {
    type: OPEN_CONVERASTION,
    payload: {
      loading: false,
    }
  };
};

/**
 * Opens the conversation
 * @param {function} dispatch - Redux {dispatch} function 
 * @param {Object} requestData - Reqest data for Conversation
 * @returns {Promise<Object>} A Promise which resolves into Redux action object
 */
export const fetchConversation = (dispatch, { conversationId }) => {
  let status, data;
  dispatch(conversationRequest());
  const requestOptions = {
    method : "get",
    url: `/api/conversations/${conversationId}`
  }
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;

    })
    .catch((error) => {

    })
};

export const sendMessage = (dispatch, conversationId, { userId, firstName, email }) => {
  dispatch(messageRequest());
  const requestOptions = {};
  return axios(requestOptions)
    .then((response) => {

    })
    .catch((error) => {

    });
}

export const closeConversation = ({ conversationId }) => {

};