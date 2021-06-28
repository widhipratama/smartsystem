const router = require("express").Router();
var toyotahowController = require("../controllers/toyotahowController.js");

router.get("/", toyotahowController.index);
router.get("*", toyotahowController.notFound);

module.exports = router;