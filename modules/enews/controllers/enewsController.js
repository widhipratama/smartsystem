var exports = (module.exports = {});
const fs = require("fs");
const models = require("../../../models");
const datenow = Date.now();
let Op = require("sequelize").Op;
var title = "Master E-News";
var tbtitle = "List Master E-News";
var htitle = [
    {id:'judul_enews', label:'Judul', width:"", typeInput:"text", onTable:"ON"},
    {id:'sampul_enews', label:'Sampul', width:"", typeInput:"file", onTable:"ON"},
    {id:'location_enews', label:'File', width:"", typeInput:"file", onTable:"OFF"},
    {id:'status', label:'Status', width:"", typeInput:"status", onTable:"OFF"},
];

exports.index = function (req, res) {models.artikel_enews.findAndCountAll({
        order: [['id_enews', 'DESC']],
    }).then((enews) => {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');
        const alert = { message: alertMessage, status: alertStatus };
        res.render('../modules/enews/views/index', {
            datarow: enews.rows,
            alert: alert,
            title: title,
            tbtitle: tbtitle,
            htitle: htitle,
        });
    });
};

exports.indexdetail = function (req, res) {
    const id = req.params.id;
    models.artikel_enews.findOne({ where: { id_enews: { [Op.eq]: id } } }).then((enews) => {
        res.render('../modules/enews/views/detail', {
            datarow: enews,
            tbtitle: tbtitle,
            htitle: htitle,
        });
    });
}

exports.input = function (req, res) {
    models.artikel_enews.findAndCountAll({
        order: [['id_enews', 'DESC']],
    }).then((enews) => {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');
        const alert = { message: alertMessage, status: alertStatus };
        res.render('../modules/enews/views/input', {
            datarow: enews.rows,
            alert: alert,
            title: title,
            tbtitle: tbtitle,
            htitle: htitle,
        });
    });
}
exports.createData = function (req, res) {
    let dataFound;
    let data = {
        judul_enews: req.body.judul_enews,
        status: req.body.status,
        location_enews: req.files.location_enews[0].filename,
        sampul_enews: req.files.sampul_enews[0].filename,
        date_upload: datenow,
    };
    models.artikel_enews.create(data).then((enews) => {
        dataFound = enews;
        req.flash('alertMessage', `Sukses Menambahkan Data ${title} dengan nama : ${dataFound.judul_enews}`);
        req.flash('alertStatus', 'success');
        res.redirect('/enews/input');
    }).catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        res.redirect('/enews/input');
    });
}

exports.updateDataSampul = function (req, res) {
    const id = req.params.id;
    let dataFound;
    let data;
    models.artikel_enews.findOne({ where: { id: { [Op.eq]: id } } }).then((enews) => {
        dataFound = enews;
        data = {
            sampul_enews: req.file.filename,
        };
        return enews.update(data).then(() => {
        req.flash('alertMessage', `Sukses Upload Sampul ${title} dengan nama : ${dataFound.judul}`);
            req.flash('alertStatus', 'success');
            res.redirect('/enews');
        })
    }).catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        res.redirect('/enews');
    });
}

exports.hapusData = function (req, res) {
    let id = req.params.id;
    let dataFound;
    models.artikel_enews.findOne({ where: { id: { [Op.eq]: id } } }).then((enews) => {
        dataFound = enews;
        return enews.destroy().then(() => {
        req.flash('alertMessage', `Sukses Menghapus Data ${title} dengan nama : ${dataFound.judul}`);
            req.flash('alertStatus', 'success');
            res.redirect('/enews');
        })
    }).catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        res.redirect('/enews');
    });
}
exports.editData = function (req, res) {
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus };

    const id = req.params.id;
    models.artikel_enews.findOne({ where: { id: { [Op.eq]: id } } }).then((enews) => {
        res.send({ 
            success: true, 
            message: 'Berhasil ambil data!',
            htitle: htitle,
            data: enews
        });
    });
}
exports.updateData = function (req, res) {
    const id = req.params.id;
    let dataFound;
    let data;
    models.artikel_enews.findOne({ where: { id: { [Op.eq]: id } } }).then((enews) => {
        dataFound = enews;
        if (req.body.gambar!=''&&req.body.gambar!=null) {
            data = {
                judul: req.body.judul,
                status: req.body.status,
                gambar: req.file.filename,
            };
        }else{
            data = {
                judul: req.body.judul,
                status: req.body.status,
            };
        }
        return enews.update(data).then(() => {
        req.flash('alertMessage', `Sukses Mengubah Data ${title} dengan nama : ${dataFound.judul}`);
            req.flash('alertStatus', 'success');
            res.redirect('/enews');
        })
    }).catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        res.redirect('/enews');
    });
}
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
