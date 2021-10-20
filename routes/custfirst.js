const router = require("express").Router();
var custfirstController = require("../modules/custfirst/controllers/custfirstController.js");
const authMiddleware = require("../modules/auth/middlewares/authMiddleware");

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});

router.get("/customer", [authMiddleware.verifyToken], custfirstController.index);
router.get("/fleet", [authMiddleware.verifyToken], custfirstController.indexfleet);
router.get("/fs", [authMiddleware.verifyToken], custfirstController.firstclass);
router.get("/fs/sync", custfirstController.syncdataFristClass);
router.get("/dashboard", custfirstController.data_dashboard);
router.get("*", custfirstController.notFound);

module.exports = router;