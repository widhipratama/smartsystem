var exports = (module.exports = {});
const models = require("../models");
let Op = require("sequelize").Op;
var title = "Customer";
var tbtitle = "List Customer";
var htitle = [
  {id:'nama', label:'Nama Customer', width:""},
  {id:'no_telp', label:'Telepon', width:""},
  {id:'alamat', label:'Alamat', width:""},
  {id:'status', label:'Status', width:""},
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
        res.render('customer/index', {
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
        req.flash('name', req.body.gender);
        req.flash('name', req.body.no_telp);
        req.flash('name', req.body.alamat);
        res.redirect('/customer');
    });
}

exports.notFound = function (req, res) {
  res.render("page/notfound");
};
