"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("whatsapp_blast", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      phone: {
        type: Sequelize.STRING,
      },
      message: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      send_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("whatsapp_blast");
  },
};
