const router = require("express").Router();
var whatsappController = require("../controllers/whatsappController.js");

router.get("/", whatsappController.index);
router.get("*", whatsappController.notFound);

module.exports = router;
