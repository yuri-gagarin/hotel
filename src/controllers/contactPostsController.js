import ContactPost from "../models/ContactPost";
import { validateContactPost } from "./helpers/validationHelpers";

const sortReadUnread = (sortOption, contactPosts) => {
  switch (sortOption) {
    case "read": {
      return contactPosts.filter((contactPost) => contactPost.read === true);
    }
    case "unread": {
      return contactPosts.filter((contactPost) => contactPost.read === false);
    }
    default: {
      return contactPosts;
    }
  }
};

export default {
  getContactPosts: (req, res) => {
    const { archived = false, sort = "desc", readSort = "view all" } = req.query;
    console.log(req.query)

    return ContactPost.find({ archived: archived }).sort({ createdAt: sort }).exec()
      .then((contactPosts) => {
        const filteredPosts = sortReadUnread(readSort, contactPosts);
        return res.status(200).json({
          responseMsg: `Retreived all ${ archived ? 'archived' : 'new'} contact requests`,
          contactPosts: filteredPosts
        });
      })
      .catch((error) => {
        return res.status(500).json({
          responseMsg: "An error occured",
          error: error
        });
      });
  },

  sendContactPost: (req, res) => {
    // create a post from client and send to the database //
    // maybe create a mailing system later to automatically mail the contents //
    const { formData } = req.body;
    const { isValid, errors } = validateContactPost(formData);
    if (!isValid) {
      return Promise.resolve(errors)
        .then((errors) => {
          return res.status(400).json({
            responseMsg: "Error! Not sent...",
            error: errors
          });
        });
    }
    const newContactPost = {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      content: formData.content
    };
  
    return ContactPost.create(newContactPost)
      .then((contactPost) => {
        return res.status(200).json({
          responseMsg: "Message sent to hotel"
        });
      })
      .catch((error) => {
        return res.status(500).json({
          responseMsg: "An error occured",
          error: error
        });
      });
  },

  updateContactPost: (req, res) => {
    const { contactPostId } = req.params;
    const { contactPostArchiveStatus, updateData } = req.body;
    // needs to be rewritten perhaps with helper methods //
    console.log(contactPostArchiveStatus)
    if (contactPostArchiveStatus) {
      const { status } = contactPostArchiveStatus;
      return ContactPost.findOneAndUpdate(
        { _id: contactPostId }, 
        { $set: { archived: status, read: true, editedAt: new Date(Date.now()) } }, 
        { new: true }
      ).exec()
      .then((updatedPost) => {
        return res.status(200).json({
          responseMsg: "Post archived",
          updatedContactPost: updatedPost
        });
      })
      .catch((error) => {
        return res.status(200).json({
          responseMsg: "An error occured",
          error: error
        });
      });
    } else if (updateData) {
      // handle a reply //
      const { read, replied, replyContent } = updateData;
      if (replyContent) {
        return ContactPost.findOneAndUpdate(
          { _id: contactPostId },
          { $set: { read: read, replied: replied, replyContent: replyContent } },
          { new: true }
        )
        .then((updatedContactPost) => {
          return res.status(200).json({
            responseMsg: "Done",
            updatedContactPost: updatedContactPost
          });
        })
        .catch((error) => {
          console.error(error);
          return res.status(500).json({
            responseMsg: "An error occured",
            error: error
          });
        });

      } else {
        return ContactPost.findOneAndUpdate(
          { _id: contactPostId },
          { $set: { read: read } },
          { new: true }
        )
        .then((updatedContactPost) => {
          return res.status(200).json({
            responseMsg: "Done",
            updatedContactPost: updatedContactPost
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
     
    }

  },
  
  deleteContactPost: (req, res) => {
    const contactPostId = req.params.contactPostId;
    return ContactPost.findOneAndDelete({ _id: contactPostId })
      .then((deletedContactPost) => {
        return res.status(200).json({
          responseMsg: "Deleted the contact post",
          deletedContactPost: deletedContactPost
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