"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("followup", {
      id_followup: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      no_rangka: {
        type: Sequelize.STRING(20),
      },
      reason: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      last_service: {
        type: Sequelize.DATE,
      },
      followup_date: {
        allowNull: true,
        type: Sequelize.DATE,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("followup");
  },
};
