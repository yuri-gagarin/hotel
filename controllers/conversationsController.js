import mongoose from "mongoose";
import Conversation from "../models/Conversation";
import Message from "../models/Message";

export default {
  createNewConversation: (req, res) => {
    // user should be able to create a new conversation  without a registration //
    const messageData = req.body;
  },
  openConversation: (req, res) => {
    // user should open a conversation with new messages //
    // any new messages should be marked as read //
    const { convId } = req.params;
    let conversationModel, unreadMessages, customError, statusCode;
    return Conversation.findOne({ _id: convId })
      .populate("messages")
      .then((conversation) => {
        if (conversation) {
          // set the conversation model and unread messages to mark as read //
          conversationModel = conversation;
          unreadMessages = conversation.unreadMessages;
          // update messages in converastion to read //
          return Message.update(
            { _id: { $in: unreadMessages } },
            { $set: { read: true } },
            { multi: true }
          );
        } else {
          customError = new Error("Conversation can't be found or is deleted...")
          statusCode = 400;
          return Promise.reject(customError);
        }
      })
      .then((response) => {
        return Conversation.findByIdAndUpdate(
          convId,
          { $pull: { "unreadMessages": { $in: unreadMessages } }, 
            $push: { "readMessages": { $each: unreadMessages } }
          },
          { new: true }
        );
      })
      .then((updatedConversation) => {
        return res.json({
          message: "Success",
          conversation: updatedConversation
        });
      })
      .catch((error) => {
        return res.status(statusCode || 500).json({
          message: "An error occured",
          error: error
        });
      });
  },
  deleteConversation: (req, res) => {
    // validate user credentials first //
    const conversationId = req.params.convId;
    const user = req.user;
    let customError, statusCode;
    return Conversation.findOneAndDelete({ _id: conversationId})
      .then((conversation) => {
        if (conversation) {
          return Message.deleteMany({ conversationId: conversation._id });
        } else {
          customError = new Error("Conversation can't be found or is deleted...");
          statusCode = 400;
          return Promise.reject(customError);
        }
      })
      .then((response) => {
        return res.status(200).json({
          message: "Conversation deleted"
        });
      })
      .catch((error) => {
        return res.status(statusCode || 500).json({
          message: "Something went wrong on our end",
          error: error
        });
      });
  }
};
