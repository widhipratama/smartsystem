const router = require("express").Router();
const upload = require("../middleware/upload");
const jobHistoryController = require("../controllers/jobHistoryController");

router.post("/upload", upload.single("file"), jobHistoryController.upload);
router.get("/import", jobHistoryController.import);
router.get("*", jobHistoryController.notFound);

module.exports = router;
