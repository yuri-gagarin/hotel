// @flow
import type { Socket } from "socket.io-client";
import type { Dispatch, AppAction } from "../../../redux/reducers/_helpers/createReducer";
import type { MessageData } from "../../../redux/reducers/conversations/flowTypes";
import type { MessengerOnlineToggleArgs, AdminConversationState } from "../../../redux/reducers/admin_conversations/flowTypes";
// redux state update actions //
import { handleSetAdminMessengerOnlineStatus, handleSetAdminConversationError, handleNewClientMessage } from "../../../redux/actions/adminConversationActions";


export const setClientSocketIOEventListeners = (socketIOInstance: Socket, dispatch: Dispatch<any>, adminConversationState: AdminConversationState): void => {
  // error listeners //
  socketIOInstance.on("setAdminMessengerOnlineStatus", (data: MessengerOnlineToggleArgs) => {
    const { messengerOnline } = data;
    if (typeof messengerOnline === "boolean") {
      handleSetAdminMessengerOnlineStatus(dispatch, { messengerOnline });
    } else {
      // handle an error here ? //
      handleSetAdminConversationError(dispatch, new TypeError("Invalid data type"));
    }
  });
  socketIOInstance.on("receiveClientMessage", (messageData: MessageData): void => {
    // new client message functionality //
    console.log("client message received");
    console.log(messageData);
    handleNewClientMessage(dispatch, messageData, adminConversationState);
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