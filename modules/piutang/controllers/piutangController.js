var exports = (module.exports = {});
const models = require("../../../models");
const { randomString } = require("../../../helpers/randomString");
var bcrypt = require("bcryptjs");
const { sequelize, QueryTypes, Op } = require("sequelize");

var title = "Accounts Receivable";
var tbtitle = "List Accounts Receivable";
var menu = "piutang";
var htitle = [
  { id: "no_rangka", label: "No Rangka", width: "" },
  { id: "police_no", label: "Nopol", width: "" },
  { id: "model", label: "Model", width: "" },
  { id: "nama_fleet", label: "Nama", width: "" },
  { id: "date_service", label: "Tgl. Service", width: "" },
  { id: "date_payment", label: "Tgl. Bayar", width: "" },
  { id: "date_piutang", label: "Tgl. Piutang", width: "" },
];

exports.index = async function (req, res) {
  const piutang = await models.sequelize
  .query(
    `SELECT 
      piutang.no_rangka,
      piutang.date_service,
      piutang.date_payment,
      piutang.date_piutang,
      kendaraan.model,
      kendaraan.police_no,
      fleet_customer.no_telp_cust,
      fleet_customer.nama_fleet,
      fleet_customer.contact_person
    FROM 
      piutang 
    JOIN 
      kendaraan ON piutang.no_rangka = kendaraan.no_rangka
    LEFT JOIN 
      fleet_customer ON fleet_customer.id = kendaraan.id_customer
    ORDER BY
      date_piutang DESC`,
    {
      type: QueryTypes.SELECT,
    }
  );
  const alertMessage = req.flash("alertMessage");
  const alertStatus = req.flash("alertStatus");
  const alert = { message: alertMessage, status: alertStatus };
  res.render("../modules/piutang/views/index", {
    datarow: piutang,
    alert: alert,
    title: title,
    tbtitle: tbtitle,
    htitle: htitle,
    menu: menu,
  });
};

exports.notFound = function (req, res) {
  res.render("page/notfound");
};
