import mongoose from "mongoose";
const Schema = mongoose.Schema;

const roomImageSchema = new Schema({
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room"
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

export default mongoose.model("RoomImage", roomImageSchema);