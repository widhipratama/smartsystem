var exports = (module.exports = {});
const models = require("../../../models");
const { sequelize, QueryTypes, Op } = require("sequelize");
var htitle = [
  { id: "police_np", label: "NoPol", width: "", typeInput: "text", onTable: "ON" },
  { id: "no_rangka", label: "No Rangka", width: "", typeInput: "text", onTable: "ON" },
  { id: "customer.nama", label: "Customer", width: "", typeInput: "text", onTable: "ON" },
  { id: "first_class", label: "Qty Service", width: "", typeInput: "text", onTable: "ON" },
  { id: "first_class", label: "Total Omzet", width: "", typeInput: "text", onTable: "ON" },
  { id: "first_class", label: "Avg. Omzet", width: "", typeInput: "text", onTable: "ON" },
  { id: "first_class", label: "Point", width: "", typeInput: "text", onTable: "ON" },
  { id: "first_class", label: "Account", width: "", typeInput: "text", onTable: "ON" },
];

exports.index = function (req, res) {
  const kategori = req.params.kat;
  var title = "Customer First Class";
  var tbtitle = "List Customer First Class";
  models.kendaraan
    .findAndCountAll({
      include: [
        { model: models.customer },
        {
          model: models.progressStatus,
          limit: 1,
          order: [["service_order", "DESC"]],
        },
      ],
      where: [{ first_class: "1" }, { kategori_customer: "customer" }],
    })
    .then((kendaraan) => {
      res.render("../modules/custfirst/views/index", {
        datarow: kendaraan.rows,
        title: title,
        tbtitle: tbtitle,
        htitle: htitle,
      });
    });
};

exports.indexfleet = function (req, res) {
  const kategori = req.params.kat;
  var title = "Fleet First Class";
  var tbtitle = "List Fleet First Class";
  models.kendaraan
    .findAndCountAll({
      include: [
        { model: models.fleet_customer },
        {
          model: models.progressStatus,
          limit: 1,
          order: [["service_order", "DESC"]],
        },
      ],
      where: [{ first_class: "1" }, { kategori_customer: "fleet" }],
    })
    .then((kendaraan) => {
      res.render("../modules/custfirst/views/indexfleet", {
        datarow: kendaraan.rows,
        title: title,
        tbtitle: tbtitle,
        htitle: htitle,
      });
    });
};

// DATABASE FIRST CLASS
exports.firstclass = function (req, res) {
  const kategori = req.params.kat;
  var title = "Database First Class";
  var tbtitle = "List Database First Class";
  models.kendaraan
    .findAndCountAll({
      include: [
        { model: models.customer },
        {
          model: models.progressStatus,
          limit: 1,
          order: [["service_order", "DESC"]],
        },
      ],
      where: [{ first_class: "1" }, { kategori_customer: "customer" }],
    })
    .then((kendaraan) => {
      res.render("../modules/custfirst/views/indexfs", {
        datarow: kendaraan.rows,
        title: title,
        tbtitle: tbtitle,
        htitle: htitle,
      });
      res.send({
        success: true,
        message: "Berhasil ambil data!",
        data: fs,
      });
    })
    .catch((err) => {
      req.flash("alertMessage", err.message);
      req.flash("alertStatus", "danger");
      res.redirect("/custfirst/fs");
    });
};
exports.syncdataFristClass = async function (req, res) {
  const job = await models.sequelize.query(
    `SELECT 
        job.norangka,
        MAX(job.customer) customer,
        MAX(DATE(job.invoice_date)) last_service,
        COUNT(job.norangka) total_count,
        SUM(job.total) total_omzet,
        (SUM(job.total)/COUNT(job.norangka)) average_omzet
        from job_history AS job
        WHERE 
        job.norangka != '' AND 
        job.REPAIR_TYPE = 'SBE'
        GROUP BY job.norangka`,
    {
      type: QueryTypes.SELECT,
    }
  );

  res.send({
    success: true,
    message: "Success!",
    data: job,
  });
};
// exports.syncdataFristClass = function async(req, res) {
//   const job = await models.jobHistory
//     .findAll({
//       attributes: [
//         "norangka",
//         [sequelize.fn("count", sequelize.col("norangka")), "total_count"],
//         [sequelize.fn("sum", sequelize.col("total")), "total_omzet"],
//       ],
//       group: ["norangka"],
//       where: {
//         norangka: { [Op.not]: "" },
//         repair_type: "SBE",
//       },
//     })
//     .then((fs) => {
//       fs.forEach((e) => {
//         models.jobHistory
//           .findAll({
//             attribute: ["norangka"],
//             where: { norangka: { [Op.eq]: e.norangka } },
//             limit: 1,
//             order: [
//               ["invoice_date", "DESC"],
//               ["id", "DESC"],
//             ],
//           })
//           .then((lastService) => {
//             models.jobHistory
//               .findAll({
//                 attribute: ["norangka"],
//                 where: { norangka: { [Op.eq]: e.norangka } },
//                 limit: 1,
//                 order: [
//                   ["invoice_date", "ASC"],
//                   ["id", "ASC"],
//                 ],
//               })
//               .then((firstService) => {
//                 //mendari selisih bulan
//                 var dateFrom = new Date(firstService[0].invoice_date);
//                 var dateTo = new Date(lastService[0].invoice_date);
//                 var selisih = dateTo.getMonth() - dateFrom.getMonth() + 12 * (dateTo.getFullYear() - dateFrom.getFullYear());
//                 var rumusFS = selisih / e.total_count;

//                 //menghitung jumlah rata" omset
//                 let avg_omzet = e.total_omzet / e.total_count;

//                 //memberikan status FS atau tidak
//                 if (rumusFS < 7 && avg_omzet >= 1750000) {
//                   firstClassStts = "1";
//                 } else {
//                   firstClassStts = "0";
//                 }

//                 //simpan data
//                 let data = {
//                   no_rangka: e.norangka,
//                   total_omzet: e.total_omzet,
//                   avg_omzet: avg_omzet,
//                   qty_service: e.total_count,
//                   first_class: firstClassStts,
//                 };
//                 models.kendaraan.create(data);
//               });
//           });
//       });
//     })
//     .catch((err) => {
//       res.send({
//         success: true,
//         message: "Error ambil data!",
//         data: err.message,
//       });
//     });
// };

exports.notFound = function (req, res) {
  res.render("page/notfound");
};
