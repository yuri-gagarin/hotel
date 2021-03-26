import diningImageUploader from "../uploaders/diningImageUploader";
import diningEntertainmentController from "../controllers/diningEntertainmentController";

export default function (router) {
  // @route POST "/api/dining/uploadDiningImage //
  // @desc Uploads a DiningImage //
  // @access PRIVATE //
  router
    .route("/api/dining/uploadDiningImage")
    .post([diningImageUploader], diningEntertainmentController.uploadImage);

  // @route DELETE "/api/dining/deleteDiningImage/:imageId" //
  // @desc  Deletes a DiningImage, removes file from the server //
  // @access PRIVATE //
  router  
    .route("/api/dining/deleteDiningImage/:imageId")
    .delete(diningEntertainmentController.deleteImage);
};