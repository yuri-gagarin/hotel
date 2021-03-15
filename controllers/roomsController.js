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
    const { roomData } = req.body;
    let createdRoom;
    ///   channel managert data //
    return Room.create(roomData)
      .then((room) => {
        createdRoom = room;
        return Room.populate(room, { path: "images", model: "RoomImage"});
      })
      .then((populatedRoom) => {
        if (populatedRoom.populated("images")) {
          // update image models //
          const imageIdsToUpdate = populatedRoom.images.map((roomImg) => roomImg._id);
          return RoomImage.updateMany({ _id: imageIdsToUpdate, }, { room: populatedRoom._id });
        } else {
          return Promise.resolve({ nModified: 0 });
        }
      })
      .then((_) => {
        return res.status(200).json({
          responseMsg: "Room created",
          newRoom: createdRoom
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
    let status, editedRoom;
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
      editedRoom = updatedRoom;
      return Room.populate(updatedRoom, { path: "images", model: "RoomImage" });
    })
    .then((populatedRoom) => {
      if (populatedRoom.populated("images")) {
        return RoomImage.updateMany({ _id: updatedImages },  { room: populatedRoom._id }).exec();
      } else {
        return Promise.resolve({ nModified: 0 });
      }
    })
    .then((_) => {
      return res.status(200).json({
        responseMsg: "Room Updated",
        updatedRoom: editedRoom
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
    let deletedRoom;
    // console.log(req.body);
    const imagePaths = roomImages.map((img) => `${img.path}`);
    const imageIds = roomImages.map((img) => `${img._id}`);

    return Room.findOneAndDelete({ _id: roomId })
      .then((room) => {
        deletedRoom = room;
        // delete the corresponding room images from the uploads folder //
        const deletePromises = imagePaths.map((filePath) => deleteFile(filePath))
        return Promise.all(deletePromises);
      })
      .then((deleteArray) => {
        console.log(92);
        console.log(deleteArray);
        return RoomImage.deleteMany({ _id: imageIds });
      })
      .then((response) => {
        console.log(response);
        return res.status(200).json({
          responseMsg: "Successfully Deleted",
          deletedRoom: deletedRoom
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
