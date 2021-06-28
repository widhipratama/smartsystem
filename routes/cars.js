const router = require("express").Router();
var carsController = require("../controllers/carsController.js");

router.get("/", carsController.index);
router.get("*", carsController.notFound);

module.exports = router;