import newsPostsController from "../controllers/newsPostsController";

export default function (router) {
  // @route GET "/api/news_posts" //
  // @desc Gets all of the NewsPost(s) //
  // @access PUBLIC //
  router
    .route("/api/news_posts")
    .get(newsPostsController.getNewsPosts);
  
  // @route POST "/api/news_posts //
  // @desc Creates a new NewsPost from client and saves in database //
  // @access PRIVATE //
  router  
    .route("/api/news_posts")
    .post(newsPostsController.createNewsPost);
  
  // @route PATCH "/api/news_posts/:newsPostId" //
  // @desc Edits the current NewsPost model //
  // @access PRIVATE //
  router
    .route("/api/news_posts/:newsPostId")
    .patch(newsPostsController.updateNewsPost);
  
  // @route DELETE "/api/news_posts/:newsPostId" //
  // @desc Delets a NewsPost from the database //
  // @access PRIVATE //
  router
    .route("/api/news_posts/:newsPostId")
    .delete(newsPostsController.deleteNewsPost);
}
