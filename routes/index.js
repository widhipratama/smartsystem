const router = require("express").Router();
const { authJwt } = require("../middleware");
const dashboardController = require("../controllers/dashboardController");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/", (req, res) => {
  res.redirect(process.env.URL + "/dashboard");
});

router.get("/dashboard", [authJwt.verifyToken], dashboardController.user);

router.get(
  "/admin/dashboard",
  [authJwt.verifyToken, authJwt.isStaffAdmin],
  (req, res) => {
    res.render("dashboard/admin");
  }
);

module.exports = router;
