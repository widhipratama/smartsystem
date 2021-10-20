const router = require("express").Router();
var userController = require("../modules/useraccount/controllers/useraccountController.js");
const authMiddleware = require("../modules/auth/middlewares/authMiddleware");

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});

router.get("/", [authMiddleware.verifyToken], userController.index);
router.post("/adddata", userController.createData);
router.get("/delete/:id", userController.hapusData);
router.get("/edit/:id", userController.editData);
router.post("/edit/save/:id", userController.updateData);
router.get("*", userController.notFound);

module.exports = router;
