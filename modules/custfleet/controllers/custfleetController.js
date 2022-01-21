// var exports = (module.exports = {});
const models = require("../../../models");
const { sequelize, QueryTypes, Op } = require("sequelize");
const useraccount = models.useraccount;
const fleet_customer = models.fleet_customer;
var bcrypt = require("bcryptjs");
const { randomString } = require("../../../helpers/randomString");

var title = "Customer Fleet";
var tbtitle = "List Customer Fleet";
var menu = "fleet";
var htitle = [
  { id: 'nama_fleet', label: 'Nama Fleet', width: "", typeInput: "text", onTable: "ON" },
  { id: 'contact_person', label: 'PIC', width: "", typeInput: "text", onTable: "ON" },
  { id: 'no_telp_cust', label: 'Telepon', width: "", typeInput: "text", onTable: "ON" },
  { id: 'until_end', label: 'Berlaku Sampai', width: "", typeInput: "tanggal", onTable: "ON" },
  { id: 'alamat', label: 'Alamat', width: "", typeInput: "textarea", onTable: "OFF" },
  { id: 'alamat_dati2', label: 'Alamat Dati2', width: "", typeInput: "textarea", onTable: "OFF" },
  { id: 'alamat_dati3', label: 'Alamat Dati3', width: "", typeInput: "textarea", onTable: "OFF" },
  { id: 'username', label: 'Username', width: "", typeInput: "text", onTable: "OFF" },
  { id: 'password', label: 'New Password', width: "", typeInput: "password", onTable: "OFF" },
];

exports.index = async function (req, res) {
  const fleet_customer = await models.sequelize
  .query(
    `SELECT 
      fleet_customer.id,
      fleet_customer.nama_fleet,
      fleet_customer.contact_person,
      fleet_customer.alamat,
      fleet_customer.alamat_dati2,
      fleet_customer.alamat_dati3,
      fleet_customer.no_telp_cust,
      fleet_customer.total_omzet_14bln,
      fleet_customer.until_end,
      fleet_customer.point_reward,
      fleet_customer.last_blasting,
      useraccount.token
    FROM 
      fleet_customer 
    LEFT JOIN 
      useraccount ON fleet_customer.id = useraccount.id_user
    ORDER BY
      fleet_customer.id DESC`,
    {
      type: QueryTypes.SELECT,
    }
  );
  const alertMessage = req.flash("alertMessage");
  const alertStatus = req.flash("alertStatus");
  const alert = { message: alertMessage, status: alertStatus };
  res.render("../modules/custfleet/views/index", {
    datarow: fleet_customer,
    alert: alert,
    title: title,
    tbtitle: tbtitle,
    htitle: htitle,
    menu: menu,
  });
};
exports.createCustomer = async function (req, res) {
    const { username, nama_fleet, contact_person, no_telp_cust, total_omzet_14bln, alamat, alamat_dati2, alamat_dati3 } = req.body;

    await fleet_customer
    .create({
        nama_fleet: nama_fleet,
        contact_person: contact_person,
        no_telp_cust: no_telp_cust,
        until_end: until_end,
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
            token: randomString(60),
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
exports.editCustomer = async function (req, res) {
  const alertMessage = req.flash("alertMessage");
  const alertStatus = req.flash("alertStatus");
  const alert = { message: alertMessage, status: alertStatus };

  const id = req.params.id;
  const q = await models.sequelize.query(
    `SELECT 
      *
    FROM 
      fleet_customer as fleet
    LEFT JOIN
      useraccount ON fleet.id = useraccount.id_user
    WHERE
      fleet.id = `+id+`
    LIMIT 1`,
    {
      type: QueryTypes.SELECT,
    }
  );
  res.send({
    success: true,
    message: "Berhasil ambil data!",
    htitle: htitle,
    data: q,
  });
};
exports.updateCustomer = async function (req, res) {
  const id = req.params.id;
  let customerFound;
  let data_user;
  await models.fleet_customer
    .findOne({ where: { id: { [Op.eq]: id } } })
    .then((custfleet) => {
      customerFound = custfleet;
      custfleet.update(req.body).then(() => {
        useraccount
          .findOne({ where: { id: { [Op.eq]: id } } })
          .then((useraccount) => {
            if (req.body.password==''){
              data_user = {
                username: req.body.username,
              };
            }else{
              data_user = {
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 8)
              };
            }
            useraccount.update(data_user).then(() => {
              req.flash("alertMessage", `Sukses Mengubah Data ${title} dengan nama : ${customerFound.nama_fleet}`);
              req.flash("alertStatus", "success");
              res.redirect("/custfleet");
            });
          })
          .catch((err) => {
              if (req.body.password==''){
                data_user = {
                  username: req.body.username,
                  id_user: req.params.id,
                  kategori_user: "FLEET",
                  token: randomString(60),
                  status: 1,
                };
              }else{
                data_user = {
                  username: req.body.username,
                  password: bcrypt.hashSync(req.body.password, 8),
                  id_user: req.params.id,
                  kategori_user: "FLEET",
                  token: randomString(60),
                  status: 1,
                };
              }
              useraccount.create(data_user).then(() => {
                req.flash("alertMessage", `Sukses Mengubah Data ${title} dengan nama : ${customerFound.nama_fleet}`);
                req.flash("alertStatus", "success");
                res.redirect("/custfleet");
              });
          });
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
