import mongoose from "mongoose";
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  roomType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  images: {
    type: [String]
  },
  sleeps: {
    type: Number
  },
  price: {
    type: Number
  },
  beds: {
    type: Number
  },
  couches: {
    type: Number
  },
  options: {
    privateBathroom: { type: Boolean },
    suiteBathroom: { type: Boolean },
    balcony: { type: Boolean },
    terrace: { type: Boolean },
    mountainView: { type: Boolean },
    riverView: { type: Boolean },
    tv: { type: Boolean },
    wifi: { type: Boolean },
    airConditioning: { type: Boolean },
  }
});

export default mongoose.model("Room", roomSchema);