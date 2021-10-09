"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("kendaraan", {
      no_rangka: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(20),
      },
      id_customer: {
        type: Sequelize.INTEGER,
      },
      warna: {
        type: Sequelize.STRING(20),
      },
      total_omzet: {
        type: Sequelize.INTEGER,
      },
      point_reward: {
        type: Sequelize.INTEGER,
      },
      statusFS: {
        default: 0,
        type: Sequelize.INTEGER,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("kendaraan");
  },
};
