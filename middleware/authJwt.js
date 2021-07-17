const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");
const db = require("../models");
const customer = db.customer;
const user = db.user;
const admin = db.admin;

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
      req.flash(
        "login_message",
        "Akses login kadaluarsa, silahkan login kembali"
      );
      req.flash("login_status", "401");
    }

    const dataUser = await user.findOne({
      where: { username: payload.username },
      include: [customer],
    });

    try {
      jwt.verify(dataUser.refresh_token, process.env.REFRESH_TOKEN_SECRET);
    } catch (e) {
      req.flash(
        "login_message",
        "Akses login kadaluarsa, silahkan login kembali"
      );
      req.flash("login_status", "401");
      res.redirect(process.env.URL + "/auth/login-user");
    }

    let newToken = jwt.sign(
      {
        loginId: dataUser.id_account,
        username: dataUser.username,
        access: "USER",
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
