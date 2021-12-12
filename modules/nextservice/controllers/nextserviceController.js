var exports = (module.exports = {});
const models = require("../../../models");
const { sequelize, QueryTypes, Op } = require("sequelize");
var htitle = [
  { id: "police_no", label: "NoPol", width: "", typeInput: "text", onTable: "ON" },
  { id: "no_rangka", label: "No Rangka", width: "", typeInput: "text", onTable: "ON" },
  { id: "model", label: "Model", width: "", typeInput: "text", onTable: "ON" },
  { id: "nama", label: "Customer", width: "", typeInput: "text", onTable: "ON" },
  { id: "kategori_customer", label: "Kat. Cust", width: "", typeInput: "text", onTable: "ON" },
  { id: "avg_omzet", label: "Avg. Omzet", width: "", typeInput: "text", onTable: "ON" },
  { id: "last_service", label: "Last Service", width: "", typeInput: "text", onTable: "ON" },
  { id: "first_class", label: "Point", width: "", typeInput: "text", onTable: "ON" },
];

exports.index = async function (req, res) {
  var title = "Next Service";
  var tbtitle = "List Next Service";

  var today = new Date();
  today.setDate(today.getDate());
  var formattedDate = new Date(today);
  var d = ("0" + formattedDate.getDate()).slice(-2);
  var m = ("0" + (formattedDate.getMonth() + 1)).slice(-2);
  var y = formattedDate.getFullYear();

  if (!req.body.start) {
    var start = y + "-" + m + "-" + d;
    var end = y + "-" + m + "-31";
  } else {
    var start = req.body.start;
    var end = req.body.end;
  }

  const kendaraan = await models.sequelize.query(
    `SELECT
      (SELECT job.norangka from job_history AS job where job.norangka = kend.no_rangka ORDER BY job.id DESC LIMIT 1) as no_rangka,
      (SELECT job.police_no from job_history AS job where job.norangka = kend.no_rangka ORDER BY job.id DESC LIMIT 1) as police_no,
      (SELECT job.model from job_history AS job where job.norangka = kend.no_rangka ORDER BY job.id DESC LIMIT 1) as model,
      cust.nama as nama,
      kend.kategori_customer as kategori_customer,
      kend.avg_omzet as avg_omzet,
      kend.last_service as last_service,
      kend.point_reward as first_class
    FROM 
      kendaraan AS kend
    LEFT JOIN
      customer AS cust ON cust.id_customer = kend.id_customer
    WHERE
      kend.first_class = 1
    AND
      DATE_FORMAT(kend.last_service, "%Y-%m-%d") >= '` +
      start +
      `'
    AND
      DATE_FORMAT(kend.last_service, "%Y-%m-%d") <= '` +
      end +
      `'`,
    {
      type: QueryTypes.SELECT,
    }
  );
  res.render("../modules/nextservice/views/index", {
    datarow: kendaraan,
    title: title,
    tbtitle: tbtitle,
    htitle: htitle,
    start: start,
    end: end,
  });
};

exports.notFound = function (req, res) {
  res.render("page/notfound");
};
