import axios from "axios";
import store from '../store';
import { conversationConstants } from "../constants";
import { updateConversation } from "./conversationActions";
import { setAxiosError } from "./helpers/errorHelpers";
const { 
  SET_ADMIN_CONVERSATIONS, UPDATE_ADMIN_CONVERSATIONS, ADMIN_CONVERSATIONS_ERROR, 
  REMOVE_ADMIN_CONVERSATION, HANDLE_NEW_MESSAGE
} = conversationConstants;

export const setAdminConversations = ({ status, responseMsg }, conversations = []) => {
  return {
    type: SET_ADMIN_CONVERSATIONS,
    payload: {
      status: status,
      responseMsg: responseMsg,
      currentConversationId: "",
      loading: false,
      conversations: [...conversations],
      numberOfConversations: conversations.length,
      error: null
    }
  };
};

export const adminConversationsError = (error) => {
  return {
    type: ADMIN_CONVERSATIONS_ERROR,
    payload: {
      responseMsg: "an error occurred",
      loading: false,
      error: error
    }
  };
};

export const updateAdminConversations = (updatedConversations = []) => {
  return {
    type: UPDATE_ADMIN_CONVERSATIONS,
    payload: {
      status: "ok",
      responseMsg: "ok",
      loading: false,
      conversations: [...updatedConversations],
      error: null
    }
  };
};

export const removeAdminConversation = (conversationId, responseMsg) => {
  const adminConversationState = store.getState().adminConvState;
  const updatedConversations = adminConversationState.conversations.filter((conversation) => {
    return conversation._id != conversationId;
  });
  return {
    type: REMOVE_ADMIN_CONVERSATION,
    payload: {
      status: "ok",
      responseMsg: responseMsg,
      loading: false,
      conversations: [...updatedConversations],
      error: null
    }
  };
};

export const adminConversationError = ({ status, responseMsg, errorMessages, error }) => {
  return {
    type: ADMIN_CONVERSATIONS_ERROR,
    payload: {
      status: status,
      responseMsg: responseMsg,
      loading: false,
      errorMessages: errorMessages,
      error: error
    }
  };
};

/**
 * Handles a new client message in admin screen and updates conversations
 * @param {function} dispatch - Redux dispatch function
 * @param {Object} data - A message data object 
 * @param {Object} adminConvState - Admin conversation state
 * @returns {Promise<Boolean>} A promise which resolves to true if successful
 */
export const newClientMessage = (dispatch, data, adminConvState = {}) => {
  const { conversationId, clientSocketId, newMessage } = data;
  const { currentConversationId, conversations } = adminConvState;
  let updatedConversations;
  console.log(91)

  // check if new message coming in is current active conversation //
  if (currentConversationId == conversationId) {
    updatedConversations = conversations.map((conversation) => {
      if (conversation._id == conversationId) {
        return {
          ...conversation,
          clientSocketId: clientSocketId,
          lastMessage: {
            ...newMessage
          }
        };
      } else {
        return conversation;
      }
    });
    dispatch(updateAdminConversations(updatedConversations));
    dispatch(updateConversation({ conversationId: conversationId, clientSocketId: conversationId, message: newMessage }));
    return Promise.resolve(true);
  }
  // first check if conversation already exists //
  const conversation = conversations.filter((conv) => conv._id == conversationId);
  if (conversation && conversation.length === 1) {
    // conversation already exists update with a new message //
    updatedConversations = conversations.map((conversation) => {
      if (conversation._id == conversationId) {
        return {
          ...conversation,
          clientSocketId: clientSocketId,
          lastMessage: {
            ...newMessage
          }
        }
      } else {
        return conversation;
      }
    });
    console.log(129)
    console.log(updatedConversations);
    dispatch(updateAdminConversations(updatedConversations));
    return Promise.resolve(true);
  } else {
    // fetch a new conversation and set it //
    const requestOptions = {
      method: "get",
      url: "/api/conversations/" + conversationId,
    }
    return axios(requestOptions)
      .then((response) => {
        const { status, data } = response;
        const { responseMsg, conversation } = data;
        updatedConversations = [ ...conversations,  { ...conversation, clientSocketId: clientSocketId, lastMessage: newMessage }];
        dispatch(updateAdminConversations(updatedConversations));
        return true;
      })
      .catch((err) => {
        const error = setAxiosError(err);
        console.error(err);
        dispatch(adminConversationError(error));
        return false;
      });
  }
  
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


