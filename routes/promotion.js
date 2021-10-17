const router = require("express").Router();
const upload = require("../middleware/uploadPromotion");
var promotionController = require("../modules/promotion/controllers/promotionController.js");
const authMiddleware = require("../modules/auth/middlewares/authMiddleware");

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});

router.get("/", [authMiddleware.verifyToken], promotionController.index);
router.get("/cust", [authMiddleware.verifyToken], promotionController.index_cust);
router.post("/adddata", [authMiddleware.verifyToken], upload.single('gambar'), promotionController.createData);
router.get("/delete/:id", [authMiddleware.verifyToken], promotionController.hapusData);
router.get("/edit/:id", [authMiddleware.verifyToken], promotionController.editData);
router.post("/edit/save/:id", [authMiddleware.verifyToken], promotionController.updateData);
router.get("*", promotionController.notFound);

module.exports = router;