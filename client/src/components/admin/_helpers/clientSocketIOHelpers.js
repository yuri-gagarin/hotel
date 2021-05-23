// @flow
import type { Socket } from "socket.io-client";
import type { Dispatch, AppAction } from "../../../redux/reducers/_helpers/createReducer";
import type { MessengerOnlineToggleArgs } from "../../../redux/reducers/admin_conversations/flowTypes";
// redux state update actions //
import { handleSetAdminMessengerOnlineStatus, handleSetAdminConversationError } from "../../../redux/actions/adminConversationActions";


export const setClientSocketIOEventListeners = (socketIOInstance: Socket, dispatch: Dispatch<any>): void => {
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
  socketIOInstance.on("receiveClientMessage", () => {
    // new client message functionality //
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