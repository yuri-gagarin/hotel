// @flow
import axios from "axios";
// types //
import type { Dispatch } from "../../redux/reducers/_helpers/createReducer";
import type { 
  ConversationState, MessageData, ConversationAction, ConversationAPIRequest, OpenConversation, CloseConversation, DeleteConversation, UpdateConversation, 
  SendMessage, SendMessageSuccess, ReceiveMessage, SetConversationError 
} from "../reducers/conversations/flowTypes";
import { socket } from "../../App";
// helpers //
import { setAxiosError } from "./helpers/errorHelpers";

const conversationAPIRequest = (): ConversationAPIRequest => {
  return {
    type: "ConversationAPIRequest",
    payload: { loading: true, error: null }
  };
};

const setConversationError = (err: any): SetConversationError => {
  const { status, responseMsg, error, errorMessages } = setAxiosError(err);
  return {
    type: "SetConversationError",
    payload: { status, responseMsg, error, errorMessages  }
  };
};

export const openConversation = (data: { status: number, conversationId: string, senderSocketId: string, messages: Array<MessageData> }): OpenConversation => {
  const { status, conversationId, senderSocketId, messages } = data;
  return {
    type: "OpenConversation",
    payload: { loading: false, messengerOpen: true, status, conversationId, senderSocketId, messages }
  };
};

export const closeConversation = (): CloseConversation => {
  return {
    type: "CloseConversation",
    payload: { messengerOpen: false }
  };
};

export const updateConversation = (data: { status: number,  conversationId: string, receiverSocketId: string, senderSocketId: string, messages: Array<MessageData> }): UpdateConversation => {
  const { status, conversationId, receiverSocketId, senderSocketId, messages } = data;
  return {
    type: "UpdateConversation",
    payload: { loading: false, status, conversationId, receiverSocketId, senderSocketId, messages }
  };
};

export const sendMessage = (): SendMessage => {
  return {
    type: "SendMessage",
    payload: { loading: true, messageSending: true }
  };
};

export const sendMessageSuccess = (messageData: MessageData): SendMessageSuccess => {
  return {
    type: "SendMessageSuccess",
    payload: { loading: false, messageSending: false, message: messageData }
  };
};

export const receiveMessage = (socketId: string, messageData: MessageData): ReceiveMessage => {
  const { senderSocketId, receiverSocketId, conversationId } = messageData;
  return {
    type: "ReceiveMessage",
    payload: { conversationId: conversationId, message: messageData, senderSocketId: socketId }
  };
};


/*
export const clearConversationState = () => {
  console.log("called clear conversation state")
  return {
    type: CLEAR_CONVERSATION_STATE,
    payload: {
      responseMsg: "",
      loading: false,
      userMessaging: false,
      conversationId: null,
      clientSocketId: null,
      adminSocketId: null,
      messages: [],
      error: null
    }
  }
};
*/

/* exported actions to components */
export const handleFetchConversation = (dispatch: Dispatch<ConversationAction>, conversationId: string): Promise<boolean> => {
  const requestOptions = {
    method : "get",
    url: `/api/conversations/${conversationId}`
  };

  dispatch(conversationAPIRequest());

  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, conversation }: { responseMsg: string, conversation: any } = data;

      const readMessages = conversation.readMessages.map((message) => {
        return message;
      });
      const unreadMessages = conversation.unreadMessages.map((message) => {
        return message;
      });

      const allMessages = [ ...readMessages, ...unreadMessages ];
      const stateData = { status, responseMsg, conversationId, senderSocketId:"", receiverSocketId: "", messages: allMessages };
      dispatch(openConversation(stateData));
      return Promise.resolve(true);
    })
    .catch((error) => {
      dispatch(setConversationError(error));
      return Promise.resolve(false);
    });
};

/* send - receive messages */
export const handleSendMessage = (dispatch: Dispatch<ConversationAction>, messageData: MessageData): Promise<boolean> => {
  if (socket.connected) {
    socket.emit("newMessageSent", messageData);
    dispatch(sendMessage());
    return Promise.resolve(true);
  } else {
    // do a regular api call here to save to DB //
    return Promise.resolve(true);
  }
};
export const handleSendMessageSuccess = (dispatch: Dispatch<ConversationAction>, messageData: MessageData): Promise<boolean> => {
  dispatch(sendMessageSuccess(messageData));
  return Promise.resolve(true);
};
export const handleReceiveMessage = (dispatch: Dispatch<ConversationAction>, socketId: string, messageData: MessageData): Promise<boolean> => {
  dispatch(receiveMessage(socketId, messageData));
  return Promise.resolve(true);
};

/* non API related actions to components */
export const handleConversationOpen = (dispatch: Dispatch<ConversationAction>, currentState: ConversationState): void => {
  const { status, conversationId, senderSocketId, messages } = currentState;
  return dispatch(openConversation({ status, conversationId, senderSocketId, messages }));
};
export const handleConversationClose = (dispatch: Dispatch<ConversationAction>): void => {
  return dispatch(closeConversation());
};
/*
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
*/

/*
export const deleteConversation = (dispatch, conversationId, currentConversationId) => {
  let status, data;
  dispatch(conversationRequest());
  const requestOptions = {
    method: "delete",
    url: "/api/conversations/" + conversationId
  };
  return axios(requestOptions)
    .then((response) => {
      status = response.status;
      const { responseMsg, conversationId } = response.data;
      // remove active conversation from the admin dash //
      dispatch(removeAdminConversation(conversationId, responseMsg));
      if (currentConversationId && (currentConversationId == conversationId)) {
        console.log(217)
        dispatch(clearConversationState());
      }
      return true;
    })
    .catch((error) => {
      console.log(152)
      dispatch(conversationError(error));
      return false;
    });
};
*/