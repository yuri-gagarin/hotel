import ContactPost from "../models/ContactPost";
import { validateContactPost } from "./helpers/validationHelpers";

export default {
  getContactPosts: (req, res) => {
    return ContactPost.find({})
      .then((contactPosts) => {
        return res.status(200).json({
          responseMsg: "Got all the contact requests",
          contactPosts: contactPosts
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
  
  deleteContactPost: (req, res) => {
    const contactPostId = req.params.contactPostId;
    return ContactPost.deleteOne({ _id: contactPostId })
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