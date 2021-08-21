import menuImageUploader from "../uploaders/menuImageUploader";
import diningEntertainmentController from "../controllers/diningEntertainmentController";

export default function (router) {
  // @route POST "/api/dining/upload_menu_image/:modelId //
  // @desc Uploads a MenuImage //
  // @access PRIVATE //
  router
    .route("/api/dining/upload_menu_image/:modelId?")
    .post([menuImageUploader], diningEntertainmentController.uploadMenuImage);

  // @route DELETE "/api/dining/delete_nenu_image/:imageId" //
  // @desc  Deletes a MenuImage, removes file from the server //
  // @access PRIVATE //
  router  
    .route("/api/dining/delete_menu_image/:imageId")
    .delete(diningEntertainmentController.deleteMenuImage);

}