"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("toyota_how", {
      id_how: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      judul_how: {
        type: Sequelize.STRING(50),
      },
      sampul_how: {
        type: Sequelize.TEXT,
      },
      location_how: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      date_upload: {
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("toyota_how");
  },
};
