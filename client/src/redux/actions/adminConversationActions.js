import axios from "axios";
import store from '../store';
import { conversationConstants } from "../constants";
const { 
  SET_ADMIN_CONVERSATIONS, ADMIN_CONVERSATIONS_ERROR, 
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
  }
}

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


export const newClientMessage = (dispatch, data) => {
  const { conversationId, clientSocketId, newMessage } = data;
  // do an api call for an update conversation ? //
  const adminConversationState = store.getState().adminConvState;
  const conversationState = store.getState().conversationState;

  const oldConversations = adminConversationState.conversations;

  const requestOptions = {
    method: "get",
    url: `/api/conversations/${conversationId}`,
  };
  return axios(requestOptions) 
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, conversation } = data;
  
      // first check for a brand new conversation //
      const newConvo = oldConversations.filter((oldConvo) => conversation._id == oldConvo._id);
      let newConversations;
      if (newConvo.length === 0) {
        newConversations =  [...oldConversations,  { ...conversation, clientSocketId: clientSocketId} ]
      } else {
        newConversations = oldConversations.map((oldConvo) => {
          if (conversation._id == oldConvo._id) {
            return {
              ...conversation,
              lastMessage: {
                ...conversation.lastMessage
              },
              clientSocketId: clientSocketId
            };
          } else {
            return oldConvo;
          };
        });
      }
     
      dispatch({
        type: HANDLE_NEW_MESSAGE,
        payload: {
          status: status,
          responseMsg: responseMsg,
          laoding: false,
          conversations: newConversations,
          error: null
        }
      });
      if (conversationState.conversationId == conversationId) {
        // update the window open //
        dispatch({
          type: UPDATE_CONVERSATION,
          payload: {
            status: status,
            responseMsg: responseMsg,
            conversationId: conversationId,
            loading: false,
            messages: [newMessage]
          }
        })
      }
    })
    .catch((error) => {
      console.error(error);
      dispatch(adminConversationsError(error));
    })
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


