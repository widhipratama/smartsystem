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
router.get("/dashboard/type_repair/:start/:end", custfirstController.type_repair);
router.get("/dashboard/omzet_sa/:start/:end", custfirstController.omzet_sa);
router.get("/export", custfirstController.exportExcel);
router.get("/calendar/:month/:year", custfirstController.calendarCust);

router.get("*", custfirstController.notFound);

module.exports = router;