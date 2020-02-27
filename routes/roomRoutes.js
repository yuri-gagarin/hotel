import { isLoggedIn } from "./helpers/routeHelpers";
import roomsController from "../controllers/roomsController";

export default function (router) {
  // @route POST "/api/createRoom"
  // @description Creates a new room to display
  // @access PRIVATE
  router
    .route("/api/createRoom")
    .post(roomsController.createRoom);
    
  // @route GET "/api/rooms" //
  // @description Fetches the rooms //
  // @access PRIVATE //
  router  
    .route("/api/rooms")
    .get(roomsController.getRooms);

    
  // @route PATCH "/api/rooms/:roomId" //
  // @description Updates a room and all of its corresponding images //
  // @access PRIVATE //
  router
    .route("/api/rooms/:roomId")
    .patch(roomsController.updateRoom);

  // @route DELETE "/api/rooms/:roomId" //
  // @description Deletes a room and all of its corresponding images //
  // @access PRIVATE //
  router  
    .route("/api/rooms/:roomId")
    .delete(roomsController.deleteRoom);
};  