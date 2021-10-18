const router = require("express").Router();
const upload = require("../middleware/upload");
const jobHistoryController = require("../controllers/jobHistoryController");
const authMiddleware = require("../modules/auth/middlewares/authMiddleware");

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});

router.post("/upload", [authMiddleware.verifyToken], upload.single("file"), jobHistoryController.upload);
router.get("/import", [authMiddleware.verifyToken], jobHistoryController.import);
router.get("*", jobHistoryController.notFound);

module.exports = router;
