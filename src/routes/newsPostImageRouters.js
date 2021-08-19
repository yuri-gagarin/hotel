import newsPostImageUploader from "../uploaders/newsPostImageUploader";
import newsPostsController from "../controllers/newsPostsController";

export default function (router) {
  
  // @route POST "/api/upload_news_post_image/:newsPostId?" //
  // @desc  Uploads a NewsPostImage creates a new file //
  // @access PRIVATE
  router
    .route("/api/upload_news_post_image/:newsPostId?")
    .post([ newsPostImageUploader ], newsPostsController.uploadImage);

  // @route DELETE "/api/delete_news_post_image/:imageId" //
  // @desc  Deletes a NewsPostImage, removes file from the server //
  // @access PRIVATE
  router  
    .route("/api/delete_news_post_image/:imageId")
    .delete(newsPostsController.deleteImage);
  
}