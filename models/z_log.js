module.exports = (sequelize, Sequelize) => {
  const z_log = sequelize.define(
    "z_log",
    {
      id_log: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
      },
      id_account: Sequelize.DataTypes.STRING,
      text_log: Sequelize.DataTypes.STRING,
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: false,
      createdAt: true,
      updatedAt: false,
    }
  );

  return z_log;
};
