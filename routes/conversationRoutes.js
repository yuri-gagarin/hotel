import conversationsController from "../controllers/conversationsController";
import { isLoggedIn } from "./helpers/routeHelpers";

export default function (router) {
  // @route DELETE /api/conversations/:convId //
  // @desc Deletes a Conversation and related Message models //
  // @access PRIVATE //
  router
    .route("/api/conversations/:convId")
    .delete(isLoggedIn, conversationsController.deleteConversation);
  
  // @route GET /api/conversations //
  // @desc Gets all the converstions in database //
  // @access PRIVATE //
  router
    .route("/api/conversations")
    .get(conversationsController.getAllConversations);
    
  // @route GET /api/conversations/:convId //
  // @desc Opens up a Conversation, marks Message(s) as read //
  // @access PRIVATE //
  router
    .route("/api/conversations/:convId")
    .get(conversationsController.openConversation);
};