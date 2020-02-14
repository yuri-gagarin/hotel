import mongoose, { Mongoose } from "mongoose";
import Conversation from "../models/Conversation";
import Message from "../models/Message";

export default {
  sendMessage: (req, res) => {
    const user = req.user || {};
    const messageData = req.body;
    let conversationId = req.body.conversationId;
    console.info(user);
    // validate message later //
    if (!messageData.content) {
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
              mongoose.Types.ObjectId()
            ]
          }
          return Conversation.create(conversationData);
        }
      })
      .then((conversation) => {
        conversationId = conversation._id;
        const newMessage = {
          conversationId: conversation._id,
          sender: user.firstName || "Guest",
          content: messageData.content,
        }
        return Message.create(newMessage);
      })
      .then((createdMessage) => {
        // update a conversation with a new message //
        return Conversation.findByIdAndUpdate(conversationId,
          { "$push": { "messages": createdMessage._id } }
        );
      })
      .then((conversation) => {
        // assuming everything went fine //
        return res.status(200).json({
          message: "Message sent",
          conversationId: conversation._id
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Oops an error occured",
          error: error
        });
      });
  },
  markMessageRead: (req, res) => {
    
  }
};

