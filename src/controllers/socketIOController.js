import RedisController from "./redisController";
// models //
import Conversation from "../models/Conversation";
// helpers //
import { emitDefaultWelcomeMessage, emitDefaultOfflineMessage, emitDefaultConversationArchived } from  "./helpers/defaultMessageEmitters";

export default function (socketIOInstance) {

  socketIOInstance.on("connection", (socket) => {
    console.log("connection");

    // listen for connected clients credentials //
    // set client data in Redis, emit connected client data to any admins online //
    socket.on("receiveClientCredentials", (userState) => {
      const { _id: userId, name, email } = userState;
      const { id: socketId } = socket;
      if (!userId || !name) {
        socket.emit("generalSocketError", ({ message: "Could not resolve user" }));
        return;
      }
      // set client id with socket id in redis to prevent multiple connections //
      return RedisController.setClientCredentials({ userId, socketId, name, email })
        .then((res) => {
          if (res && res === "OK") {
            // new user //
            return RedisController.getVisibleAdmins();
          } else {
            return Promise.resolve({ visibleAdminSocketIds: [], numberOfVisibleAdmins: 0 });
          }
        })
        .then(({ visibleAdminSocketIds, numberOfVisibleAdmins }) => {
          if (visibleAdminSocketIds.length > 0) {
            for (const adminSocketId of visibleAdminSocketIds) {
              socketIOInstance.to(adminSocketId).emit("newClientConnected", { ...userState, socketId: socketId });
            }
          }

          if (numberOfVisibleAdmins > 0) {
            // check if there is a default greeting set //
            // if not send default fallback message //
            return emitDefaultWelcomeMessage({ socket, numberOfVisibleAdmins });
          } else {
            socket.emit("clientCredentialsReceived", { numberOfVisibleAdmins });
            return Promise.resolve(null)
          }
        })
        .catch((err) => {
          console.log(err)
          socket.emit("socketConnectionError", { message: "Messenger connection error" });
        });
    });


    // listen for an administrator to connect //
    socket.on("adminConnected", (admin) => {
      RedisController.setAdminCredentials(admin)
        .then(() => {
          socket.emit("adminCredentialsReceived");
        })
        .catch((error) => {
          console.log(error);
        })
    })
    // admin messenger online offline listener //
    socket.on("toggleAdminOnlineStatus", (data) => {
      const { messengerOnline } = data;
      const { id : socketId } = socket;
      if (messengerOnline) {
        // take admin messenger online //
        return Promise.all( [
          RedisController.setNewVisibleAdmin(socketId),
          RedisController.getConnectedClients(),
        ])
        .then(([ _, connectedClientsRes ]) => {
          const { numberOfConnectedClients, visibleClientSocketIds, clientsDataArr } = connectedClientsRes;
          socketIOInstance.to(socketId).emit("setAdminMessengerOnlineStatus", { messengerOnline: true, numberOfConnectedClients, visibleClientSocketIds, clientsDataArr });
          socketIOInstance.emit("adminConnected", { adminSocketId: socketId });
        })
        .catch((error) => {
          socketIOInstance.to(socketId).emit("generalSocketIOError", error);
        });
      } else {
        // take admin messenger offline //
        return RedisController.removeVisibleAdmin(socketId)
          .then(() => {
            socketIOInstance.to(socketId).emit("setAdminMessengerOnlineStatus", { messengerOnline: false });
            return RedisController.getVisibleAdmins();
          })
          .then(({ numberOfVisibleAdmins }) => {
            if (numberOfVisibleAdmins === 0) {
              socketIOInstance.emit("adminMessengerOffline");
            }
          })
          .catch((error) => {
            console.log(error);
            socketIOInstance.to(socketId).emit("generalSocketIOError", error);
          })
      }
    })
    // keeping connection alive //
    socket.on("keepConnectionAlive", () => {
    });
    //

    // client is messaging //
    socket.on("newClientMessageSent", (data) => {
      // emits a an event to notify admin of a new message //
      return RedisController.getVisibleAdmins()
        .then(({ numberOfVisibleAdmins, visibleAdminSocketIds }) => {
          if (numberOfVisibleAdmins === 0) {
            // emit a messenger offline message //
            // save message to the database ? //
            return emitDefaultOfflineMessage({ socket });
          } else {
            for (const socketId of visibleAdminSocketIds) {
              socketIOInstance.to(socketId).emit("receiveClientMessage", data);
            }
            return RedisController.setNewMessage(data);
          }
        })
        .then(() => {
          // do something with it //
          socketIOInstance.to(socket.id).emit("messageDelivered", data);
        })
        .catch((error) => {
          console.log(error);
        });
      
    });
    // end client messaging //

    socket.on("newAdminMessageSent", ({ messageData, conversationData }) => {
      const { receiverSocketId } = conversationData;
      if (receiverSocketId) {
        return Promise.all([
          RedisController.setConversationData(conversationData),
          RedisController.setNewMessage(messageData)
        ])
        .then(() => {
          socketIOInstance.to(receiverSocketId).emit("receiveAdminReply", messageData);
        })
        .catch((error) => {
          console.error(error);
        });
      }
    });

    socket.on("createNewAdminConversationData", (conversationData) => {
      return RedisController.setConversationData(conversationData)
        .then(() => {
          return RedisController.getVisibleAdmins();
        })
        .then(({ numberOfVisibleAdmins, visibleAdminSocketIds }) => {
          if (numberOfVisibleAdmins > 0 && visibleAdminSocketIds.length > 0) {
            for (const adminSocketId of visibleAdminSocketIds) {
              socketIOInstance.to(adminSocketId).emit("newlyCreatedAdminConversationData", conversationData);
            }
          }
        })
        .catch((error) => {
          console.error(error);
          socketIOInstance.to(socket.id).emit("generalSocketIOError", error);
        });
    });

    socket.on("conversationArchived", (data) => {
      const { conversationId, receiverSocketId } = data;
      // TODO //
      // handle an error with incorrect input //
      if (!conversationId || !receiverSocketId) return;

      return RedisController.removeConversationData(conversationId)
        .then(() => {
          // check if an archived conversation message has been set //
          return emitDefaultConversationArchived({ socketIOInstance, conversationId, receiverSocketId });
        })
        .catch((error) => {
          console.error(error);
          // TODO //
          socketIOInstance.to(socket.id).emit("generalSocketIOError", error);
        });
    });

    socket.on("continueClientConversationRequest", (data) => {
      // CLIENT WANTS TO CONTINUE CONVERSTION WHICH ADMIN ARCHIVED //
      const { conversationId } = data;
      let continuedConversation;

      return new Promise((resolve, reject) => {
        if (!conversationId) {
          return reject(new Error("Couldn't resolve archived conversation"));
        } else {
          return resolve(Conversation.findOne({ conversationId }).exec())
        }
      })
      .then((conversation) => {
        if (conversation) {
          continuedConversation = conversation;
          const { messages } = conversation;
          const promises = [];
          // convert messages objects to JSON //
          for (const messageData of messages) {
            promises.push(RedisController.setNewMessage(messageData));
          }
          return Promise.all(promises);
        } else {
          return Promise.resolve([])
        }
      })
      .then(() => {
        return RedisController.getVisibleAdmins();
      })
      .then(({ numberOfVisibleAdmins, visibleAdminSocketIds }) => {
        if (numberOfVisibleAdmins > 0 && visibleAdminSocketIds) {
          for (const adminSocketId of visibleAdminSocketIds) {
            socketIOInstance.to(adminSocketId).emit("receiveClientConversationContinue", continuedConversation);
          }
          return Promise.resolve(true);
        } else {
          return Promise.resolve(false);
        }
      })
      .then((success) => {
        if (success) {
          socketIOInstance.to(socket.id).emit("continueClientConversationSuccess", { conversationId });
        } else {
          return emitDefaultOfflineMessage({ socket });
        }
      })
      .catch((error) => {
        console.log(error);
        socketIOInstance.to(socket.id).emit("generalSocketIOError", error);
      });
     
    });
    // end admin response 
    socket.once("disconnect", () => {
      const { id : socketId } = socket;
      // remove from redis mem //
      console.log("disconnected");
      return RedisController.removeClientCredentials(socketId)
        .then(({ numOfClientHashesRemoved, numOfClientSocketIdsRemoved }) => {
          if (numOfClientHashesRemoved > 0 || numOfClientSocketIdsRemoved > 0) {
            return RedisController.getVisibleAdmins()
              .then(({ visibleAdminSocketIds }) => {
                if (visibleAdminSocketIds.length > 0) {
                  for (const adminSocketId of visibleAdminSocketIds) {
                    socketIOInstance.to(adminSocketId).emit("clientDisconnected", { clientSocketId: socketId });
                  }
                }
                return Promise.resolve()
              })
          } else {
            return RedisController.removeVisibleAdmin(socketId)
              .then(({ numberRemoved }) => {
                if (numberRemoved > 0) {
                  return RedisController.getVisibleAdmins();
                } else {
                  return Promise.resolve({ numberOfVisibleAdmins: 0 });
                }
              })
              .then(({ numberOfVisibleAdmins }) => {
                if (numberOfVisibleAdmins === 0) {
                  socketIOInstance.emit("adminMessengerOffline")
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
      .catch((err) => {
        console.error(err);
      });
    });

  });
}