import mongoose from "mongoose";
const Schema = mongoose.Schema;

const newsPostImageSchema = new Schema({
  newsPost: {
    type: Schema.Types.ObjectId,
    ref: "NewsPost"
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
    default: new Date(Date.now())
  }
});

export default mongoose.model("NewsPostImage", newsPostImageSchema);