const router = require("express").Router();
const upload = require("../middleware/uploadHow");
var toyotahowController = require("../modules/toyotahow/controllers/toyotahowController.js");

router.get("/", toyotahowController.index);
router.get("/detail/:id", toyotahowController.indexdetail);
router.get("/input", toyotahowController.input);
router.post("/adddata", upload.fields([{
                name: 'sampul_how', maxCount: 1
            }, {
                name: 'location_how', maxCount: 1
            }]), toyotahowController.createData);
router.post("/updatedatasampul", upload.single('sampul_how'), toyotahowController.updateDataSampul);
router.get("/delete/:id", toyotahowController.hapusData);
router.get("/edit/:id", toyotahowController.editData);
router.post("/edit/save/:id", toyotahowController.updateData);
router.get("/pdf", toyotahowController.pdf);
router.get("*", toyotahowController.notFound);

module.exports = router;
