const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");
const db = require("../models");
const user = db.user;
const admin = db.admin;

verifyToken = async (req, res, next) => {
  try {
    let token = req.cookies["x-access-token"];

    const decode = jwt.verify(token, config.secret);
    const akun = await user.findOne({ id_account: decode.loginId });
    if (!akun) {
      req.flash(
        "login_message",
        "Akses login kadaluarsa, silahkan login kembali"
      );
      req.flash("login_status", "401");
      res.redirect(process.env.URL + "/auth/login-user");
    }
    req.token = token;
    req.user = akun;
    next();
  } catch (err) {
    // req.flash("login_message", "Silahkan login terlebih dahulu");
    // req.flash("login_status", "401");
    res.redirect(process.env.URL + "/auth/login-user");
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

isActivatedUser = (req, res, next) => {
  user.findByPk(req.loginId).then((access) => {
    if (access.status != "0") {
      next();
      return;
    }

    res.status(403).send({
      message: "Account not active!",
    });
    return;
  });
};

isAdmin = (req, res, next) => {
  admin.findByPk(req.loginId).then((access) => {
    if (access.level === "admin") {
      next();
      return;
    }

    res.status(403).send({
      message: "Require Admin Access!",
    });
    return;
  });
};

isStaffAdmin = (req, res, next) => {
  admin.findByPk(req.loginId).then((access) => {
    if (access.level === "staff" || access.level === "admin") {
      next();
      return;
    }

    res.status(403).send({
      message: "Require Staff Access!",
    });
    return;
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isStaffAdmin: isStaffAdmin,
  isActivatedUser: isActivatedUser,
};
module.exports = authJwt;
