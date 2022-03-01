exports.user = function (req, res) {
  const session = req.useraccount;

  res.render("dashboard/user", {
    session: session,
  });
};

exports.admin = function (req, res) {
  const session = req.useraccount;
  const month = (req.query.fbulancalender ? req.query.fbulancalender : new Date().getMonth());
  const year = (req.query.ftahuncalender ? req.query.ftahuncalender : new Date().getFullYear());

  res.render("dashboard/admin", {
    session: session,
    start: '2021-09-01',
    end: '2021-09-30',
    fbulancalender: month,
    ftahuncalender: year
  });
};
