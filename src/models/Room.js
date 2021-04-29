import mongoose from "mongoose";
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  live: {
    type: Boolean,
    required: true,
    default: false
  },
  roomType: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  sleeps: {
    type: String
  },
  price: {
    type: String
  },
  beds: {
    type: String
  },
  couches: {
    type: String
  },
  images: [{
    type: Schema.Types.ObjectId,
    ref: "RoomImage"
  }],
  description: {
    type: String,
    required: true
  },
  options: {
    privateBathroom: { type: Boolean },
    suiteBathroom: { type: Boolean },
    jacuzzi: { type: Boolean },
    balcony: { type: Boolean },
    terrace: { type: Boolean },
    mountainView: { type: Boolean },
    streetView: { type: Boolean },
    riverView: { type: Boolean },
    tv: { type: Boolean },
    wifi: { type: Boolean },
    phone: { type: Boolean },
    airConditioning: { type: Boolean },
    refrigerator: { type: Boolean },
    coffeeMaker: { type: Boolean }
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(Date.now())
  },
  editedAt: {
    type: Date,
    required: true,
    default: new Date(Date.now())
  }
});

export default mongoose.model("Room", roomSchema);