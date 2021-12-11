var exports = (module.exports = {});
const models = require("../../../models");
let Op = require("sequelize").Op;
const { randomString } = require("../../../helpers/randomString");
var bcrypt = require("bcryptjs");
const sequelize = require('sequelize');

var title = "Customer Account";
var tbtitle = "List Customer Account";
var menu = "customer";
var htitle = [
  { id: "nama", label: "Nama Customer", width: "" },
  { id: "no_telp", label: "Telepon", width: "" },
  { id: "alamat", label: "Alamat", width: "" },
];

exports.index = function (req, res) {
  models.customer
    .findAndCountAll({
      order: [["id_customer", "DESC"]],
    })
    .then((customer) => {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("../modules/customer/views/index", {
        datarow: customer.rows,
        alert: alert,
        title: title,
        tbtitle: tbtitle,
        htitle: htitle,
        menu: menu,
      });
    });
};
exports.createCustomer = function (req, res) {
  let customerFound;
  models.customer
    .create(req.body)
    .then((customer) => {
      customerFound = customer;
      req.flash("alertMessage", `Sukses Menambahkan Data customer dengan nama : ${customerFound.nama}`);
      req.flash("alertStatus", "success");
      res.redirect("/customer");
    })
    .catch((err) => {
      req.flash("alertMessage", err.message);
      req.flash("alertStatus", "danger");
      req.flash("name", req.body.nama);
      req.flash("no_telp", req.body.no_telp);
      req.flash("wa", req.body.wa);
      req.flash("ig", req.body.ig);
      req.flash("facebook", req.body.facebook);
      req.flash("alamat", req.body.alamat);
      req.flash("alamat_dati2", req.body.alamat_dati2);
      req.flash("alamat_dati3", req.body.alamat_dati3);
      req.flash("status", req.body.status);
      res.redirect("/customer");
    });
};
exports.hapusCustomer = function (req, res) {
  let id = req.params.id;
  let customerFound;
  models.useraccount
    .findOne({ where: { id_user: { [Op.eq]: id } } })
    .then((account) => {
      return account.destroy().then(() => {
        models.customer
          .findOne({ where: { id_customer: { [Op.eq]: id } } })
          .then((customer) => {
            customerFound = customer;
            return customer.destroy().then(() => {
              req.flash("alertMessage", `Sukses Menghapus Data Customer dengan nama : ${customerFound.nama}`);
              req.flash("alertStatus", "success");
              res.redirect("/customer");
            });
          })
          .catch((err) => {
            req.flash("alertMessage", err.message);
            req.flash("alertStatus", "danger");
            res.redirect("/customer");
          });
      });
    })
    .catch((err) => {
      req.flash("alertMessage", err.message);
      req.flash("alertStatus", "danger");
      res.redirect("/customer");
    });
};
exports.editCustomer = function (req, res) {
  const alertMessage = req.flash("alertMessage");
  const alertStatus = req.flash("alertStatus");
  const alert = { message: alertMessage, status: alertStatus };

  const id = req.params.id;
  db.sequelize
    .query('SELECT * FROM customer JOIN useraccount ON customer.id_customer = useraccount.id_customer WHERE customer.id_customer = {{ id }}').success(function(rows){
      res.send({
        success: true,
        message: "Berhasil ambil data!",
        data: customer,
      });
    });
};
exports.updateCustomer = (req, res) => {
  const id = req.params.id;
  let dataFound;
  let data;
  const { nama, no_telp, ig, facebook, wa, alamat, alamat_dati2, alamat_dati3 } = req.body;
  models.customer
    .findOne({ where: { id_customer: { [Op.eq]: id } } })
    .then((customer) => {
      dataFound = customer;
      data = {
        nama: nama,
        no_telp: no_telp,
        ig: ig || null,
        facebook: facebook || null,
        wa: wa || null,
        alamat: alamat || null,
        alamat_dati2: alamat_dati2 || null,
        alamat_dati3: alamat_dati3 || null,
        status: 1,
      };
      return customer.update(data).then(() => {
        models.useraccount
          .findOne({ where: { id_user: { [Op.eq]: id } } })
          .then((user) => {
            dataFound = user;
            data = {};
            if (req.body.password != "" && req.body.password != null) {
              data = {
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 8),
              };
            } else {
              data = {
                username: req.body.username,
              };
            }
            return user.update(data).then(() => {
              res.json({ status: "200", message: "Customer berhasil terupdate" });
            });
          })
          .catch((err) => {
            res.json({ status: "500", message: err.message });
          });
      });
    })
    .catch((err) => {
      res.json({ status: "500", message: err.message });
    });
};
exports.notFound = function (req, res) {
  res.render("page/notfound");
};
