import authController from "../controllers/authController";
import passport from "passport";

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({
      message: "Not Allowed"
    });
  }
};

export default function (router) {
  
  router
    .route("/api/logged_in")
    .get(isLoggedIn, (req, res) => {
      return res.status(200).json({
        message: "A ok"
      });
  });

  router 
    .route("/api/login")
    .post(passport.authenticate("local"), authController.loginUser);
  
  router  
    .route("/api/logout")
    .delete(authController.logoutUser);
  
  router  
    .route("/api/register")
    .post(authController.registerUser);
};

