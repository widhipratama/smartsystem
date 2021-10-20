module.exports = (sequelize, Sequelize) => {
  const useraccount = sequelize.define(
    "useraccount",
    {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
      },
      username: Sequelize.DataTypes.STRING,
      password: Sequelize.DataTypes.STRING,
      id_user: Sequelize.DataTypes.INTEGER,
      kategori_user: Sequelize.DataTypes.STRING,
      last_login: Sequelize.DataTypes.STRING,
      token: Sequelize.DataTypes.STRING,
      refresh_token: Sequelize.DataTypes.STRING,
      status: Sequelize.DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  return useraccount;
};
