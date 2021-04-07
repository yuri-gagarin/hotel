import { isLoggedIn } from "./helpers/routeHelpers";
import diningEntertainmentController from "../controllers/diningEntertainmentController";

export default function (router) {

  // @route GET "/api/dining_models" //
  // @description Fetches the DiningModels //
  // @access PRIVATE //
  router  
    .route("/api/dining_models")
    .get(diningEntertainmentController.getDiningModels);


  // @route POST "/api/dining_models/create"
  // @description Creates a new DiningModel to display
  // @access PRIVATE
  router
    .route("/api/dining_models/create")
    .post(diningEntertainmentController.createDiningModel);
    
    
  // @route PATCH "/api/diningModels/:diningModelId" //
  // @description Updates a DiningModel and all of its corresponding images //
  // @access PRIVATE //
  router
    .route("/api/dining_models/:diningModelId")
    .patch(diningEntertainmentController.updateDiningModel);

  // @route DELETE "/api/diningModels/:roomId" //
  // @description Deletes a DiningModel and all of its corresponding images //
  // @access PRIVATE //
  router  
    .route("/api/dining_models/:diningModelId")
    .delete(diningEntertainmentController.deleteDiningModel);

  // @route DELETE "/api/dining/remove_all_images" //
  // @desc Deletes all queried MenuImage, DiningEntImage models and correspodning files //
  // @access PRIVATE //
  router
    .route("/api/dining/remove_all_images")
    .delete(diningEntertainmentController.deleteAllImages)
};  