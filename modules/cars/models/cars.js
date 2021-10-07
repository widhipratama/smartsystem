module.exports = (sequelize, Sequelize) => {
  const master_kendaraan = sequelize.define(
    "master_kendaraan",
    {
      id_mobil: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      model_mobil: Sequelize.DataTypes.STRING,
      warna_mobil: Sequelize.DataTypes.STRING,
      image_mobil: Sequelize.DataTypes.STRING,
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  return master_kendaraan;
};
