import mongoose, { Mongoose } from "mongoose";
import Conversation from "../models/Conversation";
import Message from "../models/Message";
import io from "../server";
// instant messaging between client and admin //
// maybe later we can implement these in redis rather than Mongo if needed //
export default {
  sendClientMessage: (req, res) => {
    const { user } = req.body;
    let { conversationId } = req.body;
    let newMessage;
    if (!user) {
      return Promise.resolve().then(() => {
        res.status(400).json({
          responseMsg: "Couldn't set user"
        });
      });
    }
    if (!messageData) {
      return Promise.resolve().then(() => {
        res.status(400).json({
          responseMsg: "Couldn't resolve message data"
        });
      });
    }
    // look for a conversation if conversationId exists //
    if (conversationId) {
      return Conversation.findById(conversationId)
        .then((conversation) => {
          if (conversation) {
            return Promise.resolve(conversation);
          } else {
            return Promise.reject(new Error ("Can't find a conversation"));
          }
        })
        .then((conversation) => {
          return Message.create({
            conversationId: conversationId,
            sender: user.firstName,
            content: messageData
          });
        })
        .then((createdMessage) => {
          newMessage = createdMessage;
          return Conversation.updateOne(
            { 
              _id: conversationId 
            },
            { 
              "$push": { "unreadMessages": createdMessage._id },
              "$addToSet": { "participants": userId },
              "$set": { "lastMessage": { 
                _id: createdMessage._id,
                sender: createdMessage.sender,
                content: createdMessage.content,
                sentAt: createdMessage.sentAt
              } }
            }
          );
        })
        .then((updatedConversation) => {
          return res.status(200).json({
            responseMsg: "Your message was sent",
            conversationId: conversationId,
            newMessage: newMessage,
            user: user
          });
        })
        .catch((error) => {
          return res.status(500).json({
            responseMsg: "Ooops we seem to have a server error",
            error: error
          })
        })
    } else {
      return Conversation.create({
        participants: [
          user._id
        ]
      })
      .then((conversation) => {
        return Message.create({
          conversationId: conversation._id,
          sender: user.firstName,
          content: messageData
        });
      })
      .then((createdMessage) => {
        newMessage = createdMessage;
        return Conversation.updateOne(
          { 
            _id: conversationId 
          },
          { 
            "$push": { "unreadMessages": createdMessage._id },
            "$addToSet": { "participants": userId },
            "$set": { "lastMessage": { 
              _id: createdMessage._id,
              sender: createdMessage.sender,
              content: createdMessage.content,
              sentAt: createdMessage.sentAt
            } }
          }
        );
      })
      .then((response) => {
        return res.status(200).json({
          responseMsg: "Your message was sent",
          conversationId: conversationId,
          newMessage: newMessage,
          user: user
        });
      })
      .catch((error) => {
        return res.status(500).json({
          responseMsg: "Ooops we seem to have a server error",
          error: error
        });
      });
    }
  },
  sendAdminMessage: (req, res) => {
    //console.log(global.io);
    const user = req.user || req.body.user || {};
    const userId = user._id || mongoose.Types.ObjectId();
    const { messageData } = req.body;
    let conversationId = req.body.conversationId;
    let newMessage;
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
          sender: user.firstName || "Guest",
          content: messageData,
        }
        return Message.create(newMessage);
      })
      .then((createdMessage) => {
        // update a conversation with a new message //
        // messageId = createdMessage._id;
        newMessage = createdMessage;
        return Conversation.updateOne(
          { _id: conversationId },
          { 
            "$push": { "unreadMessages": createdMessage._id },
            "$addToSet": { "participants": userId },
            "$set": { "lastMessage": { 
              _id: createdMessage._id,
              sender: createdMessage.sender,
              content: createdMessage.content,
              sentAt: createdMessage.sentAt
            } }
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

