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
      tgllahir_cp: {
        type: Sequelize.DATE,
      },
      jabatan_cp: {
        type: Sequelize.STRING(25),
      },
      until_end: {
        type: Sequelize.DATE,
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
      last_blasting: {
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("fleet_customer");
  },
};
