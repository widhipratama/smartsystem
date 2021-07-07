"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("kendaraan", {
      no_rangka: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(20),
      },
      no_bp: {
        type: Sequelize.STRING(30),
      },
      tgl_bp: {
        type: Sequelize.DATE,
      },
      no_spk: {
        type: Sequelize.STRING(30),
      },
      tgl_spk: {
        type: Sequelize.DATE,
      },
      model: {
        type: Sequelize.STRING(30),
      },
      type_mobil: {
        type: Sequelize.STRING(30),
      },
      no_mesin: {
        type: Sequelize.STRING(30),
      },
      no_rangka: {
        type: Sequelize.STRING(30),
      },
      cara_bayar: {
        type: Sequelize.STRING(30),
      },
      harga: {
        type: Sequelize.INTEGER,
      },
      diskon: {
        type: Sequelize.INTEGER,
      },
      customer: {
        type: Sequelize.STRING(50),
      },
      variasi: {
        type: Sequelize.STRING(30),
      },
      dpp: {
        type: Sequelize.INTEGER,
      },
      ppn: {
        type: Sequelize.INTEGER,
      },
      free_service: {
        type: Sequelize.INTEGER,
      },
      nopol: {
        type: Sequelize.STRING(30),
      },
      sales: {
        type: Sequelize.STRING(30),
      },
      alamat1: {
        type: Sequelize.STRING(100),
      },
      alamat2: {
        type: Sequelize.STRING(100),
      },
      alamat3: {
        type: Sequelize.STRING(100),
      },
      tlp_hp: {
        type: Sequelize.STRING(20),
      },
      warna: {
        type: Sequelize.STRING(20),
      },
      vin: {
        type: Sequelize.STRING(10),
      },
      nama_spk: {
        type: Sequelize.STRING(30),
      },
      no_cust: {
        type: Sequelize.STRING(30),
      },
      spv_sales: {
        type: Sequelize.STRING(30),
      },
      tgl_lahir_customer: {
        type: Sequelize.DATE,
      },
      jenis_kelamin_customer: {
        type: Sequelize.STRING(20),
      },
      asal_prospect: {
        type: Sequelize.STRING(30),
      },
      kabupaten: {
        type: Sequelize.STRING(30),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("kendaraan");
  },
};
