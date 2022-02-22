var exports = (module.exports = {});
const models = require("../../../models");
const { sequelize, QueryTypes, Op } = require("sequelize");
const kendaraan = require("../../cars/models/kendaraan");
const excel = require("exceljs");

var htitle = [
  { id: "police_np", label: "NoPol", width: "style='width:80px;'", typeInput: "text", onTable: "ON" },
  { id: "no_rangka", label: "No Rangka", width: "style='width:120px;'", typeInput: "text", onTable: "ON" },
  { id: "model", label: "Model", width: "style='width:120px;'", typeInput: "text", onTable: "ON" },
  { id: "customer.nama", label: "Customer", width: "style='width:250px;'", typeInput: "text", onTable: "ON" },
  { id: "first_class", label: "Qty Service", width: "style='width:80px;'", typeInput: "text", onTable: "ON" },
  { id: "first_class", label: "Last Service", width: "style='width:120px;'", typeInput: "text", onTable: "ON" },
  { id: "first_class", label: "Total Omzet", width: "style='width:120px;'", typeInput: "text", onTable: "ON" },
  { id: "first_class", label: "Avg. Omzet", width: "style='width:120px;'", typeInput: "text", onTable: "ON" },
  { id: "first_class", label: "Account", width: "style='width:120px;'", typeInput: "text", onTable: "OFF" },
];

exports.index = async function (req, res) {
  const kategori = req.params.kat;
  var title = "Customer First Class";
  var tbtitle = "List Customer First Class";
  const kendaraan = await models.sequelize.query(
    `SELECT
      kend.no_rangka,
      kend.police_no,
      kend.model,
      cust.nama as nama,
      kend.kategori_customer as kategori_customer,
      kend.avg_omzet as avg_omzet,
      kend.last_service as last_service,
      kend.point_reward as point_reward,
      kend.qty_service as qty_service,
      kend.total_omzet as total_omzet
    FROM 
      kendaraan AS kend
    LEFT JOIN
      customer AS cust ON cust.id_customer = kend.id_customer
    WHERE
      kend.first_class = 1
    AND
      kend.kategori_customer = 'customer'`,
    {
      type: QueryTypes.SELECT,
    }
  );
  res.render("../modules/custfirst/views/index", {
    datarow: kendaraan,
    title: title,
    tbtitle: tbtitle,
    htitle: htitle,
  });
};

exports.indexfleet = async function (req, res) {
  const kategori = req.params.kat;
  var title = "Fleet First Class";
  var tbtitle = "List Fleet First Class";
  const kendaraan = await models.sequelize.query(
    `SELECT
      (SELECT job.norangka from job_history AS job where job.norangka = kend.no_rangka ORDER BY job.id DESC LIMIT 1) as no_rangka,
      (SELECT job.police_no from job_history AS job where job.norangka = kend.no_rangka ORDER BY job.id DESC LIMIT 1) as police_no,
      (SELECT job.model from job_history AS job where job.norangka = kend.no_rangka ORDER BY job.id DESC LIMIT 1) as model,
      cust.nama_fleet as nama,
      kend.kategori_customer as kategori_customer,
      kend.avg_omzet as avg_omzet,
      kend.last_service as last_service,
      kend.point_reward as point_reward,
      kend.qty_service as qty_service,
      kend.total_omzet as total_omzet
    FROM 
      kendaraan AS kend
    LEFT JOIN
      fleet_customer AS cust ON cust.id = kend.id_customer
    WHERE
      kend.first_class = 1
    AND
      kend.kategori_customer = 'fleet'`,
    {
      type: QueryTypes.SELECT,
    }
  );
  res.render("../modules/custfirst/views/indexfleet", {
    datarow: kendaraan,
    title: title,
    tbtitle: tbtitle,
    htitle: htitle,
  });
};

// DATABASE FIRST CLASS
exports.firstclass = async function (req, res) {
  const kategori = req.params.kat;
  var title = "Database First Class";
  var tbtitle = "List Database First Class";

  const kendaraan = await models.sequelize.query(
    `SELECT
      kend.no_rangka,
      kend.police_no,
      kend.model,
      (SELECT job.customer from job_history AS job where job.norangka = kend.no_rangka ORDER BY job.id DESC LIMIT 1) as nama,
      kend.kategori_customer as kategori_customer,
      kend.avg_omzet as avg_omzet,
      kend.last_service as last_service,
      kend.point_reward as point_reward,
      kend.qty_service as qty_service,
      kend.total_omzet as total_omzet,
      kend.status_kendaraan as status_kendaraan,
      kend.first_class as first_class
    FROM 
      kendaraan AS kend
    LEFT JOIN
      customer AS cust ON cust.id_customer = kend.id_customer
    LEFT JOIN
      fleet_customer AS custfleet ON custfleet.id = kend.id_customer
    WHERE
      kend.first_class = 1`,
    {
      type: QueryTypes.SELECT,
    }
  );
  res.render("../modules/custfirst/views/indexfs", {
    datarow: kendaraan,
    title: title,
    tbtitle: tbtitle,
    htitle: htitle,
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
  const count = await models.sequelize.query(
    `SELECT
      COUNT(no_rangka) as total,
      (SELECT COUNT(model) FROM kendaraan WHERE first_class = '1') as first_class,
      (SELECT COUNT(model) FROM kendaraan WHERE status_kendaraan = 'registred') as registred,
      (SELECT COUNT(model) FROM kendaraan WHERE kategori_customer = 'fleet') as fleet,
      (SELECT COUNT(model) FROM kendaraan WHERE kategori_customer = 'customer') as customer
    FROM 
      kendaraan AS kend`,
    {
      type: QueryTypes.SELECT,
    }
  );
  const repair = await models.sequelize.query(
    `SELECT
			(SELECT job.repair_type from job_history AS job where job.norangka = kend.no_rangka ORDER BY job.id DESC LIMIT 1) AS repair_type,
      COUNT(kend.model) as total
    FROM 
      kendaraan AS kend
		WHERE
      kend.first_class = 1
    AND
      DATE_FORMAT(kend.last_service, "%Y-%m-%d") >= '2021-09-01'
    AND
      DATE_FORMAT(kend.last_service, "%Y-%m-%d") <= '2021-09-01'
		GROUP BY
			repair_type`,
    {
      type: QueryTypes.SELECT,
    }
  );
  
  res.send({
    count: count,
    repair: repair,
  });
};

exports.type_repair = async function (req, res) {
  let start = req.params.start;
  let end = req.params.end;
  const repair = await models.sequelize.query(
    `SELECT
			(SELECT job.repair_type from job_history AS job where job.norangka = kend.no_rangka ORDER BY job.id DESC LIMIT 1) AS name,
      COUNT(kend.model) as y
    FROM 
      kendaraan AS kend
		WHERE
      kend.first_class = 1
    AND
      DATE_FORMAT(kend.last_service, "%Y-%m-%d") >= '`+start+`'
    AND
      DATE_FORMAT(kend.last_service, "%Y-%m-%d") <= '`+end+`'
		GROUP BY
			name`,
    {
      type: QueryTypes.SELECT,
    }
  );
  
  res.json({repair});
};

exports.omzet_sa = async function (req, res) {
  let start = req.params.start;
  let end = req.params.end;
  const repair = await models.sequelize.query(
    `SELECT
      SUM((SELECT job.total from job_history AS job 
        where job.norangka = kend.no_rangka 
        OR
          job.repair_type = 'SBE'
        OR
          job.repair_type = 'GRP'
        OR
          job.repair_type = 'PRT'
        ORDER BY job.id DESC LIMIT 1)) AS omzet,
      COUNT(kend.model) as y
    FROM 
      kendaraan AS kend
		WHERE
      kend.first_class = 1
    AND
      DATE_FORMAT(kend.last_service, "%Y-%m-%d") >= '`+start+`'
    AND
      DATE_FORMAT(kend.last_service, "%Y-%m-%d") <= '`+end+`'`,
    {
      type: QueryTypes.SELECT,
    }
  );
  
  res.send({
    repair
  });
};

exports.exportExcel = async (req,res)=>{
  let workbook = new excel.Workbook();
  let worksheet = workbook.addWorksheet("Data First Class");

  worksheet.columns = [
    { header: "no_rangka", key: "no_rangka", width: 10 },
    { header: "police_no", key: "police_no", width: 10 },
    { header: "model", key: "model", width: 10 },
    { header: "nama", key: "nama", width: 10 },
    { header: "kategori_customer", key: "kategori_customer", width: 10 },
    { header: "avg_omzet", key: "avg_omzet", width: 10 },
    { header: "last_service", key: "last_service", width: 10 },
    { header: "point_reward", key: "point_reward", width: 10 },
    { header: "qty_service", key: "qty_service", width: 10 },
    { header: "total_omzet", key: "total_omzet", width: 10 }
  ];

  const q = await models.sequelize.query(
    `SELECT
      kend.no_rangka,
      kend.police_no,
      kend.model,
      cust.nama as nama,
      kend.kategori_customer as kategori_customer,
      kend.avg_omzet as avg_omzet,
      kend.last_service as last_service,
      kend.point_reward as point_reward,
      kend.qty_service as qty_service,
      kend.total_omzet as total_omzet
    FROM 
      kendaraan AS kend
    LEFT JOIN
      customer AS cust ON cust.id_customer = kend.id_customer
    WHERE
      kend.first_class = 1`,
    {
      type: QueryTypes.SELECT,
    }
  );

  worksheet.addRows(q);

  // res is a Stream object
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=" + "Data First Class.xlsx"
  );

  return workbook.xlsx.write(res).then(function () {
    res.status(200).end();
  });

}

exports.notFound = function (req, res) {
  res.render("page/notfound");
};
