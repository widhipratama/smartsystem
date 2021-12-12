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
      id_mobil: {
        type: Sequelize.INTEGER,
      },
      model: {
        type: Sequelize.STRING(50),
      },
      police_no: {
        type: Sequelize.STRING(50),
      },
      total_omzet: {
        type: Sequelize.INTEGER,
      },
      last_service: {
        type: Sequelize.DATE,
      },
      first_service: {
        type: Sequelize.DATE,
      },
      avg_omzet: {
        type: Sequelize.INTEGER,
      },
      qty_service: {
        type: Sequelize.INTEGER,
      },
      first_class: {
        allowNull: false,
        default: 0,
        type: Sequelize.INTEGER,
      },
      kategori_customer: {
        type: Sequelize.STRING(10)
      },
      status_kendaraan: {
        type: Sequelize.STRING(11),
      },
      point_reward: {
        allowNull: false,
        default: 0,
        type: Sequelize.INTEGER,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("kendaraan");
  },
};
