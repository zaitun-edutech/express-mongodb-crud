var Auth = {
  check_login: function (req, res, next) {
    if (!req.session.logged_in) {
      return res.redirect("/login");
    }
    next();
  },
  is_admin: function (req, res, next) {
    if (!req.session.admin) {
      req.flash("info", "maaf tidak bisa akses halaman ini");
      return res.redirect("/");
    }
    next();
  },
};

module.exports = Auth;
