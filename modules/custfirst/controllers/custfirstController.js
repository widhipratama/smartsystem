var exports = (module.exports = {});
const models = require("../../../models");
const { sequelize, QueryTypes, Op } = require("sequelize");
const kendaraan = require("../../cars/models/kendaraan");
var htitle = [
  { id: "police_np", label: "NoPol", width: "", typeInput: "text", onTable: "ON" },
  { id: "no_rangka", label: "No Rangka", width: "", typeInput: "text", onTable: "ON" },
  { id: "customer.nama", label: "Customer", width: "", typeInput: "text", onTable: "ON" },
  { id: "first_class", label: "Qty Service", width: "", typeInput: "text", onTable: "ON" },
  { id: "first_class", label: "Total Omzet", width: "", typeInput: "text", onTable: "ON" },
  { id: "first_class", label: "Avg. Omzet", width: "", typeInput: "text", onTable: "ON" },
  { id: "first_class", label: "Point", width: "", typeInput: "text", onTable: "ON" },
  { id: "first_class", label: "Account", width: "", typeInput: "text", onTable: "OFF" },
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
  let page = req.query.page || 1;
  let offset = 0;
  if (page > 1) {
      offset = ((page - 1) * 50) + 1;
  }
  models.kendaraan
    .findAndCountAll({
      include: [
        { model: models.customer, required:false },
        {
          model: models.progressStatus,
          limit: 1,
          order: [["service_order", "DESC"]],
        },
      ],
      where: [{ first_class: "1" }],
      limit: 50,
      offset: offset,
      order: [['last_service', 'DESC']],
    })
    .then((kendaraan) => {
      const totalPage = Math.ceil(kendaraan.count / 50);
      const pagination = { totalPage: totalPage, currentPage: page };
      res.render("../modules/custfirst/views/indexfs", {
        datarow: kendaraan.rows,
        title: title,
        tbtitle: tbtitle,
        htitle: htitle,
        pagination: pagination
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
        MIN(DATE(job.invoice_date)) first_service,
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

  //hapus data kendaraan berdasarkan no id_customer = kosong
  models.kendaraan.destroy({
    where: {
      status_kendaraan: 'none'
    }
  }).then((cars) => {
    var i = 0;
    job.forEach(e => {
      //mendari selisih bulan
      var dateFrom = new Date(e.first_service);
      var dateTo = new Date(e.last_service);
      var selisih = dateTo.getMonth() - dateFrom.getMonth() + 12 * (dateTo.getFullYear() - dateFrom.getFullYear());
      var rumusFS = selisih / e.total_count;

      //menghitung jumlah rata" omset
      let avg_omzet = e.total_omzet/ e.total_count;

      //memberikan status FS atau tidak
      if (rumusFS < 7 && avg_omzet >= 1750000) {
        firstClassStts = "1";
      } else {
        firstClassStts = "0";
      }

      //point reward
      let pointReward = (e.total_omzet/10000).toFixed();

      //simpan data

      models.kendaraan.findOne({ where: { no_rangka: { [Op.eq]: e.norangka } } }).then((cars) => {
        let data = {
          total_omzet: e.total_omzet,
          avg_omzet: avg_omzet,
          qty_service: e.total_count,
          first_class: firstClassStts,
          last_service: e.last_service,
          first_service: e.first_service,
          point_reward: pointReward,
        };
        return cars.update(data).then(() => {});
      }).catch((err)=>{
        let data = {
          no_rangka: e.norangka,
          total_omzet: e.total_omzet,
          avg_omzet: avg_omzet,
          qty_service: e.total_count,
          first_class: firstClassStts,
          last_service: e.last_service,
          first_service: e.first_service,
          point_reward: pointReward,
          status_kendaraan: 'none'
        };
        return models.kendaraan.create(data).then(() => {});
      });
    });
    res.send({
      success: true,
      message: "Success!",
      data: datarow,
    });
  })
};

exports.notFound = function (req, res) {
  res.render("page/notfound");
};
