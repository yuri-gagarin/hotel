import Message from "../models/Message";
// instant messaging between client and admin //
// maybe later we can implement these in redis rather than Mongo if needed //
export default {
  /*
  // this is handled through redis now //
  sendClientMessage: (req, res) => {
    const { messageContent, user } = req.body;
    const userId = user._id;
    let { conversationId } = req.body;
    let newMessage;
    console.log(req.body);
    if (!user) {
      return Promise.resolve().then(() => {
        res.status(400).json({
          responseMsg: "Couldn't set user"
        });
      });
    }
    if (!messageContent) {
      return Promise.resolve().then(() => {
        res.status(400).json({
          responseMsg: "Couldn't resolve message data"
        });
      });
    }
    // look for a conversation if conversationId exists //
    if (conversationId) {
      console.log(31)
      console.log(conversationId)
      return Conversation.findById(conversationId)
        .then((conversation) => {
          if (conversation) {
            return Promise.resolve(conversation);
          } else {
            return Promise.reject(new Error ("Can't find a conversation"));
          }
        })
        .then((conversation) => {
          console.log(41);
          console.log(conversation)
          return Message.create({
            conversationId: conversationId,
            sender: user.firstName,
            content: messageContent
          });
        })
        .then((createdMessage) => {
          newMessage = createdMessage;
          console.log(46)
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
      console.log(79)
      return Conversation.create({
        participants: [
          user._id
        ]
      })
      .then((conversation) => {
        console.log(86)
        console.log(conversation)
        conversationId = conversation._id;
        return Message.create({
          conversationId: conversationId,
          sender: user.firstName,
          content: messageContent
        });
      })
      .then((createdMessage) => {
        newMessage = createdMessage;
        console.log(91)
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
        console.log(110)
        return res.status(200).json({
          responseMsg: "Your message was sent",
          conversationId: conversationId,
          newMessage: newMessage,
          user: user
        });
      })
      .catch((error) => {
        console.error(error)
        return res.status(500).json({
          responseMsg: "Ooops we seem to have a server error",
          error: error
        });
      });
    }
  },
  */
  // separate controller action for admin message // 
  // admin will be able to send pictures, invoices etc //
  /*
  sendAdminMessage: (req, res) => {
    const user = req.user;
    const { messageData } = req.body;
    let conversationId = req.body.conversationId;
    let newMessage;
    // validate message later //
    const { errors, isValid } = validateMessage(messageData);
    
    if (user) {
      return Promise.resolve().then(() => {
        return res.status(400).json({
          responseMsg: "Can't resolve user",
          error: new Error("Cant resolve user")
        });
      });
    }
    if (!isValid) {
      return Promise.resolve().then(() => {
        return res.status(400).json({
          responseMsg: "An error occured",
          error: errors
        });
      });
    }
    // check for existing conversation create one if necessary //
    if (conversationId)  {
      return Conversation.findById({ _id: conversationId })
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
    } else {

    }
   
  },
  markMessageRead: (req, res) => {
    const conversationId = req.body.conversationId;

  }
  */
  fetchDefaultMessages: (req, res) => {
    return Message.find({}).exec()
      .then((defaultMessages) => {
        return res.status(200).json({
          responseMsg: "Fetched default messages",
          defaultMessages
        });
      })
      .catch((error) => {
        return res.status(500).json({
          responseMsg: "Server Error",
          error
        });
      });
  },
  createMessage: (req, res) => {
    const { messageData } = req.body;
    console.log(250)
    if (!messageData || !messageData.messageContent) {
      return res.status(400).json({
        responseMsg: "Invalid data",
        error: new Error("Invalid Data")
      });
    }

    return Message.create({
      sender: "admin",
      messageContent: messageData.messageContent
    })
    .then((createdMessage) => {
      return res.status(200).json({
        responseMsg: "New default message created",
        createdMessage
      });
    })
    .catch((error) => {
      return res.status(500).json({
        reponseMsg: "General error",
        error: error
      });
    });
  },
  updateMessage: (req, res) => {
    const { messageId } = req.params;
    const { messageData } = req.body;
    if (!messageId || !messageData || !messageData.messageContent) {
      return res.status(400).json({
        responseMsg: "Invalid data",
        error: new Error("Invalid Data")
      });
    }

    return Message.findOneAndUpdate(
      { _id: messageId },
      { $set: { messageContent: messageData.messageContent, sentAt: new Date(Date.now()) }},
      { new: true }
    )
    .exec()
    .then((updatedMessage) => {
      if (updatedMessage) {
        return res.status(200).json({
          responseMsg: "Default message updated",
          updatedMessage
        });
      } else {
        return res.status(404).json({
          responseMsg: "Not Found Error",
          erorr: new Error("Could not fing a Message model to update")
        });
      }
    });
  },
  deleteMessage: (req, res) => {
    const { messageId } = req.params;
    if (!messageId ) {
      return res.status(400).json({
        responseMsg: "Invalid Data",
        error: new Error("Could not resolve message id")
      });
    }

    return Message.findOneAndDelete({ _id: messageId }).exec()
      .then((deletedMessage) => {
        if (deletedMessage) {
          return res.status(200).json({
            responseMsg: "Message default deleted",
            deletedMessage
          });
        } else {
          return res.status(404).json({
            responseMsg: "Not Found Error",
            error: new Error("Could not find message to delete")
          });
        }
      })
      .catch((error) => {
        return res.status(500).json({
          responseMsg: "General Error",
          error
        });
      });
  }
};

