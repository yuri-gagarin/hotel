import diningImageUploader from "../uploaders/diningImageUploader";
import diningEntertainmentController from "../controllers/diningEntertainmentController";

export default function (router) {
  // @route POST "/api/upload_dining_model_image/:modelId? //
  // @desc Uploads a DiningImage //
  // @access PRIVATE //
  router
    .route("/api/upload_dining_model_image/:diningModelId?")
    .post([diningImageUploader], diningEntertainmentController.uploadImage);

  // @route DELETE "/api/delete_dining_model_image/:imageId" //
  // @desc  Deletes a DiningImage, removes file from the server //
  // @access PRIVATE //
  router  
    .route("/api/delete_dining_model_image/:imageId")
    .delete(diningEntertainmentController.deleteImage);
};