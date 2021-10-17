const router = require("express").Router();
const upload = require("../middleware/upload");
const progressStatusController = require("../controllers/progressStatusController");
const authMiddleware = require("../modules/auth/middlewares/authMiddleware");

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});

router.post("/upload", [authMiddleware.verifyToken], upload.single("file"), progressStatusController.upload);
router.get("/import", [authMiddleware.verifyToken], progressStatusController.import);
router.get("*", progressStatusController.notFound);

module.exports = router;
