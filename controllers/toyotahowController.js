var exports = (module.exports = {});
const models = require("../models");
let Op = require("sequelize").Op;

exports.tes = function (req, res) {
  let page = req.query.page || 1;
  let offset = 0;
  if (page > 1) {
    offset = (page - 1) * 10 + 1;
  }
  models.artikel_enews
    .findAndCountAll({
      where: { type: "TOYOTAHOW" },
      limit: 10,
      offset: offset,
      order: [["id", "DESC"]],
    })
    .then((data) => {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const totalPage = Math.ceil(data.count / 10);
      const pagination = { totalPage: totalPage, currentPage: page };
      res.render("toyotahow/index", {
        data: data.rows,
        alert: alert,
        pagination: pagination,
      });
    });
};

exports.index = function (req, res) {
  let page = req.query.page || 1;
  let offset = 0;
  if (page > 1) {
    offset = (page - 1) * 10 + 1;
  }
  models.artikel_enews
    .findAndCountAll({
      limit: 10,
      offset: offset,
      order: [["id", "DESC"]],
    })
    .then((data) => {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const totalPage = Math.ceil(data.count / 10);
      const pagination = { totalPage: totalPage, currentPage: page };
      res.render("toyotahow/index", {
        data: data.rows,
        alert: alert,
        pagination: pagination,
      });
    });
};
exports.detail = function (req, res) {
  res.render("toyotahow/detail");
};

exports.notFound = function (req, res) {
  res.render("page/notfound");
};
