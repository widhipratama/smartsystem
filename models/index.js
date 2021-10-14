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
db.artikel_enews = require("./artikel_enews")(sequelize, Sequelize);
db.useraccount = require("../modules/useraccount/models/useraccount")(sequelize, Sequelize);
db.karyawan = require("../modules/karyawan/models/karyawan")(sequelize, Sequelize);
db.jobHistory = require("./jobHistory")(sequelize, Sequelize);
db.progressStatus = require("./progressStatus")(sequelize, Sequelize);
db.fleet_customer = require("../modules/custfleet/models/custfleet")(sequelize, Sequelize);
db.master_kendaraan = require("../modules/cars/models/cars")(sequelize, Sequelize);
db.whatsapp_blast = require("./whatsapp_blast")(sequelize, Sequelize);
db.promotion = require("../modules/promotion/models/promotion")(sequelize, Sequelize);

module.exports = db;
