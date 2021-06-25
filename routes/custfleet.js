const router = require("express").Router();
var custfleetController = require("../controllers/custfleetController.js");

router.get("/", custfleetController.index);
router.get("*", custfleetController.notFound);

module.exports = router;