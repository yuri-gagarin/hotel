import menuImageUploader from "../uploaders/menuImageUploader";
import diningController from "../controllers/diningController";

export default function (router) {
  // @route POST "/api/dining/uploadMenuImage //
  // @desc Uploads a MenuImage //
  // @access PRIVATE //
  router
    .route("/api/dining/uploadMenuImage")
    .post([menuImageUploader], diningController.uploadMenuImage);

  // @route DELETE "/api/dining/deleteMenuImage/:imageId" //
  // @desc  Deletes a MenuImage, removes file from the server //
  // @access PRIVATE //
  router  
    .route("/api/dining/deleteMenuImage/:imageId")
    .delete(diningController.deleteMenuImage);
};