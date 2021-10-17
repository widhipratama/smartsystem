const router = require("express").Router();
const upload = require("../middleware/uploadPromotion");
var promotionController = require("../modules/promotion/controllers/promotionController.js");

router.get("/", promotionController.index);
router.get("/cust", promotionController.index_cust);
router.post("/adddata", upload.single('gambar'), promotionController.createData);
router.get("/delete/:id", promotionController.hapusData);
router.get("/edit/:id", promotionController.editData);
router.post("/edit/save/:id", promotionController.updateData);
router.get("*", promotionController.notFound);

module.exports = router;