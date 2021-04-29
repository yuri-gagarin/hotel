import mongoose from "mongoose";
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  participants: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }],
  readMessages: [{
    type: Schema.Types.ObjectId,
    ref: "Message"
  }],
  unreadMessages: [{
    type: Schema.Types.ObjectId,
    ref: "Message"
  }],
  lastMessage: {
    _id: {
      type: Schema.Types.ObjectId,
    },
    sender: {
      type: String,
    },
    content: {
      type: String,
    },
    sentAt: {
      type: Date,
    }
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export default mongoose.model("Conversation", conversationSchema);