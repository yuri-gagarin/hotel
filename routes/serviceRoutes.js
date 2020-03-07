import { isLoggedIn } from "./helpers/routeHelpers";
import servicesController from "../controllers/servicesController";

export default function (router) {
  // @route POST "/api/createService"
  // @description Creates a new Service to display
  // @access PRIVATE
  router
    .route("/api/createService")
    .post(servicesController.createService);
    
  // @route GET "/api/services" //
  // @description Fetches the services //
  // @access PRIVATE //
  router  
    .route("/api/services")
    .get(servicesController.getService);

    
  // @route PATCH "/api/services/:serviceId" //
  // @description Updates a Service and all of its corresponding images //
  // @access PRIVATE //
  router
    .route("/api/services/:roomId")
    .patch(servicesController.updateService);

  // @route DELETE "/api/services/:roomId" //
  // @description Deletes a Service and all of its corresponding images //
  // @access PRIVATE //
  router  
    .route("/api/services/:serviceId")
    .delete(servicesController.deleteService);
};  