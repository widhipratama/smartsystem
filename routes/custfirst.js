const router = require("express").Router();
var custfirstController = require("../controllers/custfirstController.js");

router.get("/", custfirstController.index);
router.get("*", custfirstController.notFound);

module.exports = router;