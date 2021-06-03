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
  archived: {
    type: Boolean,
    required: true
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
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export default mongoose.model("Conversation", conversationSchema);