module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define(
    "user_account",
    {
      id_account: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
      },
      username: Sequelize.DataTypes.STRING,
      password: Sequelize.DataTypes.STRING,
      id_customer: Sequelize.DataTypes.INTEGER,
      last_login: Sequelize.DataTypes.STRING,
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  return user;
};
