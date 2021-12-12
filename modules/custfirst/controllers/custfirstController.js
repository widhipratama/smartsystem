var exports = (module.exports = {});
const models = require("../../../models");
const { sequelize, QueryTypes, Op } = require("sequelize");
const kendaraan = require("../../cars/models/kendaraan");
var htitle = [
  { id: "police_np", label: "NoPol", width: "style='width:500px;'", typeInput: "text", onTable: "ON" },
  { id: "no_rangka", label: "No Rangka", width: "style='width:250px;'", typeInput: "text", onTable: "ON" },
  { id: "customer.nama", label: "Customer", width: "style='width:200px;'", typeInput: "text", onTable: "ON" },
  { id: "first_class", label: "Qty Service", width: "style='width:80px;'", typeInput: "text", onTable: "ON" },
  { id: "first_class", label: "Total Omzet", width: "style='width:120px;'", typeInput: "text", onTable: "ON" },
  { id: "first_class", label: "Avg. Omzet", width: "style='width:120px;'", typeInput: "text", onTable: "ON" },
  { id: "first_class", label: "Point", width: "style='width:120px;'", typeInput: "text", onTable: "ON" },
  { id: "first_class", label: "Account", width: "style='width:120px;'", typeInput: "text", onTable: "OFF" },
];

exports.index = function (req, res) {
  const kategori = req.params.kat;
  var title = "Customer First Class";
  var tbtitle = "List Customer First Class";
  models.kendaraan
    .findAndCountAll({
      include: [
        { model: models.customer,
          required: true  
        },
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
        { 
          model: models.fleet_customer,
          required: true 
        },
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
    offset = (page - 1) * 50 + 1;
  }
  models.kendaraan
    .findAndCountAll({
      include: [
        { model: models.customer, required: false },
        {
          model: models.progressStatus,
          limit: 1,
          order: [["service_order", "DESC"]],
        },
      ],
      where: [{ first_class: "1" }],
      limit: 50,
      offset: offset,
      order: [["last_service", "DESC"]],
    })
    .then((kendaraan) => {
      const totalPage = Math.ceil(kendaraan.count / 50);
      const pagination = { totalPage: totalPage, currentPage: page };
      res.render("../modules/custfirst/views/indexfs", {
        datarow: kendaraan.rows,
        title: title,
        tbtitle: tbtitle,
        htitle: htitle,
        pagination: pagination,
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
      MAX(job.model) AS model,
      MAX(job.police_no) AS police_no,
      MAX(job.customer) AS customer,
      MIN(DATE(job.invoice_date)) AS first_service,
      MAX(DATE(job.invoice_date)) AS last_service,
      COUNT(IF(repair_type = 'SBE' OR repair_type = 'SBI' OR repair_type = 'GRP', 1,0)) AS total_count,
      SUM(job.total) AS total_omzet,
      (SUM(job.total)/COUNT(job.norangka)) AS average_omzet
    FROM 
      job_history AS job
    WHERE 
      job.norangka != '' 
    GROUP BY job.norangka`,
    {
      type: QueryTypes.SELECT,
    }
  );

  //hapus data kendaraan berdasarkan no id_customer = kosong
  
  await models.kendaraan
    .destroy({
      where: {
        status_kendaraan: "none",
      },
    })
    .then((cars) => {
      var i = 0;
      job.forEach(async (e) => {
        var firstClassStts = "0";
        //mendari selisih bulan
        var dateFrom = new Date(e.first_service);
        var dateTo = new Date(e.last_service);
        var selisih = dateTo.getMonth() - dateFrom.getMonth() + 12 * (dateTo.getFullYear() - dateFrom.getFullYear());
        var rumusFS = selisih / e.total_count;

        //menghitung jumlah rata" omset
        let avg_omzet = parseInt(e.total_omzet) / parseInt(e.total_count);

        //memberikan status FS atau tidak
        if (parseInt(e.total_count) > 1) {
          if (rumusFS < 7 && avg_omzet >= 1750000) {
            firstClassStts = "1";
          } else {
            firstClassStts = "0";
          }
        } else {
          firstClassStts = "0";
        }

        //point reward
        let pointReward = (e.total_omzet / 10000).toFixed();

        //simpan data
        if(firstClassStts=="1"){
          await models.kendaraan
          .findOne({ where: { no_rangka: { [Op.eq]: e.norangka } } })
          .then((cars) => {
            let data = {
              police_no: e.police_no,
              model: e.model,
              total_omzet: e.total_omzet,
              avg_omzet: avg_omzet,
              qty_service: e.total_count,
              first_class: firstClassStts,
              last_service: e.last_service,
              first_service: e.first_service,
              point_reward: pointReward,
              updated_at: new Date()
            };
            return cars.update(data).then(() => {});
          })
          .catch((err) => {
            let data = {
              no_rangka: e.norangka,
              police_no: e.police_no,
              model: e.model,
              total_omzet: e.total_omzet,
              avg_omzet: avg_omzet,
              qty_service: e.total_count,
              first_class: firstClassStts,
              last_service: e.last_service,
              first_service: e.first_service,
              point_reward: pointReward,
              status_kendaraan: "none",
            };
            return models.kendaraan.create(data).then(() => {});
          });
        }
      });
      res.send({
        success: true,
        message: "Success!",
        data: datarow,
      });
    });
};

// CONTROLLER DASHBOARD
exports.data_dashboard = async function (req, res) {
  const tfirst = await models.kendaraan
    .findAndCountAll({
      where: [{ first_class: "1" }],
    });
  const tregisterd = await models.kendaraan
    .findAndCountAll({
      where: [{ status_kendaraan: "registred" }],
    });
  const tenews = await models.artikel_enews
    .findAndCountAll({});
  const thow = await models.toyota_how
    .findAndCountAll({});
  const alphard = await models.sequelize.query(
    `SELECT 
        model,
				COUNT(job_history.norangka) total_count
        FROM kendaraan
        JOIN job_history
        ON job_history.norangka = kendaraan.no_rangka
        WHERE kendaraan.first_class = '1' 
				AND model = 'ALPHARD'
        GROUP BY job_history.model
        AND job_history.norangka`,
    {
      type: QueryTypes.SELECT,
    }
  );
  const avanza = await models.sequelize.query(
    `SELECT 
        model,
				COUNT(job_history.norangka) total_count
        FROM kendaraan
        JOIN job_history
        ON job_history.norangka = kendaraan.no_rangka
        WHERE kendaraan.first_class = '1' 
				AND model = 'AVANZA'
        GROUP BY job_history.model
        AND job_history.norangka`,
    {
      type: QueryTypes.SELECT,
    }
  );
  const innova = await models.sequelize.query(
    `SELECT 
        model,
				COUNT(job_history.norangka) total_count
        FROM kendaraan
        JOIN job_history
        ON job_history.norangka = kendaraan.no_rangka
        WHERE kendaraan.first_class = '1' 
				AND model = 'INNOVA'
        GROUP BY job_history.model
        AND job_history.norangka`,
    {
      type: QueryTypes.SELECT,
    }
  );
  const fortuner = await models.sequelize.query(
    `SELECT 
        model,
				COUNT(job_history.norangka) total_count
        FROM kendaraan
        JOIN job_history
        ON job_history.norangka = kendaraan.no_rangka
        WHERE kendaraan.first_class = '1' 
				AND model = 'FORTUNER'
        GROUP BY job_history.model
        AND job_history.norangka`,
    {
      type: QueryTypes.SELECT,
    }
  );
  
  res.send({
    tfirst: tfirst.count,
    tregisterd: tregisterd.count,
    tenews: tenews.count,
    thow: thow.count,
    fortuner: fortuner[0].total_count,
    avanza: avanza[0].total_count,
    innova: innova[0].total_count,
    alphard: alphard[0].total_count,
    tcars: alphard[0].total_count + innova[0].total_count + avanza[0].total_count + fortuner[0].total_count
  });
};

exports.notFound = function (req, res) {
  res.render("page/notfound");
};
