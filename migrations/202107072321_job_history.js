"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("job_history", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      repair_date: {
        type: Sequelize.STRING(20),
      },
      invoice_date: {
        type: Sequelize.STRING(20),
      },
      police_no: {
        type: Sequelize.STRING(20),
      },
      model_type: {
        type: Sequelize.STRING(20),
      },
      model: {
        type: Sequelize.STRING(20),
      },
      customer: {
        type: Sequelize.STRING(50),
      },
      nik: {
        type: Sequelize.STRING(50),
      },
      alamat: {
        type: Sequelize.STRING(100),
      },
      kelurahan: {
        type: Sequelize.STRING(50),
      },
      kecamatan: {
        type: Sequelize.STRING(50),
      },
      kabupaten: {
        type: Sequelize.STRING(50),
      },
      norangka: {
        type: Sequelize.STRING(20),
      },
      invoice_no: {
        type: Sequelize.STRING(20),
      },
      no_order: {
        type: Sequelize.STRING(20),
      },
      customer_type: {
        type: Sequelize.STRING(20),
      },
      job: {
        type: Sequelize.STRING(50),
      },
      job_sbe: {
        type: Sequelize.STRING(50),
      },
      repair_type: {
        type: Sequelize.STRING(20),
      },
      ro: {
        type: Sequelize.STRING(20),
      },
      last_km: {
        type: Sequelize.INTEGER,
      },
      sa: {
        type: Sequelize.STRING(10),
      },
      tech: {
        type: Sequelize.STRING(10),
      },
      rate: {
        type: Sequelize.DECIMAL,
      },
      jasa: {
        type: Sequelize.INTEGER,
      },
      part: {
        type: Sequelize.INTEGER,
      },
      oil: {
        type: Sequelize.INTEGER,
      },
      material: {
        type: Sequelize.INTEGER,
      },
      sublet: {
        type: Sequelize.INTEGER,
      },
      discount: {
        type: Sequelize.INTEGER,
      },
      ppn: {
        type: Sequelize.INTEGER,
      },
      materai: {
        type: Sequelize.INTEGER,
      },
      total: {
        type: Sequelize.INTEGER,
      },
      piutang: {
        type: Sequelize.INTEGER,
      },
      tunai: {
        type: Sequelize.INTEGER,
      },
      disc_jasa: {
        type: Sequelize.INTEGER,
      },
      disc_part: {
        type: Sequelize.INTEGER,
      },
      no_bp: {
        type: Sequelize.STRING(20),
      },
      dealer: {
        type: Sequelize.STRING(50),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("job_history");
  },
};
