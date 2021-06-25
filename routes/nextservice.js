const router = require("express").Router();
var nextserviceController = require("../controllers/nextserviceController.js");

router.get("/", nextserviceController.index);
router.get("*", nextserviceController.notFound);

module.exports = router;