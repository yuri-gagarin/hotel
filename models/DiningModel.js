import mongoose from "mongoose";
const Schema = mongoose.Schema;

const diningModelSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  hours: {
    type: String,
    required: true
  },
  images: [{
    type: Schema.Types.ObjectId,
    ref: "DiningModelImage"
  }],
  menuImages: [{
    type: Schema.Types.ObjectId,
    ref: "MenuImage"
  }],
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
    required: true
  },
  editedAt: {
    type: Date,
    default: new Date(Date.now()),
    required: true
  }
});

export default mongoose.model("DiningModel",  diningModelSchema);