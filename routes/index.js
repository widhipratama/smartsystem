const router = require("express").Router();
const models = require("../models");
const Op = require("sequelize").Op;

router.get("/", (req, res) => {
  res.render("dashboard/index");
});


module.exports = router;
