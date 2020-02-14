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
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export default mongoose.model("Conversation", conversationSchema);