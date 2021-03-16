import roomImageUploader from "../uploaders/roomImageUploader";
import roomsController from "../controllers/roomsController";

export default function (router) {
  // //
  router
    .route("/api/uploadRoomImage/:roomId?")
    .post([roomImageUploader], roomsController.uploadImage);

  // @route DELETE "/api/deleteRoomImage/:imageId" //
  // @desc  Deletes a RoomImage, removes file from the server //
  // @access PRIVATE
  router  
    .route("/api/deleteRoomImage/:imageId")
    .delete(roomsController.deleteImage);
  
};