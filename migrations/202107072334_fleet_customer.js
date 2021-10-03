"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("fleet_customer", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama_fleet: {
        type: Sequelize.STRING(100),
      },
      contact_person: {
        type: Sequelize.STRING(50),
      },
      alamat: {
        type: Sequelize.STRING(100),
      },
      alamat_dati2: {
        type: Sequelize.STRING(100),
      },
      alamat_dati3: {
        type: Sequelize.STRING(100),
      },
      no_telp_cust: {
        type: Sequelize.STRING(20),
      },
      total_omzet_14bln: {
        type: Sequelize.INTEGER,
      },
      point_reward: {
        type: Sequelize.INTEGER,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("fleet_customer");
  },
};
