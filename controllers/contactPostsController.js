import ContactPost from "../models/ContactPost";

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
    const { name, email, phoneNumber = "", content } = req.body;
    const newContactPost = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      content: content
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