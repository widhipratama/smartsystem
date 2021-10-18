var exports = (module.exports = {});
const models = require("../../../models");
let Op = require("sequelize").Op;
var title = "Master Promotion";
var tbtitle = "List Master Promotion";
var htitle = [
    {id:'judul', label:'Judul', width:"", typeInput:"text", onTable:"ON"},
    {id:'gambar', label:'Gambar', width:"", typeInput:"file", onTable:"ON"},
    {id:'status', label:'Status', width:"", typeInput:"status", onTable:"OFF"},
];

exports.index = function (req, res) {
    models.promotion.findAndCountAll({
        order: [['id', 'DESC']],
    }).then((promotion) => {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');
        const alert = { message: alertMessage, status: alertStatus };
        res.render('../modules/promotion/views/index', {
            datarow: promotion.rows,
            alert: alert,
            title: title,
            tbtitle: tbtitle,
            htitle: htitle,
        });
    });
}
exports.index_cust = function (req, res) {
    models.promotion.findAndCountAll({
        where: { status: '1' },
        order: [['id', 'DESC']],
    }).then((promotion) => {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');
        const alert = { message: alertMessage, status: alertStatus };
        res.send({
            datarow: promotion.rows,
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
        judul: req.body.judul,
        status: req.body.status,
        gambar: req.file.filename,
    };
    models.promotion.create(data).then((promotion) => {
        dataFound = promotion;
        req.flash('alertMessage', `Sukses Menambahkan Data ${title} dengan nama : ${dataFound.judul}`);
        req.flash('alertStatus', 'success');
        res.redirect('/promotion');
    }).catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        htitle.forEach(h => {
            if (h.id=="image_mobil") {
                req.flash(h.id, req.file.path);
            }else{
                req.flash(h.id, req.body.h.id);
            }
        });
        res.redirect('/promotion');
    });
}
exports.hapusData = function (req, res) {
    let id = req.params.id;
    let dataFound;
    models.promotion.findOne({ where: { id: { [Op.eq]: id } } }).then((promotion) => {
        dataFound = promotion;
        return promotion.destroy().then(() => {
        req.flash('alertMessage', `Sukses Menghapus Data ${title} dengan nama : ${dataFound.judul}`);
            req.flash('alertStatus', 'success');
            res.redirect('/promotion');
        })
    }).catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        res.redirect('/promotion');
    });
}
exports.editData = function (req, res) {
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus };

    const id = req.params.id;
    models.promotion.findOne({ where: { id: { [Op.eq]: id } } }).then((promotion) => {
        res.send({ 
            success: true, 
            message: 'Berhasil ambil data!',
            htitle: htitle,
            data: promotion
        });
    });
}
exports.updateData = function (req, res) {
    const id = req.params.id;
    let dataFound;
    let data;
    models.promotion.findOne({ where: { id: { [Op.eq]: id } } }).then((promotion) => {
        dataFound = promotion;
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
        return promotion.update(data).then(() => {
        req.flash('alertMessage', `Sukses Mengubah Data ${title} dengan nama : ${dataFound.judul}`);
            req.flash('alertStatus', 'success');
            res.redirect('/promotion');
        })
    }).catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        res.redirect('/promotion');
    });
}

exports.notFound = function (req, res) {
    res.render("page/notfound");
};
