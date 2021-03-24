import sgMail from "@sendgrid/mail";

export default {
  sendEmail: (req, res) => {
    const { emailData } = req.body;
    const { postId, recipientEmail, senderEmail, emailSubject, replyContent, emailHTML } = emailData;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const sendGridEmailMsgData = {
      to: "kibza25@yahoo.com",
      from: "ymivanov@icloud.com",
      subject: emailSubject,
      html: emailHTML
    }

    return sgMail.send(sendGridEmailMsgData)
      .then((response) => {
        console.log(response);
        return res.status(200).json({
          responseMsg: "Reply email successfully sent"
        });
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).json({
          responseMsg: "An error occured"
        });
      });
  }
};
