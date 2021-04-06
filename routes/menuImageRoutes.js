import menuImageUploader from "../uploaders/menuImageUploader";
import diningEntertainmentController from "../controllers/diningEntertainmentController";

export default function (router) {
  // @route POST "/api/dining/upload_menu_image/:modelId //
  // @desc Uploads a MenuImage //
  // @access PRIVATE //
  router
    .route("/api/dining/upload_menu_image/:modelId?")
    .post([menuImageUploader], diningEntertainmentController.uploadMenuImage);

  // @route DELETE "/api/dining/deleteMenuImage/:imageId" //
  // @desc  Deletes a MenuImage, removes file from the server //
  // @access PRIVATE //
  router  
    .route("/api/dining/deleteMenuImage/:imageId")
    .delete(diningEntertainmentController.deleteMenuImage);
};