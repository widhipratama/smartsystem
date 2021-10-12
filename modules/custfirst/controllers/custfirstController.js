var exports = (module.exports = {});
const models = require("../../../models");
let Op = require("sequelize").Op;
var title = "Customer First Class";
var tbtitle = "List Customer First Class";
var htitle = [
    {id:'police_np', label:'NoPol', width:"", typeInput:"text", onTable:"ON"},
    {id:'no_rangka', label:'No Rangka', width:"", typeInput:"text", onTable:"ON"},
    {id:'customer.nama', label:'Customer', width:"", typeInput:"text", onTable:"ON"},
    {id:'first_class', label:'Total Omzet', width:"", typeInput:"text", onTable:"ON"},
];

exports.index = function (req, res) {
    models.kendaraan.findAndCountAll({
        include:[
            {model: models.customer},
            {
                model: models.progressStatus,
                limit: 1,
                order: [['service_order', 'DESC']],
            }
        ],
        where: {first_class: '1'},
    }).then((kendaraan) => {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');
        const alert = { message: alertMessage, status: alertStatus };
        res.render('../modules/custfirst/views/index', {
            datarow: kendaraan.rows,
            alert: alert,
            title: title,
            tbtitle: tbtitle,
            htitle: htitle,
        });
        // var customer = kendaraan.rows 
        //     res.send(customer[0]['progress_statuses'][0]['police_no']);
    });
}

exports.notFound = function (req, res) {
    res.render("page/notfound");
};
