const router = require("express").Router();
const upload = require("../middleware/upload");
const progressStatusController = require("../controllers/progressStatusController");

router.post("/upload", upload.single("file"), progressStatusController.upload);
router.get("/import", progressStatusController.import);
router.get("*", progressStatusController.notFound);

module.exports = router;
