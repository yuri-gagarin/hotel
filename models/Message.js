import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  conversationId: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
    required: true
  },
  sender: {
    type: String,
    required: true,
  },
  senderIp: {
    type: String,
    required: true
  },
  sentAt: {
    type: Date,
    required: true,
    default: Date.now
  }, 
  read: {
    type: Boolean,
    required: true,
    default: false
  }
});

export default mongoose.model("Message", messageSchema);