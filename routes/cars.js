const router = require("express").Router();
const upload = require("../middleware/uploadIMG");
var carsController = require("../modules/cars/controllers/carsController.js");

router.get("/", carsController.index);
router.post("/adddata", upload.single('image_mobil'), carsController.createData);
router.get("/delete/:id", carsController.hapusData);
router.get("/edit/:id", carsController.editData);
router.post("/edit/save/:id", carsController.updateData);
router.post("/ceknorangka/:id", carsController.cekNoRangka);
router.post("/savekendaraan", carsController.createKendaraan);
router.post("/listkendraan/:id/:h", carsController.getListKendaraan);
router.post("/delkendaraan/:id", carsController.hapuskendaraan);
router.get("*", carsController.notFound);

module.exports = router;