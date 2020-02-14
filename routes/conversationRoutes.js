import conversationsController from "../controllers/conversationsController";

export default function (router) {
  // @route DELETE /api/conversations/:convId //
  // @desc Deletes a Conversation and related Message models //
  // @access PRIVATE
  router
    .route("/api/conversations/:convId")
    .delete(conversationsController.deleteConversation);
  
};