import mongoose from "mongoose";
const Schema = mongoose.Schema;
// message defaults set by admin in admin messenger //

const messageSchema = new Schema({
  conversationId: {
    type: String,
    required: false
  },
  sender: {
    type: String,
    enum: [ "admin", "client" ],
    required: false
  },
  receiverSocketId: {
    type: String,
    required: false
  },
  senderSocketId: {
    type: String,
    required: false,
  },
  messageContent: {
    type: String,
    required: true
  },
  sentAt: {
    type: Date,
    required: true,
    default: new Date(Date.now())
  }, 
  
});

export default mongoose.model("Message", messageSchema);