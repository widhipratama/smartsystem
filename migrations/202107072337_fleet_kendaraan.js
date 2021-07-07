"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("fleet_kendaraan", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_fleet: {
        type: Sequelize.STRING(50),
      },
      id_customer_fleet: {
        type: Sequelize.STRING(50),
      },
      model: {
        type: Sequelize.STRING(30),
      },
      type: {
        type: Sequelize.STRING(50),
      },
      warna: {
        type: Sequelize.STRING(20),
      },
      nopol: {
        type: Sequelize.STRING(20),
      },
      norangka: {
        type: Sequelize.STRING(20),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("fleet_kendaraan");
  },
};
