var exports = (module.exports = {});
const models = require("../../../models");
let Op = require("sequelize").Op;
let sequelize = require("sequelize");
var htitle = [
    {id:'police_np', label:'NoPol', width:"", typeInput:"text", onTable:"ON"},
    {id:'no_rangka', label:'No Rangka', width:"", typeInput:"text", onTable:"ON"},
    {id:'customer.nama', label:'Customer', width:"", typeInput:"text", onTable:"ON"},
    {id:'first_class', label:'Qty Service', width:"", typeInput:"text", onTable:"ON"},
    {id:'first_class', label:'Total Omzet', width:"", typeInput:"text", onTable:"ON"},
    {id:'first_class', label:'Avg. Omzet', width:"", typeInput:"text", onTable:"ON"},
    {id:'first_class', label:'Point', width:"", typeInput:"text", onTable:"ON"},
    {id:'first_class', label:'Account', width:"", typeInput:"text", onTable:"ON"},
];

exports.index = function (req, res) {
    const kategori = req.params.kat;
    var title = "Customer First Class";
    var tbtitle = "List Customer First Class";
    models.kendaraan.findAndCountAll({
        include:[
            {model: models.customer},
            {
                model: models.progressStatus,
                limit: 1,
                order: [['service_order', 'DESC']],
            }
        ],
        where: [
            {first_class: '1'},
            {kategori_customer: 'customer'}
        ],
    }).then((kendaraan) => {
        res.render('../modules/custfirst/views/index', {
            datarow: kendaraan.rows,
            title: title,
            tbtitle: tbtitle,
            htitle: htitle,
        });
    });
}

exports.indexfleet = function (req, res) {
    const kategori = req.params.kat;
    var title = "Fleet First Class";
    var tbtitle = "List Fleet First Class";
    models.kendaraan.findAndCountAll({
        include:[
            {model: models.fleet_customer},
            {
                model: models.progressStatus,
                limit: 1,
                order: [['service_order', 'DESC']],
            }
        ],
        where: [
            {first_class: '1'},
            {kategori_customer: 'fleet'}
        ],
    }).then((kendaraan) => {
        res.render('../modules/custfirst/views/indexfleet', {
            datarow: kendaraan.rows,
            title: title,
            tbtitle: tbtitle,
            htitle: htitle,
        });
    });
}

// DATABASE FIRST CLASS
exports.firstclass = function (req, res) {
    const kategori = req.params.kat;
    var title = "Database First Class";
    var tbtitle = "List Database First Class";
    models.kendaraan.findAndCountAll({
        include:[
            {model: models.customer},
            {
                model: models.progressStatus,
                limit: 1,
                order: [['service_order', 'DESC']],
            }
        ],
        where: [
            {first_class: '1'},
            {kategori_customer: 'customer'}
        ],
    }).then((kendaraan) => {
        res.render('../modules/custfirst/views/indexfs', {
            datarow: kendaraan.rows,
            title: title,
            tbtitle: tbtitle,
            htitle: htitle,
        });
        res.send({ 
            success: true, 
            message: 'Berhasil ambil data!',
            data: fs
        });
    }).catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        res.redirect('/custfirst/fs');
    });;
}
exports.syncdataFristClass = function (req, res) {
    models.jobHistory.findAll({
        attributes: ['norangka','police_no',[sequelize.fn('count', sequelize.col('norangka')), 'total_count'],[sequelize.fn('sum', sequelize.col('total')), 'total_omzet']], 
        group: ['norangka'],
        where: {norangka: { [Op.not]: "" }}
    }).then((fs) => {
        res.send({ 
            success: true, 
            message: 'Berhasil ambil data!',
            data: fs
        });
    }).catch((err) => {
        res.send({ 
            success: true, 
            message: 'Error ambil data!',
            data: err.message
        });
    });;
}

exports.notFound = function (req, res) {
    res.render("page/notfound");
};
