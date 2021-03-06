module.exports = (sequelize, Sequelize) => {
  const progressStatus = sequelize.define(
    "progress_status",
    {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      police_no: Sequelize.DataTypes.STRING,
      customer: Sequelize.DataTypes.STRING,
      model: Sequelize.DataTypes.STRING,
      vin: Sequelize.DataTypes.STRING,
      service_order: Sequelize.DataTypes.STRING,
      status: Sequelize.DataTypes.STRING,
      type_repair: Sequelize.DataTypes.STRING,
      km: Sequelize.DataTypes.STRING,
      km_aktual: Sequelize.DataTypes.INTEGER,
      rate: Sequelize.DataTypes.DECIMAL,
      service_advisor: Sequelize.DataTypes.STRING,
      technician: Sequelize.DataTypes.STRING,
      apprentice: Sequelize.DataTypes.STRING,
      service_type: Sequelize.DataTypes.STRING,
      no_booking: Sequelize.DataTypes.STRING,
      janji_datang: Sequelize.DataTypes.STRING,
      booking_date: Sequelize.DataTypes.STRING,
      booking_time: Sequelize.DataTypes.STRING,
      arrival_date: Sequelize.DataTypes.STRING,
      barcode: Sequelize.DataTypes.STRING,
      tgl_masuk: Sequelize.DataTypes.STRING,
      jam_masuk: Sequelize.DataTypes.STRING,
      waktukeluar1: Sequelize.DataTypes.STRING,
      waktumasuk: Sequelize.DataTypes.STRING,
      waktumasuk1: Sequelize.DataTypes.STRING,
      waktukeluar: Sequelize.DataTypes.STRING,
      jam_datang: Sequelize.DataTypes.STRING,
      time_so: Sequelize.DataTypes.STRING,
      clock_on: Sequelize.DataTypes.STRING,
      clock_off: Sequelize.DataTypes.STRING,
      inspection_date: Sequelize.DataTypes.STRING,
      inspection_time: Sequelize.DataTypes.STRING,
      mulaicuci: Sequelize.DataTypes.STRING,
      mulaicuci1: Sequelize.DataTypes.STRING,
      selesaicuci: Sequelize.DataTypes.STRING,
      selesaicuci1: Sequelize.DataTypes.STRING,
      stsnotification: Sequelize.DataTypes.STRING,
      waktunotification: Sequelize.DataTypes.STRING,
      waktunotification1: Sequelize.DataTypes.STRING,
      tgl_invoice: Sequelize.DataTypes.STRING,
      jam_invoice: Sequelize.DataTypes.STRING,
      invoice_no: Sequelize.DataTypes.STRING,
      janji_penyerahan: Sequelize.DataTypes.STRING,
      jam_janji_penyerahan: Sequelize.DataTypes.STRING,
      penmyerahan_update1: Sequelize.DataTypes.STRING,
      penmyerahan_update2: Sequelize.DataTypes.STRING,
      delivery_date: Sequelize.DataTypes.STRING,
      penyerahan_final: Sequelize.DataTypes.STRING,
      pass_date: Sequelize.DataTypes.STRING,
      pass_time: Sequelize.DataTypes.STRING,
      service_order: Sequelize.DataTypes.STRING,
      sts: Sequelize.DataTypes.STRING,
      telephone: Sequelize.DataTypes.STRING,
      handphone: Sequelize.DataTypes.STRING,
      contact_person: Sequelize.DataTypes.STRING,
      telephone_cp: Sequelize.DataTypes.STRING,
      notes: Sequelize.DataTypes.STRING,
      request1: Sequelize.DataTypes.STRING,
      request2: Sequelize.DataTypes.STRING,
      request3: Sequelize.DataTypes.STRING,
      request4: Sequelize.DataTypes.STRING,
      request5: Sequelize.DataTypes.STRING,
      request6: Sequelize.DataTypes.STRING,
      dealer: Sequelize.DataTypes.STRING,
      faktur: Sequelize.DataTypes.STRING,
      cabang: Sequelize.DataTypes.STRING,
      rangka: Sequelize.DataTypes.STRING,
      engine_no: Sequelize.DataTypes.STRING,
      address: Sequelize.DataTypes.STRING,
      stall: Sequelize.DataTypes.STRING,
      delivery_date_unit: Sequelize.DataTypes.STRING,
      makanan_favorite: Sequelize.DataTypes.STRING,
      minuman_favorite: Sequelize.DataTypes.STRING,
      hobi: Sequelize.DataTypes.STRING,
      religion: Sequelize.DataTypes.STRING,
      sosmed: Sequelize.DataTypes.STRING,
      bisnis: Sequelize.DataTypes.STRING,
      tgl_ss: Sequelize.DataTypes.STRING,
      sa_notification: Sequelize.DataTypes.STRING,
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  return progressStatus;
};
