var exports = (module.exports = {});
const models = require("../models");
let Op = require("sequelize").Op;
var title = "Customer";
var tbtitle = "List Customer";
var htitle = [
  {id:'custName', label:'Nama Customer', width:""},
  {id:'custTlp', label:'Telepon', width:""},
  {id:'custAddress', label:'Alamat', width:""},
  {id:'custStatus', label:'Status', width:""},
];

exports.index = function (req, res) {
  res.render("customer/index", {
    title: title,
    tbtitle: tbtitle,
    htitle: htitle,
  });
};

exports.notFound = function (req, res) {
  res.render("page/notfound");
};
