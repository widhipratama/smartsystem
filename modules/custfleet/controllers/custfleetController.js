// var exports = (module.exports = {});
const models = require("../../../models");
let Op = require("sequelize").Op;
const useraccount = models.useraccount;
const fleet_customer = models.fleet_customer;
var bcrypt = require("bcryptjs");

var title = "Customer Fleet";
var tbtitle = "List Customer Fleet";
var menu = "fleet";
var htitle = [
  { id: 'nama_fleet', label: 'Nama Fleet', width: "", typeInput: "text", onTable: "ON" },
  { id: 'contact_person', label: 'PIC', width: "", typeInput: "text", onTable: "ON" },
  { id: 'no_telp_cust', label: 'Telepon', width: "", typeInput: "text", onTable: "ON" },
  { id: 'alamat', label: 'Alamat', width: "", typeInput: "textarea", onTable: "ON" },
  { id: 'alamat_dati2', label: 'Alamat Dati2', width: "", typeInput: "textarea", onTable: "OFF" },
  { id: 'alamat_dati3', label: 'Alamat Dati3', width: "", typeInput: "textarea", onTable: "OFF" },
  { id: 'username', label: 'Username', width: "", typeInput: "text", onTable: "OFF" },
  { id: 'password', label: 'Password', width: "", typeInput: "password", onTable: "OFF" },
];

exports.index = function (req, res) {
  models.fleet_customer
    .findAndCountAll({
      order: [["id", "DESC"]],
    })
    .then((fleet_customer) => {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("../modules/custfleet/views/index", {
        datarow: fleet_customer.rows,
        alert: alert,
        title: title,
        tbtitle: tbtitle,
        htitle: htitle,
        menu: menu,
      });
    });
};
exports.createCustomer = function (req, res) {
    const { username, nama_fleet, contact_person, no_telp_cust, total_omzet_14bln, alamat, alamat_dati2, alamat_dati3 } = req.body;

    fleet_customer
    .create({
        nama_fleet: nama_fleet,
        contact_person: contact_person,
        no_telp_cust: no_telp_cust,
        total_omzet_14bln: total_omzet_14bln || null,
        alamat: alamat || null,
        alamat_dati2: alamat_dati2 || null,
        alamat_dati3: alamat_dati3 || null,
    })
    .then((q) => {
        useraccount
        .create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8),
            id_user: q.id,
            kategori_user: "FLEET",
            status: 1,
        })
        .then(() => {
            req.flash('alertMessage', `Customer berhasil terdaftar`);
            req.flash('alertStatus', 'success');
            res.redirect('/custfleet');
        })
        .catch((err) => {
            req.flash('alertMessage', err.message);
            req.flash('alertStatus', 'error');
            res.redirect('/custfleet');
        });
    })
    .catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'error');
        res.redirect('/custfleet');
    });
};
exports.hapusCustomer = function (req, res) {
    let id = req.params.id;
    let customerFound;
    models.useraccount.findOne({ where: { id_user: { [Op.eq]: id } } })
        .then((account) => {
        return account.destroy().then(() => {
            models.fleet_customer.findOne({ where: { id: { [Op.eq]: id } } })
            .then((customer) => {
                customerFound = customer;
                return customer.destroy().then(() => {
                req.flash("alertMessage", `Sukses Menghapus Data Customer dengan nama : ${customerFound.nama_fleet}`);
                req.flash("alertStatus", "success");
                res.redirect("/custfleet");
                });
            })
            .catch((err) => {
                req.flash("alertMessage", err.message);
                req.flash("alertStatus", "danger");
                res.redirect("/custfleet");
            });
        });
    })
    .catch((err) => {
        req.flash("alertMessage", err.message);
        req.flash("alertStatus", "danger");
        res.redirect("/custfleet");
    });
};
exports.editCustomer = function (req, res) {
  const alertMessage = req.flash("alertMessage");
  const alertStatus = req.flash("alertStatus");
  const alert = { message: alertMessage, status: alertStatus };

  const id = req.params.id;
  models.fleet_customer.findOne({ where: { id: { [Op.eq]: id } } }).then((custfleet) => {
    res.send({
      success: true,
      message: "Berhasil ambil data!",
      htitle: htitle,
      data: custfleet,
    });
  });
};
exports.updateCustomer = function (req, res) {
  const id = req.params.id;
  let customerFound;
  models.fleet_customer
    .findOne({ where: { id: { [Op.eq]: id } } })
    .then((custfleet) => {
      customerFound = custfleet;
      return custfleet.update(req.body).then(() => {
        req.flash("alertMessage", `Sukses Mengubah Data ${title} dengan nama : ${customerFound.nama_fleet}`);
        req.flash("alertStatus", "success");
        res.redirect("/custfleet");
      });
    })
    .catch((err) => {
      req.flash("alertMessage", err.message);
      req.flash("alertStatus", "danger");
      res.redirect("/custfleet");
    });
};

exports.notFound = function (req, res) {
  res.render("page/notfound");
};
