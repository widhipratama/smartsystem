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
db.user = require("../modules/useraccount/models/user")(sequelize, Sequelize);
db.admin = require("./admin")(sequelize, Sequelize);
db.jobHistory = require("./jobHistory")(sequelize, Sequelize);
db.progressStatus = require("./progressStatus")(sequelize, Sequelize);
db.fleet_customer = require("../modules/custfleet/models/custfleet")(sequelize, Sequelize);
db.master_kendaraan = require("../modules/cars/models/cars")(sequelize, Sequelize);
db.whatsapp_blast = require("./whatsapp_blast")(sequelize, Sequelize);
db.promotion = require("../modules/promotion/models/promotion")(sequelize, Sequelize);
db.kendaraan = require("../modules/cars/models/kendaraan")(sequelize, Sequelize);

db.user.hasOne(db.customer, { foreignKey: "id_customer" });
db.kendaraan.hasOne(db.master_kendaraan, { foreignKey: "id_mobil" });
db.kendaraan.belongsTo(db.master_kendaraan, { foreignKey: "id_mobil" });
db.kendaraan.hasMany(db.progressStatus, { foreignKey: "rangka" });
db.kendaraan.belongsTo(db.progressStatus, { foreignKey: "no_rangka" });

module.exports = db;
