import conversationsController from "../controllers/conversationsController";
//import { isLoggedIn } from "./helpers/routeHelpers";

export default function(router) {
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
  
  // @route POST /api/conversations/archive //
  // @desc Archives an active Conversation //
  // @access PRIVATE //
  router 
    .route("/api/conversations/archive")
    .post(conversationsController.archiveConversation);

  // @route DELETE /api/conversations/:conversationId //
  // @desc Deletes a Conversation and related Message models //
  // @access PRIVATE //
  router
  .route("/api/conversations/:conversationId")
  .delete(conversationsController.deleteConversation);
}