import { isLoggedIn } from "./helpers/routeHelpers";
import servicesController from "../controllers/servicesController";

export default function (router) {
  
  // @route GET "/api/services" //
  // @description Fetches the services //
  // @access PRIVATE //
  router  
    .route("/api/services")
    .get(servicesController.getServices);

  // @route POST "/api/services/create_new_service"
  // @description Creates a new Service to display
  // @access PRIVATE
  router
  .route("/api/services/create_new_service")
  .post(servicesController.createHotelService);
    
  // @route PATCH "/api/services/:serviceId" //
  // @description Updates a Service and all of its corresponding images //
  // @access PRIVATE //
  router
    .route("/api/services/:serviceId?")
    .patch(servicesController.updateService);
  
  // @route DELETE "/api/services/remove_all_images" //
  // @desc Deletes all queried ServiceImage models and its corresponding models //
  // @access PRIVATE //
  router  
    .route("/api/services/remove_all_images")
    .delete(servicesController.deleteAllImages);
    
  // @route DELETE "/api/services/:roomId" //
  // @description Deletes a Service and all of its corresponding images //
  // @access PRIVATE //
  router  
    .route("/api/services/:serviceId")
    .delete(servicesController.deleteHotelService);

  
};  