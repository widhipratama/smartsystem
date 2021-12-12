const router = require("express").Router();
const upload = require("../middleware/uploadIMG");
var carsController = require("../modules/cars/controllers/carsController.js");
const authMiddleware = require("../modules/auth/middlewares/authMiddleware");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});

router.get("/", [authMiddleware.verifyToken], carsController.index);
router.post("/adddata", upload.single("image_mobil"), carsController.createData);
router.get("/delete/:id", carsController.hapusData);
router.get("/edit/:id", carsController.editData);
router.post("/edit/save/:id", upload.single("image_mobil"), carsController.updateData);
router.post("/ceknorangka/:id", carsController.cekNoRangka);
router.post("/savekendaraan", carsController.createKendaraan);
router.post("/listkendraan/:id/:h", carsController.getListKendaraan);
router.post("/delkendaraan/:id", carsController.hapuskendaraan);
router.get("/cekkendaraan/:id", carsController.cekKendaraan);
router.get("/jobhistory/:id", carsController.get_job_history);
router.get("*", carsController.notFound);

module.exports = router;
