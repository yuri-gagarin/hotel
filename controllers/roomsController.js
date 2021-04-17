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
          responseMsg: "Loaded all Rooms",
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
    console.log(25);
    console.live(req);
    const { roomData, roomImages = [] } = req.body;
    const { roomType, area, sleeps, price, beds, couches, description, options } = roomData;
    let createdRoom;
    ///   channel managert data //
    return Room.create({ 
      roomType,
      area,
      sleeps,
      price,
      beds,
      couches,
      description,
      options,
      live: false,
      images: [ ...roomImages ],
      createdAt: new Date(Date.now()), 
      editedAt: new Date(Date.now()) 
    })
    .then((room) => {
      return Room.populate(room, { path: "images", model: "RoomImage" });
    })
    .then((populatedRoom) => {
      createdRoom = populatedRoom;
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
    const { roomData = {}, roomImages = [], onlineStatus, allRoomsOnlineStatus } = req.body;
    const updatedImages = roomImages ? roomImages.map((img) => `${img._id}` ) : [];
    
    if (onlineStatus && typeof onlineStatus === "object" && typeof onlineStatus.status === "boolean") {
      const { status } = onlineStatus;
      return Room.findOneAndUpdate(
        { _id: roomId },
        { $set: { live: status } },
        { new: true }
      )
      .populate("images").exec()
      .then((updatedRoom) => {
        return res.status(200).json({
          responseMsg: `Current room is now: ${updatedRoom.live ? "Live" : "Not Live"}`,
          updatedRoom: updatedRoom
        });
      })
      .catch((error) => {
        return res.status(500).json({
          responseMsg: "An error occured",
          error: error
        });
      });
    }

    console.log(allRoomsOnlineStatus)
    if (allRoomsOnlineStatus && typeof allRoomsOnlineStatus === "object" && typeof allRoomsOnlineStatus.live === "boolean") {
      console.log(allRoomsOnlineStatus)
      const { live } = allRoomsOnlineStatus;
      return Room.update({}, { live: live }, { multi: true })
        .then((response) => {
          return Room.find({}).populate("images").exec();
        })
        .then((updatedRooms) => {
          const responseMsg = `All Rooms are now: ${live ? "online" : "offline"}.`;
          return res.status(200).json({
            responseMsg, updatedRooms
          });
        })
        .catch((error) => {
          return res.status(500).json({
            responseMsg: "An error occured",
            error: error
          });
        });
    }

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
          options: { ...roomData.options },
          editedAt: new Date(Date.now())
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
    const { roomId } = req.params;
    let uploadedImage, updatedRoom;
    if (imageUploadResult.success) {
      if (roomId) {
        // request is on an existing room //
        return RoomImage.create({ path: imageUploadResult.imagePath, room: roomId, createdAt: new Date(Date.now()) })
          .then((createdImage) => {
            uploadedImage = createdImage;
            return (
              Room.findOneAndUpdate({ _id: roomId }, { $push: { images: createdImage._id } }, { new: true })
                .populate("images").exec()
            );
          })
          .then((room) => {
            updatedRoom = room
            return res.status(200).json({
              responseMsg: "Uploaded an image",
              newImage: uploadedImage,
              updatedRoom: updatedRoom
            });
          })
          .catch((error) => {
            return res.status(500).json({
              responseMsg: "A database error occured",
              error: error
            });
          });
      } else {
        // reqeust is on a new room, not created yet //
        return RoomImage.create({ path: imageUploadResult.imagePath, createdAt: new Date(Date.now()) })
          .then((createdImage) => {
            return res.status(200).json({
              responseMsg: "Uploaded an image",
              newImage: createdImage,
              updatedRoom: null
            });
          })
          .catch((error) => {
            console.error(error)
            return res.status(500).json({
              responseMsg: "A database error occured",
              error: error
            });
          })
      }
    } else {
      return res.status(500).json({
        responseMsg: "Upload not successful"
      });
    }
  },
  deleteImage: (req, res) => {
    const { imageId } = req.params;
    let deletedImage, updatedRoom;

    return RoomImage.findOneAndDelete({ _id: imageId })
      .then((deletedImg) => {
        if (deletedImg) {
          deletedImage = deletedImg;
          // remove from the files //
          return deleteFile(deletedImg.path);
        } else {
          return Promise.reject(new Error("No Image was found"));
        }
      })
      .then(() => {
        return (
          Room
            .findOneAndUpdate({ _id: deletedImage.room },  { $pull: { images: deletedImage._id } }, { new: true })
            .populate("images").exec()
          )
      })
      .then((room) => {
        updatedRoom = room;
        return res.status(200).json({
          responseMsg: "Deleted the image",
          deletedImage: deletedImage,
          updatedRoom: updatedRoom
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
