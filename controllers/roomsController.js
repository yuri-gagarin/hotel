import Room from "../models/Room";
import RoomImage from "../models/RoomImage";
// helpers //
import { deleteFile } from "./helpers/apiHelpers";

export default {
  getRooms: (req, res) => {
    return Room.find({})
      .populate("images", ["_id", "path"])
      .then((rooms) => {
        //console.log(rooms);
        return res.status(200).json({
          responseMsg: "Success",
          rooms: rooms
        });
      })
      .catch((error) => {
        return res.status(500).json({
          responseMsg: "An error occured",
          error: error
        });
      });
  },
  createRoom: (req, res) => {
    const  { roomData } = req.body;
    return Room.create(roomData)
      .then((room) => {
        return res.status(200).json({
          responseMsg: "Room created",
          newRoom: room
        });
      })
      .catch((error) => {
        console.error(error)
        return res.status(500).json({
          responseMsg: "It seems an error occured",
          error: error
        })
      }); 
      
  },
  updateRoom: (req, res) => {
    let status, foundRoom;
    const roomId = req.params.roomId;
    const { roomData, roomImages } = req.body;
    const updatedImages = roomImages.currentImages.map((img) => `${img._id}` );

    return Room.findOneAndUpdate(
      { _id: roomId },
      {
        $set: { 
          roomType: roomData.roomType,
          area: roomData.area,
          sleeps: roomData.sleeps,
          price: roomData.price,
          beds: roomData.beds,
          couches: roomData.couches,
          description: roomData.description,
          images: [ ...updatedImages ],
          options: { ...roomData.options }
        },
      },
      { new: true }
    ).then((updatedRoom) => {
      return updatedRoom.populate("images", [ "_id", "path" ])
    })
    .then((room) => {
      return res.status(200).json({
        responseMsg: "Room Updated",
        updatedRoom: room
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(status || 500).json({
        responseMsg: "An error occured",
        error: error
      });
    });
  },
  deleteRoom: (req, res) => {
    const roomId = req.params.roomId;
    const { roomData, roomImages } = req.body;
    const imagePaths = roomImages.currentImages.map((img) => `${img.path}`);
    const imageIds = roomImages.currentImages.map((img) => `${img._id}`);

    return Room.findOneAndDelete({ _id: roomId })
      .then((room) => {
        // delete the corresponding room images from the uploads folder //
        const deletePromises = imagePaths.map((filePath) => deleteFile([filePath]))
        return Promise.all(deletePromises);
      })
      .then((deleteArray) => {
        console.log(92);
        console.log(deleteArray);
        return RoomImage.deleteMany({ _id: imageIds });
      })
      .then((response) => {
        console.log(response);
        return response.status(200).json({
          responseMsg: "Successfully Deleted"
        });
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).json({
          responseMsg: "An error occured deleting the room",
          error: error
        });
      });
  },
  uploadImage: (req, res) => {
    const imageUploadResult = req.locals.roomImageUpload;
    if (imageUploadResult.success) {
      return RoomImage.create({
        path: imageUploadResult.imagePath
      })
      .then((roomImage) => {
        return res.status(200).json({
          responseMsg: "Uploaded an image",
          newImage: roomImage
        });
      })
      .catch((error) => {
        return res.status(500).json({
          responseMsg: "A database error occured",
          error: error
        });
      });
    } else {
      return res.status(500).json({
        responseMsg: "Upload not successful"
      });
    }
  },
  deleteImage: (req, res) => {
    const { imageId } = req.params;
    return RoomImage.findOneAndDelete({ _id: imageId })
      .then((deletedImg) => {
        if (deletedImg) {
          // remove from the files //
          return deleteFile(deletedImg.path);
        } else {
          return Promise.reject(new Error("No Image was found"));
        }
      })
      .then((response) => {
        return res.status(200).json({
          responseMsg: "Deleted the image"
        });
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).json({
          responseMsg: "A delete error occured",
          error: error
        });
      });
  }
};
