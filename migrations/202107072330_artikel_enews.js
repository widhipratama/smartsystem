"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("artikel_enews", {
      id_enews: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      judul_enews: {
        type: Sequelize.STRING(50),
      },
      sampul_enews: {
        type: Sequelize.STRING(50),
      },
      location_enews: {
        type: Sequelize.STRING(50),
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
    return queryInterface.dropTable("artikel_enews");
  },
};
