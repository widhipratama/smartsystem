var exports = (module.exports = {});
const models = require("../../../models");
let Op = require("sequelize").Op;
var htitle = [
    {id:'police_np', label:'NoPol', width:"", typeInput:"text", onTable:"ON"},
    {id:'no_rangka', label:'No Rangka', width:"", typeInput:"text", onTable:"ON"},
    {id:'customer.nama', label:'Customer', width:"", typeInput:"text", onTable:"ON"},
    {id:'first_class', label:'Qty Service', width:"", typeInput:"text", onTable:"ON"},
    {id:'first_class', label:'Total Omzet', width:"", typeInput:"text", onTable:"ON"},
    {id:'first_class', label:'Avg. Omzet', width:"", typeInput:"text", onTable:"ON"},
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

exports.notFound = function (req, res) {
    res.render("page/notfound");
};
