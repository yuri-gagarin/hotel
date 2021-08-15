import NewsPost from "../models/NewsPost";
import { validateNewsPost } from "./helpers/validationHelpers";

export default {
  getNewsPosts: (req, res) => {
    const { sort = "desc" } = req.query;

    return NewsPost.find({}).sort({ createdAt: sort }).exec()
      .then((newsPosts) => {
        return res.status(200).json({
          responseMsg: "Retrieved all news posts",
          newsPosts: newsPosts
        });
      })
      .catch((error) => {
        return res.status(500).json({
          responseMsg: "An error occured",
          error: error
        });
      });
  },

  createNewsPost: (req, res) => {
    const { formData } = req.body;
    const { isValid, errors } = validateNewsPost(formData);

    if (!isValid) {
      return Promise.resolve(errors)
        .then((errors) => {
          return res.status(400).json({
            responseMsg: "Error! Not sent...",
            error: errors
          });
        });
    }
    const newNewsPost = {
      createdBy: formData.createdBy,
      title: formData.title,
      content: formData.content
    };
  
    return NewsPost.create({ ...newNewsPost, createdAt: new Date(Date.now()), editedAt: new Date(Date.now()) })
      .then((newsPost) => {
        return res.status(200).json({
          responseMsg: "Create a new news post",
          newsPost
        });
      })
      .catch((error) => {
        return res.status(500).json({
          responseMsg: "An error occured",
          error: error
        });
      });
  },

  updateNewsPost: (req, res) => {
    const { newsPostId } = req.params;
    const { updateData, liveStatus } = req.body;
    if (liveStatus && typeof liveStatus === "object" && typeof liveStatus.live === "boolean") {
      const { live } = liveStatus;
      return NewsPost.findOneAndUpdate(
        { _id: newsPostId }, 
        { $set: { live: live, editedAt: new Date(Date.now()) } },
        { new: true }
      )
      .exec()
        .then((updatedNewsPost) => {
          const { live } = updatedNewsPost;
          const responseMsg = `Your News Post is now ${live ? "live and visible" : "offline"}.`;
          return res.status(200).json({ responseMsg, updatedNewsPost });
        })
        .catch((error) => {
          return res.status(500).json({
            responseMsg: "An error occured", error
          });
        });
    }
    if (updateData) {
      // handle a reply //
      const { title, content } = updateData;
      if (content) {
        return NewsPost.findOneAndUpdate(
          { _id: newsPostId },
          { $set: { title: title, content: content, editedAt: new Date(Date.now()) } },
          { new: true }
        )
        .then((updatedNewsPost) => {
          return res.status(200).json({
            responseMsg: "Done",
            updatedNewsPost: updatedNewsPost
          });
        })
        .catch((error) => {
          console.error(error);
          return res.status(500).json({
            responseMsg: "An error occured",
            error: error
          });
        });
      }
    } else {
      return res.status(400).json({
        responseMsg: "User input error",
        error: new Error("Could not resolve news post data")
      });
    }
  },
  
  deleteNewsPost: (req, res) => {
    const newsPostId = req.params.newsPostId;
    return NewsPost.findOneAndDelete({ _id: newsPostId })
      .then((deletedNewsPost) => {
        return res.status(200).json({
          responseMsg: "Deleted the news post",
          deletedNewsPost: deletedNewsPost
        });
      })
      .catch((error) => {
        return res.status(500).json({
          responseMsg: "An error occured",
          error: error
        });
      });
  }
};