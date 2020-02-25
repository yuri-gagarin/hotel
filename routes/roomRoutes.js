import { isLoggedIn } from "./helpers/routeHelpers";
import roomsController from "../controllers/roomsController";

export default function (router) {
  // @route "/api/createRoom"
  // @description Creates a new room to display
  // @access PRIVATE
  router
    .route("/api/createRoom")
    .post(roomsController.createRoom);
    
  // @route "/api/rooms" //
  // @description Fetches the rooms //
  // @access PRIVATE //
  router  
    .route("/api/rooms")
    .get(roomsController.getRooms);

    
};  