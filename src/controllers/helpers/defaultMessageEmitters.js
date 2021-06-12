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