var exports = (module.exports = {});
const models = require("../../../models");
let Op = require("sequelize").Op;
var title = "User Account";
var tbtitle = "List User Account";
var htitle = [
    {id:'username', label:'Username', width:"", typeInput:"text", onTable:"ON"},
    {id:'password', label:'Password', width:"", typeInput:"text", onTable:"OFF"},
    {id:'id_customer', label:'Customer', width:"", typeInput:"select", onTable:"OFF"},
];

exports.index = function (req, res) {
    let page = req.query.page || 1;
    let offset = 0;
    if (page > 1) {
        offset = ((page - 1) * 10) + 1;
    }
    models.user.findAndCountAll({
        limit: 10,
        offset: offset,
        order: [['id_account', 'DESC']],
    }).then((user) => {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');
        const alert = { message: alertMessage, status: alertStatus };
        const totalPage = Math.ceil(user.count / 10);
        const pagination = { totalPage: totalPage, currentPage: page };
        res.render('../modules/useraccount/views/index', {
            datarow: user.rows,
            alert: alert,
            pagination: pagination,
            title: title,
            tbtitle: tbtitle,
            htitle: htitle,
        });
    });
}
exports.createData = function (req, res) {
    let customerFound;
    models.user.create(req.body).then((user) => {
        customerFound = user;
        req.flash('alertMessage', `Sukses Menambahkan Data ${title} dengan nama : ${customerFound.nama_fleet}`);
        req.flash('alertStatus', 'success');
        res.redirect('/user');
    }).catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        htitle.forEach(h => {
            req.flash(h.id, req.body.h.id);
        });
        res.redirect('/user');
    });
}
exports.hapusData = function (req, res) {
    let id = req.params.id;
    let customerFound;
    models.user.findOne({ where: { id_account: { [Op.eq]: id } } }).then((user) => {
        customerFound = user;
        return user.destroy().then(() => {
        req.flash('alertMessage', `Sukses Menghapus Data ${title} dengan nama : ${customerFound.nama_fleet}`);
            req.flash('alertStatus', 'success');
            res.redirect('/user');
        })
    }).catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        res.redirect('/user');
    });
}
exports.editData = function (req, res) {
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus };

    const id = req.params.id;
    models.user.findOne({ where: { id_account: { [Op.eq]: id } } }).then((user) => {
        res.send({ 
            success: true, 
            message: 'Berhasil ambil data!',
            htitle: htitle,
            data: user
        });
    });
}
exports.updateData = function (req, res) {
    const id = req.params.id;
    let customerFound;
    models.user.findOne({ where: { id_account: { [Op.eq]: id } } }).then((user) => {
        customerFound = user;
        return user.update(req.body).then(() => {
        req.flash('alertMessage', `Sukses Mengubah Data ${title} dengan nama : ${customerFound.nama_fleet}`);
            req.flash('alertStatus', 'success');
            res.redirect('/user');
        })
    }).catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        res.redirect('/user');
    });
}

exports.notFound = function (req, res) {
    res.render("page/notfound");
};
