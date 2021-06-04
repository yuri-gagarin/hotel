import mongoose from "mongoose";
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  participants: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  conversationId: {
    type: String,
    required: true
  },
  conversationName: {
    type: String,
    required: false,
    default: "Anonymous"
  },
  archived: {
    type: Boolean,
    required: true
  },
  newConversation: {
    type: Boolean,
    required: true,
    default: false
  },
  receiverSocketId: {
    type: String,
    required: false
  },
  messages: [
    {
      _id: Schema.Types.ObjectId,
      conversationId: String,
      sender: String,
      receiverSocketId: String,
      senderSocketId: String,
      messageContent: String,
      sentAt: String
    }
  ],
  newMessages: [
    {
      _id: Schema.Types.ObjectId,
      conversationId: String,
      sender: String,
      receiverSocketId: String,
      senderSocketId: String,
      messageContent: String,
      sentAt: String
    }
  ],
  createdAt: {
    type: Date,
    required: true,
    default: new Date(Date.now())
  }
});

export default mongoose.model("Conversation", conversationSchema);