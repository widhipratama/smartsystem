"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("user_account", {
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
      id_customer: {
        type: Sequelize.INTEGER,
        references: {
          model: "customer",
          key: "id_customer",
        },
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("user_account");
  },
};
