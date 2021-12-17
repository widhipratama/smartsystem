const router = require("express").Router();
var employeeController = require("../controllers/employeeController.js");
const authMiddleware = require("../../../modules/auth/middlewares/authMiddleware");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});

router.get("/", [authMiddleware.verifyToken], employeeController.index);
router.post("/addemployee", employeeController.createEmployee);
router.get("/delete/:id", employeeController.hapusEmployee);
router.get("/edit/:id", employeeController.editEmployee);
router.post("/edit/save/:id", employeeController.updateEmployee);
router.get("*", employeeController.notFound);

module.exports = router;
