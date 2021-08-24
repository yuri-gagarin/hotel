import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userScema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: false
  },
  role: {
    type: String,
    enum: ["admin", "owner"],
    required: true,
    default: "admin"
  },
  confirmed: {
    type: Boolean,
    required: true,
    default: false
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(Date.now())
  },
  editedAt: {
    type: Date,
    required: new Date(Date.now())
  }
});

export default mongoose.model("User", userScema);