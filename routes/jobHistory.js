const router = require("express").Router();
const upload = require("../middleware/upload");
const jobHistoryController = require("../controllers/jobHistoryController");

router.post("/upload", upload.single("image_mobil"), jobHistoryController.upload);
router.get("/import", jobHistoryController.import);

module.exports = router;
