// @flow
import type { Socket } from "socket.io-client";
import type { Dispatch, AppAction } from "../../../redux/reducers/_helpers/createReducer";
import type { MessageData } from "../../../redux/reducers/conversations/flowTypes";
import type { AdminConversationData } from "../../../redux/reducers/admin_conversations/flowTypes";
import type { MessengerOnlineToggleArgs, AdminConversationState, ConnectedClientData } from "../../../redux/reducers/admin_conversations/flowTypes";
// redux state update actions //
import { handleSetAdminMessengerOnlineStatus, handleSetOnlineClients, handleNewClientConnection, handleClientDisconnection, handleSetAdminConversationError, handleNewClientMessage, handleContinueAdminConversation } from "../../../redux/actions/adminConversationActions";

export const setClientSocketIOEventListeners = (socketIOInstance: Socket, dispatch: Dispatch<any>): void => {
  // error listeners //
  socketIOInstance.on("setAdminMessengerOnlineStatus", (data: MessengerOnlineToggleArgs) => {
    const { messengerOnline, clientsDataArr } = data;
    if (typeof messengerOnline === "boolean") {
      handleSetAdminMessengerOnlineStatus(dispatch, { messengerOnline });
      if (clientsDataArr && Array.isArray(clientsDataArr) && clientsDataArr.length > 0) {
        const onlineClientsDataArr: Array<ConnectedClientData> = [];
        try {
          for (const clientDataString of clientsDataArr) {
            const { userId, socketId, name, email }: { userId: string, socketId: string, name: string, email: string } = JSON.parse(clientDataString);
            onlineClientsDataArr.push({ _id: userId, name, email, socketId });
          }
          handleSetOnlineClients(dispatch, onlineClientsDataArr);
        } catch (error) {
          console.log(error);
        }
      }
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
  socketIOInstance.on("clientDisconnected", ({ clientSocketId }: { clientSocketId: string }) => {
    handleClientDisconnection(dispatch, { clientSocketId });
  });
  socketIOInstance.on("receiveClientMessage", (messageData: MessageData): void => {
    // new client message functionality //
    handleNewClientMessage(dispatch, messageData);
  });
  socketIOInstance.on("receiveClientConversationContinue", (conversationData: AdminConversationData) => {
    handleContinueAdminConversation(dispatch, conversationData);
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