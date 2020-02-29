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
  createdAt: {
    type: Date,
    default: Date.now
  },
});

export default mongoose.model("ContactPost",  contactPostSchema);