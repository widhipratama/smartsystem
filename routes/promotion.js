const router = require("express").Router();
var promotionController = require("../controllers/promotionController.js");

router.get("/", promotionController.index);
router.get("*", promotionController.notFound);

module.exports = router;