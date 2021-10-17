const db = require("../../../models");
const config = require("../../../config/auth");
const { body, validationResult } = require("express-validator/check");
const { randomString } = require("../../../helpers/randomString");

const useraccount = db.useraccount;
const customer = db.customer;
const karyawan = db.karyawan;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.validate = (method) => {
  switch (method) {
    case "daftar_account_customer": {
      return [
        body("username", "username tidak boleh kosong").exists(),
        body("password", "password tidak boleh kosong").exists(),
        body("no_telp", "no telepon tidak boleh kosong").exists(),
      ];
    }
    case "daftar_account_karyawan": {
      return [
        body("username", "username tidak boleh kosong").exists(),
        body("password", "password tidak boleh kosong").exists(),
        body("level_karyawan", "level tidak boleh kosong").exists(),
      ];
    }
    case "login_account_customer": {
      return [body("username", "username tidak boleh kosong").exists(), body("password", "password tidak boleh kosong").exists()];
    }
    case "login_account_karyawan": {
      return [body("username", "username tidak boleh kosong").exists(), body("password", "password tidak boleh kosong").exists()];
    }
  }
};

exports.daftar_account_karyawan = (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ status: "422", message: errors.array() });
      return;
    }

    const { nama_karyawan, level_karyawan } = req.body;

    karyawan
      .create({
        nama_karyawan: nama_karyawan,
        level_karyawan: level_karyawan,
      })
      .then((q) => {
        useraccount
          .create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8),
            id_user: q.id_customer,
            kategori_user: level_karyawan,
            status: 1,
          })
          .then(() => {
            res.json({ status: "200", message: "Customer berhasil terdaftar" });
          })
          .catch((err) => {
            res.json({ status: "500", message: err.message });
          });
      })
      .catch((err) => {
        res.json({ status: "500", message: err.message });
      });
  } catch (err) {
    res.json({ status: "500", message: err.message });
  }
};

exports.daftar_account_customer = (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ status: "422", message: errors.array() });
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
        status: 1,
      })
      .then((q) => {
        useraccount
          .create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8),
            id_user: q.id_customer,
            kategori_user: "USER",
            status: 1,
          })
          .then(() => {
            res.json({ status: "200", message: "Customer berhasil terdaftar" });
          })
          .catch((err) => {
            res.json({ status: "500", message: err.message });
          });
      })
      .catch((err) => {
        res.json({ status: "500", message: err.message });
      });
  } catch (err) {
    res.json({ status: "500", message: err.message });
  }
};

exports.login_account_customer_token = (req, res) => {
  try {
    const token = req.params.token;
    useraccount
      .findOne({
        where: {
          token: token,
        },
      })
      .then((q) => {
        if (!q) {
          res.redirect(process.env.URL + "/auth/login");
        }

        let accessToken = jwt.sign({ loginId: q.id, username: q.username, kategori_user: "USER" }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: process.env.ACCESS_TOKEN_LIFE,
        });

        let refreshToken = jwt.sign({ loginId: q.id, username: q.username, kategori_user: "USER" }, process.env.REFRESH_TOKEN_SECRET);

        useraccount.update({ refresh_token: refreshToken }, { where: { id: q.id } });
        res.cookie("jwt", accessToken, { secure: true, httpOnly: true });

        res.redirect(process.env.URL + "/auth/onetaps");
      })
      .catch((err) => {
        res.redirect(process.env.URL + "/auth/login");
      });
  } catch (err) {
    res.redirect(process.env.URL + "/auth/login");
  }
};

exports.login_account_customer = (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ status: "422", message: errors.array() });
    }

    useraccount
      .findOne({
        where: {
          username: req.body.username,
        },
      })
      .then((q) => {
        if (!q) {
          res.json({ status: "401", message: "User tidak terdaftar" });
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, q.password);

        if (!passwordIsValid) {
          res.json({ status: "401", message: "Password salah" });
        }

        let accessToken = jwt.sign({ loginId: q.id, username: q.username, kategori_user: q.kategori_user }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: process.env.ACCESS_TOKEN_LIFE,
        });

        let refreshToken = jwt.sign({ loginId: q.id, username: q.username, kategori_user: q.kategori_user }, process.env.REFRESH_TOKEN_SECRET);

        useraccount.update({ refresh_token: refreshToken }, { where: { id: q.id } });
        res.cookie("jwt", accessToken, { secure: true, httpOnly: true });

        res.json({ status: "200", loginId: useraccount.id, username: useraccount.username, accessToken: accessToken });
      })
      .catch((err) => {
        res.json({ status: "500", message: "Server Error" });
      });
  } catch (err) {
    res.json({ status: "500", message: "Server Error" });
  }
};

exports.login_account_karyawan = (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ status: "422", message: errors.array() });
    }

    useraccount
      .findOne({
        where: {
          username: req.body.username,
        },
      })
      .then((q) => {
        if (!q) {
          res.json({ status: "401", message: "User tidak terdaftar" });
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, q.password);

        if (!passwordIsValid) {
          res.json({ status: "401", message: "Password salah" });
        }

        let accessToken = jwt.sign({ loginId: q.id, username: q.username, kategori_user: q.kategori_user }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: process.env.ACCESS_TOKEN_LIFE,
        });

        let refreshToken = jwt.sign({ loginId: q.id, username: q.username, kategori_user: q.kategori_user }, process.env.REFRESH_TOKEN_SECRET);

        useraccount.update({ refresh_token: refreshToken }, { where: { id: q.id } });
        res.cookie("jwt", accessToken, { secure: true, httpOnly: true });

        res.json({ status: "200", loginId: useraccount.id, username: useraccount.username, accessToken: accessToken });
      })
      .catch((err) => {
        res.json({ status: "500", message: "Server Error" });
      });
  } catch (err) {
    res.json({ status: "500", message: "Server Error" });
  }
};

exports.view_login_account_karyawan = function (req, res) {
  res.render("../modules/auth/views/login_karyawan");
};

exports.view_login_account_customer = function (req, res) {
  res.render("../modules/auth/views/login");
};

exports.view_daftar_account_customer = function (req, res) {
  res.render("../modules/auth/views/daftar");
};

exports.view_onetaps_customer = function (req, res) {
  res.render("../modules/auth/views/onetaps");
};
