import messagesController from "../controllers/messagesController";

export default function (router) {
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
};
