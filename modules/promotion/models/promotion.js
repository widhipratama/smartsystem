module.exports = (sequelize, Sequelize) => {
  const promotion = sequelize.define(
    "promotion",
    {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      judul: Sequelize.DataTypes.STRING,
      gambar: Sequelize.DataTypes.STRING,
      status: Sequelize.DataTypes.STRING,
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  return promotion;
};
