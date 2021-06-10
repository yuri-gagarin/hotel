import messagesController from "../controllers/messagesController";

export default function(router) {

  // Message sending is handled through redis now */
  /*
  // @route /api/sendClientMessage //
  // @desc Sends a message, creating a new Message and Conversation model (if necessary) //
  // @access PUBLIC //
  router
    .route("/api/sendClientMessage")
    .post(messagesController.sendClientMessage);
  
  // @route /api/sendAdminMessage //
  // @desc Sends an admin response message, creating a new Message and Conversation model (if necessary) //
  // @access Private //
  router
    .route("/api/sendAdminMessage")
    .post(messagesController.sendAdminMessage);
  */
  // @route POST /api/messages/create //
  // @desc Creates a Message model. To be used by admin for defaults //
  // @access Private //
  router 
    .route("/api/messages/create")
    .post(messagesController.createMessage);
  
  // @route DELETE /api/messages/delete/:messageId //
  // @desc Deletes a Message model. To be used by admin for defaults //
  // @access Private //
  router 
    .route("/api/messages/delete/:messageId")
    .delete(messagesController.deleteMessage);
}
