import { isLoggedIn } from "./helpers/routeHelpers";
import diningEntertainmentController from "../controllers/diningEntertainmentController";

export default function (router) {
  // @route POST "/api/createDiningModel"
  // @description Creates a new DiningModel to display
  // @access PRIVATE
  router
    .route("/api/createDiningModel")
    .post(diningEntertainmentController.createDiningModel);
    
  // @route GET "/api/diningModels" //
  // @description Fetches the DiningModels //
  // @access PRIVATE //
  router  
    .route("/api/diningModels")
    .get(diningEntertainmentController.getDiningModels);

    
  // @route PATCH "/api/diningModels/:diningModelId" //
  // @description Updates a DiningModel and all of its corresponding images //
  // @access PRIVATE //
  router
    .route("/api/diningModels/:diningModelId")
    .patch(diningEntertainmentController.updateDiningModel);

  // @route DELETE "/api/diningModels/:roomId" //
  // @description Deletes a DiningModel and all of its corresponding images //
  // @access PRIVATE //
  router  
    .route("/api/diningModels/:diningModelId")
    .delete(diningEntertainmentController.deleteDiningModel);
};  