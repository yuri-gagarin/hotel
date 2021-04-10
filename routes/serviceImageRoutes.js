import serviceImageUploader from "../uploaders/serviceImageUploader";
import servicesController from "../controllers/servicesController";

export default function (router) {
  // @route POST "/api/services/upload_service_image/:serviceId? //
  // @desc Uploads a ServiceImage //
  // @access PRIVATE //
  router
    .route("/api/services/upload_service_image/:serviceId?")
    .post([serviceImageUploader], servicesController.uploadImage);

  // @route DELETE "/api/services/delete_service_image/:imageId" //
  // @desc  Deletes a ServiceImage, removes file from the server //
  // @access PRIVATE //
  router  
    .route("/api/services/delete_service_image/:imageId")
    .delete(servicesController.deleteImage);
};