module.exports = (sequelize, Sequelize) => {
  const how_sub = sequelize.define(
    "toyota_how_sub",
    {
      id_how_sub: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
      },
      id_how: Sequelize.DataTypes.INTEGER,
      judul_how_sub: Sequelize.DataTypes.STRING,
      sampul_how_sub: Sequelize.DataTypes.STRING,
      desc_how_sub: Sequelize.DataTypes.STRING,
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

  return how_sub;
};
