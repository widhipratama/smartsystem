const db = require("../models");
const jobHistory = db.jobHistory;
const xlsxFile = require("read-excel-file/node");
const fs = require("fs");

exports.import = (req, res) => {
  const importMessage = req.flash("import_message");
  const importStatus = req.flash("import_status");
  const alert = { message: importMessage, status: importStatus };

  res.render("jobHistory/import", {
    alert: alert,
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
    xlsxFile(path).then((rows) => {
      rows.shift();

      rows.forEach((row) => {
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
        dataExcel.push(data);
        jobHistory.count({ where: { no_order: row[14] } }).then((count) => {
          if (count < 1) {
            jobHistory.create(data);
          }
        });
      });
    });

    req.flash("import_message", "Data berhasil diimport");
    req.flash("import_status", "200");
    fs.unlink(path, () => {});
    res.redirect(process.env.URL + "/job-history/import");
  } catch (error) {
    req.flash("import_message", error);
    req.flash("import_status", "500");
    res.redirect(process.env.URL + "/job-history/import");
  }
};
