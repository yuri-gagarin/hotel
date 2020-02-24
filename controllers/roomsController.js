import Room from "../models/Room";

export default {
  getRooms: (req, res) => {

  },
  createRoom: (req, res) => {
    const roomData = req.body;
    return Room.create(roomData)
      .then((room) => {
        return res.status(200).json({
          responseMsg: "Room created",
          newRoom: room
        });
      })
      .catch((error) => {
        return res.status(500).json({
          responseMsg: "It seems an error occured",
          error: error
        })
      }); 
  },
  editRoom: (req, res) => {
    let status;
    const roomId = req.params.roomId;
    return Room.findOne({ _id: roomId })
      .then((room) => {
        if (!room) {
          status = 400;
          return Promise.reject(new Error("No room found"));
        }
        else return Promise.resolve(room);
      })
      .then((room) => {

      })
      .catch((error) => {
        return res.status(status || 500).json({
          responseMsg: "An error occured",
          error: error
        });
      });
  },
  deleteRoom: (req, res) => {

  }
};
