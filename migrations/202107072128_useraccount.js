"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("useraccount", {
      id: {
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
      id_user: {
        type: Sequelize.STRING(100),
      },
      kategori: {
        type: Sequelize.STRING(30),
      },
      token: {
        type: Sequelize.STRING(60),
      },
      refresh_token: {
        type: Sequelize.STRING(255),
      },
      last_login: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER,
        default: 0,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("useraccount");
  },
};
