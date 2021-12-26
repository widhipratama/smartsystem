module.exports = (sequelize, Sequelize) => {
  const toyotahow = sequelize.define(
    "toyota_how",
    {
      id_how: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      judul_how: Sequelize.DataTypes.STRING,
      sampul_how: Sequelize.DataTypes.STRING,
      location_how: Sequelize.DataTypes.STRING,
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

  return toyotahow;
};
