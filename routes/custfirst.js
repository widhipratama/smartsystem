const router = require("express").Router();
var custfirstController = require("../modules/custfirst/controllers/custfirstController.js");

router.get("/", custfirstController.index);
router.get("*", custfirstController.notFound);

module.exports = router;