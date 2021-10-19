var exports = (module.exports = {});
const models = require("../../../models");
let Op = require("sequelize").Op;
var htitle = [
  { id: "police_np", label: "NoPol", width: "", typeInput: "text", onTable: "ON" },
  { id: "no_rangka", label: "No Rangka", width: "", typeInput: "text", onTable: "ON" },
  { id: "progress_status.model", label: "Model", width: "", typeInput: "text", onTable: "ON" },
  { id: "customer.nama", label: "Customer", width: "", typeInput: "text", onTable: "ON" },
  { id: "avg_omzet", label: "Avg. Omzet", width: "", typeInput: "text", onTable: "ON" },
  { id: "last_service", label: "Last Service", width: "", typeInput: "text", onTable: "ON" },
  { id: "first_class", label: "Point", width: "", typeInput: "text", onTable: "ON" },
];

exports.index = function (req, res) {
  var title = "Next Service";
  var tbtitle = "List Next Service";

  var today = new Date();
  today.setDate(today.getDate());
  var formattedDate = new Date(today);
  var d = ("0" + formattedDate.getDate()).slice(-2);
  var m = ("0" + (formattedDate.getMonth() - 5)).slice(-2);
  var y = formattedDate.getFullYear();
  var mountservice = new Date(y+"-"+m+"-31");

  models.kendaraan
    .findAll({
      include: [
        { model: models.customer },
        {
          model: models.progressStatus,
          limit: 1,
          order: [["service_order", "DESC"]],
        },
      ],
      where: [{ last_service: { [Op.lte]: mountservice } }],
      // limit: 10,
    })
    .then((kendaraan) => {
      res.render("../modules/nextservice/views/index", {
        datarow: kendaraan,
        title: title,
        tbtitle: tbtitle,
        htitle: htitle,
      });
    });
};

exports.notFound = function (req, res) {
  res.render("page/notfound");
};
