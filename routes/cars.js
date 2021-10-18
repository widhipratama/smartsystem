const router = require("express").Router();
const upload = require("../middleware/uploadIMG");
var carsController = require("../modules/cars/controllers/carsController.js");
const authMiddleware = require("../modules/auth/middlewares/authMiddleware");

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});

router.get("/", [authMiddleware.verifyToken], carsController.index);
router.post("/adddata", [authMiddleware.verifyToken], upload.single('image_mobil'), carsController.createData);
router.get("/delete/:id", [authMiddleware.verifyToken], carsController.hapusData);
router.get("/edit/:id", [authMiddleware.verifyToken], carsController.editData);
router.post("/edit/save/:id", [authMiddleware.verifyToken], carsController.updateData);
router.post("/ceknorangka/:id", carsController.cekNoRangka);
router.post("/savekendaraan", [authMiddleware.verifyToken], carsController.createKendaraan);
router.post("/listkendraan/:id/:h", [authMiddleware.verifyToken], carsController.getListKendaraan);
router.post("/delkendaraan/:id", [authMiddleware.verifyToken], carsController.hapuskendaraan);
router.get("/cekkendaraan/:id", carsController.cekKendaraan);
router.get("/jobhistory/:id", [authMiddleware.verifyToken], carsController.get_job_history);
router.get("*", carsController.notFound);

module.exports = router;