import sgMail from "@sendgrid/mail";

export default {
  sendEmail: (req, res) => {
    console.log(req.body)
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }
};
