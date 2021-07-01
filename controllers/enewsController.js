var exports = (module.exports = {});
const fs = require("fs");
const models = require("../models");
let Op = require("sequelize").Op;

exports.index = function (req, res) {
  res.render("enews/index");
};

exports.view = function (req, res) {
  res.render("enews/view");
};

exports.pdf = function (req, res) {
  var filePath = "coba.pdf";

  fs.readFile(filePath, function (err, data) {
    res.contentType("application/pdf");
    res.set({
      "Content-Type": "application/pdf", //here you set the content type to pdf
      "Content-Disposition": "inline",
    });
    res.send(data);
  });
};

exports.notFound = function (req, res) {
  res.render("page/notfound");
};
