import mongoose from "mongoose";
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  roomType: {
    type: String,
    required: true
  },
  area: {
    type: Number,
    required: true
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
  images: {
    type: [Schema.Types.ObjectId],
    ref: "RoomImage"
  },
  description: {
    type: String,
    required: true
  },
  options: {
    privateBathroom: { type: Boolean },
    suiteBathroom: { type: Boolean },
    balcony: { type: Boolean },
    terrace: { type: Boolean },
    mountainView: { type: Boolean },
    streetView: { type: Boolean },
    riverView: { type: Boolean },
    tv: { type: Boolean },
    wifi: { type: Boolean },
    airConditioning: { type: Boolean },
  }
});

export default mongoose.model("Room", roomSchema);