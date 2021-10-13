var exports = (module.exports = {});
const models = require("../../../models");
let Op = require("sequelize").Op;
var title = "Customer Fleet";
var tbtitle = "List Customer Fleet";
var menu = "fleet";
var htitle = [
    {id:'nama_fleet', label:'Nama Fleet', width:"", typeInput:"text", onTable:"ON"},
    {id:'contact_person', label:'PIC', width:"", typeInput:"text", onTable:"ON"},
    {id:'no_telp_cust', label:'Telepon', width:"", typeInput:"text", onTable:"ON"},
    {id:'alamat', label:'Alamat', width:"", typeInput:"textarea", onTable:"ON"},
    {id:'alamat_dati2', label:'Alamat Dati2', width:"", typeInput:"textarea", onTable:"OFF"},
    {id:'alamat_dati3', label:'Alamat Dati3', width:"", typeInput:"textarea", onTable:"OFF"},
];

exports.index = function (req, res) {
    let page = req.query.page || 1;
    let offset = 0;
    if (page > 1) {
        offset = ((page - 1) * 10) + 1;
    }
    models.fleet_customer.findAndCountAll({
        limit: 10,
        offset: offset,
        order: [['id', 'DESC']],
    }).then((fleet_customer) => {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');
        const alert = { message: alertMessage, status: alertStatus };
        const totalPage = Math.ceil(fleet_customer.count / 10);
        const pagination = { totalPage: totalPage, currentPage: page };
        res.render('../modules/custfleet/views/index', {
            datarow: fleet_customer.rows,
            alert: alert,
            pagination: pagination,
            title: title,
            tbtitle: tbtitle,
            htitle: htitle,
            menu: menu,
        });
    });
}
exports.createCustomer = function (req, res) {
    let customerFound;
    models.fleet_customer.create(req.body).then((custfleet) => {
        customerFound = custfleet;
        req.flash('alertMessage', `Sukses Menambahkan Data ${title} dengan nama : ${customerFound.nama_fleet}`);
        req.flash('alertStatus', 'success');
        res.redirect('/custfleet');
    }).catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        htitle.forEach(h => {
            req.flash(h.id, req.body.h.id);
        });
        res.redirect('/custfleet');
    });
}
exports.hapusCustomer = function (req, res) {
    let id = req.params.id;
    let customerFound;
    models.fleet_customer.findOne({ where: { id: { [Op.eq]: id } } }).then((custfleet) => {
        customerFound = custfleet;
        return custfleet.destroy().then(() => {
        req.flash('alertMessage', `Sukses Menghapus Data ${title} dengan nama : ${customerFound.nama_fleet}`);
            req.flash('alertStatus', 'success');
            res.redirect('/custfleet');
        })
    }).catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        res.redirect('/custfleet');
    });
}
exports.editCustomer = function (req, res) {
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus };

    const id = req.params.id;
    models.fleet_customer.findOne({ where: { id: { [Op.eq]: id } } }).then((custfleet) => {
        res.send({ 
            success: true, 
            message: 'Berhasil ambil data!',
            htitle: htitle,
            data: custfleet
        });
    });
}
exports.updateCustomer = function (req, res) {
    const id = req.params.id;
    let customerFound;
    models.fleet_customer.findOne({ where: { id: { [Op.eq]: id } } }).then((custfleet) => {
        customerFound = custfleet;
        return custfleet.update(req.body).then(() => {
        req.flash('alertMessage', `Sukses Mengubah Data ${title} dengan nama : ${customerFound.nama_fleet}`);
            req.flash('alertStatus', 'success');
            res.redirect('/custfleet');
        })
    }).catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        res.redirect('/custfleet');
    });
}

exports.notFound = function (req, res) {
    res.render("page/notfound");
};
