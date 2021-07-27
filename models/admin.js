module.exports = (sequelize, Sequelize) => {
  const admin = sequelize.define(
    "admin_account",
    {
      id_account: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
      },
      username: Sequelize.DataTypes.STRING,
      password: Sequelize.DataTypes.STRING,
      level: Sequelize.DataTypes.STRING,
      last_login: Sequelize.DataTypes.STRING,
      token: Sequelize.DataTypes.STRING,
      refresh_token: Sequelize.DataTypes.STRING,
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  return admin;
};
