module.exports = (sequelize, Sequelize) => {
  const kendaraan = sequelize.define(
    "kendaraan",
    {
      no_rangka: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
      },
      id_customer: Sequelize.DataTypes.INTEGER,
      id_mobil: Sequelize.DataTypes.STRING,
      total_omzet: Sequelize.DataTypes.INTEGER,
      point_reward: Sequelize.DataTypes.INTEGER,
      avg_omzet: Sequelize.DataTypes.INTEGER,
      qty_service: Sequelize.DataTypes.INTEGER,
      first_class: {
        type: Sequelize.DataTypes.INTEGER,
        default: 0,
      },
      kategori_customer: Sequelize.DataTypes.STRING,
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  return kendaraan;
};