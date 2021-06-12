import mongoose from "mongoose";
import Message from "../../models/Message";

export const emitDefaultWelcomeMessage = ({ socket, numberOfVisibleAdmins }) => {
  let messageData = {};
  const conversationId = `CONVERSATION_${socket.id}`;
  const receiverSocketId = socket.id;

  return Message.findOne({ messageType: "DefaultGreeting" }).exec()
    .then((message) => {
      if (message) {
        messageData = { ...message.toObject(), conversationId, receiverSocketId };
      } else {
        messageData = {
          _id: mongoose.Types.ObjectId(),
          conversationId,
          receiverSocketId,
          senderSocketId: "",
          sender: "admin",
          messageContent: "Hello and welcome. Feel free to message us with any questions",
          sentAt: new Date().toDateString()
        };
      }
      socket.emit("clientCredentialsReceived", { numberOfVisibleAdmins, messageData });
      return Promise.resolve(true);
  })
  .catch((error) => {
    throw(error);
  });
};

export const emitDefaultOfflineMessage = ({ socket }) => {
  let messageData = {};
  const conversationId = `CONVERSATION_${socket.id}`;
  const receiverSocketId = socket.id;

  return Message.findOne({ messageType: "DefaultOffline" }).exec()
    .then((message) => {
      if (message) {
        messageData = { ...message.toObject(), conversationId, receiverSocketId };
      } else {
        messageData = {
          _id: mongoose.Types.ObjectId(),
          conversationId,
          receiverSocketId,
          senderSocketId: "",
          sender: "admin",
          messageContent: "We are offline",
          sentAt: new Date().toDateString()
        };
      }
      socket.emit("adminMessengerOffline", messageData);
      return Promise.resolve(true);
    })
    .catch((error) => {
      throw error;
    });
};

export const emitDefaultConversationArchived = ({ socketIOInstance, conversationId, receiverSocketId }) => {
  let messageData = {}
  console.log(62)
  console.log(receiverSocketId);

  return Message.findOne({ messageType: "DefaultResolved" }).exec()
    .then((message) => {
      if (message) {
        messageData = { ...message.toObject(), conversationId, receiverSocketId }
      } else {
        messageData = {
          _id: mongoose.Types.ObjectId(),
          conversationId: conversationId,
          senderSocketId: "",
          receiverSocketId: receiverSocketId,
          sender: "admin",
          messageContent: "Our admins have marked this conversation as resolved. If you would like to continue the conversation please click on the button below...",
          sentAt: new Date().toISOString()
        }
      }
      socketIOInstance.to(receiverSocketId).emit("receiveAdminConversationArchived", messageData);
      return Promise.resolve(true);
    })
    .catch((error) => {
      throw error;
    });
};