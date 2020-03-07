import serviceImageUploader from "../uploaders/serviceImageUploader";
import servicesController from "../controllers/servicesController";

export default function (router) {
  // @route POST "/api/uploadServiceImage //
  // @desc Uploads a ServiceImage //
  // @access PRIVATE //
  router
    .route("/api/uploadServiceImage")
    .post([serviceImageUploader], servicesController.uploadImage);

  // @route DELETE "/api/deleteServiceImage/:imageId" //
  // @desc  Deletes a ServiceImage, removes file from the server //
  // @access PRIVATE //
  router  
    .route("/api/deleteServiceImage/:imageId")
    .delete(servicesController.deleteImage);
};