import mongoose from "mongoose";
const Schema = mongoose.Schema;

const diningEntertainmentModelSchema = new Schema({
  live: {
    type: Boolean,
    required: true,
    default: false
  },
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
  address: {
    type: String,
    required: false,
    default: ""
  },
  images: [{
    type: Schema.Types.ObjectId,
    ref: "DiningModelImage"
  }],
  menuImages: [{
    type: Schema.Types.ObjectId,
    ref: "MenuImage"
  }],
  optionType: {
    type: String,
    enum: ["restaurant", "cafe", "lounge" ],
    default: "restaurant"
  },
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

export default mongoose.model("DiningEntertainmentModel",  diningEntertainmentModelSchema);