"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("piutang", {
      idpiutang: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      no_rangka: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
      police_no: {
        type: Sequelize.STRING(20),
      },
      date_service: {
        type: Sequelize.DATE,
      },
      date_payment: {
        type: Sequelize.DATE,
      },
      date_piutang: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("piutang");
  },
};
