const db = require("../models");
const config = require("../config/auth");
const { body, validationResult } = require("express-validator/check");
const { randomString } = require("../helpers/randomString");
const user_account = db.user_account;
const customer = db.customer;
const karyawan = db.karyawan;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.validate = (method) => {
  switch (method) {
    case "daftarUserValidation": {
      return [
        body("username", "username tidak boleh kosong").exists(),
        body("password", "password tidak boleh kosong").exists(),
        body("kategori", "nama tidak boleh kosong")
          .if((value) => value === "ADMIN")
          .exists(),
        body("no_telp", "no telepon tidak boleh kosong").exists(),
      ];
    }
    case "loginUserValidation": {
      return [body("username", "username tidak boleh kosong").exists(), body("password", "password tidak boleh kosong").exists()];
    }
    case "daftarAdminValidation": {
      return [
        body("username", "username tidak boleh kosong").exists(),
        body("password", "password tidak boleh kosong").exists(),
        body("level", "level tidak boleh kosong").exists(),
      ];
    }
    case "loginAdminValidation": {
      return [body("username", "username tidak boleh kosong").exists(), body("password", "password tidak boleh kosong").exists()];
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

    const { username, nama, no_telp, ig, facebook, wa, alamat, alamat_dati2, alamat_dati3 } = req.body;

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

    const { nama, no_telp, ig, facebook, wa, alamat, alamat_dati2, alamat_dati3, username, password } = req.body;

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

          // const loginMessage = req.flash("login_message");
          // const loginStatus = req.flash("login_status");
          // const alert = { message: loginMessage, status: loginStatus };

          // res.render("login/user-index", {
          //   alert: alert,
          // });
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, q.password);

        if (!passwordIsValid) {
          req.flash("login_message", "Password salah");
          req.flash("login_status", "401");
          res.redirect(process.env.URL + "/auth/login-user");
        }

        let accessToken = jwt.sign({ loginId: q.id, username: q.username, level: "USER" }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: process.env.ACCESS_TOKEN_LIFE,
        });

        let refreshToken = jwt.sign({ loginId: q.id, username: q.username, level: "USER" }, process.env.REFRESH_TOKEN_SECRET);

        user.update({ refresh_token: refreshToken }, { where: { id: q.id } });

        // res.status(200).send({
        //   loginId: user.id,
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

    user
      .create({
        username: username,
        password: bcrypt.hashSync(password, 8),
        level: level,
        token: randomString(60),
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
      req.flash("login_validation_message", { errors: errors.array() });
      req.flash("login_validation_status", "422");
      res.redirect(process.env.URL + "/auth/login-admin");
    }

    admin
      .findOne({
        where: {
          username: req.body.username,
        },
      })
      .then((q) => {
        if (!q) {
          req.flash("login_message", "Admin tidak terdaftar");
          req.flash("login_status", "401");
          res.redirect(process.env.URL + "/auth/login-admin");
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, q.password);

        if (!passwordIsValid) {
          req.flash("login_message", "Password salah");
          req.flash("login_status", "401");
          res.redirect(process.env.URL + "/auth/login-admin");
        }

        let accessToken = jwt.sign({ loginId: q.id, username: q.username, level: q.level }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: process.env.ACCESS_TOKEN_LIFE,
        });

        let refreshToken = jwt.sign({ loginId: q.id, username: q.username, level: q.level }, process.env.REFRESH_TOKEN_SECRET);

        admin.update({ refresh_token: refreshToken }, { where: { id: q.id } });

        // res.status(200).send({
        //   loginId: user.id,
        //   username: user.username,
        //   accessToken: token,
        // });
        res.cookie("jwt", accessToken, { secure: true, httpOnly: true });
        res.redirect(process.env.URL + "/admin/dashboard");
      })
      .catch((err) => {
        req.flash("login_message", "Server Error");
        req.flash("login_status", "500");
        res.redirect(process.env.URL + "/auth/login-admin");
      });
  } catch (err) {
    req.flash("login_message", "Server Error");
    req.flash("login_status", "500");
    res.redirect(process.env.URL + "/auth/login-admin");
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

        var token = jwt.sign({ loginId: user.id, access: "USER" }, config.secret, {
          expiresIn: 86400, // 24 hours
        });

        // res.status(200).send({
        //   loginId: user.id,
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
