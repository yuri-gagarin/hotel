import Conversation from "../models/Conversation";
import Message from "../models/Message";

export default {
  /*
  createNewConversation: (req, res) => {
    // user should be able to create a new conversation  without a registration //
  },
  */
  getAllConversations: (req, res) => {
    return Conversation.find({})
      .then((adminConversations) => {
        return res.json({ responseMsg: "success", adminConversations });
      })
      .catch((error) => {
        return res.status(500).json({
          messge: "An error occured",
          error: error
        });
      });
  },  
  openConversation: (req, res) => {
    // user should open a conversation with new messages //
    // any new messages should be marked as read //
    const { convId } = req.params;
    let unreadMessages, customError, statusCode;
    return Conversation.findOne({ _id: convId })
      .then((conversation) => {
        if (conversation) {
          // set the conversation model and unread messages to mark as read //
          unreadMessages = conversation.unreadMessages;
          // update messages in converastion to read //
          return Message.updateOne(
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
      .then(() => {
        return Conversation.findByIdAndUpdate(
          convId,
          { $pull: { "unreadMessages": { $in: unreadMessages } }, 
            $push: { "readMessages": { $each: unreadMessages } }
          },
          { new: true }
        ).populate("readMessages");
      })
      .then((updatedConversation) => {
        return res.json({
          responseMsg: "Success",
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
  archiveConversation: (req, res) => {
    const conversationData = req.body.conversation;
    if (!conversationData) {
      return res.status(400).json({
        responseMsg: "Invalid data",
        error: new Error("Invalid data sent from client")
      });
    }

    const { conversationId, receiverSocketId, conversationName, messages = [], newConversation, createdAt } = conversationData;
    // firts check if the conversation with this <conversationId> already exists to avoid duplicate data //
    return Conversation.findOneAndUpdate(
      { conversationId },
      { $set: { conversationName, receiverSocketId, newConversation, createdAt, messages } },
      { upsert: true, new: true }
    )
    .exec()
    .then((archivedConversation) => {
      return res.status(200).json({
        responseMsg: "Conversation archived",
        archivedConversation
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        responseMsg: "Error archiving conversation",
        error
      });
    });
  },
  
  deleteConversation: (req, res) => {
    // validate user credentials first //
    const conversationId = req.params.convId;
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
      .then(() => {
        return res.status(200).json({
          responseMsg: "Conversation deleted",
          conversationId: conversationId
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
