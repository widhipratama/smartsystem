const router = require("express").Router();
var custfirstController = require("../modules/custfirst/controllers/custfirstController.js");

router.get("/customer", custfirstController.index);
router.get("/fleet", custfirstController.indexfleet);
router.get("/fs", custfirstController.firstclass);
router.get("/fs/sync", custfirstController.syncdataFristClass);
router.get("*", custfirstController.notFound);

module.exports = router;