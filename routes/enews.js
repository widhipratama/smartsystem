const router = require("express").Router();
var enewsController = require("../controllers/enewsController.js");

router.get("/", enewsController.index);
router.get("/view", enewsController.view);
router.get("/pdf", enewsController.pdf);
router.get("*", enewsController.notFound);

module.exports = router;
