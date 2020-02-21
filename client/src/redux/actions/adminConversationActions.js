import axios from "axios";
import store from '../../redux/store';

export const setAdminConversations = ({ status, responseMsg }, conversations = []) => {
  console.log("called");
  return {
    type: "SET_ADMIN_CONVERSATIONS",
    payload: {
      status: status,
      responseMsg: responseMsg,
      loading: false,
      conversations: [...conversations],
      error: null
    }
  };
};

export const adminConversationsError = (error) => {
  return {
    type: "ADMIN_CONVERSATIONS_ERROR",
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
    type: "REMOVE_ADMIN_CONVERSATION",
    payload: {
      status: "ok",
      responseMsg: responseMsg,
      loading: false,
      conversations: [...updatedConversations],
      error: null
    }
  };
};


export const handleNewClientMessage = (dispatch, data) => {
  const { conversationId, clientSocketId } = data;
  // do an api call for an update conversation ? //
  const adminConversationState = store.getState().adminConvState;
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
        type: "HANDLE_NEW_MESSAGE",
        payload: {
          status: status,
          responseMsg: responseMsg,
          laoding: false,
          conversations: newConversations,
          error: null
        }
      });
    })
    .catch((error) => {
      console.error(error);
      dispatch(adminConversationsError(error));
    })
};

