var exports = (module.exports = {});
const models = require("../models");
let Op = require("sequelize").Op;

exports.index = function (req, res) {
  res.render("custfleet/index");
};

exports.notFound = function (req, res) {
  res.render("page/notfound");
};
