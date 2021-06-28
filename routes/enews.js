const router = require("express").Router();
var enewsController = require("../controllers/enewsController.js");

router.get("/", enewsController.index);
router.get("*", enewsController.notFound);

module.exports = router;