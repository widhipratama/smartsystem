module.exports = (sequelize, Sequelize) => {
  const enews = sequelize.define(
    "artikel_enews",
    {
      id_enews: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
      },
      judul_enews: Sequelize.DataTypes.STRING,
      sampul_enews: Sequelize.DataTypes.STRING,
      location_enews: Sequelize.DataTypes.STRING,
      status: Sequelize.DataTypes.BOOLEAN,
      date_upload: Sequelize.DataTypes.DATE,
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  return enews;
};
