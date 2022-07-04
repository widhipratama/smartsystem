module.exports = (sequelize, Sequelize) => {
  const customer = sequelize.define(
    "piutang",
    {
      idpiutang: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      no_rangka: Sequelize.DataTypes.STRING,
      police_no: Sequelize.DataTypes.STRING,
      date_service: Sequelize.DataTypes.DATE,
      date_payment: Sequelize.DataTypes.DATE,
      date_piutang: Sequelize.DataTypes.DATE,
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: false,
      createdAt: true,
      updatedAt: true,
      deleteAt: true
    }
  );

  return piutang;
};
