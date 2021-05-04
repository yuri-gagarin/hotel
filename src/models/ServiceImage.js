import mongoose from "mongoose";
const Schema = mongoose.Schema;

const serviceImageSchema = new Schema({
  hotelService: {
    type: Schema.Types.ObjectId,
    ref: "HotelService"
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

export default mongoose.model("ServiceImage", serviceImageSchema);