module.exports = (sequelize, Sequelize) => {
  const reason = sequelize.define(
    "reason",
    {
      idreason: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      kategorireason: Sequelize.DataTypes.STRING,
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: false,
      createdAt: true,
      updatedAt: true,
    }
  );

  return reason;
};
