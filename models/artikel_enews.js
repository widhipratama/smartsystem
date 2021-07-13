module.exports = (sequelize, Sequelize) => {
  const artikel_enews = sequelize.define(
    "artikel_enews",
    {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
      },
      judul: Sequelize.DataTypes.STRING,
      deskripsi: Sequelize.DataTypes.STRING,
      video: Sequelize.DataTypes.STRING,
      status: Sequelize.DataTypes.STRING,
      type: Sequelize.DataTypes.STRING,
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  return artikel_enews;
};
