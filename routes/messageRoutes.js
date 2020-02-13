import messagesController from "../controllers/messagesController";

export default function (router) {
  // @route /api/sendMessage //
  // @desc Sends a message, creating a new Message and Conversation model (if necessary) //
  // @access PUBLIC //
  router
    .route("/api/sendMessage")
    .post(messagesController.sendMessage);
};
