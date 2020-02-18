import axios from "axios";
import { conversationConstants } from "../constants";
const {
  CONVERSATION_REQUEST,
  CONVERSATION_ERROR,
  CONVERSATION_SUCCESS,
  OPEN_CONVERASTION,
  CLOSE_CONVERSATION,
  UPDATE_CONVERSATION
} = conversationConstants;
import { setAdminConversations } from "./adminConversationActions";
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

export const conversationSuccess = (conversationId, message) => {
  return {
    type: CONVERSATION_SUCCESS,
    payload: {
      loading: false,
      userMessaging: true,
      conversationId: conversationId,
      message: message
    }
  };
};

export const updateConversation = (conversationId, clientSocketId, adminSocketId, message) => {
  return {
    type: UPDATE_CONVERSATION,
    payload: {
      loading: false,
      userMessaging: true,
      conversationId: conversationId,
      clientSocketId: clientSocketId,
      adminSocketId: adminSocketId,
      message: message
    }
  }
}

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

export const fetchAllConversations = (dispatch) => {
  let status, data;
  console.log("calling");
  dispatch(conversationRequest());
  const requestOptions = {
    method: "get",
    url: "/api/conversations"
  };
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, conversations } = data;
      dispatch(conversationSuccess(null, []))
      dispatch(setAdminConversations({ status, responseMsg }, conversations));
    })
    .catch((error) => {
      console.error(error);
      dispatch(conversationError(error));
    });
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