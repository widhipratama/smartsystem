"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("customer", {
      id_customer: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama: {
        type: Sequelize.STRING(50),
      },
      no_telp: {
        type: Sequelize.STRING(20),
      },
      ig: {
        type: Sequelize.STRING(50),
      },
      facebook: {
        type: Sequelize.STRING(50),
      },
      wa: {
        type: Sequelize.STRING(20),
      },
      alamat: {
        type: Sequelize.STRING(200),
      },
      alamat_dati2: {
        type: Sequelize.STRING(200),
      },
      alamat_dati3: {
        type: Sequelize.STRING(200),
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      last_blasting: {
        type: Sequelize.DATE,
      },
      last_update: {
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("customer");
  },
};
