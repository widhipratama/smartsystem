var exports = (module.exports = {});
const models = require("../../../models");
const { randomString } = require("../../../helpers/randomString");
var bcrypt = require("bcryptjs");
const { sequelize, QueryTypes, Op } = require("sequelize");

models.useraccount.hasOne(models.employee, { foreignKey: "id_karyawan" });
models.employee.belongsTo(models.useraccount, { foreignKey: "id_user" });

var title = "Employee Account";
var tbtitle = "List Employee Account";
var menu = "employee";
var htitle = [
  { id: "nama_karyawan", label: "Nama Karyawan", width: "" },
  { id: "level_karyawan", label: "Level", width: "" },
  { id: "useraccount.status", label: "Status", width: "" },
];

exports.index = async function (req, res) {
  const employee = await models.sequelize.query(
    `SELECT * 
    FROM 
      karyawan 
    LEFT JOIN 
      useraccount ON karyawan.id_karyawan = useraccount.id_user
    ORDER BY
      id_karyawan DESC`,
    {
      type: QueryTypes.SELECT,
    }
  );

  const alertMessage = req.flash("alertMessage");
  const alertStatus = req.flash("alertStatus");
  const alert = { message: alertMessage, status: alertStatus };
  res.render("../modules/employee/views/index", {
    datarow: employee,
    alert: alert,
    title: title,
    tbtitle: tbtitle,
    htitle: htitle,
    menu: menu,
  });
};
exports.createEmployee = function (req, res) {
  let employeeFound;
  models.customer
    .create(req.body)
    .then((customer) => {
      employeeFound = customer;
      req.flash("alertMessage", `Sukses Menambahkan Data customer dengan nama : ${employeeFound.nama}`);
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
exports.hapusEmployee = function (req, res) {
  let id = req.params.id;
  let employeeFound;
  models.useraccount
    .findOne({ where: { id_user: { [Op.eq]: id } } })
    .then((account) => {
      return account.destroy().then(() => {
        models.employee
          .findOne({ where: { id_karyawan: { [Op.eq]: id } } })
          .then((karyawan) => {
            employeeFound = karyawan;
            return karyawan.destroy().then(() => {
              req.flash("alertMessage", `Sukses Menghapus Data Customer dengan nama : ${employeeFound.nama_karyawan}`);
              req.flash("alertStatus", "success");
              res.redirect("/employee");
            });
          })
          .catch((err) => {
            req.flash("alertMessage", err.message);
            req.flash("alertStatus", "danger");
            res.redirect("/employee");
          });
      });
    })
    .catch((err) => {
      req.flash("alertMessage", err.message);
      req.flash("alertStatus", "danger");
      res.redirect("/customer");
    });
};
exports.editEmployee = async function (req, res) {
  const alertMessage = req.flash("alertMessage");
  const alertStatus = req.flash("alertStatus");
  const alert = { message: alertMessage, status: alertStatus };

  const id = req.params.id;
  const employee = await models.sequelize.query(
    `SELECT * 
      FROM 
        karyawan 
      LEFT JOIN 
        useraccount ON karyawan.id_karyawan = useraccount.id_user 
      WHERE karyawan.id_karyawan = ` +
      id +
      ``,
    {
      type: QueryTypes.SELECT,
    }
  );
  res.send({
    success: true,
    message: "Berhasil ambil data!",
    data: employee,
  });
};
exports.updateEmployee = (req, res) => {
  const id = req.params.id;
  let dataFound;
  let data;
  const { nama } = req.body;
  models.employee
    .findOne({ where: { id_employee: { [Op.eq]: id } } })
    .then((employee) => {
      dataFound = employee;
      data = {
        nama: nama,
        status: 1,
      };
      return employee.update(data).then(() => {
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
              res.json({ status: "200", message: "Data Karyawan berhasil terupdate" });
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
