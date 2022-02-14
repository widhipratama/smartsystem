const dayjs = require('dayjs')
const models = require("../../../models");
const xlsxFile = require("read-excel-file/node");
const fs = require("fs");
const { sequelize, QueryTypes, Op } = require("sequelize");

exports.import = async (req, res) => {
  var htitle = [
    { id: "id", label: "ID", width: "", onTable: "OFF" },
     { id: "tgl_masuk", label: "Arrival Date", width: "", onTable: "ON" },
    { id: "rangka", label: "Norangka", width: "", onTable: "ON" },
    { id: "police_no", label: "NoPol", width: "", onTable: "ON" },
    { id: "customer", label: "Customer", width: "", onTable: "ON" },
    { id: "model", label: "Model", width: "", onTable: "ON" },
    { id: "status", label: "status", width: "", onTable: "ON" },
    { id: "service_order", label: "Service Order", width: "", onTable: "ON" },
    { id: "invoice_no", label: "Invoice No", width: "", onTable: "ON" },
    { id: "type_repair", label: "Type Repair", width: "", onTable: "ON" },
    { id: "service_advisor", label: "SA", width: "", onTable: "ON" }
  ];

  var tbtitle = "List Progress Status";

  const last = await models.sequelize.query(
  'SELECT tgl_masuk FROM progress_status ORDER BY tgl_masuk DESC LIMIT 1', {
    type: QueryTypes.SELECT,
  });

  if (!req.body.date) {
    var date = last;
  } else {
    var date = req.body.date;
  }

  const dataProgressStatus = await models.sequelize.query(
  'SELECT * FROM progress_status WHERE DATE_FORMAT(tgl_masuk, "%Y-%m-%d") = :date ORDER BY tgl_masuk DESC', {
    replacements: { date:date },
    type: QueryTypes.SELECT,
  });

  const importMessage = req.flash("import_message");
  const importStatus = req.flash("import_status");
  const alert = { message: importMessage, status: importStatus };

  res.render("../modules/progress-status/views/import", {
    alert: alert,
    last: last[0].tgl_masuk,
    datarow: dataProgressStatus,
    tbtitle: tbtitle,
    htitle: htitle,
    date
  });
};

exports.upload = async (req, res) => {
  try{
    if (req.file == undefined) {
      req.flash("import_message", "File tidak ditemukan");
      req.flash("import_status", "400");
      res.redirect(process.env.URL + "/progress-status/import");
    }

    let dataExcel = [];

    let path = __basedir + "/uploads/" + req.file.filename;

    await xlsxFile(path).then(async (rows) => {
      rows.shift();

      rows.forEach(async (row) => {
        let data = {
          police_no: row[1],
          customer: row[2],
          model: row[3],
          vin: row[4],
          service_order: row[5],
          status: row[6],
          type_repair: row[7],
          km: row[8],
          km_aktual: row[9],
          rate: row[10],
          service_advisor: row[11],
          technician: row[12],
          apprentice: row[13],
          service_type: row[14],
          no_booking: row[15],
          janji_datang: row[16],
          booking_date: row[17],
          booking_time: row[18],
          arrival_date: row[19],
          barcode: row[20],
          tgl_masuk: row[21],
          jam_masuk: row[22],
          waktukeluar1: row[23],
          waktumasuk: row[24],
          waktumasuk1: row[25],
          waktukeluar: row[26],
          jam_datang: row[27],
          time_so: row[28],
          clock_on: row[29],
          clock_off: row[30],
          inspection_date: row[31],
          inspection_time: row[32],
          mulaicuci: row[33],
          mulaicuci1: row[34],
          selesaicuci: row[35],
          selesaicuci1: row[36],
          stsnotification: row[37],
          waktunotification: row[38],
          waktunotification1: row[39],
          tgl_invoice: row[40],
          jam_invoice: row[41],
          invoice_no: row[42],
          janji_penyerahan: row[43],
          jam_janji_penyerahan: row[44],
          penmyerahan_update1: row[45],
          penmyerahan_update2: row[46],
          delivery_date: row[47],
          penyerahan_final: row[48],
          pass_date: row[49],
          pass_time: row[50],
          service_order: row[51],
          sts: row[52],
          telephone: row[53],
          handphone: row[54],
          contact_person: row[55],
          telephone_cp: row[56],
          notes: row[57],
          request1: row[58],
          request2: row[59],
          request3: row[60],
          request4: row[61],
          request5: row[62],
          request6: row[63],
          dealer: row[64],
          faktur: row[65],
          cabang: row[66],
          rangka: row[67],
          engine_no: row[68],
          address: row[69],
          stall: row[70],
          delivery_date_unit: row[71],
          makanan_favorite: row[72],
          minuman_favorite: row[73],
          hobi: row[74],
          religion: row[75],
          sosmed: row[76],
          bisnis: row[77],
          tgl_ss: row[78],
          sa_notification: row[79],
        };

        await dataExcel.push(data);
        await models.progressStatus.count({ where: { service_order: row[5] } }).then((count) => {
          if (count < 1) {
            models.progressStatus.create(data);
          }
        });
      });
    });

    req.flash("import_message", "Data berhasil diimport");
    req.flash("import_status", "200");
    res.redirect(process.env.URL + "/progress-status/import");
  } catch (err) {
    req.flash("import_message", error);
    req.flash("import_status", "500");
    res.redirect(process.env.URL + "/progress-status/import");
  }

  fs.unlink(path, () => {});
};

exports.delete = async (req, res) => {
  try {
    let id = req.params.id;
    let dataFound;

    dataFound = await models.progressStatus.findOne({ where: { id } })
  
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
    res.redirect(process.env.URL + "/progress-status/import");
  }
};