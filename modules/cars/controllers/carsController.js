var exports = (module.exports = {});
const models = require("../../../models");
let Op = require("sequelize").Op;
let sequelize = require("sequelize");
var title = "Master Kendaraan";
var tbtitle = "List Master Kendaraan";
var htitle = [
    {id:'model_mobil', label:'Model', width:"", typeInput:"text", onTable:"ON"},
    {id:'warna_mobil', label:'Warna', width:"", typeInput:"text", onTable:"ON"},
    {id:'image_mobil', label:'Gambar', width:"", typeInput:"file", onTable:"ON"},
];

exports.index = function (req, res) {
    // let page = req.query.page || 1;
    // let offset = 0;
    // if (page > 1) {
    //     offset = ((page - 1) * 10) + 1;
    // }
    models.master_kendaraan.findAndCountAll({
        // limit: 10,
        // offset: offset,
        order: [['id_mobil', 'DESC']],
    }).then((master_kendaraan) => {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');
        const alert = { message: alertMessage, status: alertStatus };
        // const totalPage = Math.ceil(master_kendaraan.count / 10);
        // const pagination = { totalPage: totalPage, currentPage: page };
        res.render('../modules/cars/views/index', {
            datarow: master_kendaraan.rows,
            alert: alert,
            // pagination: pagination,
            title: title,
            tbtitle: tbtitle,
            htitle: htitle,
        });
    });
}
exports.createData = function (req, res) {
    let customerFound;
    let data = {
        model_mobil: req.body.model_mobil,
        warna_mobil: req.body.warna_mobil,
        image_mobil: req.file.filename,
    };
    models.master_kendaraan.create(data).then((cars) => {
        customerFound = cars;
        req.flash('alertMessage', `Sukses Menambahkan Data ${title} dengan nama : ${customerFound.model_mobil} ${customerFound.warna_mobil}`);
        req.flash('alertStatus', 'success');
        res.redirect('/cars');
    }).catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        htitle.forEach(h => {
            if (h.id=="image_mobil") {
                req.flash(h.id, req.file.path);
            }else{
                req.flash(h.id, req.body.h.id);
            }
        });
        res.redirect('/cars');
    });
}
exports.hapusData = function (req, res) {
    let id = req.params.id;
    let customerFound;
    models.master_kendaraan.findOne({ where: { id_mobil: { [Op.eq]: id } } }).then((cars) => {
        customerFound = cars;
        return cars.destroy().then(() => {
        req.flash('alertMessage', `Sukses Menghapus Data ${title} dengan nama : ${customerFound.model_mobil} ${customerFound.warna_mobil}`);
            req.flash('alertStatus', 'success');
            res.redirect('/cars');
        })
    }).catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        res.redirect('/cars');
    });
}
exports.editData = function (req, res) {
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus };

    const id = req.params.id;
    models.master_kendaraan.findOne({ where: { id_mobil: { [Op.eq]: id } } }).then((cars) => {
        res.send({ 
            success: true, 
            message: 'Berhasil ambil data!',
            htitle: htitle,
            data: cars
        });
    });
}
exports.updateData = function (req, res) {
    const id = req.params.id;
    let customerFound;
    models.master_kendaraan.findOne({ where: { id_mobil: { [Op.eq]: id } } }).then((cars) => {
        customerFound = cars;
        return cars.update(req.body).then(() => {
        req.flash('alertMessage', `Sukses Mengubah Data ${title} dengan nama : ${customerFound.model_mobil} ${customerFound.warna_mobil}`);
            req.flash('alertStatus', 'success');
            res.redirect('/cars');
        })
    }).catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        res.redirect('/cars');
    });
}

// Controller Mengelola data no rangka
exports.getListKendaraan = function (req, res) {
    const id = req.params.id;
    models.kendaraan.findAll({ 
        include:[
            {model: models.master_kendaraan},
            {
                model: models.progressStatus,
                limit: 1,
                order: [['service_order', 'DESC']],
            }
        ],
        where: { 
            id_customer: { [Op.eq]: id } 
        } 
    }).then((data) => {
        res.send({ 
            success: 'success', 
            data: data
        });
    }).catch((err) => {
        res.send({ 
            success: 'error', 
            titlemessage: 'Oops!',
            message: err.message,
        }); 
    });
}
exports.cekNoRangka = function (req, res) {
    const id = req.params.id;
    models.kendaraan.findOne({ where: { no_rangka: { [Op.eq]: id } } }).then((kendraanrangka) => {
        
        res.send({ 
            success: 'error', 
            titlemessage: `No Rangka ${kendraanrangka.no_rangka} sudah digunakan!`,
            message: 'Silahkan mengubungi Admin.',
        });
    }).catch((err) => {
        models.progressStatus.findOne({ where: { rangka: { [Op.eq]: id } } }).then((rangka) => {
            models.master_kendaraan.findAll({ where: { model_mobil: { [Op.eq]: rangka.model } } }).then((warna) => {
                res.send({ 
                    success: 'success', 
                    titlemessage: 'No Rangka Tersedia!',
                    message: 'Silahkan lanjutkan pilih warna!',
                    data: rangka,
                    warna: warna
                }); 
            });
        }).catch((err) => {
            res.send({ 
                success: 'error', 
                titlemessage: 'Data kendraan tidak tersedia!',
                message: 'Silahkan mengubungi Admin.',
            }); 
        });
    });
}
exports.createKendaraan = function (req, res) {
    let dataFound;
    let firstClassStts;
    let dataForm = req.body;
    let id = dataForm.norangka;
    models.jobHistory.findAndCountAll({
        where: { norangka: { [Op.eq]: id }}
    }).then((dataCount)=>{
        models.jobHistory.sum('total', {where: { norangka: { [Op.eq]: id }}}).then((dataSum)=>{
            if ((dataCount.count>=1)&&(dataSum>=1000000)) {
                firstClassStts = '1';
            }else{
                firstClassStts = '0';
            }
            var data = {
                no_rangka: dataForm.norangka,
                id_customer: dataForm.custid,
                id_mobil: dataForm.warna,
                total_omzet: dataSum,
                first_class: firstClassStts
            };
            
            models.kendaraan.create(data).then((cars) => {
                dataFound = cars;
                res.send({ 
                    success: 'success', 
                    titlemessage: 'Sukses Menambahkan Data!',
                    message: `No Rangka: ${dataFound.no_rangka} telah di tambahkan ke daftar customer!`,
                });
            }).catch((err) => {
                res.send({ 
                    success: 'error', 
                    titlemessage: 'Oops Kendaraan!',
                    message: err.message,
                });
            });

        })
    }).catch((err) => {
        res.send({ 
            success: 'error', 
            titlemessage: 'Oops Job History!',
            message:  err.message,
        });
    });
}
exports.hapuskendaraan = function (req, res) {
    let id = req.params.id;
    let resFound;
    models.kendaraan.findOne({ where: { no_rangka: { [Op.eq]: id } } }).then((cars) => {
        resFound = cars;
        return cars.destroy().then(() => {
            res.send({ 
                success: 'success', 
                titlemessage: 'Sukses Menghapus Data!',
                message: `No Rangka: ${resFound.no_rangka} telah di hapus dari daftar customer!`,
            });
        })
    }).catch((err) => {
        res.send({ 
            success: 'error', 
            titlemessage: 'Oops!',
            message:  err.message,
        }); 
    });
}

exports.notFound = function (req, res) {
    res.render("page/notfound");
};
