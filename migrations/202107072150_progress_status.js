"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("progress_status", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      police_no: {
        type: Sequelize.STRING(20),
      },
      customer: {
        type: Sequelize.STRING(50),
      },
      model: {
        type: Sequelize.STRING(20),
      },
      vin: {
        type: Sequelize.STRING(20),
      },
      service_order: {
        type: Sequelize.STRING(20),
      },
      status: {
        type: Sequelize.STRING(20),
      },
      type_repair: {
        type: Sequelize.STRING(30),
      },
      km: {
        type: Sequelize.STRING(30),
      },
      km_aktual: {
        type: Sequelize.INTEGER,
      },
      rate: {
        type: Sequelize.DECIMAL,
      },
      service_advisor: {
        type: Sequelize.STRING(10),
      },
      technician: {
        type: Sequelize.STRING(10),
      },
      apprentice: {
        type: Sequelize.STRING(10),
      },
      service_type: {
        type: Sequelize.STRING(10),
      },
      no_booking: {
        type: Sequelize.STRING(20),
      },
      janji_datang: {
        type: Sequelize.STRING(30),
      },
      booking_date: {
        type: Sequelize.STRING(30),
      },
      booking_time: {
        type: Sequelize.STRING(30),
      },
      arrival_date: {
        type: Sequelize.STRING(30),
      },
      barcode: {
        type: Sequelize.STRING(30),
      },
      tgl_masuk: {
        type: Sequelize.STRING(30),
      },
      jam_masuk: {
        type: Sequelize.STRING(30),
      },
      waktukeluar1: {
        type: Sequelize.STRING(30),
      },
      waktumasuk: {
        type: Sequelize.STRING(30),
      },
      waktumasuk1: {
        type: Sequelize.STRING(30),
      },
      waktukeluar: {
        type: Sequelize.STRING(30),
      },
      jam_datang: {
        type: Sequelize.STRING(30),
      },
      time_so: {
        type: Sequelize.STRING(30),
      },
      clock_on: {
        type: Sequelize.STRING(30),
      },
      clock_off: {
        type: Sequelize.STRING(30),
      },
      inspection_date: {
        type: Sequelize.STRING(30),
      },
      inspection_time: {
        type: Sequelize.STRING(30),
      },
      mulaicuci: {
        type: Sequelize.STRING(30),
      },
      mulaicuci1: {
        type: Sequelize.STRING(30),
      },
      selesaicuci: {
        type: Sequelize.STRING(30),
      },
      selesaicuci1: {
        type: Sequelize.STRING(30),
      },
      stsnotification: {
        type: Sequelize.STRING(30),
      },
      waktunotification: {
        type: Sequelize.STRING(30),
      },
      waktunotification1: {
        type: Sequelize.STRING(30),
      },
      tgl_invoice: {
        type: Sequelize.STRING(30),
      },
      jam_invoice: {
        type: Sequelize.STRING(30),
      },
      invoice_no: {
        type: Sequelize.STRING(30),
      },
      janji_penyerahan: {
        type: Sequelize.STRING(30),
      },
      jam_janji_penyerahan: {
        type: Sequelize.STRING(30),
      },
      penmyerahan_update1: {
        type: Sequelize.STRING(30),
      },
      penmyerahan_update2: {
        type: Sequelize.STRING(30),
      },
      delivery_date: {
        type: Sequelize.STRING(30),
      },
      penyerahan_final: {
        type: Sequelize.STRING(30),
      },
      pass_date: {
        type: Sequelize.STRING(30),
      },
      pass_time: {
        type: Sequelize.STRING(30),
      },
      service_order: {
        type: Sequelize.STRING(20),
      },
      sts: {
        type: Sequelize.STRING(50),
      },
      telephone: {
        type: Sequelize.STRING(50),
      },
      handphone: {
        type: Sequelize.STRING(50),
      },
      contact_person: {
        type: Sequelize.STRING(50),
      },
      telephone_cp: {
        type: Sequelize.STRING(20),
      },
      notes: {
        type: Sequelize.STRING(100),
      },
      request1: {
        type: Sequelize.STRING(100),
      },
      request2: {
        type: Sequelize.STRING(100),
      },
      request3: {
        type: Sequelize.STRING(100),
      },
      request4: {
        type: Sequelize.STRING(100),
      },
      request5: {
        type: Sequelize.STRING(100),
      },
      request6: {
        type: Sequelize.STRING(100),
      },
      dealer: {
        type: Sequelize.STRING(100),
      },
      faktur: {
        type: Sequelize.STRING(50),
      },
      cabang: {
        type: Sequelize.STRING(30),
      },
      rangka: {
        type: Sequelize.STRING(30),
      },
      engine_no: {
        type: Sequelize.STRING(30),
      },
      address: {
        type: Sequelize.STRING(100),
      },
      stall: {
        type: Sequelize.STRING(30),
      },
      delivery_date_unit: {
        type: Sequelize.STRING(30),
      },
      makanan_favorite: {
        type: Sequelize.STRING(50),
      },
      minuman_favorite: {
        type: Sequelize.STRING(50),
      },
      hobi: {
        type: Sequelize.STRING(30),
      },
      religion: {
        type: Sequelize.STRING(30),
      },
      sosmed: {
        type: Sequelize.STRING(50),
      },
      bisnis: {
        type: Sequelize.STRING(50),
      },
      tgl_ss: {
        type: Sequelize.STRING(30),
      },
      sa_notification: {
        type: Sequelize.STRING(30),
      },
      wa_cp: {
        type: Sequelize.STRING(50),
      },
      email: {
        type: Sequelize.STRING(100),
      },
      pekerjaan: {
        type: Sequelize.STRING(50),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("progress_status");
  },
};
