"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("karyawan", {
      id_karyawan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama_karyawan: {
        type: Sequelize.STRING(30),
      },
      level_karyawan: {
        type: Sequelize.STRING(20),
      },
      last_login: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("karyawan");
  },
};
