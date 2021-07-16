const db = require("../models");
const config = require("../config/auth");
const { body, validationResult } = require("express-validator/check");
const { randomString } = require("../helpers/randomString");
const admin = db.admin;
const user = db.user;
const customer = db.customer;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.validate = (method) => {
  switch (method) {
    case "daftarUserValidation": {
      return [
        body("username", "username tidak boleh kosong").exists(),
        body("password", "password tidak boleh kosong").exists(),
        body("nama", "nama tidak boleh kosong").exists(),
        body("no_telp", "no telepon tidak boleh kosong").exists(),
      ];
    }
    case "loginUserValidation": {
      return [
        body("username", "username tidak boleh kosong").exists(),
        body("password", "password tidak boleh kosong").exists(),
      ];
    }
    case "daftarAdminValidation": {
      return [
        body("username", "username tidak boleh kosong").exists(),
        body("password", "password tidak boleh kosong").exists(),
        body("level", "level tidak boleh kosong").exists(),
      ];
    }
    case "loginAdminValidation": {
      return [
        body("username", "username tidak boleh kosong").exists(),
        body("password", "password tidak boleh kosong").exists(),
      ];
    }
  }
};

exports.daftarUser = (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const {
      username,
      nama,
      no_telp,
      ig,
      facebook,
      wa,
      alamat,
      alamat_dati2,
      alamat_dati3,
    } = req.body;

    customer
      .create({
        username: username,
        nama: nama,
        no_telp: no_telp,
        ig: ig || null,
        facebook: facebook || null,
        wa: wa || null,
        alamat: alamat || null,
        alamat_dati2: alamat_dati2 || null,
        alamat_dati3: alamat_dati3 || null,
      })
      .then((q) => {
        user
          .create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8),
            id_customer: q.id_customer,
          })
          .then(() => {
            res.send({ message: "User was registered successfully!" });
          })
          .catch((err) => {
            res.status(500).send({ message: err.message });
          });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.daftarUser = (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const {
      nama,
      no_telp,
      ig,
      facebook,
      wa,
      alamat,
      alamat_dati2,
      alamat_dati3,
      username,
      password,
    } = req.body;

    customer
      .create({
        username: username,
        nama: nama,
        no_telp: no_telp,
        ig: ig || null,
        facebook: facebook || null,
        wa: wa || null,
        alamat: alamat || null,
        alamat_dati2: alamat_dati2 || null,
        alamat_dati3: alamat_dati3 || null,
      })
      .then((q) => {
        user
          .create({
            username: username,
            password: bcrypt.hashSync(password, 8),
            id_customer: q.id_customer,
            token: randomString(60),
          })
          .then(() => {
            res.send({ message: "User was registered successfully!" });
          })
          .catch((err) => {
            res.status(500).send({ message: err.message });
          });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.loginUser = (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.flash("login_validation_message", { errors: errors.array() });
      req.flash("login_validation_status", "422");
      res.redirect(process.env.URL + "/auth/login-user");
    }

    user
      .findOne({
        where: {
          username: req.body.username,
        },
      })
      .then((q) => {
        if (!q) {
          req.flash("login_message", "User tidak terdaftar");
          req.flash("login_status", "401");
          res.redirect(process.env.URL + "/auth/login-user");
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, q.password);

        if (!passwordIsValid) {
          req.flash("login_message", "Password salah");
          req.flash("login_status", "401");
          res.redirect(process.env.URL + "/auth/login-user");
        }

        let accessToken = jwt.sign(
          { loginId: q.id_account, username: q.username, access: "USER" },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: process.env.ACCESS_TOKEN_LIFE,
          }
        );

        let refreshToken = jwt.sign(
          { loginId: q.id_account, username: q.username, access: "USER" },
          process.env.REFRESH_TOKEN_SECRET
        );

        user.update(
          { refresh_token: refreshToken },
          { where: { id: q.id_account } }
        );

        // res.status(200).send({
        //   loginId: user.id_account,
        //   username: user.username,
        //   accessToken: token,
        // });
        res.cookie("jwt", accessToken, { secure: true, httpOnly: true });
        res.redirect(process.env.URL + "/dashboard");
      })
      .catch((err) => {
        req.flash("login_message", "Server Error");
        req.flash("login_status", "500");
        res.redirect(process.env.URL + "/auth/login-user");
      });
  } catch (err) {
    req.flash("login_message", "Server Error");
    req.flash("login_status", "500");
    res.redirect(process.env.URL + "/auth/login-user");
  }
};

exports.daftarAdmin = (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { username, password, level } = req.body;

    admin
      .create({
        username: username,
        password: bcrypt.hashSync(password, 8),
        level: level,
      })
      .then(() => {
        res.send({ message: "Admin was registered successfully!" });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.loginAdmin = (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    admin
      .findOne({
        where: {
          username: req.body.username,
        },
      })
      .then((admin) => {
        if (!admin) {
          return res.status(404).send({ message: "Admin Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          admin.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }

        var token = jwt.sign(
          { loginId: admin.id_account, access: "ADMIN" },
          config.secret,
          {
            expiresIn: 86400, // 24 hours
          }
        );

        // res.status(200).send({
        //   loginId: admin.id_account,
        //   username: admin.username,
        //   accessToken: token,
        // });

        res.cookie("x-access-token", token);
        res.redirect(process.env.URL + "/admin/dashboard");
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.loginUserView = function (req, res) {
  const loginMessage = req.flash("login_message");
  const loginStatus = req.flash("login_status");
  const alert = { message: loginMessage, status: loginStatus };

  res.render("login/user-index", {
    alert: alert,
  });
};

exports.loginAdminView = function (req, res) {
  res.render("login/admin-index");
};

exports.daftarUserView = function (req, res) {
  res.render("daftar/user-index");
};

exports.daftarAdminView = function (req, res) {
  res.render("daftar/admin-index");
};

exports.loginUserToken = (req, res) => {
  try {
    if (!req.params.token) {
      req.flash("login_validation_message", "Token invalid");
      req.flash("login_validation_status", "401");
      res.redirect(process.env.URL + "/auth/login-user");
    }

    user
      .findOne({
        where: {
          token: req.params.token,
        },
      })
      .then((user) => {
        if (!user) {
          req.flash("login_message", "Token tidak terdaftar");
          req.flash("login_status", "401");
          res.redirect(process.env.URL + "/auth/login-user");
        }

        var token = jwt.sign(
          { loginId: user.id_account, access: "USER" },
          config.secret,
          {
            expiresIn: 86400, // 24 hours
          }
        );

        // res.status(200).send({
        //   loginId: user.id_account,
        //   username: user.username,
        //   accessToken: token,
        // });
        res.cookie("x-access-token", token);
        res.redirect(process.env.URL + "/dashboard");
      })
      .catch((err) => {
        req.flash("login_message", "Server Error");
        req.flash("login_status", "500");
        res.redirect(process.env.URL + "/auth/login-user");
      });
  } catch (err) {
    req.flash("login_message", "Server Error");
    req.flash("login_status", "500");
    res.redirect(process.env.URL + "/auth/login-user");
  }
};

exports.registerView = function (req, res) {
  res.render("login/register-index");
};

exports.onetapView = function (req, res) {
  res.render("login/onetap-index");
};
