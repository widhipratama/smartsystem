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
      total_omzet: {
        type: Sequelize.INTEGER,
      },
      last_service: {
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
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("kendaraan");
  },
};
