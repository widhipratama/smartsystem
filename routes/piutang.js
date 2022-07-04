const router = require("express").Router();
var piutangController = require("../modules/piutang/controllers/piutangController.js");
const authMiddleware = require("../modules/auth/middlewares/authMiddleware");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});

router.get("/", [authMiddleware.verifyToken], piutangController.index);

module.exports = router;
