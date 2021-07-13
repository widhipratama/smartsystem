const router = require("express").Router();
const { authJwt } = require("../middleware");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/", (req, res) => {
  res.render("login/user-index");
});

router.get("/dashboard", [authJwt.verifyToken], (req, res) => {
  res.render("dashboard/user");
});

router.get(
  "/admin/dashboard",
  [authJwt.verifyToken, authJwt.isStaff],
  (req, res) => {
    res.render("dashboard/admin");
  }
);

module.exports = router;
