const dayjs = require('dayjs')
const models = require("../../../models");

const xlsxFile = require("read-excel-file/node");
const fs = require("fs");
const { sequelize, QueryTypes, Op } = require("sequelize");

exports.import = async (req, res) => {
    var htitle = [
    { id: "id", label: "ID", width: "", onTable: "OFF" },
    { id: "invoice_date", label: "Invoice Date", width: "", onTable: "ON" },
    { id: "invoice_no", label: "Invoice No", width: "", onTable: "ON" },
    { id: "police_no", label: "NoPol", width: "", onTable: "ON" },
    { id: "customer", label: "Customer", width: "", onTable: "ON" },
    { id: "model", label: "Model", width: "", onTable: "ON" },
    { id: "norangka", label: "No Rangka", width: "", onTable: "ON" },
    { id: "no_order", label: "Service Order", width: "", onTable: "ON" },
    { id: "sa", label: "SA", width: "", onTable: "ON" },
    { id: "repair_type", label: "Type Repair", width: "", onTable: "ON" },
    { id: "total", label: "Total", width: "", onTable: "ON" }
  ];

  var tbtitle = "List Job History";

  const last = await models.sequelize.query(
    'SELECT invoice_date FROM job_history ORDER BY invoice_date DESC LIMIT 1', {
      type: QueryTypes.SELECT,
  });

  if (!req.body.date) {
    var date = dayjs(last[0].invoice_date,'YYYY-MM-DD');
  } else {
    var date = req.body.date;
  }

  const dataJobHistory = await models.sequelize.query(
  'SELECT * FROM job_history WHERE DATE_FORMAT(invoice_date, "%Y-%m-%d") = :date ORDER BY invoice_date DESC', {
    replacements: { date:date },
    type: QueryTypes.SELECT,
  });

  const importMessage = req.flash("import_message");
  const importStatus = req.flash("import_status");
  const alert = { message: importMessage, status: importStatus };
  

  res.render("../modules/job-history/views/import", {
    alert: alert,
    last: last[0].invoice_date,
    datarow: dataJobHistory,
    tbtitle: tbtitle,
    htitle: htitle
  });
};

exports.upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      req.flash("import_message", "File tidak ditemukan");
      req.flash("import_status", "400");
      res.redirect(process.env.URL + "/job-history/import");
    }

    let dataExcel = [];

    let path = __basedir + "/uploads/" + req.file.filename;
    await xlsxFile(path).then(async (rows) => {
      rows.shift();

      rows.forEach(async (row) => {
        let data = {
          repair_date: row[1],
          invoice_date: row[2],
          police_no: row[3],
          model_type: row[4],
          model: row[5],
          customer: row[6],
          nik: row[7],
          alamat: row[8],
          kelurahan: row[9],
          kecamatan: row[10],
          kabupaten: row[11],
          norangka: row[12],
          invoice_no: row[13],
          no_order: row[14],
          customer_type: row[15],
          job: row[16],
          job_sbe: row[17],
          repair_type: row[18],
          ro: row[19],
          last_km: row[20],
          sa: row[21],
          tech: row[22],
          rate: row[23],
          jasa: row[24],
          part: row[25],
          oil: row[26],
          material: row[27],
          sublet: row[28],
          discount: row[29],
          ppn: row[30],
          materai: row[31],
          total: row[32],
          piutang: row[33],
          tunai: row[34],
          disc_jasa: row[35],
          disc_part: row[36],
          no_bp: row[37],
          dealer: row[38],
        };
        await dataExcel.push(data);
        await models.jobHistory.count({ where: { no_order: row[14] } }).then((count) => {
          if (count < 1) {
            models.jobHistory.create(data);
          }
        });
      });
    });

    req.flash("import_message", "Data berhasil diimport");
    req.flash("import_status", "200");
    res.redirect(process.env.URL + "/job-history/import");
  } catch (error) {
    req.flash("import_message", error);
    req.flash("import_status", "500");
    res.redirect(process.env.URL + "/job-history/import");
  }
  fs.unlink(path, () => {});
};

exports.notFound = function (req, res) {
  res.render("page/notfound");
};

exports.delete = async (req, res) => {
  try {
    let id = req.params.id;
    let dataFound;

    dataFound = await models.jobHistory.findOne({ where: { id } })
  
    if(dataFound){
      dataFound.destroy()

      res.send({
        success: 'success',
        titlemessage: "Success",
        message: "Berhasil menghapus data!",
      });
    }
  } catch (err) {
    req.flash("import_message", error);
    req.flash("import_status", "500");
    res.redirect(process.env.URL + "/job-history/import");
  }
};