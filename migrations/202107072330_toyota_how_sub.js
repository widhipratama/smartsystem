"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("toyota_how_sub", {
      id_how_sub: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_how: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      judul_how_sub: {
        type: Sequelize.STRING(255),
      },
      sampul_how_sub: {
        type: Sequelize.TEXT,
      },
      desc_how_sub: {
        type: Sequelize.TEXT,
      },
      date_upload: {
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("toyota_how_sub");
  },
};
