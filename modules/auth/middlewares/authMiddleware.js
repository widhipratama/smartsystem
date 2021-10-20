const db = require("../../../models");
const jwt = require("jsonwebtoken");
const config = require("../../../config/auth");

const useraccount = db.useraccount;
const customer = db.customer;
const karyawan = db.karyawan;

verifyToken = async (req, res, next) => {
  try {
    let accessToken = req.cookies.jwt;

    if (!accessToken) {
      req.flash("login_message", "Forbidden Access");
      req.flash("login_status", "403");
    }

    let payload;
    try {
      payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    } catch (e) {
      req.flash("login_message", "Akses login kadaluarsa, silahkan login kembali");
      req.flash("login_status", "401");
    }

    const account = await useraccount.findOne({
      where: { username: payload.username },
    });

    try {
      jwt.verify(account.refresh_token, process.env.REFRESH_TOKEN_SECRET);
    } catch (e) {
      req.flash("login_message", "Akses login kadaluarsa, silahkan login kembali");
      req.flash("login_status", "401");
      res.redirect(process.env.URL + "/auth/login");
    }

    let newToken = jwt.sign(
      {
        loginId: payload.loginId,
        nama_user: payload.nama_user,
        username: payload.username,
        level: payload.level,
        id_user: payload.id_user,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
      }
    );

    res.cookie("jwt", newToken, { secure: true, httpOnly: true });
    next();
  } catch (err) {
    // req.flash("login_message", "Silahkan login terlebih dahulu");
    // req.flash("login_status", "401");
    res.redirect(process.env.URL + "/auth/login");
  }
};

// verifyToken = (req, res, next) => {
//   let token = req.headers["x-access-token"];

//   if (token) {
//     jwt.verify(token, config.secret, (err, decoded) => {
//       if (err) {
//         return res.status(401).send({
//           message: "Unauthorized!",
//         });
//       }
//       req.loginId = decoded.id;
//       next();
//     });
//   } else {
//     res.redirect(process.env.URL + "/auth/login-user");
//   }
// };

isActivatedAccount = (req, res, next) => {
  account.findByPk(req.loginId).then((access) => {
    if (access.status != "0") {
      next();
      return;
    }

    res.json({ status: "403", message: "Account tidak aktif" });
    return;
  });
};

checkUsername = (req, res, next) => {
  // Username
  useraccount
    .findOne({
      where: {
        username: req.body.username,
      },
    })
    .then((q) => {
      if (q) {
        res.json({ status: "400", message: "Username sudah digunakan" });
        return;
      }

      next();
    });
};

const authMiddleware = {
  verifyToken: verifyToken,
  isActivatedAccount: isActivatedAccount,
  checkUsername: checkUsername,
};

module.exports = authMiddleware;
