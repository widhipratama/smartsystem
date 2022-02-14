const router = require("express").Router();
const uploadDb = require("../../../middleware/uploadDb");
const progressStatusController = require("../controllers/progressStatusController");

router.post("/upload", uploadDb.single('file'), progressStatusController.upload);
router.get("/deleteupload", uploadDb.single('file'), progressStatusController.upload);
router.get("/import", progressStatusController.import);
router.post("/import", progressStatusController.import);
router.post("/delete/:id", progressStatusController.delete);

module.exports = router;
