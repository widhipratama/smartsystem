module.exports = (sequelize, Sequelize) => {
  const followup = sequelize.define(
    "followup",
    {
      id_followup: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
      },
      no_rangka: Sequelize.DataTypes.STRING,
      kategorireason: Sequelize.DataTypes.STRING,
      reason: Sequelize.DataTypes.STRING,
      last_service: Sequelize.DataTypes.STRING,
      followup_date: Sequelize.DataTypes.DATE,
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  return followup;
};
