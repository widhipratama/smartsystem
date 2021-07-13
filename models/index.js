"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.customer = require("./customer")(sequelize, Sequelize);
db.artikel_enews = require("./artikel_enews")(sequelize, Sequelize);

module.exports = db;
