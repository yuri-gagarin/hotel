import mongoose from "mongoose";
import RedisController from "./redisController";
// models //
import Conversation from "../models/Conversation";
import Message from "../models/Message";
// helpers //
import { emitDefaultWelcomeMessage } from  "./helpers/defaultMessageEmitters";

export default function (socketIOinstance) {

  socketIOinstance.on("connection", (socket) => {
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
              socketIOinstance.to(adminSocketId).emit("newClientConnected", { ...userState, socketId: socketId });
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
          socketIOinstance.to(socketId).emit("setAdminMessengerOnlineStatus", { messengerOnline: true, numberOfConnectedClients, visibleClientSocketIds, clientsDataArr });
          socketIOinstance.emit("adminConnected", { adminSocketId: socketId });
        })
        .catch((error) => {
          socketIOinstance.to(socketId).emit("generalSocketIOError", error);
        });
      } else {
        // take admin messenger offline //
        return RedisController.removeVisibleAdmin(socketId)
          .then(() => {
            socketIOinstance.to(socketId).emit("setAdminMessengerOnlineStatus", { messengerOnline: false });
            return RedisController.getVisibleAdmins();
          })
          .then(({ numberOfVisibleAdmins }) => {
            if (numberOfVisibleAdmins === 0) {
              socketIOinstance.emit("adminMessengerOffline");
            }
          })
          .catch((error) => {
            console.log(error);
            socketIOinstance.to(socketId).emit("generalSocketIOError", error);
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
            const genericResponseMsg = {
              _id: mongoose.Types.ObjectId(),
              conversationId: `CONVERSATION_${socket.id}`,
              receiverSocketId: socket.id,
              sender: "admin",
              senderSocketId: "",
              messageContent: "We are offline but your message has been sent to our servers",
              sentAt: new Date().toDateString()
            }
            socket.emit("adminMessengerOffline", genericResponseMsg);
          } else {
            for (const socketId of visibleAdminSocketIds) {
              socketIOinstance.to(socketId).emit("receiveClientMessage", data);
            }
            return RedisController.setNewMessage(data)
              .then(() => {
                // do something with it //
                socketIOinstance.to(socket.id).emit("messageDelivered", data);
              })
              .catch((error) => {
                console.error(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      
    });
    // end client messaging //

    socket.on("newAdminMessageSent", (data) => {
      const { receiverSocketId } = data;
      if (receiverSocketId) {
        return RedisController.setNewMessage(data)
          .then(() => {
            socketIOinstance.to(receiverSocketId).emit("receiveAdminReply", data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });

    socket.on("conversationArchived", (data) => {
      const { conversationId, receiverSocketId } = data;
      // TODO //
      // handle an error with incorrect input //
      if (!conversationId || !receiverSocketId) return;

      return RedisController.removeConversationData(conversationId)
        .then(() => {
          // check if an archived conversation message has been set //
          return Message.findOne({ messageType: "DefaultResolved" })
        })
        .then((message) => {
          let messageData = {}
          if (message) {
            messageData = { ...message, conversationId, receiverSocketId }
          } else {
            messageData = {
              _id: mongoose.Types.ObjectId(),
              conversationId: conversationId,
              senderSocketId: "",
              receiverSocketId: "",
              sender: "admin",
              messageContent: "Our admins have marked this conversation as resolved. If you would like to continue the conversation please click on the button below...",
              sentAt: new Date().toISOString()
            }
          }
          return Promise.resolve(messageData);
        })
        .then((messageData) => {
          socketIOinstance.to(receiverSocketId).emit("receiveAdminConversationArchived", messageData);
        })
        .catch((error) => {
          console.error(error);
          // TODO //
          // add an error emitter her //
        });
    });

    socket.on("continueClientConversationRequest", (data) => {
      // CLIENT WANTS TO CONTINUE CONVERSTION WHICH ADMIN ARCHIVED //
      const { conversationId } = data;
      if (!conversationId) {
        socketIOinstance.to(socket.id).emit("generalSocketIOError", (new Error("Couldn't resolve archived conversation")));
      } else {
        Conversation.findOne({ conversationId }).exec()
          .then((conversation) => {
            console.log(conversation);
            const { conversationId } = conversation;
            socketIOinstance.to(socket.id).emit("continueClientConversationSuccess", { conversationId });
          })
          .catch((error) => {
            console.log(error);
            socketIOinstance.to(socket.id).emit("generalSocketIOError");
          });
      }
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
                    socketIOinstance.to(adminSocketId).emit("clientDisconnected", { clientSocketId: socketId });
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
                  socketIOinstance.emit("adminMessengerOffline")
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