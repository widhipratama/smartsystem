const router = require("express").Router();
var customerController = require("../controllers/customerController.js");

router.get("/", customerController.index);
router.get("*", customerController.notFound);

module.exports = router;