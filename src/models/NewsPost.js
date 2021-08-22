import mongoose from "mongoose";
const Schema = mongoose.Schema;

const newsPostSchema = new Schema({
  createdBy: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  live: {
    type: Boolean,
    default: false
  },
  images: [{
    type: Schema.Types.ObjectId,
    ref: "NewsPostImage"
  }],
  createdAt: {
    type: Date,
    default: new Date(Date.now())
  },
  editedAt: {
    type: Date,
    default: new Date(Date.now())
  }
});

export default mongoose.model("NewsPost",  newsPostSchema);