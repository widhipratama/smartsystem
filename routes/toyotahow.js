const router = require("express").Router();
var toyotahowController = require("../controllers/toyotahowController.js");

router.get("/", toyotahowController.index);
router.get("/detail", toyotahowController.detail);
router.get("*", toyotahowController.notFound);

module.exports = router;
