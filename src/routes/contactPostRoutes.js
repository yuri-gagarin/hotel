import contactPostsController from "../controllers/contactPostsController";

export default function (router) {
  // @route GET "/api/contactPosts" //
  // @desc Gets all of the ContactPost(s) //
  // @access PRIVATE //
  router
    .route("/api/contactPosts")
    .get(contactPostsController.getContactPosts);
  
  // @route POST "/api/contactPosts" //
  // @desc Creates a new ContactPost from client and saves in database //
  // @access PUBLIC //
  router  
    .route("/api/contactPosts")
    .post(contactPostsController.sendContactPost);
  
  // @route PATCH "/api/contactPosts/:contactPostId" //
  // @desc Edits the current ContactPost model //
  // @access PRIVATE //
  router
    .route("/api/contactPosts/:contactPostId")
    .patch(contactPostsController.updateContactPost);
  
  // @route DELETE "/api/contactPosts/:contactPostId" //
  // @desc Delets a ContactPost from the database //
  // @access PRIVATE //
  router
    .route("/api/contactPosts/:contactPostId")
    .delete(contactPostsController.deleteContactPost);
};
