import mailerController from "../controllers/mailerController";

export default function(router) {
  
  // @route POST /api/mailer/send_contact_post_reply //
  // @desc Sends a reply email to a specific contact post //
  // @access PRIVATE //
  router
    .route("/api/mailer/send_contact_post_reply")
    .post(mailerController.sendEmail);
};