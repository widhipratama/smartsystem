var exports = (module.exports = {});
const models = require("../../../models");
let Op = require("sequelize").Op;
var title = "Customer";
var tbtitle = "List Customer";
var htitle = [
  {id:'nama', label:'Nama Customer', width:""},
  {id:'no_telp', label:'Telepon', width:""},
  {id:'alamat', label:'Alamat', width:""},
//   {id:'status', label:'Status', width:""},
];

exports.index = function (req, res) {
    let page = req.query.page || 1;
    let offset = 0;
    if (page > 1) {
        offset = ((page - 1) * 10) + 1;
    }
    models.customer.findAndCountAll({
        limit: 10,
        offset: offset,
        order: [['id_customer', 'DESC']],
    }).then((customer) => {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');
        const alert = { message: alertMessage, status: alertStatus };
        const totalPage = Math.ceil(customer.count / 10);
        const pagination = { totalPage: totalPage, currentPage: page };
        res.render('../modules/customer/views/index', {
            datarow: customer.rows,
            alert: alert,
            pagination: pagination,
            title: title,
            tbtitle: tbtitle,
            htitle: htitle,
        });
    });
}
exports.createCustomer = function (req, res) {
    let customerFound;
    models.customer.create(req.body).then((customer) => {
        customerFound = customer;
        req.flash('alertMessage', `Sukses Menambahkan Data customer dengan nama : ${customerFound.nama}`);
        req.flash('alertStatus', 'success');
        res.redirect('/customer');
    }).catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        req.flash('name', req.body.nama);
        req.flash('no_telp', req.body.no_telp);
        req.flash('wa', req.body.wa);
        req.flash('ig', req.body.ig);
        req.flash('facebook', req.body.facebook);
        req.flash('alamat', req.body.alamat);
        req.flash('alamat_dati2', req.body.alamat_dati2);
        req.flash('alamat_dati3', req.body.alamat_dati3);
        req.flash('status', req.body.status);
        res.redirect('/customer');
    });
}
exports.hapusCustomer = function (req, res) {
    let id = req.params.id;
    let customerFound;
    models.customer.findOne({ where: { id_customer: { [Op.eq]: id } } }).then((customer) => {
        customerFound = customer;
        return customer.destroy().then(() => {
            req.flash('alertMessage', `Sukses Menghapus Data Customer dengan nama : ${customerFound.nama}`);
            req.flash('alertStatus', 'success');
            res.redirect('/customer');
        })
    }).catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        res.redirect('/customer');
    });
}
exports.editCustomer = function (req, res) {
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus };

    const id = req.params.id;
    models.customer.findOne({ where: { id_customer: { [Op.eq]: id } } }).then((customer) => {
        res.send({ 
            success: true, 
            message: 'Berhasil ambil data!',
            data: customer
        });
    });
}
exports.updateCustomer = function (req, res) {
    const id = req.params.id;
    let customerFound;
    models.customer.findOne({ where: { id_customer: { [Op.eq]: id } } }).then((customer) => {
        customerFound = customer;
        return customer.update(req.body).then(() => {
            req.flash('alertMessage', `Sukses Mengubah Data customer dengan nama : ${customerFound.nama}`);
            req.flash('alertStatus', 'success');
            res.redirect('/customer');
        })
    }).catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        res.redirect('/customer');
    });
}

exports.notFound = function (req, res) {
    res.render("page/notfound");
};
