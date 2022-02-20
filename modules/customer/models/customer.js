module.exports = (sequelize, Sequelize) => {
  const customer = sequelize.define(
    "customer",
    {
      id_customer: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nama: Sequelize.DataTypes.STRING,
      no_telp: Sequelize.DataTypes.STRING,
      tanggal_lahir: Sequelize.DataTypes.DATE,
      ig: Sequelize.DataTypes.STRING,
      facebook: Sequelize.DataTypes.STRING,
      wa: Sequelize.DataTypes.STRING,
      alamat: Sequelize.DataTypes.STRING,
      alamat_dati2: Sequelize.DataTypes.STRING,
      alamat_dati3: Sequelize.DataTypes.STRING,
      status: Sequelize.DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  return customer;
};
