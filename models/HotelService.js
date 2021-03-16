import mongoose from "mongoose";
const Schema = mongoose.Schema;

const hotelServiceSchema = new Schema({
  serviceType: {
    type: String,
    required: true
  },
  hours: {
    type: String,
    required: true
  },
  price: {
    type: String
  },
  images: [{
    type: Schema.Types.ObjectId,
    ref: "ServiceImage"
  }],
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now())
  },
  editedAt: {
    type: Date,
    default: new Date(Date.now())
  }
});

export default mongoose.model("HotelService", hotelServiceSchema);