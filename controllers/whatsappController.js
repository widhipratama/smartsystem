var exports = (module.exports = {});
const models = require("../models");
let Op = require("sequelize").Op;

exports.index = async function (req, res) {
  const dataPending = await models.whatsapp_blast.findAndCountAll({
    where: { status: "pending" },
    order: [["id", "DESC"]],
  });

  const dataFailed = await models.whatsapp_blast.findAndCountAll({
    where: { status: "failed" },
    order: [["id", "DESC"]],
  });

  const alertMessage = req.flash("alertMessage");
  const alertStatus = req.flash("alertStatus");
  const alert = { message: alertMessage, status: alertStatus };
  res.render("whatsapp/index", {
    dataPending: dataPending.rows,
    dataFailed: dataFailed.rows,
    alert: alert,
  });
};

exports.notFound = function (req, res) {
  res.render("page/notfound");
};
