import roomImageUploader from "../uploaders/roomImageUploader";
import roomsController from "../controllers/roomsController";

export default function (router) {
  // //
  router
    .route("/api/uploadRoomImage")
    .post([roomImageUploader], roomsController.uploadImage);
};