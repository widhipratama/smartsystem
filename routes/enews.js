const router = require("express").Router();
const sampul = require("../middleware/uploadEnewsSampul");
const upload = require("../middleware/uploadEnews");
var enewsController = require("../modules/enews/controllers/enewsController.js");
const authMiddleware = require("../modules/auth/middlewares/authMiddleware");

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});

router.get("/", [authMiddleware.verifyToken], enewsController.index);
router.get("/detail/:id", [authMiddleware.verifyToken], enewsController.indexdetail);
router.get("/input", [authMiddleware.verifyToken], enewsController.input);
router.post("/adddata", [authMiddleware.verifyToken], upload.fields([{
                name: 'sampul_enews', maxCount: 1
            }, {
                name: 'location_enews', maxCount: 1
            }]), [authMiddleware.verifyToken], enewsController.createData);
router.post("/updatedatasampul", [authMiddleware.verifyToken], upload.single('sampul_enews'), enewsController.updateDataSampul);
router.get("/delete/:id", [authMiddleware.verifyToken], enewsController.hapusData);
router.get("/edit/:id", [authMiddleware.verifyToken], enewsController.editData);
router.post("/edit/save/:id", [authMiddleware.verifyToken], enewsController.updateData);
router.get("/pdf", [authMiddleware.verifyToken], enewsController.pdf);
router.get("*", enewsController.notFound);

module.exports = router;
