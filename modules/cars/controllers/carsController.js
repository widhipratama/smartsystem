var exports = (module.exports = {});
const models = require("../../../models");
const { sequelize, QueryTypes, Op } = require("sequelize");

var title = "Master Kendaraan";
var tbtitle = "List Master Kendaraan";
var htitle = [
  { id: "model_mobil", label: "Model", width: "", typeInput: "text", onTable: "ON" },
  { id: "warna_mobil", label: "Warna", width: "", typeInput: "text", onTable: "ON" },
  { id: "image_mobil", label: "Gambar", width: "", typeInput: "file", onTable: "ON" },
];

exports.index = function (req, res) {
  // let page = req.query.page || 1;
  // let offset = 0;
  // if (page > 1) {
  //     offset = ((page - 1) * 10) + 1;
  // }
  models.master_kendaraan
    .findAndCountAll({
      // limit: 10,
      // offset: offset,
      order: [["id_mobil", "DESC"]],
    })
    .then((master_kendaraan) => {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      // const totalPage = Math.ceil(master_kendaraan.count / 10);
      // const pagination = { totalPage: totalPage, currentPage: page };
      res.render("../modules/cars/views/index", {
        datarow: master_kendaraan.rows,
        alert: alert,
        // pagination: pagination,
        title: title,
        tbtitle: tbtitle,
        htitle: htitle,
      });
    });
};
exports.createData = function (req, res) {
  let customerFound;
  let data = {
    model_mobil: req.body.model_mobil,
    warna_mobil: req.body.warna_mobil,
    image_mobil: req.file.filename,
  };
  models.master_kendaraan
    .create(data)
    .then((cars) => {
      customerFound = cars;
      req.flash("alertMessage", `Sukses Menambahkan Data ${title} dengan nama : ${customerFound.model_mobil} ${customerFound.warna_mobil}`);
      req.flash("alertStatus", "success");
      res.redirect("/cars");
    })
    .catch((err) => {
      req.flash("alertMessage", err.message);
      req.flash("alertStatus", "danger");
      htitle.forEach((h) => {
        if (h.id == "image_mobil") {
          req.flash(h.id, req.file.path);
        } else {
          req.flash(h.id, req.body.h.id);
        }
      });
      res.redirect("/cars");
    });
};
exports.hapusData = function (req, res) {
  let id = req.params.id;
  let customerFound;
  models.master_kendaraan
    .findOne({ where: { id_mobil: { [Op.eq]: id } } })
    .then((cars) => {
      customerFound = cars;
      return cars.destroy().then(() => {
        req.flash("alertMessage", `Sukses Menghapus Data ${title} dengan nama : ${customerFound.model_mobil} ${customerFound.warna_mobil}`);
        req.flash("alertStatus", "success");
        res.redirect("/cars");
      });
    })
    .catch((err) => {
      req.flash("alertMessage", err.message);
      req.flash("alertStatus", "danger");
      res.redirect("/cars");
    });
};
exports.editData = function (req, res) {
  const alertMessage = req.flash("alertMessage");
  const alertStatus = req.flash("alertStatus");
  const alert = { message: alertMessage, status: alertStatus };

  const id = req.params.id;
  models.master_kendaraan.findOne({ where: { id_mobil: { [Op.eq]: id } } }).then((cars) => {
    res.send({
      success: true,
      message: "Berhasil ambil data!",
      htitle: htitle,
      data: cars,
    });
  });
};
exports.updateData = function (req, res) {
  const id = req.params.id;
  let customerFound;
  let data = {
    model_mobil: req.body.model_mobil,
    warna_mobil: req.body.warna_mobil,
    image_mobil: req.file.filename,
  };

  console.log(data);

  models.master_kendaraan
    .findOne({ where: { id_mobil: { [Op.eq]: id } } })
    .then((cars) => {
      customerFound = cars;

      return cars.update(data).then(() => {
        req.flash("alertMessage", `Sukses Mengubah Data ${title} dengan nama : ${customerFound.model_mobil} ${customerFound.warna_mobil}`);
        req.flash("alertStatus", "success");
        res.redirect("/cars");
      });
    })
    .catch((err) => {
      req.flash("alertMessage", err.message);
      req.flash("alertStatus", "danger");
      res.redirect("/cars");
    });
};

// Controller Mengelola data no rangka
exports.getListKendaraan = function (req, res) {
  const id = req.params.id;
  const kategori = req.params.h;
  models.kendaraan
    .findAll({
      include: [
        {
          model: models.master_kendaraan,
          require: true,
        },
        {
          model: models.progressStatus,
          limit: 1,
          order: [["service_order", "ASC"]],
        },
      ],
      where: [{ id_customer: { [Op.eq]: id } }, { kategori_customer: { [Op.eq]: kategori } }],
    })
    .then((data) => {
      res.send({
        success: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.send({
        success: "error",
        titlemessage: "Oops!",
        message: err.message,
      });
    });
};

exports.cekWarna = async (req, res) => {
  const model = req.params.model_mobil;
  const q = await models.sequelize.query(
    `SELECT 
      MAX(id_mobil) id_mobil,
      MAX(UPPER(SUBSTRING(model_mobil,1,3))) model_mobil,
      UPPER(warna_mobil) warna_mobil
    FROM 
      master_kendaraan
    WHERE
      UPPER(SUBSTRING(model_mobil,1,3)) =:model
    GROUP BY warna_mobil`,
    {
      replacements: { model: model },
      type: QueryTypes.SELECT,
    }
  );
  if (q) {
    res.send({
      success: "success",
      data: q,
      tes: model,
    });
  } else {
    res.send({
      success: "error",
      data: null,
    });
  }
};

exports.cekModel = async (req, res) => {
  const q = await models.sequelize.query(
    `SELECT 
      MAX(id_mobil) id_mobil,
      UPPER(model_mobil) model_mobil
    FROM 
      master_kendaraan
    GROUP BY model_mobil`,
    {
      type: QueryTypes.SELECT,
    }
  );
  if (q) {
    res.send({
      success: "success",
      data: q,
    });
  } else {
    res.send({
      success: "error",
      data: null,
    });
  }
};

exports.cekNoRangka = function (req, res) {
  const norangka = req.params.norangka;
  models.kendaraan
    .findOne({ where: [{ no_rangka: { [Op.eq]: norangka } }, { status_kendaraan: "none" }] })
    .then((kendraanrangka) => {
      models.progressStatus
        .findOne({ where: { rangka: { [Op.eq]: norangka } } })
        .then((q) => {
          if (q) {
            res.send({
              success: "success",
              data: q,
            });
          } else {
            res.send({
              success: "error",
              data: null,
            });
          }
        })
        .catch((err) => {});
    })
    .catch((err) => {
      res.send({
        success: "error",
        titlemessage: `No Rangka ${kendraanrangka.no_rangka} belum terdaftar!`,
        message: "Silahkan mengubungi Admin.",
      });
    });
};
exports.cekKendaraan = async function (req, res) {
  const id = req.params.id;
  var data;
  const q = await models.sequelize.query(
    `SELECT 
      *
    FROM 
      kendaraan
    WHERE
      police_no = '`+id+`'
    LIMIT 1`,
    {
      type: QueryTypes.SELECT,
    }
  );
  if (q!='') {
    if (q[0].id_customer != '') {
      const fs = await models.sequelize.query(
        `SELECT 
          COUNT(first_class) as fs
        FROM 
          kendaraan
        WHERE
          id_customer = '`+q[0].id_customer+`'
        LIMIT 1`,
        {
          type: QueryTypes.SELECT,
        }
      );
      res.send({
        success: "success",
        data: true,
      });
    }else if (q[0].first_class > 0){
      res.send({
        success: "success",
        data: true,
      });
    }else{
      res.send({
        success: "error",
        data: false,
      });
    }
  }else{
    res.send({
      success: "error",
      data: false,
    });
  }
};
exports.createKendaraan = function (req, res) {
  let dataFound;
  let firstClassStts;
  let kategori;
  let dataForm = req.body;
  let id = dataForm.norangka;
  models.jobHistory
    .findAndCountAll({
      where: { norangka: { [Op.eq]: id } },
    })
    .then((dataCount) => {
      models.jobHistory.sum("total", { where: { norangka: { [Op.eq]: id } } }).then((dataSum) => {
        //menarik data last service
        models.jobHistory
          .findAll({
            attribute: ["norangka"],
            where: { norangka: { [Op.eq]: id } },
            limit: 1,
            order: [
              ["invoice_date", "DESC"],
              ["id", "DESC"],
            ],
          })
          .then((lastService) => {
            models.jobHistory
              .findAll({
                attribute: ["norangka"],
                where: { norangka: { [Op.eq]: id } },
                limit: 1,
                order: [
                  ["invoice_date", "ASC"],
                  ["id", "ASC"],
                ],
              })
              .then((firstService) => {
                //mendari selisih bulan
                var dateFrom = new Date(firstService[0].invoice_date);
                var dateTo = new Date(lastService[0].invoice_date);
                var selisih = dateTo.getMonth() - dateFrom.getMonth() + 12 * (dateTo.getFullYear() - dateFrom.getFullYear());
                var rumusFS = selisih / dataCount.count;

                //menghitung jumlah rata" omset
                var avg_omzet = parseInt(parseInt(dataSum) / parseInt(dataCount.count));

                //point reward
                let pointReward = (dataSum / 10000).toFixed();

                //memberikan status FS atau tidak
                if (rumusFS < 7 && avg_omzet >= 1750000) {
                  firstClassStts = "1";
                } else {
                  firstClassStts = "0";
                }

                models.kendaraan
                  .findOne({ where: { no_rangka: { [Op.eq]: id } } })
                  .then((cars) => {
                    let data = {
                      total_omzet: dataSum,
                      avg_omzet: avg_omzet,
                      id_customer: dataForm.custid,
                      id_mobil: dataForm.warna,
                      qty_service: dataCount.count,
                      first_class: firstClassStts,
                      last_service: lastService[0].invoice_date,
                      first_service: firstService[0].invoice_date,
                      point_reward: pointReward,
                      kategori_customer: dataForm.kategoricust,
                      status_kendaraan: "registred",
                    };
                    return cars.update(data).then(() => {
                      dataFound = cars;
                      res.send({
                        success: "success",
                        titlemessage: "Sukses Menambahkan Data!",
                        message: `No Rangka: ${dataFound.no_rangka} telah di tambahkan ke daftar customer!`,
                      });
                    });
                  })
                  .catch((err) => {
                    res.send({
                      success: "error",
                      titlemessage: "Oops Kendaraan!",
                      message: err.message,
                    });
                  });
              });
          });
      });
    })
    .catch((err) => {
      res.send({
        success: "error",
        titlemessage: "Oops Job History!",
        message: err.message,
      });
    });
};
exports.hapuskendaraan = function (req, res) {
  let id = req.params.id;
  let resFound;
  models.kendaraan
    .findOne({ where: { no_rangka: { [Op.eq]: id } } })
    .then((cars) => {
      resFound = cars;
      return cars.destroy().then(() => {
        res.send({
          success: "success",
          titlemessage: "Sukses Menghapus Data!",
          message: `No Rangka: ${resFound.no_rangka} telah di hapus dari daftar customer!`,
        });
      });
    })
    .catch((err) => {
      res.send({
        success: "error",
        titlemessage: "Oops!",
        message: err.message,
      });
    });
};

exports.get_job_history = function (req, res) {
  let id = req.params.id;
  let resFound;
  models.jobHistory
    .findAll({
      where: { norangka: { [Op.eq]: id } },
      order: [["invoice_date", "DESC"]],
    })
    .then((cars) => {
      res.send({
        success: "success",
        titlemessage: "Data Job History tersedia!",
        message: "Ini datanya.",
        data: cars,
      });
    })
    .catch((err) => {
      res.send({
        success: "error",
        titlemessage: "Oops!",
        message: err.message,
      });
    });
};

exports.notFound = function (req, res) {
  res.render("page/notfound");
};
