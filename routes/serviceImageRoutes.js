import serviceImageUploader from "../uploaders/serviceImageUploader";
import servicesController from "../controllers/servicesController";

export default function (router) {
  // @route POST "/api/services/uploadServiceImage //
  // @desc Uploads a ServiceImage //
  // @access PRIVATE //
  router
    .route("/api/services/uploadServiceImage/:serviceId?")
    .post([serviceImageUploader], servicesController.uploadImage);

  // @route DELETE "/api/services/deleteServiceImage/:imageId" //
  // @desc  Deletes a ServiceImage, removes file from the server //
  // @access PRIVATE //
  router  
    .route("/api/services/deleteServiceImage/:imageId")
    .delete(servicesController.deleteImage);
};