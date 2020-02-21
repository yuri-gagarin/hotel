import authController from "../controllers/authController";

function isLoggedIn (req, res, next) {
  console.log(req.isAuthenticated());
  return next();
}

export default function (router) {
  router
    .get("/testRoute", isLoggedIn, authController.testLogin)
}