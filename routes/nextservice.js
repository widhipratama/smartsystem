const router = require("express").Router();
var nextserviceController = require("../modules/nextservice/controllers/nextserviceController.js");

router.get("/", nextserviceController.index);
router.post("/", nextserviceController.index);
router.get("/customer", nextserviceController.nextcust);
router.post("/customer", nextserviceController.nextcust);
router.get("/fleet", nextserviceController.nextfleet);
router.post("/fleet", nextserviceController.nextfleet);
router.post("/followup/save", nextserviceController.createFollowup);
router.post("/followup/list", nextserviceController.listFollowup);
router.post("/followup/del/:id", nextserviceController.deleteFollowup);
router.get("*", nextserviceController.notFound);

module.exports = router;