import mongoose from "mongoose";
import Conversation from "../models/Conversation";
import Message from "../models/Message";

export default {
  createNewConversation: (req, res) => {
    // user should be able to create a new conversation  without a registration //
    const messageData = req.body;
    
  },
  deleteConversation: (req, res) => {
    // validate user credentials first //
    const conversationId = req.params.convId;
    const user = req.user;
    return Conversation.findOneAndDelete({ _id: conversationId})
      .then((conversation) => {
        return Message.deleteMany({ conversationId: conversation._id })
      })
      .then((response) => {
        return res.status(200).json({
          message: "Conversation deleted"
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Something went wrong on our end",
          error: error
        });
      });
  }
};
