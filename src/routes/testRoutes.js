export default function (router) {
  router
    .route("/api/test")
    .get((req, res) => {
      return res.json({
        message: "test route ok"
      });
    });
}