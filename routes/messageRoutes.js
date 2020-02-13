export default function (router) {
  router
    .route("/api/sendMessage")
    .post(messagesController.sendMessage);
};
