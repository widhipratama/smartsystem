exports.user = function (req, res) {
  const session = req.user;

  res.render("dashboard/user", {
    session: session,
  });
};

exports.admin = function (req, res) {
  const session = req.user;

  res.render("dashboard/admin", {
    session: session,
  });
};
