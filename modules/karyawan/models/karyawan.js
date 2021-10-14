module.exports = (sequelize, Sequelize) => {
  const karyawan = sequelize.define(
    "karyawan",
    {
      id_karyawan: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
      },
      nama_karyawan: Sequelize.DataTypes.STRING,
      level_karyawan: Sequelize.DataTypes.STRING,
      last_login: Sequelize.DataTypes.STRING,
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  return karyawan;
};
