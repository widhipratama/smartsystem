module.exports = (sequelize, Sequelize) => {
  const employee = sequelize.define(
    "karyawan",
    {
      id_karyawan: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nama_aryawan: Sequelize.DataTypes.STRING,
      level_karyawam: Sequelize.DataTypes.STRING,
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  return employee;
};
