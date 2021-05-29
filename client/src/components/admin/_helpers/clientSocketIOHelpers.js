// @flow
import type { Socket } from "socket.io-client";
import type { Dispatch, AppAction } from "../../../redux/reducers/_helpers/createReducer";
import type { MessageData } from "../../../redux/reducers/conversations/flowTypes";
import type { MessengerOnlineToggleArgs, AdminConversationState, ConnectedClientData } from "../../../redux/reducers/admin_conversations/flowTypes";
// redux state update actions //
import { handleSetAdminMessengerOnlineStatus, handleNewClientConnection, handleClientDisconnection, handleSetAdminConversationError, handleNewClientMessage } from "../../../redux/actions/adminConversationActions";

export const setClientSocketIOEventListeners = (socketIOInstance: Socket, dispatch: Dispatch<any>): void => {
  // error listeners //
  console.log("ran set listeneres")
  socketIOInstance.on("setAdminMessengerOnlineStatus", (data: MessengerOnlineToggleArgs) => {
    const { messengerOnline } = data;
    if (typeof messengerOnline === "boolean") {
      handleSetAdminMessengerOnlineStatus(dispatch, { messengerOnline });
    } else {
      // handle an error here ? //
      handleSetAdminConversationError(dispatch, new TypeError("Invalid data type"));
    }
  });
  socketIOInstance.on("newClientConnected", (data: { _id: string, name: string, socketId: string, email: string, socketId: string }) => {
    const { _id, name, email = "No email provided", socketId } = data;
    if (!socketId) {
      // handle an error here? retry //
    }
    const newConnectedClientData: ConnectedClientData = { _id, name, email, socketId };
    handleNewClientConnection(dispatch, newConnectedClientData);
  });
  socketIOInstance.on("clientDisconnected", (data: ConnectedClientData) => {
    handleClientDisconnection(dispatch, data);
  });
  socketIOInstance.on("receiveClientMessage", (messageData: MessageData): void => {
    // new client message functionality //
    handleNewClientMessage(dispatch, messageData);
  });
  socketIOInstance.on("generalSocketIOError", (error: any) => {
    handleSetAdminConversationError(dispatch, error);
  });
  socketIOInstance.on("socketIOConnectionError", (error: any) => {
    handleSetAdminConversationError(dispatch, error);
  });
};

export const  removeClientSocketIOEventListeners = (socketIOinstance: Socket): void => {
  socketIOinstance.removeAllListeners();
};