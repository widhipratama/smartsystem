const router = require("express").Router();
const uploadDb = require("../../../middleware/uploadDb");
const jobHistoryController = require("../controllers/jobHistoryController");

router.post("/upload", uploadDb.single('file'), jobHistoryController.upload);
router.get("/import", jobHistoryController.import);
router.post("/import", jobHistoryController.import);
router.post("/delete/:id", jobHistoryController.delete);

module.exports = router;
