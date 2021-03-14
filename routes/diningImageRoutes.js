import diningImageUploader from "../uploaders/diningImageUploader";
import diningController from "../controllers/diningController";

export default function (router) {
  // @route POST "/api/dining/uploadDiningImage //
  // @desc Uploads a DiningImage //
  // @access PRIVATE //
  router
    .route("/api/dining/uploadDiningImage")
    .post([diningImageUploader], diningController.uploadImage);

  // @route DELETE "/api/dining/deleteDiningImage/:imageId" //
  // @desc  Deletes a DiningImage, removes file from the server //
  // @access PRIVATE //
  router  
    .route("/api/dining/deleteDiningImage/:imageId")
    .delete(diningController.deleteImage);
};