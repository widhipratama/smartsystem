const router = require("express").Router();
var userController = require("../modules/useraccount/controllers/useraccountController.js");

router.get("/", userController.index);
router.post("/adddata", userController.createData);
router.get("/delete/:id", userController.hapusData);
router.get("/edit/:id", userController.editData);
router.post("/edit/save/:id", userController.updateData);
router.get("*", userController.notFound);

module.exports = router;
