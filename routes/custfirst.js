const router = require("express").Router();
var custfirstController = require("../modules/custfirst/controllers/custfirstController.js");

router.get("/customer", custfirstController.index);
router.get("/fleet", custfirstController.indexfleet);
router.get("*", custfirstController.notFound);

module.exports = router;