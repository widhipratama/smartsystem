"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("artikel_enews", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      judul: {
        type: Sequelize.STRING(50),
      },
      deskripsi: {
        type: Sequelize.STRING(100),
      },
      video: {
        type: Sequelize.STRING(100),
      },
      status: {
        type: Sequelize.STRING(20),
      },
      type: {
        type: Sequelize.STRING(20),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("artikel_enews");
  },
};
