const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const authController = require("../controllers/authController");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});

router.post("/daftar", [authMiddleware.checkUsername, authController.validate("daftar_account_customer")], authController.daftar_account_customer);
router.post(
  "/daftar/karyawan",
  [authMiddleware.checkUsername, authController.validate("daftar_account_karyawan")],
  authController.daftar_account_karyawan
);
router.post("/login", [authController.validate("login_account_customer")], authController.login_account_customer);
router.post("/login/karyawan", [authController.validate("login_account_karyawan")], authController.login_account_karyawan);
router.get("/login/onetaps/:token", authController.login_account_customer_token);

// router.get("/daftar/account/karyawan", authController.view_daftar_account_karyawan);
router.get("/login", authController.view_login_account_customer);
router.get("/daftar", authController.view_daftar_account_customer);
router.get("/login/karyawan", authController.view_login_account_karyawan);
router.get("/onetaps", [authMiddleware.verifyToken], authController.view_onetaps_customer);

router.get("/logout", (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        next(err);
      } else {
        res.clearCookie("jwt");
        res.redirect("/auth/login");
      }
    });
  }
});

module.exports = router;
