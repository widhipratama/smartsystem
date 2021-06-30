"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "whatsapp_blast",
      [
        {
          phone: "089669759244",
          message: "Hai tes aja",
          status: "pending",
          send_at: NULL,
        },
        {
          phone: "089669759244",
          message: "Hai tes aja",
          status: "pending",
          send_at: NULL,
        },
        {
          phone: "089669759244",
          message: "Hai tes aja",
          status: "pending",
          send_at: NULL,
        },
        {
          phone: "089669759244",
          message: "Hai tes aja",
          status: "pending",
          send_at: NULL,
        },
        {
          phone: "089669759244",
          message: "Hai tes aja",
          status: "pending",
          send_at: NULL,
        },
        {
          phone: "089669759244",
          message: "Hai tes aja",
          status: "pending",
          send_at: NULL,
        },
        {
          phone: "089669759244",
          message: "Hai tes aja",
          status: "pending",
          send_at: NULL,
        },
        {
          phone: "089669759244",
          message: "Hai tes aja",
          status: "pending",
          send_at: NULL,
        },
        {
          phone: "089669759244",
          message: "Hai tes aja",
          status: "pending",
          send_at: NULL,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("whatsapp_blast", null, {});
  },
};
