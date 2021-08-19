import roomImageUploader from "../uploaders/roomImageUploader";
import roomsController from "../controllers/roomsController";

export default function (router) {
  // @route POST "/api/upload_room_image/:roomId?" //
  // @desc  Uploads a RoomImage creates a new file //
  // @access PRIVATE
  router
    .route("/api/upload_room_image/:roomId?")
    .post([roomImageUploader], roomsController.uploadImage);

  // @route DELETE "/api/deleteRoomImage/:imageId" //
  // @desc  Deletes a RoomImage, removes file from the server //
  // @access PRIVATE
  router  
    .route("/api/delete_room_image/:imageId")
    .delete(roomsController.deleteImage);
  
}