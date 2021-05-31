// @flow
import axios from "axios";
// types //
import type { Dispatch } from "../../redux/reducers/_helpers/createReducer";
import type { 
  ConversationState, MessageData, ConversationAction, ClientConversationAPIRequest, OpenClientConversation, CloseClientConversation, DeleteClientConversation, UpdateClientConversation, 
  SendClientMessage, SendClientMessageSuccess, ReceiveAdminMessage, AdminMessengerOfflineResponse, SetClientConversationError 
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

const openClientConversation = (data: { status: number, conversationId: string, senderSocketId: string, messages: Array<MessageData> }): OpenClientConversation => {
  const { status, conversationId, senderSocketId, messages } = data;
  return {
    type: "OpenClientConversation",
    payload: { loading: false, messengerOpen: true, status, conversationId, senderSocketId, messages }
  };
};

const closeClientConversation = (): CloseClientConversation => {
  return {
    type: "CloseClientConversation",
    payload: { messengerOpen: false }
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

const receiveAdminMessage = (messageData: MessageData): ReceiveAdminMessage => {
  const { senderSocketId, receiverSocketId, conversationId } = messageData;
  return {
    type: "ReceiveAdminMessage",
    payload: { conversationId: conversationId, message: messageData, senderSocketId: "" }
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
      const stateData = { status, responseMsg, conversationId, senderSocketId:"", receiverSocketId: "", messages: allMessages };
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
  dispatch(receiveAdminMessage(messageData));
  return Promise.resolve(true);
};
export const handleAdminMessengerOfflineResponse = (dispatch: Dispatch<ConversationAction>, messageData: MessageData): Promise<boolean> => {
  return new Promise((res) => {
    dispatch(adminMessengerOfflineResponse({ newMessage: messageData }));
    res(true);
  });
};  

/* non API related actions to components */
export const handleConversationOpen = (dispatch: Dispatch<ConversationAction>, currentState: ConversationState): void => {
  const { status, conversationId, senderSocketId, messages } = currentState;
  return dispatch(openClientConversation({ status, conversationId, senderSocketId, messages }));
};
export const handleConversationClose = (dispatch: Dispatch<ConversationAction>): void => {
  return dispatch(closeClientConversation());
};