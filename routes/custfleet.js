const router = require("express").Router();
var custfleetController = require("../modules/custfleet/controllers/custfleetController.js");

router.get("/", custfleetController.index);
router.post("/addcustomer", custfleetController.createCustomer);
router.get("/delete/:id", custfleetController.hapusCustomer);
router.get("/edit/:id", custfleetController.editCustomer);
router.post("/edit/save/:id", custfleetController.updateCustomer);
router.get("*", custfleetController.notFound);

module.exports = router;