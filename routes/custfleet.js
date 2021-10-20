const router = require("express").Router();
var custfleetController = require("../modules/custfleet/controllers/custfleetController.js");
const authMiddleware = require("../modules/auth/middlewares/authMiddleware");

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});

router.get("/", [authMiddleware.verifyToken], custfleetController.index);
router.post("/addcustomer", custfleetController.createCustomer);
router.get("/delete/:id", custfleetController.hapusCustomer);
router.get("/edit/:id", custfleetController.editCustomer);
router.post("/edit/save/:id", custfleetController.updateCustomer);
router.get("*", custfleetController.notFound);

module.exports = router;