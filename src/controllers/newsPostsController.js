import NewsPost from "../models/NewsPost";
import NewsPostImage from "../models/NewsPostImage";
import { validateNewsPost } from "./helpers/validationHelpers";
import { deleteFile } from "./helpers/apiHelpers";

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
    const { formData, newsPostImages = [] } = req.body;
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
      content: formData.content,
      images: newsPostImages
    };
  
    return NewsPost.create({ ...newNewsPost, createdAt: new Date(Date.now()), editedAt: new Date(Date.now()) })
      .then((createdNewsPost) => {
        return res.status(200).json({
          responseMsg: "Create a new news post",
          createdNewsPost
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
  },

  uploadImage: (req, res) => {
    const { success, imagePath, absolutePath } = req.locals.newsPostImageUpload;
    const { newsPostId } = req.params;
    let uploadedImage;
    console.log(133)
    console.log(success);
    console.log(newsPostId)
    if (success) {
      if (newsPostId) {
        // request is on an existing news post //
        return NewsPostImage.create({ path: imagePath, absolutePath: absolutePath, newsPost: newsPostId, createdAt: new Date(Date.now()) })
          .then((createdImage) => {
            uploadedImage = createdImage;
            return (
              NewsPost.findOneAndUpdate({ _id: newsPostId }, { $push: { images: createdImage._id } }, { new: true })
                .populate("images").exec()
            );
          })
          .then((updatedNewsPost) => {
            console.log(148);
            console.log(updatedNewsPost)
            return res.status(200).json({
              responseMsg: "Uploaded an image",
              newImage: uploadedImage,
              updatedNewsPost
            });
          })
          .catch((error) => {
            console.log(155)
            console.log(error)
            return res.status(500).json({
              responseMsg: "A database error occured",
              error: error
            });
          });
      } else {
        // reqeust is on a new news post, not created yet //
        return NewsPostImage.create({ path: imagePath,  absolutePath: absolutePath, createdAt: new Date(Date.now()) })
          .then((createdImage) => {
            return res.status(200).json({
              responseMsg: "Uploaded an image",
              newImage: createdImage,
              updatedNewsPost: null
            });
          })
          .catch((error) => {
            console.error(error)
            return res.status(500).json({
              responseMsg: "A database error occured",
              error: error
            });
          })
      }
    } else {
      return res.status(500).json({
        responseMsg: "Upload not successful"
      });
    }
  },

  deleteImage: (req, res) => {
    const { imageId } = req.params;
    let deletedImage;

    return NewsPostImage.findOneAndDelete({ _id: imageId })
      .then((deletedImg) => {
        if (deletedImg) {
          deletedImage = deletedImg;
          // remove from the files //
          return deleteFile(deletedImg.absolutePath);
        } else {
          return Promise.reject(new Error("No Image was found"));
        }
      })
      .then(() => {
        return (
          NewsPost
            .findOneAndUpdate({ _id: deletedImage.newsPost },  { $pull: { images: deletedImage._id } }, { new: true })
            .populate("images").exec()
          )
      })
      .then((updatedNewsPost) => {
        return res.status(200).json({
          responseMsg: "Deleted the image",
          deletedImage: deletedImage,
          updatedNewsPost
        });
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).json({
          responseMsg: "A delete error occured",
          error: error
        });
      });
  },

  deleteAllNewsPostImages: (req, res) => {
    const { newsPostImages = [] } = req.body;
    const newsPostImgIds = [];
    const newsPostImgPaths = [];

    if (newsPostImages.length > 0) {
      for (const imgData of newsPostImages) {
        newsPostImgIds.push(imgData._id);
        newsPostImgPaths.push(imgData.absolutePath);
      }
    }

    return Promise.resolve()
      .then(() => {
        const deletePromises = [];
        if (newsPostImgPaths.length > 0) {
          for (const imgPath of newsPostImgPaths) {
            deletePromises.push(deleteFile(imgPath));
          }
          return Promise.all(deletePromises);
        } else {
          return Promise.resolve([]);
        }
      })
      .then((response) => {
        if (response.length > 0 && newsPostImgIds.length > 0) {
          return NewsPostImage.deleteMany({ _id: { $in: newsPostImgIds } }).exec();
        } else {
          return Promise.resolve({ n: 0 });
        }
      })
      .then(() => {
        return res.status(200).json({
          responseMsg: "Removed all images",
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
};