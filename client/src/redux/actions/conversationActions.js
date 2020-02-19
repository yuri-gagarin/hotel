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
      loading: true,
      conversationError: null
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

export const openConversation = ({ conversationId, responseMsg, status, messages }) => {
  return {
    type: OPEN_CONVERASTION,
    payload: {
      status: status,
      responseMsg: responseMsg,
      loading: false,
      userMessaging: true,
      conversationId: conversationId,
      messages: messages
    }
  };
};

export const conversationSuccess = (conversationId, messages) => {
  return {
    type: CONVERSATION_SUCCESS,
    payload: {
      loading: false,
      userMessaging: true,
      conversationId: conversationId,
      messages: messages
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
      messages: [message]
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
      const { responseMsg, conversation } = data;
      const readMessages = conversation.readMessages.map((message) => {
        return message;
      });
      const unreadMessages = conversation.unreadMessages.map((message) => {
        return message;
      });
      const allMessages = [ ...readMessages, ...unreadMessages ];
      const stateData = {
        status: status,
        responseMsg: responseMsg,
        conversationId: conversationId,
        messages: allMessages
      };
      console.log(stateData);
      dispatch(openConversation(stateData)); 
    })
    .catch((error) => {
      console.log("an error occurer");
      console.log(error);
      dispatch(conversationError(error));
    });
};

export const fetchAllConversations = (dispatch) => {
  let status, data;
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

export const closeConversation = ({ conversationId }) => {

};