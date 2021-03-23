import mongoose from "mongoose";
const Schema = mongoose.Schema;

const contactPostSchema = new Schema({
  name: {
    type: String,
    required: false,
    default: "Guest"
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: false
  },
  content: {
    type: String,
    required: true
  },
  replyContent: {
    type: String,
    default: ""
  },
  read: {
    type: Boolean,
    default: false
  },
  archived: {
    type: Boolean,
    default: false,
  },
  replied: {
    type: Boolean,
    default: false
  },
  sentAt: {
    type: Date,
    default: new Date(Date.now())
  },
  repliedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now())
  },
  editedAt: {
    type: Date,
    default: new Date(Date.now())
  },
  
});

export default mongoose.model("ContactPost",  contactPostSchema);