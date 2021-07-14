const db = require("../models");
const user = db.user;
const admin = db.admin;

cekDuplikasiUser = (req, res, next) => {
  // Username
  user
    .findOne({
      where: {
        username: req.body.username,
      },
    })
    .then((q) => {
      if (q) {
        res.status(400).send({
          message: "Failed! Username is already in use!",
        });
        return;
      }

      next();

      // Email
      // user
      //   .findOne({
      //     where: {
      //       email: req.body.email,
      //     },
      //   })
      //   .then((q) => {
      //     if (q) {
      //       res.status(400).send({
      //         message: "Failed! Email is already in use!",
      //       });
      //       return;
      //     }

      //     next();
      //   });
    });
};

cekDuplikasiAdmin = (req, res, next) => {
  // Username
  admin
    .findOne({
      where: {
        username: req.body.username,
      },
    })
    .then((q) => {
      if (q) {
        res.status(400).send({
          message: "Failed! Username is already in use!",
        });
        return;
      }

      next();
    });
};

const cekPendaftaran = {
  cekDuplikasiUser: cekDuplikasiUser,
  cekDuplikasiAdmin: cekDuplikasiAdmin,
};

module.exports = cekPendaftaran;
