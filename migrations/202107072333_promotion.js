"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("promotion", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      judul: {
        type: Sequelize.STRING(50),
      },
      gambar: {
        type: Sequelize.STRING(100),
      },
      status: {
        type: Sequelize.STRING(20),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("promotion");
  },
};
