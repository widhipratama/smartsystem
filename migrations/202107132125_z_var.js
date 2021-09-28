"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("z_var", {
      idvar: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      isi_var: {
        type: Sequelize.TEXT(),
      },
      ket_var: {
        type: Sequelize.TEXT(),
      },
      count_var: {
        type: Sequelize.INTEGER,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("z_var");
  },
};
