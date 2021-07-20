import Conversation from "../models/Conversation";
import Message from "../models/Message";
// Redis controller for Redis queries //
import { redisControllerInstance } from "../server";
export default {
  /*
  createNewConversation: (req, res) => {
    // user should be able to create a new conversation  without a registration //
  },
  */
  getAllConversations: (req, res) => {
    console.log(req.query);
    const { viewActive, viewArchived } = req.query;
    if (viewArchived && viewArchived === "true") { 
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
    } else if (viewActive && viewActive === "true") {
      let conversations; 
      redisControllerInstance.getKeys("CONVERSATION_HASH")
        .then((data) => {
          return redisControllerInstance.getConversationHashes(data);
        })
        .then((convDataArr) => {
          conversations = convDataArr;
          if (convDataArr.length > 0) {
            const promises = [];
            for (const convData of convDataArr) {
              promises.push(redisControllerInstance.getConversationMessages(convData.conversationId));
            }
            return Promise.all(promises);
          } else {
            return Promise.resolve([]);
          }
        })
        .then((data) => {
          //console.log(conversations);
          //console.log(data);
          const convos  = conversations.map((conversation) => {
            const messages = data
              .filter((msgData) => msgData.conversationId === conversation.conversationId)[0].messages
              .map((messageString) => JSON.parse(messageString))
              .sort((first, second) => first.createdAt > second.createdAt);
            return { ...conversation, newMessages: [], messages: messages };
          });
          return res.status(200).json({ responseMsg: "Ok", adminConversations: convos });
        })
  
        .catch((error) => {
          return res.status(500).json({ messge: "An error occured", error: error });
        })
    } else {
      return res.status(400).json({ responseMsg: "Input Error", error: new Error("Could not resolve user input") });
    }
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
    const { conversationId } = req.params;
    let statusCode;
    console.log(102)

    return Conversation.findOneAndDelete({ conversationId: conversationId }).exec()
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
