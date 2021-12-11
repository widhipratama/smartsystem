"use strict";
const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.customer = require("../modules/customer/models/customer")(sequelize, Sequelize);
db.artikel_enews = require("../modules/enews/models/enews")(sequelize, Sequelize);
db.toyota_how = require("../modules/toyotahow/models/toyotahow")(sequelize, Sequelize);
db.useraccount = require("../modules/useraccount/models/useraccount")(sequelize, Sequelize);
db.karyawan = require("../modules/karyawan/models/karyawan")(sequelize, Sequelize);
db.jobHistory = require("./jobHistory")(sequelize, Sequelize);
db.progressStatus = require("./progressStatus")(sequelize, Sequelize);
db.fleet_customer = require("../modules/custfleet/models/custfleet")(sequelize, Sequelize);
db.master_kendaraan = require("../modules/cars/models/cars")(sequelize, Sequelize);
db.whatsapp_blast = require("./whatsapp_blast")(sequelize, Sequelize);
db.promotion = require("../modules/promotion/models/promotion")(sequelize, Sequelize);
db.kendaraan = require("../modules/cars/models/kendaraan")(sequelize, Sequelize);


db.useraccount.hasOne(db.customer, { foreignKey: "id_customer" });
db.customer.belongsTo(db.useraccount, { foreignKey: "id_customer" });
db.useraccount.hasOne(db.karyawan, { foreignKey: "id_user" });
db.karyawan.belongsTo(db.useraccount, { foreignKey: "id_user" });

db.kendaraan.hasOne(db.master_kendaraan, { foreignKey: "id_mobil" });
db.kendaraan.belongsTo(db.master_kendaraan, { foreignKey: "id_mobil" });
db.kendaraan.hasMany(db.progressStatus, { foreignKey: "rangka" });
db.kendaraan.belongsTo(db.progressStatus, { foreignKey: "no_rangka" });
db.progressStatus.hasOne(db.kendaraan, { foreignKey: "no_rangka" });
db.progressStatus.belongsTo(db.kendaraan, { foreignKey: "rangka" });
db.customer.hasMany(db.kendaraan, { foreignKey: "id_customer" });
db.kendaraan.belongsTo(db.customer, { foreignKey: "id_customer" });
db.fleet_customer.hasMany(db.kendaraan, { foreignKey: "id_customer" });
db.kendaraan.belongsTo(db.fleet_customer, { foreignKey: "id_customer" });
db.jobHistory.hasOne(db.progressStatus, { foreignKey: "service_order" });
db.jobHistory.belongsTo(db.progressStatus, { foreignKey: "no_order" });

module.exports = db;
