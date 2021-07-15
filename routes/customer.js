const router = require("express").Router();
var customerController = require("../modules/customer/controllers/customerController.js");

router.get("/", customerController.index);
router.get("*", customerController.notFound);

module.exports = router;