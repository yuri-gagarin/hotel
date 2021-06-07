// @flow
import axios from "axios";
import store from "../../redux/store";
// types //
import type { Dispatch } from "../../redux/reducers/_helpers/createReducer";
import type { 
  ConversationState, MessageData, ConversationAction, ClientConversationAPIRequest, OpenClientConversation, CloseClientConversation, DeleteClientConversation, UpdateClientConversation, 
  ClientConversationArchived, ContinueClientConversationRequest, ContinueClientConversationSuccess, SendClientMessage, SendClientMessageSuccess, ReceiveAdminMessage, AdminMessengerOfflineResponse, SetClientConversationError 
} from "../reducers/conversations/flowTypes";
import { socket } from "../../App";
// helpers //
import { setAxiosError } from "./helpers/errorHelpers";

const clientConversationAPIRequest = (): ClientConversationAPIRequest => {
  return {
    type: "ClientConversationAPIRequest",
    payload: { loading: true, error: null }
  };
};

const setClientConversationError = (err: any): SetClientConversationError => {
  const { status, responseMsg, error, errorMessages } = setAxiosError(err);
  return {
    type: "SetClientConversationError",
    payload: { loading: false, messageSending: false, status, responseMsg, error, errorMessages }
  };
};

const openClientConversation = (data: { status: number, conversationId: string, senderSocketId: string, newMessages: Array<MessageData>; messages: Array<MessageData> }): OpenClientConversation => {
  const { status, conversationId, senderSocketId, newMessages, messages } = data;
  return {
    type: "OpenClientConversation",
    payload: { loading: false, messengerOpen: true, status, conversationId, senderSocketId, newMessages, messages }
  };
};

const closeClientConversation = (): CloseClientConversation => {
  return {
    type: "CloseClientConversation",
    payload: { messengerOpen: false }
  };
};
const clientConversationArchived = (data: { conversationActive: boolean, newMessage: MessageData }): ClientConversationArchived => {
  const { conversationActive, newMessage } = data;
  return { 
    type: "ClientConversationArchived",
    payload: { conversationActive, newMessage }
  };
};
const continueClientConversationRequest = (data: { loading: boolean }): ContinueClientConversationRequest => {
  const { loading } = data;
  return {
    type: "ContinueClientConversationRequest",
    payload: { loading }
  };
};
const continueClientConversationSuccess = (data: { conversationActive: boolean, updatedMessages: Array<MessageData> }): ContinueClientConversationSuccess => {
  const { conversationActive, updatedMessages } = data;
  return {
    type: "ContinueClientConversationSuccess",
    payload: { loading: false, conversationActive, updatedMessages }
  };
};
const updateClientConversation = (data: { status: number,  conversationId: string, receiverSocketId: string, senderSocketId: string, messages: Array<MessageData> }): UpdateClientConversation => {
  const { status, conversationId, receiverSocketId, senderSocketId, messages } = data;
  return {
    type: "UpdateClientConversation",
    payload: { loading: false, status, conversationId, receiverSocketId, senderSocketId, messages }
  };
};

const sendClientMessage = (newMessage: MessageData): SendClientMessage => {
  return {
    type: "SendClientMessage",
    payload: { loading: true, messageSending: true, newMessage: newMessage }
  };
};

const sendClientMessageSuccess = (messageData: MessageData): SendClientMessageSuccess => {
  return {
    type: "SendClientMessageSuccess",
    payload: { loading: false, messageSending: false, message: messageData }
  };
};

const receiveAdminMessage = ({ conversationId, newMessages, messages }: { conversationId: string, newMessages: Array<MessageData>, messages: Array<MessageData> }): ReceiveAdminMessage => {
  return {
    type: "ReceiveAdminMessage",
    payload: { conversationId, newMessages, messages }
  };
};

const adminMessengerOfflineResponse = (data: { newMessage: MessageData }): AdminMessengerOfflineResponse => {
  const { newMessage } = data;
  return {
    type: "AdminMessengerOfflineResponse",
    payload: { loading: false, newMessage }
  };
};

/* exported actions to components */
export const handleFetchConversation = (dispatch: Dispatch<ConversationAction>, conversationId: string): Promise<boolean> => {
  const requestOptions = {
    method : "get",
    url: `/api/conversations/${conversationId}`
  };

  dispatch(clientConversationAPIRequest());

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
      const stateData = { status, responseMsg, conversationId, senderSocketId:"", receiverSocketId: "", newMessages: [], messages: allMessages };
      dispatch(openClientConversation(stateData));
      return Promise.resolve(true);
    })
    .catch((error) => {
      dispatch(setClientConversationError(error));
      return Promise.resolve(false);
    });
};

/* send - receive messages */
export const handleSendMessage = (dispatch: Dispatch<ConversationAction>, messageData: MessageData): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (socket.connected) {
      dispatch(sendClientMessage(messageData));
      socket.emit("newClientMessageSent", messageData);
      resolve(true);
    } else {
      // do a regular api call here to save to DB //
      reject(new Error("Error in insant messenger connection"));
    }
  })
};
export const handleSendMessageSuccess = (dispatch: Dispatch<ConversationAction>, messageData: MessageData): Promise<boolean> => {
  dispatch(sendClientMessageSuccess(messageData));
  return Promise.resolve(true);
};
export const handleReceiveMessage = (dispatch: Dispatch<ConversationAction>, messageData: MessageData): Promise<boolean> => {
  const conversationState: ConversationState = store.getState().conversationState;
  const { messengerOpen, newMessages, messages } = conversationState;
  const { conversationId } = messageData;
  if (conversationState.messengerOpen) {
    // messenger is open, no new messages //
    dispatch(receiveAdminMessage({ conversationId: conversationId, newMessages: [], messages: [ ...messages, messageData ] }));
  } else {
    // messenger is closed, send to new messages //
    dispatch(receiveAdminMessage({ conversationId, newMessages: [ ...newMessages, messageData ], messages }));
  }
  return Promise.resolve(true);
};
export const handleAdminMessengerOfflineResponse = (dispatch: Dispatch<ConversationAction>, messageData: MessageData): Promise<boolean> => {
  return new Promise((res) => {
    dispatch(adminMessengerOfflineResponse({ newMessage: messageData }));
    res(true);
  });
};
export const handleClientConversationArchived = (dispatch: Dispatch<ConversationAction>, messageData: MessageData): Promise<boolean> => {
  return new Promise((res) => {
    dispatch(clientConversationArchived({ conversationActive: false, newMessage: messageData }));
    res(true);
  });
};
export const handleContinueConversation = (dispatch: Dispatch<ConversationAction>, conversationId: string): void => {
  dispatch(continueClientConversationRequest({ loading: true }));
  socket.emit("continueClientConversationRequest", { conversationId });
};
export const handleContinueConversationSuccess = (dispatch: Dispatch<ConversationAction>): void => {
  const conversationState: ConversationState = store.getState().conversationState;
  const updatedMessages = conversationState.messages.filter((message, i) => i < conversationState.messages.length - 1);
  dispatch(continueClientConversationSuccess({ conversationActive: true, updatedMessages }));
}

/* non API related actions to components */
export const handleConversationOpen = (dispatch: Dispatch<ConversationAction>, currentState: ConversationState): void => {
  const { status, conversationId, senderSocketId, newMessages, messages } = currentState;
  return dispatch(openClientConversation({ status, conversationId, senderSocketId, newMessages: [], messages: [ ...messages, ...newMessages ] }));
};
export const handleConversationClose = (dispatch: Dispatch<ConversationAction>): void => {
  return dispatch(closeClientConversation());
};