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
db.user = require("./user")(sequelize, Sequelize);
db.admin = require("./admin")(sequelize, Sequelize);
db.jobHistory = require("./jobHistory")(sequelize, Sequelize);
db.progressStatus = require("./progressStatus")(sequelize, Sequelize);
db.fleet_customer = require("../modules/custfleet/models/custfleet")(sequelize, Sequelize);

db.user.hasOne(db.customer, { foreignKey: "id_customer" });

module.exports = db;
