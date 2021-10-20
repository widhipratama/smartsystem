const router = require("express").Router();
var customerController = require("../modules/customer/controllers/customerController.js");
const authMiddleware = require("../modules/auth/middlewares/authMiddleware");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});

router.get("/", [authMiddleware.verifyToken], customerController.index);
router.post("/addcustomer", customerController.createCustomer);
router.get("/delete/:id", customerController.hapusCustomer);
router.get("/edit/:id", customerController.editCustomer);
router.post("/edit/save/:id", customerController.updateCustomer);
router.get("*", customerController.notFound);

module.exports = router;
