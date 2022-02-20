var exports = (module.exports = {});
const models = require("../../../models");
const { randomString } = require("../../../helpers/randomString");
var bcrypt = require("bcryptjs");
const { sequelize, QueryTypes, Op } = require("sequelize");

models.useraccount.hasOne(models.customer, { foreignKey: "id_customer" });
models.customer.belongsTo(models.useraccount, { foreignKey: "id_user" });

var title = "Customer Account";
var tbtitle = "List Customer Account";
var menu = "customer";
var htitle = [
  { id: "nama", label: "Nama Customer", width: "" },
  { id: "no_telp", label: "Telepon", width: "" },
  { id: "tanggal_lahir", label: "Tanggal Lahir", width: "" },
  { id: "alamat", label: "Alamat", width: "" },
];

exports.index = async function (req, res) {
  const customer = await models.sequelize
  .query(
    `SELECT * 
    FROM 
      customer 
    LEFT JOIN 
      useraccount ON customer.id_customer = useraccount.id_user
    ORDER BY
      id_customer DESC`,
    {
      type: QueryTypes.SELECT,
    }
  );
  const alertMessage = req.flash("alertMessage");
  const alertStatus = req.flash("alertStatus");
  const alert = { message: alertMessage, status: alertStatus };
  res.render("../modules/customer/views/index", {
    datarow: customer,
    alert: alert,
    title: title,
    tbtitle: tbtitle,
    htitle: htitle,
    menu: menu,
  });
};
exports.createCustomer = function (req, res) {
  let customerFound;
  models.customer
    .create(req.body)
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
            customerFound = q;
            req.flash("alertMessage", `Sukses Menambahkan Data customer dengan nama : ${customerFound.nama}`);
            req.flash("alertStatus", "success");
            res.redirect("/customer");
        })
        .catch((err) => {
            req.flash('alertMessage', err.message);
            req.flash('alertStatus', 'error');
            res.redirect('/customer');
        });
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
exports.editCustomer = async function (req, res) {
  const alertMessage = req.flash("alertMessage");
  const alertStatus = req.flash("alertStatus");
  const alert = { message: alertMessage, status: alertStatus };

  const id = req.params.id;
  const customer = await models.sequelize
    .query(
      `SELECT * 
      FROM 
        customer 
      LEFT JOIN 
        useraccount ON customer.id_customer = useraccount.id_user 
      WHERE customer.id_customer = `+id+``,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.send({
      success: true,
      message: "Berhasil ambil data!",
      data: customer,
    });
};
exports.updateCustomer = async function (req, res) {
  const id = req.params.id;
  let customerFound;
  let data_user;
  await models.customer
    .findOne({ where: { id_customer: { [Op.eq]: id } } })
    .then((cust) => {
      customerFound = cust;
      cust.update(req.body).then(() => {
        useraccount
          .findOne({ where: { id_user: { [Op.eq]: id } } })
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
              req.flash("alertMessage", `Sukses Mengubah Data ${title} dengan nama : ${customerFound.nama}`);
              req.flash("alertStatus", "success");
              res.redirect("/customer");
            });
          })
          .catch((err) => {
              if (req.body.password==''){
                data_user = {
                  username: req.body.username,
                  id_user: req.params.id,
                  kategori_user: "USER",
                  token: randomString(60),
                  status: 1,
                };
              }else{
                data_user = {
                  username: req.body.username,
                  password: bcrypt.hashSync(req.body.password, 8),
                  id_user: req.params.id,
                  kategori_user: "USER",
                  token: randomString(60),
                  status: 1,
                };
              }
              useraccount.create(data_user).then(() => {
                req.flash("alertMessage", `Sukses Mengubah Data ${title} dengan nama : ${customerFound.nama}`);
                req.flash("alertStatus", "success");
                res.redirect("/customer");
              });
          });
      });
    })
    .catch((err) => {
      req.flash("alertMessage", err.message);
      req.flash("alertStatus", "danger");
      res.redirect("/customer");
    });
};
exports.notFound = function (req, res) {
  res.render("page/notfound");
};
