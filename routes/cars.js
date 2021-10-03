const router = require("express").Router();
const upload = require("../middleware/uploadIMG");
var carsController = require("../modules/cars/controllers/carsController.js");

router.get("/", carsController.index);
router.post("/adddata", upload.single('image_mobil'), carsController.createData);
router.get("/delete/:id", carsController.hapusData);
router.get("/edit/:id", carsController.editData);
router.post("/edit/save/:id", carsController.updateData);
router.get("*", carsController.notFound);

module.exports = router;