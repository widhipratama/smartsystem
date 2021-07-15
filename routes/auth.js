const router = require("express").Router();
const { cekPendaftaran } = require("../middleware");
const authController = require("../controllers/authController");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/daftar-user",
  [
    cekPendaftaran.cekDuplikasiUser,
    authController.validate("daftarUserValidation"),
  ],
  authController.daftarUser
);
router.post(
  "/daftar-admin",
  [
    cekPendaftaran.cekDuplikasiAdmin,
    authController.validate("daftarAdminValidation"),
  ],
  authController.daftarAdmin
);
router.post(
  "/login-user",
  [authController.validate("loginUserValidation")],
  authController.loginUser
);

router.post(
  "/login-admin",
  [authController.validate("loginAdminValidation")],
  authController.loginAdmin
);

router.get("/daftar-user", authController.daftarUserView);
router.get("/daftar-admin", authController.daftarAdminView);
router.get("/login-user", authController.loginUserView);
router.get("/login-admin", authController.loginAdminView);
router.get("/register", authController.registerView);
router.get("/onetaps", authController.onetapView);

router.get("/logout", (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        next(err);
      } else {
        res.clearCookie("x-access-token");
        res.redirect("/");
      }
    });
  }
});

router.get("/login-user-token/:token", authController.loginUserToken);

module.exports = router;
