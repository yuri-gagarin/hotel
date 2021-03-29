import diningImageUploader from "../uploaders/diningImageUploader";
import diningEntertainmentController from "../controllers/diningEntertainmentController";

export default function (router) {
  // @route POST "/api/uploadDiningImage/:modelId? //
  // @desc Uploads a DiningImage //
  // @access PRIVATE //
  router
    .route("/api/uploadDiningModelImage/:diningModelId?")
    .post([diningImageUploader], diningEntertainmentController.uploadImage);

  // @route DELETE "/api/deleteDiningImage/:imageId" //
  // @desc  Deletes a DiningImage, removes file from the server //
  // @access PRIVATE //
  router  
    .route("/api/deleteDiningModelImage/:imageId")
    .delete(diningEntertainmentController.deleteImage);
};