import mongoose, { Mongoose } from "mongoose";
import Conversation from "../models/Conversation";
import Message from "../models/Message";

export default {
  sendMessage: (req, res) => {
    const user = req.user || req.body.user || {};
    const userId = user._id || mongoose.Types.ObjectId();
    const { messageData } = req.body;
    let newMessage, conversationId;
    // validate message later //
    if (!messageData) {
      return res.status(400).json({
        message: "Message cannot be blank"
      });
    }
    // check for existing conversation create one if necessary //
    return Conversation.findOne({ _id: conversationId })
      .then((conversation) => {
        if (conversation) {
          // converstion exists, append //
          return Promise.resolve(conversation);
        } else {
          // create a new conversation first //
          const conversationData = {
            participants: [
              userId
            ]
          }
          return Conversation.create(conversationData);
        }
      })
      .then((conversation) => {
        conversationId = conversation._id;
        const newMessage = {
          conversationId: conversation._id,
          sender: user.name || "Guest",
          content: messageData,
        }
        return Message.create(newMessage);
      })
      .then((createdMessage) => {
        // update a conversation with a new message //
        // messageId = createdMessage._id;
        newMessage = createdMessage;
        return Conversation.updateOne(
          { "$push": { "unreadMessages": createdMessage._id },
            "$addToSet": { "participants": userId }
          }
        );
      })
      .then((response) => {
        // assuming everything went fine //
        return res.status(200).json({
          responseMsg: "Message sent",
          conversationId: conversationId,
          newMessage: newMessage,
          user: user
        });
      })
      .catch((error) => {
        console.error(error.message);
        return res.status(500).json({
          message: "oops an error occured",
          error: error
        });
      });
  },
  markMessageRead: (req, res) => {
    const conversationId = req.body.conversationId;

  }
};

