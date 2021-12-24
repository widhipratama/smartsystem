var exports = (module.exports = {});
const fs = require("fs");

const models = require("../../../models");
const datenow = Date.now();
let Op = require("sequelize").Op;
var title = "Master Toyota How";
var tbtitle = "List Master Toyota How";
var htitle = [
  { id: "judul_how", label: "Judul", width: "", typeInput: "text", onTable: "ON" },
  { id: "sampul_how", label: "Sampul", width: "", typeInput: "file", onTable: "ON" },
  { id: "location_how", label: "Deskripsi", width: "", typeInput: "textarea", onTable: "OFF" },
  { id: "status", label: "Status", width: "", typeInput: "status", onTable: "OFF" },
];

exports.index = function (req, res) {
  models.toyota_how
    .findAndCountAll({
      order: [["id_how", "DESC"]],
    })
    .then((how) => {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("../modules/toyotahow/views/index", {
        datarow: how.rows,
        alert: alert,
        title: title,
        tbtitle: tbtitle,
        htitle: htitle,
      });
    });
};

exports.indexdetail = function (req, res) {
  const id = req.params.id;
  models.toyota_how.findOne({ where: { id_how: { [Op.eq]: id } } }).then((how) => {
    res.render("../modules/toyotahow/views/detail", {
      datarow: how,
      tbtitle: tbtitle,
      htitle: htitle,
    });
  });
};

exports.input = function (req, res) {
  models.toyota_how
    .findAndCountAll({
      order: [["id_how", "DESC"]],
    })
    .then((how) => {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("../modules/toyotahow/views/input", {
        datarow: how.rows,
        alert: alert,
        title: title,
        tbtitle: tbtitle,
        htitle: htitle,
      });
    });
};

exports.createData = async function (req, res) {
  const body = req.body;
  const datasub = req.body.judul_how_sub;
  let data = {
    judul_how: req.body.judul_how,
    status: req.body.status,
    sampul_how: req.files.sampul_how[0].filename,
    date_upload: datenow,
  };

  const toyota_how = await models.toyota_how.create(data);

  toyota_how.reload();

  let tampung = [];
  datasub.forEach((arr, i) => {
    tampung.push({
      id_how: toyota_how.id_how,
      judul_how_sub: body.judul_how_sub[i],
      desc_how_sub: body.desc_how_sub[i],
      date_upload: datenow,
    });
  });

  const toyota_how_sub = await models.toyota_how_sub.bulkCreate(tampung);

  if (toyota_how_sub) {
    req.flash("alertMessage", `Sukses Menambahkan Data ${title} dengan nama : ${toyota_how.judul_how}`);
    req.flash("alertStatus", "success");
    res.redirect("/toyotahow/input");
  } else {
    toyota_how.destroy();
    req.flash("alertMessage", `Error`);
    req.flash("alertStatus", "danger");
    res.redirect("/toyotahow/input");
  }

  //   req.flash("alertMessage", `How Error: ${err.message}`);
  //   req.flash("alertStatus", "danger");
  //   res.redirect("/toyotahow/input");
};

exports.updateDataSampul = function (req, res) {
  const id = req.params.id;
  let dataFound;
  let data;
  models.toyota_how
    .findOne({ where: { id: { [Op.eq]: id } } })
    .then((how) => {
      dataFound = how;
      data = {
        sampul_how: req.file.filename,
      };
      return how.update(data).then(() => {
        req.flash("alertMessage", `Sukses Upload Sampul ${title} dengan nama : ${dataFound.judul}`);
        req.flash("alertStatus", "success");
        res.redirect("/toyotahow");
      });
    })
    .catch((err) => {
      req.flash("alertMessage", err.message);
      req.flash("alertStatus", "danger");
      res.redirect("/how");
    });
};

exports.hapusData = function (req, res) {
  let id = req.params.id;
  let dataFound;
  models.toyota_how
    .findOne({ where: { id_how: { [Op.eq]: id } } })
    .then((how) => {
      dataFound = how;
      return how.destroy().then(() => {
        req.flash("alertMessage", `Sukses Menghapus Data ${title} dengan nama : ${dataFound.judul}`);
        req.flash("alertStatus", "success");
        res.redirect("/toyotahow/input");
      });
    })
    .catch((err) => {
      req.flash("alertMessage", err.message);
      req.flash("alertStatus", "danger");
      res.redirect("/toyotahow/input");
    });
};
exports.editData = function (req, res) {
  const alertMessage = req.flash("alertMessage");
  const alertStatus = req.flash("alertStatus");
  const alert = { message: alertMessage, status: alertStatus };

  const id = req.params.id;
  models.toyota_how.findOne({ where: { id: { [Op.eq]: id } } }).then((how) => {
    res.send({
      success: true,
      message: "Berhasil ambil data!",
      htitle: htitle,
      data: how,
    });
  });
};
exports.updateData = function (req, res) {
  const id = req.params.id;
  let dataFound;
  let data;
  models.toyota_how
    .findOne({ where: { id: { [Op.eq]: id } } })
    .then((how) => {
      dataFound = how;
      if (req.body.gambar != "" && req.body.gambar != null) {
        data = {
          judul: req.body.judul,
          status: req.body.status,
          gambar: req.file.filename,
        };
      } else {
        data = {
          judul: req.body.judul,
          status: req.body.status,
        };
      }
      return how.update(data).then(() => {
        req.flash("alertMessage", `Sukses Mengubah Data ${title} dengan nama : ${dataFound.judul}`);
        req.flash("alertStatus", "success");
        res.redirect("/toyotahow");
      });
    })
    .catch((err) => {
      req.flash("alertMessage", err.message);
      req.flash("alertStatus", "danger");
      res.redirect("/toyotahow");
    });
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
