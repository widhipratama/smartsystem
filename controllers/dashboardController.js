exports.user = function (req, res) {
  const session = req.useraccount;

  res.render("dashboard/user", {
    session: session,
  });
};

exports.admin = function (req, res) {
  const session = req.useraccount;

  res.render("dashboard/admin", {
    session: session,
    start: '2021-09-01',
    end: '2021-09-30'
  });
};
