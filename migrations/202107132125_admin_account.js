"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("admin_account", {
      id_account: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING(30),
      },
      password: {
        type: Sequelize.STRING(100),
      },
      token: {
        type: Sequelize.STRING(60),
      },
      refresh_token: {
        type: Sequelize.STRING(255),
      },
      level: {
        type: Sequelize.STRING(20),
      },
      last_login: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("admin_account");
  },
};
