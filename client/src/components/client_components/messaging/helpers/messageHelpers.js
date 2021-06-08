// @flow
import axios from "axios";
// state changing redux actions //
import { handleSendMessageSuccess, handleAdminMessengerOfflineResponse, handleReceiveMessage, handleClientConversationArchived, handleContinueConversation, handleContinueConversationSuccess } from "../../../../redux/actions/conversationActions";
// type imports //
import type { Socket } from "socket.io-client";
import type { Dispatch } from "../../../../redux/reducers/_helpers/createReducer";
import type { MessageData } from "../../../../redux/reducers/conversations/flowTypes";
// constants //
import { SOCKETIO_CONSTANTS } from "./constants";
 
const { EMITTER_CONSTANTS, LISTENER_CONSTANTS } = SOCKETIO_CONSTANTS;
/*
export const sendMessage = ({ firstName, email, userId }, { messageData, conversationId }, cb) => {
  const requestOptions = {
    method: "post",
    url: "/api/messages/",
    data: {
      user: {
        firstName: firstName || "Guest",
        email: email || "none",
        userId: userId || null
      },
      messageData: messageData,
      conversationId: conversationId
    }
  };
  return axios(requestOptions)
    .then((response) => {
      cb(null, response);
    })
    .catch((error) => {
      cb(error, null);
    });
};
*/
export const setClientSocketIOListeners = (socketIOInstance: Socket, dispatch: Dispatch<any>): void => {
  socketIOInstance.on("clientCredentialsReceived", ({ numberOfVisibleAdmins, messageData }: { numberOfVisibleAdmins: number, messageData?: MessageData }) => {
    if (typeof numberOfVisibleAdmins === "number" && numberOfVisibleAdmins > 0) {
      handleAdminMessengerOfflineResponse(dispatch, { adminOnlineStatus: "online", messageData });
    }
  })
  socketIOInstance.on(LISTENER_CONSTANTS.AMDIN_MESSENGER_OFFLINE, (messageData?: MessageData) => {
    handleAdminMessengerOfflineResponse(dispatch, { adminOnlineStatus: "offline", messageData});
  });
  socketIOInstance.on("adminConnected", () => {
    handleAdminMessengerOfflineResponse(dispatch, { adminOnlineStatus: "online" });
  });
  socketIOInstance.on(LISTENER_CONSTANTS.MESSAGE_DELIVERED, (data: MessageData) => {
    handleSendMessageSuccess(dispatch, data);
  });
  socketIOInstance.on(LISTENER_CONSTANTS.RECEIVE_ADMIN_REPLY, (data: MessageData) => {
    handleReceiveMessage(dispatch, data);
  });
  socketIOInstance.on("receiveAdminConversationArchived", (data: MessageData) => {
    handleClientConversationArchived(dispatch, data);
  });
  socketIOInstance.on("continueClientConversationSuccess", ({ conversationId }: { conversationId: string }) => {
    handleContinueConversationSuccess(dispatch);
  });
  // errors responses //
  socketIOInstance.on(LISTENER_CONSTANTS.GENERAL_SOCKET_IO_ERR, (data: any) => {
    console.log("general socketio error");
    console.log(data);
  });
};

export const removeClientSocketIOListeneres = (socketIOInstance: Socket): void => {
  socketIOInstance.removeAllListeners(LISTENER_CONSTANTS.AMDIN_MESSENGER_OFFLINE);
  socketIOInstance.removeAllListeners(LISTENER_CONSTANTS.MESSAGE_DELIVERED);
  socketIOInstance.removeAllListeners(LISTENER_CONSTANTS.GENERAL_SOCKET_IO_ERR);
};

