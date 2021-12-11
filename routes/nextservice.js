const router = require("express").Router();
var nextserviceController = require("../modules/nextservice/controllers/nextserviceController.js");

router.get("/", nextserviceController.index);
router.post("/", nextserviceController.index);
router.get("*", nextserviceController.notFound);

module.exports = router;