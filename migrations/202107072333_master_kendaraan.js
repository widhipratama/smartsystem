"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("master_kendaraan", {
      id_mobil: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      model_mobil: {
        type: Sequelize.STRING(50),
      },
      warna_mobil: {
        type: Sequelize.STRING(50),
      },
      image_mobil: {
        type: Sequelize.STRING(200),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("master_kendaraan");
  },
};
