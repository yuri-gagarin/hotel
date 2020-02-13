import mongoose from "mongoose";
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  participants: [{
    type: Schema.ObjectId,
    required: true,
    ref: "User"
  }],
  messages: [{
    type: Schema.ObjectId,
    ref: "Message"
  }],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export default mongoose.model("Conversation", conversationSchema);