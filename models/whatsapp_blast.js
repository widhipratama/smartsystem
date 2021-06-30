"use strict";
module.exports = (sequelize, DataTypes) => {
  var whatsapp_blast = sequelize.define(
    "whatsapp_blast",
    {
      phone: DataTypes.STRING,
      message: DataTypes.STRING,
      status: DataTypes.STRING,
      send_at: DataTypes.DATE,
    },
    {
      underscored: true,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  return whatsapp_blast;
};
