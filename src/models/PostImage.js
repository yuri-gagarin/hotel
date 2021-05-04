import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postImageSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: "room"
  },
  path: {
    type: String,
    required: true
  },
  absolutePath: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("PostImage", postImageSchema);