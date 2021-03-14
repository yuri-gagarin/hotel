import mongoose from "mongoose";
const Schema = mongoose.Schema;

const menuImageSchema = new Schema({
  diningModel: {
    type: Schema.Types.ObjectId,
    ref: "DiningModel"
  },
  path: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: new Date(Date.now())
  }
});

export default mongoose.model("MenuImage", menuImageSchema);