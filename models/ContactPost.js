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
  read: {
    type: Boolean,
  },
  sentAt: {
    type: Date,
    default: new Date(Data.now())
  },
  repliedAt: {
    type: Date
  }
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